import type { ID, Category, Goal } from "./routine";

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
  goal?: Goal;
  startedAt: number;
  finishedAt?: number;
  currentExercise: number; // índice del ejercicio en pantalla
  /** Ajuste aplicado por sobrecarga, si hubo */
  adjustment?: string;
  exercises: WorkoutExercise[];
}

export interface RestTimer {
  endsAt: number;
  durationSec: number;
  notificationId?: string;
}
