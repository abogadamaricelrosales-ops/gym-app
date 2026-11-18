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

/** Mejor peso levantado por ejercicio (récords personales), del más pesado al más liviano. */
export function personalRecords(history: Workout[]) {
  const best = new Map<string, { weight: number; reps: number; date: number }>();
  for (const w of history)
    for (const e of w.exercises)
      for (const st of e.sets) {
        const b = best.get(e.name);
        if (!b || st.weight > b.weight || (st.weight === b.weight && st.reps > b.reps))
          best.set(e.name, { weight: st.weight, reps: st.reps, date: w.startedAt });
      }
  return [...best.entries()].map(([name, v]) => ({ name, ...v })).sort((a, b) => b.weight - a.weight);
}

export const formatDate = (ts: number) =>
  new Date(ts).toLocaleDateString("es-AR", { weekday: "short", day: "numeric", month: "short" });
