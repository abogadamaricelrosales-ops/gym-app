import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Routine, ExerciseTemplate, ID, Category } from "../types/routine";
import { uid } from "../utils/id";

interface RoutineState {
  routines: Routine[];
  createRoutine: (name: string, category: Category) => ID;
  updateRoutine: (id: ID, patch: Partial<Pick<Routine, "name" | "category" | "weekdays">>) => void;
  toggleWeekday: (id: ID, day: number) => void;
  deleteRoutine: (id: ID) => void;
  addExercise: (id: ID, name: string) => void;
  updateExercise: (id: ID, exId: ID, patch: Partial<ExerciseTemplate>) => void;
  removeExercise: (id: ID, exId: ID) => void;
  moveExercise: (id: ID, from: number, to: number) => void;
  seedExamples: () => void;
}

const ex = (name: string, targetSets = 3, targetReps = 10, restSeconds = 90): ExerciseTemplate =>
  ({ id: uid(), name, targetSets, targetReps, restSeconds });

const routine = (name: string, category: Category, weekdays: number[], exercises: ExerciseTemplate[]): Routine => {
  const now = Date.now();
  return { id: uid(), name, category, weekdays, exercises, createdAt: now, updatedAt: now };
};

export const useRoutineStore = create<RoutineState>()(
  persist(
    immer((set) => {
      const edit = (id: ID, fn: (r: Routine) => void) =>
        set(s => {
          const r = s.routines.find(r => r.id === id);
          if (!r) return;
          fn(r);
          r.updatedAt = Date.now();
        });

      return {
        routines: [],

        createRoutine: (name, category) => {
          const r = routine(name, category, [], []);
          set(s => { s.routines.push(r); });
          return r.id;
        },
        updateRoutine: (id, patch) => edit(id, r => { Object.assign(r, patch); }),
        toggleWeekday: (id, day) =>
          edit(id, r => {
            r.weekdays = r.weekdays.includes(day)
              ? r.weekdays.filter(d => d !== day)
              : [...r.weekdays, day].sort();
          }),
        deleteRoutine: id => set(s => { s.routines = s.routines.filter(r => r.id !== id); }),

        addExercise: (id, name) => edit(id, r => { r.exercises.push(ex(name)); }),
        updateExercise: (id, exId, patch) =>
          edit(id, r => {
            const e = r.exercises.find(e => e.id === exId);
            if (e) Object.assign(e, patch);
          }),
        removeExercise: (id, exId) => edit(id, r => { r.exercises = r.exercises.filter(e => e.id !== exId); }),
        moveExercise: (id, from, to) =>
          edit(id, r => {
            if (to < 0 || to >= r.exercises.length) return;
            const [item] = r.exercises.splice(from, 1);
            r.exercises.splice(to, 0, item);
          }),

        // Rutinas de ejemplo (lunes, miércoles y viernes) para que la app no arranque vacía
        seedExamples: () =>
          set(s => {
            s.routines.push(
              routine("Pecho y tríceps", "Pecho", [1], [
                ex("Press banca", 4, 8, 120), ex("Press inclinado con mancuernas", 3, 10),
                ex("Aperturas en máquina", 3, 12, 60), ex("Extensión de tríceps en polea", 3, 12, 60),
              ]),
              routine("Espalda y bíceps", "Espalda", [3], [
                ex("Jalón al pecho", 4, 10), ex("Remo con barra", 3, 8, 120),
                ex("Remo sentado en polea", 3, 12), ex("Curl con barra", 3, 10, 60),
              ]),
              routine("Piernas", "Piernas", [5], [
                ex("Sentadilla", 4, 8, 150), ex("Prensa", 3, 12, 120),
                ex("Peso muerto rumano", 3, 10, 120), ex("Gemelos de pie", 4, 15, 60),
              ]),
            );
          }),
      };
    }),
    {
      name: "routines-v2",
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: s => ({ routines: s.routines }),
    },
  ),
);
