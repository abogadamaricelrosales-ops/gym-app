import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Workout, WorkoutExercise, RestTimer, LoggedSet } from "../types/workout";
import type { Routine, RoutineDay, ExerciseTemplate, ID } from "../types/routine";
import { uid } from "../utils/id";
import { scheduleRestEnd, cancelNotification } from "../services/notifications";
import { useReadinessStore } from "./useReadinessStore";

interface WorkoutState {
  active: Workout | null;
  timer: RestTimer | null;
  history: Workout[]; // más reciente primero

  startFromRoutine: (routine: Routine, dayId: ID) => void;
  /** Arranca con un día ya armado (p. ej. el recomendado, con deload aplicado). */
  startFromDay: (routineId: ID | undefined, day: RoutineDay) => void;
  startEmpty: (name?: string) => void;
  addExercise: (name: string, restSeconds?: number) => void;
  addSet: (exId: ID) => void;
  updateSet: (exId: ID, setId: ID, patch: Partial<LoggedSet>) => void;
  removeSet: (exId: ID, setId: ID) => void;
  completeSet: (exId: ID, setId: ID) => Promise<void>;
  startRest: (exId: ID, seconds: number) => Promise<void>;
  adjustRest: (deltaSec: number) => Promise<void>;
  skipRest: () => Promise<void>;
  /** Guarda en el historial y registra la carga en el sistema de readiness. */
  finishWorkout: (sessionRpe?: number) => Promise<Workout | null>;
  discardWorkout: () => Promise<void>;
  deleteWorkout: (id: ID) => void;
}

// Últimas series completadas de un ejercicio → prefill para sobrecarga progresiva
const lastSetsFor = (history: Workout[], name: string) => {
  for (const w of history) {
    const ex = w.exercises.find(e => e.name === name);
    if (ex) return ex.sets.filter(s => s.completed);
  }
  return [];
};

const buildExercise = (history: Workout[], t: ExerciseTemplate): WorkoutExercise => {
  const prev = lastSetsFor(history, t.name);
  return {
    id: uid(),
    templateId: t.id,
    name: t.name,
    exerciseKey: t.exerciseKey,
    muscleGroup: t.muscleGroup,
    restSeconds: t.restSeconds,
    targetReps: t.targetReps,
    sets: Array.from({ length: Math.max(1, t.targetSets) }, (_, i) => ({
      id: uid(),
      completed: false,
      reps: prev[i]?.reps ?? prev[prev.length - 1]?.reps ?? 0,
      weight: prev[i]?.weight ?? prev[prev.length - 1]?.weight ?? 0,
    })),
  };
};

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    immer((set, get) => ({
      active: null,
      timer: null,
      history: [],

      startFromRoutine: (routine, dayId) => {
        const day = routine.days.find(d => d.id === dayId);
        if (day) get().startFromDay(routine.id, day);
      },

      startFromDay: (routineId, day) => {
        const { history } = get();
        const exercises = day.exercises.map(t => buildExercise(history, t));
        set(s => {
          s.active = {
            id: uid(), routineId, dayId: day.id, dayName: day.name,
            startedAt: Date.now(), exercises,
          };
        });
      },

      startEmpty: (name = "Entrenamiento libre") =>
        set(s => {
          s.active = { id: uid(), dayName: name, startedAt: Date.now(), exercises: [] };
        }),

      addExercise: (name, restSeconds = 90) => {
        const e = buildExercise(get().history, {
          id: uid(), name, targetSets: 3, targetReps: "8-12", restSeconds,
        });
        set(s => { s.active?.exercises.push(e); });
      },

      addSet: exId =>
        set(s => {
          const ex = s.active?.exercises.find(e => e.id === exId);
          if (!ex) return;
          const last = ex.sets[ex.sets.length - 1];
          ex.sets.push({ id: uid(), reps: last?.reps ?? 0, weight: last?.weight ?? 0, completed: false });
        }),

      updateSet: (exId, setId, patch) =>
        set(s => {
          const st = s.active?.exercises.find(e => e.id === exId)?.sets.find(x => x.id === setId);
          if (st) Object.assign(st, patch);
        }),

      removeSet: (exId, setId) =>
        set(s => {
          const ex = s.active?.exercises.find(e => e.id === exId);
          if (ex) ex.sets = ex.sets.filter(x => x.id !== setId);
        }),

      completeSet: async (exId, setId) => {
        const ex = get().active?.exercises.find(e => e.id === exId);
        const st = ex?.sets.find(x => x.id === setId);
        if (!ex || !st) return;
        const nowDone = !st.completed;
        set(s => {
          const t = s.active?.exercises.find(e => e.id === exId)?.sets.find(x => x.id === setId);
          if (!t) return;
          t.completed = nowDone;
          t.completedAt = nowDone ? Date.now() : undefined;
        });
        if (nowDone) await get().startRest(exId, ex.restSeconds); // descanso automático
      },

      startRest: async (exId, seconds) => {
        await cancelNotification(get().timer?.notificationId);
        const notificationId = await scheduleRestEnd(seconds);
        set(s => {
          s.timer = { endsAt: Date.now() + seconds * 1000, durationSec: seconds, exerciseId: exId, notificationId };
        });
      },

      adjustRest: async delta => {
        const t = get().timer;
        if (!t) return;
        const remaining = Math.ceil((t.endsAt - Date.now()) / 1000) + delta;
        if (remaining <= 0) return get().skipRest();
        await get().startRest(t.exerciseId, remaining);
        set(s => { if (s.timer) s.timer.durationSec = Math.max(remaining, t.durationSec + delta); });
      },

      skipRest: async () => {
        const id = get().timer?.notificationId;
        set(s => { s.timer = null; });
        await cancelNotification(id);
      },

      finishWorkout: async (sessionRpe = 7) => {
        await get().skipRest();
        const active = get().active;
        if (!active) return null;
        const finished: Workout = {
          ...active,
          finishedAt: Date.now(),
          sessionRpe,
          exercises: active.exercises
            .map(e => ({ ...e, sets: e.sets.filter(x => x.completed) }))
            .filter(e => e.sets.length > 0),
        };
        set(s => {
          s.history.unshift(finished);
          s.active = null;
        });
        useReadinessStore.getState().logGymWorkout(finished, sessionRpe);
        return finished;
      },

      discardWorkout: async () => {
        await get().skipRest();
        set(s => { s.active = null; });
      },

      deleteWorkout: id => {
        set(s => { s.history = s.history.filter(w => w.id !== id); });
        useReadinessStore.getState().removeWorkoutEvents(id);
      },
    })),
    {
      name: "workout-v1",
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      // persiste el entreno activo: si la app se cierra, lo retomás
      partialize: s => ({ active: s.active, timer: s.timer, history: s.history }),
    },
  ),
);
