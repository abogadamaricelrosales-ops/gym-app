export type ID = string;

export type Category = "Pecho" | "Espalda" | "Piernas" | "Bíceps" | "Tríceps" | "Hombros" | "Full body" | "Cardio";

/** Objetivo de la rutina: define series, reps y descanso sugeridos. */
export type Goal = "Masa muscular" | "Hipertrofia" | "Quemar grasa" | "Cardio";

export interface ExerciseTemplate {
  id: ID;
  name: string;
  targetSets: number;
  targetReps: number;   // reps objetivo por serie
  restSeconds: number;
}

/** Una rutina = un entrenamiento (ej. "Pecho y tríceps") que se puede asignar a días de la semana. */
export interface Routine {
  id: ID;
  name: string;
  category: Category;
  goal: Goal;
  weekdays: number[];   // 0 = domingo ... 6 = sábado
  exercises: ExerciseTemplate[];
  createdAt: number;
  updatedAt: number;
}
