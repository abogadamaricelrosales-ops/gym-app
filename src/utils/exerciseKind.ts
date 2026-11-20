/**
 * Tipo de ejercicio según su nombre:
 * - "time": se mide en segundos (plancha, isométricos, máquinas de cardio, o los que terminan en "(seg)").
 * - "reps": repeticiones con peso (o con tu propio peso).
 */
export type ExerciseKind = "reps" | "time";

const TIME_NAMES = [
  "plancha", "plancha lateral", "hollow hold", "sentadilla isométrica en pared",
  "cinta", "bicicleta", "remo ergómetro", "elíptica", "escaladora", "saltar la soga",
];

export const exerciseKind = (name: string): ExerciseKind => {
  const n = name.trim().toLowerCase();
  if (n.endsWith("(seg)") || n.includes("isométric")) return "time";
  return TIME_NAMES.includes(n) ? "time" : "reps";
};

/** 75 → "1:15", 40 → "0:40" */
export const fmtSecs = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

/** Número con coma decimal (22.5 → "22,5"). */
export const fmtNum = (n: number) => String(n).replace(".", ",");
