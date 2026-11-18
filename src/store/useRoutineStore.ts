import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Routine, ExerciseTemplate, ID, Category, Goal } from "../types/routine";
import { GOALS } from "../constants/exercises";
import { uid } from "../utils/id";

interface RoutineState {
  routines: Routine[];
  createRoutine: (name: string, category: Category, goal?: Goal) => ID;
  updateRoutine: (id: ID, patch: Partial<Pick<Routine, "name" | "category" | "weekdays">>) => void;
  /** Cambia el objetivo y aplica sus series, reps y descanso sugeridos a todos los ejercicios. */
  setGoal: (id: ID, goal: Goal) => void;
  toggleWeekday: (id: ID, day: number) => void;
  deleteRoutine: (id: ID) => void;
  /** Copia una rutina armada (p. ej. de un referente) a tus rutinas. */
  importRoutine: (r: Omit<Routine, "id" | "createdAt" | "updatedAt">) => ID;
  addExercise: (id: ID, name: string) => void;
  updateExercise: (id: ID, exId: ID, patch: Partial<ExerciseTemplate>) => void;
  removeExercise: (id: ID, exId: ID) => void;
  moveExercise: (id: ID, from: number, to: number) => void;
  seedExamples: () => void;
}

const ex = (name: string, targetSets = 3, targetReps = 10, restSeconds = 90): ExerciseTemplate =>
  ({ id: uid(), name, targetSets, targetReps, restSeconds });

const routine = (name: string, category: Category, goal: Goal, weekdays: number[], exercises: ExerciseTemplate[]): Routine => {
  const now = Date.now();
  return { id: uid(), name, category, goal, weekdays, exercises, createdAt: now, updatedAt: now };
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

        createRoutine: (name, category, goal = "Hipertrofia") => {
          const r = routine(name, category, goal, [], []);
          set(s => { s.routines.push(r); });
          return r.id;
        },
        updateRoutine: (id, patch) => edit(id, r => { Object.assign(r, patch); }),
        setGoal: (id, goal) =>
          edit(id, r => {
            r.goal = goal;
            const g = GOALS[goal];
            r.exercises.forEach(e => { e.targetSets = g.sets; e.targetReps = g.reps; e.restSeconds = g.rest; });
          }),
        toggleWeekday: (id, day) =>
          edit(id, r => {
            r.weekdays = r.weekdays.includes(day)
              ? r.weekdays.filter(d => d !== day)
              : [...r.weekdays, day].sort();
          }),
        importRoutine: data => {
          const r = routine(data.name, data.category, data.goal, data.weekdays, data.exercises.map(e => ({ ...e, id: uid() })));
          set(s => { s.routines.push(r); });
          return r.id;
        },
        deleteRoutine: id => set(s => { s.routines = s.routines.filter(r => r.id !== id); }),

        addExercise: (id, name) =>
          edit(id, r => {
            const g = GOALS[r.goal] ?? GOALS.Hipertrofia;
            r.exercises.push(ex(name, g.sets, g.reps, g.rest));
          }),
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
              routine("Pecho fuerte", "Pecho", "Masa muscular", [1], [
                ex("Press banca", 5, 5, 150), ex("Press inclinado con mancuernas", 4, 6, 120),
                ex("Fondos", 3, 8, 120),
              ]),
              routine("Espalda y bíceps", "Espalda", "Hipertrofia", [3], [
                ex("Jalón al pecho", 4, 10), ex("Remo con barra", 4, 10),
                ex("Remo sentado en polea", 3, 12), ex("Curl con barra", 3, 10, 60), ex("Curl martillo", 3, 12, 60),
              ]),
              routine("Piernas quema grasa", "Piernas", "Quemar grasa", [5], [
                ex("Sentadilla", 3, 15, 45), ex("Prensa", 3, 15, 45),
                ex("Peso muerto rumano", 3, 15, 45), ex("Gemelos de pie", 3, 20, 30),
              ]),
              routine("Hombros y tríceps", "Hombros", "Hipertrofia", [], [
                ex("Press militar", 4, 10), ex("Elevaciones laterales", 4, 12, 60),
                ex("Extensión de tríceps en polea", 3, 12, 60), ex("Press francés", 3, 10, 60),
              ]),
              routine("Circuito cardio", "Cardio", "Cardio", [], [
                ex("Bicicleta", 4, 20, 30), ex("Burpees", 4, 15, 30), ex("Remo ergómetro", 4, 20, 30),
              ]),
            );
          }),
      };
    }),
    {
      name: "routines-v2",
      version: 2,
      // v1 → v2: "Brazos" pasa a "Bíceps" y cada rutina recibe un objetivo
      migrate: (persisted: any, version) => {
        if (version < 2 && persisted?.routines) {
          persisted.routines = persisted.routines.map((r: any) => ({
            ...r,
            category: r.category === "Brazos" ? "Bíceps" : r.category,
            goal: r.goal ?? "Hipertrofia",
          }));
        }
        return persisted;
      },
      storage: createJSONStorage(() => AsyncStorage),
      partialize: s => ({ routines: s.routines }),
    },
  ),
);
