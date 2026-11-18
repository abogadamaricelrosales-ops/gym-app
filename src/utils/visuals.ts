import data from "../data/exerciseVisuals.json";
import type { ExerciseVisual } from "../types/visual";

type Entry = { displayName: string; aliases: string[]; visual?: ExerciseVisual };
const DB = data.exercises as unknown as Record<string, Entry>;
const byAlias = new Map<string, string>();
Object.entries(DB).forEach(([k, e]) => e.aliases.forEach(a => byAlias.set(a.toLowerCase(), k)));

export function getExerciseVisual(name: string, exerciseKey?: string) {
  const key = exerciseKey && DB[exerciseKey] ? exerciseKey : byAlias.get(name.toLowerCase());
  return key && DB[key] ? { key, ...DB[key] } : null;
}
