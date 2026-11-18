import type { Workout, LoggedSet } from "../types/workout";

// 1RM estimado (Epley). Con 1 rep = el peso real.
export const estimate1RM = (w: number, r: number) =>
  r <= 0 ? 0 : r === 1 ? w : Math.round(w * (1 + r / 30) * 10) / 10;

export const setVolume = (s: LoggedSet) => s.weight * s.reps;
export const workoutVolume = (w: Workout) =>
  w.exercises.reduce((t, e) => t + e.sets.reduce((a, s) => a + setVolume(s), 0), 0);
export const workoutDurationMin = (w: Workout) =>
  w.finishedAt ? Math.round((w.finishedAt - w.startedAt) / 60000) : 0;

export interface ExerciseSession {
  date: number; workoutId: string;
  topWeight: number; topReps: number;
  best1RM: number; volume: number; sets: LoggedSet[];
}

// Una entrada por sesión, ordenada de más vieja a más nueva
export function exerciseSessions(history: Workout[], name: string): ExerciseSession[] {
  const out: ExerciseSession[] = [];
  for (const w of history) {
    const ex = w.exercises.find(e => e.name === name);
    if (!ex || ex.sets.length === 0) continue;
    const top = ex.sets.reduce((b, s) =>
      s.weight > b.weight || (s.weight === b.weight && s.reps > b.reps) ? s : b);
    out.push({
      date: w.startedAt, workoutId: w.id,
      topWeight: top.weight, topReps: top.reps,
      best1RM: Math.max(...ex.sets.map(s => estimate1RM(s.weight, s.reps))),
      volume: ex.sets.reduce((a, s) => a + setVolume(s), 0),
      sets: ex.sets,
    });
  }
  return out.sort((a, b) => a.date - b.date);
}

export type OverloadStatus = "subiendo" | "estancado" | "bajando" | "sin_datos";

// Compara las últimas 3 sesiones por 1RM estimado
export function overloadStatus(sessions: ExerciseSession[]): OverloadStatus {
  if (sessions.length < 2) return "sin_datos";
  const last = sessions.slice(-3).map(s => s.best1RM);
  const diff = last[last.length - 1] - last[0];
  const pct = diff / (last[0] || 1);
  if (pct > 0.01) return "subiendo";
  if (pct < -0.02) return "bajando";
  return "estancado";
}

// Sugerencia simple para la próxima sesión
export function nextTarget(s: ExerciseSession, repRange: string) {
  const [, max] = repRange.split("-").map(Number);
  if (max && s.topReps >= max) return { weight: s.topWeight + 2.5, reps: Number(repRange.split("-")[0]) };
  return { weight: s.topWeight, reps: s.topReps + 1 };
}

export const formatDate = (ts: number) =>
  new Date(ts).toLocaleDateString("es-AR", { weekday: "short", day: "numeric", month: "short" });
