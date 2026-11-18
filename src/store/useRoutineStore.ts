import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Routine, RoutineDay, ExerciseTemplate, ID } from "../types/routine";
import type { ProfessionalTemplate } from "../types/template";
import { getTemplate } from "../data/templates";
import { uid } from "../utils/id";

export { getTemplates } from "../data/templates";

interface RoutineState {
  routines: Routine[];
  activeRoutineId: ID | null;

  createRoutine: (name: string) => ID;
  renameRoutine: (id: ID, name: string) => void;
  deleteRoutine: (id: ID) => void;
  setActiveRoutine: (id: ID | null) => void;

  addDay: (routineId: ID, name: string) => void;
  renameDay: (routineId: ID, dayId: ID, name: string) => void;
  removeDay: (routineId: ID, dayId: ID) => void;

  addExercise: (routineId: ID, dayId: ID, ex: Omit<ExerciseTemplate, "id">) => void;
  updateExercise: (routineId: ID, dayId: ID, exId: ID, patch: Partial<ExerciseTemplate>) => void;
  removeExercise: (routineId: ID, dayId: ID, exId: ID) => void;
  moveExercise: (routineId: ID, dayId: ID, from: number, to: number) => void;

  adoptTemplate: (templateId: string) => ID | null;
  seedPPL: () => ID;
}

type Draft = { routines: Routine[] };

const findDay = (s: Draft, rId: ID, dId: ID): RoutineDay | undefined =>
  s.routines.find(r => r.id === rId)?.days.find(d => d.id === dId);

const touch = (s: Draft, rId: ID) => {
  const r = s.routines.find(r => r.id === rId);
  if (r) r.updatedAt = Date.now();
};

// Construye objetos NUEVOS campo por campo: ninguna referencia del template sobrevive
const cloneTemplateAsRoutine = (tpl: ProfessionalTemplate): Routine => {
  const now = Date.now();
  return {
    id: uid(),
    name: tpl.name,
    sourceTemplateId: tpl.id,
    createdAt: now,
    updatedAt: now,
    days: tpl.days.map(d => ({
      id: uid(),
      name: d.name,
      exercises: d.exercises.map(e => ({
        id: uid(),
        name: e.name,
        exerciseKey: e.exerciseKey,
        muscleGroup: e.muscleGroup,
        targetSets: e.targetSets,
        targetReps: e.targetReps,
        restSeconds: e.restSeconds,
        notes: e.notes,
      })),
    })),
  };
};

const ex = (
  name: string, muscleGroup: string, sets = 3, reps = "8-12", rest = 90, exerciseKey?: string,
): ExerciseTemplate => ({
  id: uid(), name, muscleGroup, exerciseKey, targetSets: sets, targetReps: reps, restSeconds: rest,
});

export const useRoutineStore = create<RoutineState>()(
  persist(
    immer(set => ({
      routines: [],
      activeRoutineId: null,

      createRoutine: name => {
        const id = uid();
        const now = Date.now();
        set(s => {
          s.routines.push({ id, name, days: [], createdAt: now, updatedAt: now });
          if (!s.activeRoutineId) s.activeRoutineId = id;
        });
        return id;
      },
      renameRoutine: (id, name) =>
        set(s => {
          const r = s.routines.find(r => r.id === id);
          if (r) {
            r.name = name;
            r.updatedAt = Date.now();
          }
        }),
      deleteRoutine: id =>
        set(s => {
          s.routines = s.routines.filter(r => r.id !== id);
          if (s.activeRoutineId === id) s.activeRoutineId = s.routines[0]?.id ?? null;
        }),
      setActiveRoutine: id => set(s => { s.activeRoutineId = id; }),

      addDay: (rId, name) =>
        set(s => {
          s.routines.find(r => r.id === rId)?.days.push({ id: uid(), name, exercises: [] });
          touch(s, rId);
        }),
      renameDay: (rId, dId, name) =>
        set(s => {
          const d = findDay(s, rId, dId);
          if (d) d.name = name;
          touch(s, rId);
        }),
      removeDay: (rId, dId) =>
        set(s => {
          const r = s.routines.find(r => r.id === rId);
          if (r) r.days = r.days.filter(d => d.id !== dId);
          touch(s, rId);
        }),

      addExercise: (rId, dId, e) =>
        set(s => {
          findDay(s, rId, dId)?.exercises.push({ ...e, id: uid() });
          touch(s, rId);
        }),
      updateExercise: (rId, dId, exId, patch) =>
        set(s => {
          const e = findDay(s, rId, dId)?.exercises.find(e => e.id === exId);
          if (e) Object.assign(e, patch);
          touch(s, rId);
        }),
      removeExercise: (rId, dId, exId) =>
        set(s => {
          const d = findDay(s, rId, dId);
          if (d) d.exercises = d.exercises.filter(e => e.id !== exId);
          touch(s, rId);
        }),
      moveExercise: (rId, dId, from, to) =>
        set(s => {
          const d = findDay(s, rId, dId);
          if (!d || to < 0 || to >= d.exercises.length) return;
          const [item] = d.exercises.splice(from, 1);
          d.exercises.splice(to, 0, item);
          touch(s, rId);
        }),

      adoptTemplate: templateId => {
        const tpl = getTemplate(templateId);
        if (!tpl) return null;
        const routine = cloneTemplateAsRoutine(tpl);
        set(s => {
          s.routines.push(routine);
          s.activeRoutineId = routine.id;
        });
        return routine.id;
      },

      seedPPL: () => {
        const now = Date.now();
        const id = uid();
        set(s => {
          s.routines.push({
            id, name: "Push / Pull / Legs", createdAt: now, updatedAt: now,
            days: [
              { id: uid(), name: "Push", exercises: [
                ex("Press banca", "Pecho", 4, "6-8", 150, "bench_press"),
                ex("Press militar", "Hombro"),
                ex("Fondos", "Tríceps"),
                ex("Extensión tríceps", "Tríceps"),
              ] },
              { id: uid(), name: "Pull", exercises: [
                ex("Dominadas", "Dorsal", 4, "6-10", 150),
                ex("Remo con barra", "Espalda media"),
                ex("Face pull", "Deltoide posterior"),
                ex("Curl bíceps", "Bíceps"),
              ] },
              { id: uid(), name: "Legs", exercises: [
                ex("Sentadilla", "Cuádriceps", 4, "5-8", 180, "squat"),
                ex("Peso muerto rumano", "Isquios"),
                ex("Prensa", "Cuádriceps"),
                ex("Gemelos", "Gemelos", 4, "12-15", 60),
              ] },
            ],
          });
          s.activeRoutineId = id;
        });
        return id;
      },
    })),
    {
      name: "routines-v1",
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: s => ({ routines: s.routines, activeRoutineId: s.activeRoutineId }),
    },
  ),
);
