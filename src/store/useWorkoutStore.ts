import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Workout, RestTimer, LoggedSet } from "../types/workout";
import type { Routine, ID } from "../types/routine";
import { uid } from "../utils/id";
import { scheduleRestEnd, cancelNotification } from "../services/notifications";

interface WorkoutState {
  active: Workout | null;
  timer: RestTimer | null;
  history: Workout[]; // más reciente primero

  start: (routine: Routine) => void;
  goToExercise: (index: number) => void;
  updateSet: (exId: ID, setId: ID, patch: Partial<LoggedSet>) => void;
  addSet: (exId: ID) => void;
  /** Marca la serie, arranca el descanso y pasa al siguiente ejercicio si este terminó. */
  completeSet: (exId: ID, setId: ID) => Promise<void>;
  undoSet: (exId: ID, setId: ID) => void;
  adjustRest: (deltaSec: number) => Promise<void>;
  skipRest: () => Promise<void>;
  finish: () => Promise<Workout | null>;
  discard: () => Promise<void>;
  deleteWorkout: (id: ID) => void;
}

// Últimas series hechas de un ejercicio → se precargan (sobrecarga progresiva)
const lastSetsFor = (history: Workout[], name: string) => {
  for (const w of history) {
    const ex = w.exercises.find(e => e.name === name);
    if (ex && ex.sets.length) return ex.sets;
  }
  return [];
};

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    immer((set, get) => ({
      active: null,
      timer: null,
      history: [],

      start: routine => {
        const { history } = get();
        const exercises = routine.exercises.map(t => {
          const prev = lastSetsFor(history, t.name);
          return {
            id: uid(),
            name: t.name,
            targetReps: t.targetReps,
            restSeconds: t.restSeconds,
            sets: Array.from({ length: Math.max(1, t.targetSets) }, (_, i) => {
              const p = prev[i] ?? prev[prev.length - 1];
              return { id: uid(), reps: p?.reps ?? t.targetReps, weight: p?.weight ?? 0, completed: false };
            }),
          };
        });
        set(s => {
          s.active = {
            id: uid(), routineId: routine.id, name: routine.name, category: routine.category, goal: routine.goal,
            startedAt: Date.now(), currentExercise: 0, exercises,
          };
        });
      },

      goToExercise: index => set(s => {
        if (s.active && index >= 0 && index < s.active.exercises.length) s.active.currentExercise = index;
      }),

      updateSet: (exId, setId, patch) => set(s => {
        const st = s.active?.exercises.find(e => e.id === exId)?.sets.find(x => x.id === setId);
        if (st) Object.assign(st, patch);
      }),

      addSet: exId => set(s => {
        const ex = s.active?.exercises.find(e => e.id === exId);
        if (!ex) return;
        const last = ex.sets[ex.sets.length - 1];
        ex.sets.push({ id: uid(), reps: last?.reps ?? ex.targetReps, weight: last?.weight ?? 0, completed: false });
      }),

      completeSet: async (exId, setId) => {
        const active = get().active;
        const exIndex = active?.exercises.findIndex(e => e.id === exId) ?? -1;
        if (!active || exIndex < 0) return;
        const ex = active.exercises[exIndex];

        set(s => {
          const w = s.active!;
          const e = w.exercises[exIndex];
          const st = e.sets.find(x => x.id === setId);
          if (!st) return;
          st.completed = true;
          st.completedAt = Date.now();
          // la siguiente serie arranca con el mismo peso y reps
          const next = e.sets.find(x => !x.completed);
          if (next && next.weight === 0) { next.weight = st.weight; next.reps = st.reps; }
          // ejercicio terminado → siguiente con series pendientes
          if (!next) {
            const nextEx = w.exercises.findIndex((x, i) => i > exIndex && x.sets.some(y => !y.completed));
            if (nextEx >= 0) w.currentExercise = nextEx;
          }
        });

        const allDone = get().active!.exercises.every(e => e.sets.every(x => x.completed));
        if (allDone) return get().skipRest();

        await cancelNotification(get().timer?.notificationId);
        const notificationId = await scheduleRestEnd(ex.restSeconds);
        set(s => {
          s.timer = { endsAt: Date.now() + ex.restSeconds * 1000, durationSec: ex.restSeconds, notificationId };
        });
      },

      undoSet: (exId, setId) => set(s => {
        const st = s.active?.exercises.find(e => e.id === exId)?.sets.find(x => x.id === setId);
        if (st) { st.completed = false; st.completedAt = undefined; }
      }),

      adjustRest: async delta => {
        const t = get().timer;
        if (!t) return;
        const remaining = Math.ceil((t.endsAt - Date.now()) / 1000) + delta;
        if (remaining <= 0) return get().skipRest();
        await cancelNotification(t.notificationId);
        const notificationId = await scheduleRestEnd(remaining);
        set(s => {
          s.timer = { endsAt: Date.now() + remaining * 1000, durationSec: Math.max(remaining, t.durationSec + delta), notificationId };
        });
      },

      skipRest: async () => {
        const id = get().timer?.notificationId;
        set(s => { s.timer = null; });
        await cancelNotification(id);
      },

      finish: async () => {
        await get().skipRest();
        const active = get().active;
        if (!active) return null;
        const done: Workout = {
          ...active,
          finishedAt: Date.now(),
          exercises: active.exercises
            .map(e => ({ ...e, sets: e.sets.filter(x => x.completed) }))
            .filter(e => e.sets.length > 0),
        };
        set(s => {
          if (done.exercises.length) s.history.unshift(done);
          s.active = null;
        });
        return done;
      },

      discard: async () => {
        await get().skipRest();
        set(s => { s.active = null; });
      },

      deleteWorkout: id => set(s => { s.history = s.history.filter(w => w.id !== id); }),
    })),
    {
      name: "workout-v2",
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: s => ({ active: s.active, timer: s.timer, history: s.history }),
    },
  ),
);
