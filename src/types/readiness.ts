export type MuscleGroup = "piernas" | "core" | "pecho" | "espalda" | "hombros" | "brazos";
export type ActivityType = "futbol" | "padel" | "running" | "trabajo_fisico" | "ciclismo" | "natacion";
export type MuscleFatigue = Record<MuscleGroup, number>; // 0-100

export interface LoadEvent {
  id: string; date: number;
  source: "extra" | "gym";
  activity?: ActivityType;   // si es extra
  workoutId?: string;        // si viene del gym
  durationMin: number; rpe: number;
  sRPE: number;              // durationMin × rpe
  distribution: Partial<Record<MuscleGroup, number>>; // suma 1
}

export const MUSCLE_GROUPS: MuscleGroup[] = ["piernas", "core", "pecho", "espalda", "hombros", "brazos"];
export const UPPER: MuscleGroup[] = ["pecho", "espalda", "hombros", "brazos"];
export const LOWER: MuscleGroup[] = ["piernas"];
