export type ID = string;

export interface ExerciseTemplate {
  id: ID;
  name: string;
  exerciseKey?: string;  // clave de la guía visual (exerciseVisuals.json)
  muscleGroup?: string;  // "Pecho", "Cuádriceps"... (ver EXERCISE_GROUP_MAP)
  targetSets: number;
  targetReps: string;    // "8-12"
  restSeconds: number;
  notes?: string;
}

export interface RoutineDay {
  id: ID;
  name: string;
  exercises: ExerciseTemplate[];
}

export interface Routine {
  id: ID;
  name: string;
  sourceTemplateId?: string;
  days: RoutineDay[];
  createdAt: number;
  updatedAt: number;
}
