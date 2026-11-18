import { getTemplates } from "../data/templates";
import { EXERCISE_GROUP_MAP } from "../constants/activities";
import type { MuscleGroup } from "../types/readiness";

// Índice nombre de ejercicio → grupo muscular, sacado del catálogo profesional
const groupIndex = new Map<string, string>();
getTemplates().forEach(t =>
  t.days.forEach(d => d.exercises.forEach(e => groupIndex.set(e.name.toLowerCase(), e.muscleGroup)))
);

/** Grupo "de catálogo" (Pecho, Cuádriceps...) de un ejercicio. */
export const muscleGroupOf = (name: string, explicit?: string): string | undefined =>
  explicit || groupIndex.get(name.toLowerCase());

/** Grupo de fatiga (piernas, pecho...) de un ejercicio, o undefined si no se conoce. */
export const fatigueGroupOf = (name: string, explicit?: string): MuscleGroup | undefined =>
  EXERCISE_GROUP_MAP[muscleGroupOf(name, explicit) ?? ""];

/** Grupos que se ofrecen al crear un ejercicio a mano. */
export const EDITOR_MUSCLE_GROUPS = [
  "Pecho", "Espalda", "Hombro", "Bíceps", "Tríceps",
  "Cuádriceps", "Isquios", "Glúteo", "Gemelos", "Core",
];
