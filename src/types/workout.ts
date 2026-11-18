import type { ID, Category } from "./routine";

export interface LoggedSet {
  id: ID;
  reps: number;
  weight: number;
  completed: boolean;
  completedAt?: number;
}

export interface WorkoutExercise {
  id: ID;
  name: string;
  targetReps: number;
  restSeconds: number;
  sets: LoggedSet[];
}

export interface Workout {
  id: ID;
  routineId?: ID;
  name: string;
  category?: Category;
  startedAt: number;
  finishedAt?: number;
  currentExercise: number; // índice del ejercicio en pantalla
  exercises: WorkoutExercise[];
}

export interface RestTimer {
  endsAt: number;
  durationSec: number;
  notificationId?: string;
}
