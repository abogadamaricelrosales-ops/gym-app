import type { Category, Goal } from "../types/routine";

export interface HomeExercise { name: string; sets: number; reps: number; unit?: "reps" | "seg"; rest: number }
export interface HomeWorkout {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  goal: Goal;
  level: "Principiante" | "Intermedio" | "Avanzado";
  icon: "body" | "flame" | "barbell" | "flash" | "fitness";
  exercises: HomeExercise[];
}

/** Rutinas sin equipo, solo con tu peso, para no cortar la racha los días sin gimnasio. */
export const HOME_WORKOUTS: HomeWorkout[] = [
  {
    id: "casa-full", name: "Full body sin equipo", subtitle: "Todo el cuerpo en ~30 min", category: "Full body", goal: "Hipertrofia", level: "Principiante", icon: "body",
    exercises: [
      { name: "Flexiones", sets: 4, reps: 12, rest: 60 },
      { name: "Sentadilla sin peso", sets: 4, reps: 20, rest: 60 },
      { name: "Zancadas alternadas", sets: 3, reps: 12, rest: 60 },
      { name: "Fondos en silla", sets: 3, reps: 12, rest: 60 },
      { name: "Puente de glúteo", sets: 3, reps: 15, rest: 45 },
      { name: "Superman", sets: 3, reps: 15, rest: 45 },
      { name: "Plancha", sets: 3, reps: 40, unit: "seg", rest: 45 },
    ],
  },
  {
    id: "casa-abs", name: "Abs y zona media intensa", subtitle: "Core de acero en ~20 min", category: "Full body", goal: "Quemar grasa", level: "Intermedio", icon: "flame",
    exercises: [
      { name: "Abdominales crunch", sets: 4, reps: 20, rest: 30 },
      { name: "Elevaciones de piernas", sets: 4, reps: 15, rest: 30 },
      { name: "Bicicleta abdominal", sets: 3, reps: 30, rest: 30 },
      { name: "Russian twist", sets: 3, reps: 30, rest: 30 },
      { name: "Plancha lateral", sets: 3, reps: 30, unit: "seg", rest: 20 },
      { name: "Mountain climbers", sets: 3, reps: 30, rest: 30 },
      { name: "Hollow hold", sets: 3, reps: 30, unit: "seg", rest: 30 },
      { name: "Plancha", sets: 3, reps: 60, unit: "seg", rest: 30 },
    ],
  },
  {
    id: "casa-piernas", name: "Piernas y glúteos en casa", subtitle: "Quemá las piernas sin pesas", category: "Piernas", goal: "Hipertrofia", level: "Intermedio", icon: "fitness",
    exercises: [
      { name: "Sentadilla sin peso", sets: 4, reps: 25, rest: 45 },
      { name: "Sentadilla búlgara", sets: 3, reps: 12, rest: 60 },
      { name: "Puente de glúteo a una pierna", sets: 3, reps: 12, rest: 45 },
      { name: "Zancadas alternadas", sets: 3, reps: 16, rest: 45 },
      { name: "Sentadilla isométrica en pared", sets: 3, reps: 45, unit: "seg", rest: 45 },
      { name: "Sentadilla con salto", sets: 3, reps: 12, rest: 60 },
      { name: "Gemelos en escalón", sets: 4, reps: 20, rest: 30 },
    ],
  },
  {
    id: "casa-superior", name: "Tren superior en casa", subtitle: "Pecho, hombros, tríceps y espalda", category: "Pecho", goal: "Hipertrofia", level: "Intermedio", icon: "barbell",
    exercises: [
      { name: "Flexiones", sets: 4, reps: 15, rest: 60 },
      { name: "Flexiones diamante", sets: 3, reps: 10, rest: 60 },
      { name: "Flexiones pica", sets: 3, reps: 10, rest: 60 },
      { name: "Fondos en silla", sets: 4, reps: 12, rest: 60 },
      { name: "Superman", sets: 3, reps: 15, rest: 45 },
      { name: "Plancha con toque de hombros", sets: 3, reps: 20, rest: 45 },
    ],
  },
  {
    id: "casa-hiit", name: "HIIT quema grasa", subtitle: "20 minutos al máximo", category: "Cardio", goal: "Cardio", level: "Avanzado", icon: "flash",
    exercises: [
      { name: "Jumping jacks", sets: 4, reps: 40, rest: 20 },
      { name: "Burpees", sets: 4, reps: 12, rest: 30 },
      { name: "Mountain climbers", sets: 4, reps: 30, rest: 20 },
      { name: "Sentadilla con salto", sets: 4, reps: 15, rest: 30 },
      { name: "Rodillas al pecho", sets: 4, reps: 30, unit: "seg", rest: 20 },
    ],
  },
];
