import type { ID } from "./routine";

export interface LoggedSet {
  id: ID;
  reps: number;
  weight: number;
  rpe?: number;
  completed: boolean;
  completedAt?: number;
}

export interface WorkoutExercise {
  id: ID;
  templateId?: ID;
  name: string;
  exerciseKey?: string;
  muscleGroup?: string;
  restSeconds: number;
  targetReps: string;
  sets: LoggedSet[];
}

export interface Workout {
  id: ID;
  routineId?: ID;
  dayId?: ID;
  dayName: string;
  startedAt: number;
  finishedAt?: number;
  sessionRpe?: number;
  exercises: WorkoutExercise[];
}

export interface RestTimer {
  endsAt: number;
  durationSec: number;
  exerciseId: ID;
  notificationId?: string;
}
