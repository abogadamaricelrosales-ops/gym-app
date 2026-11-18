import type { Category, Goal } from "./routine";

export interface ReferentExercise {
  name: string;
  sets: number;
  reps: number;
  repRange: string;
  rest: number;
  notes?: string;
}

export interface ReferentDay {
  name: string;
  focus: string;
  category: Category;
  exercises: ReferentExercise[];
}

export interface Referent {
  id: string;
  name: string;
  gender: "male" | "female";
  knownFor: string;
  split: string;
  daysPerWeek: number;
  goal: Goal;
  confidence: "alta" | "media" | "baja";
  sources: string[];
  videos?: { title: string; url: string; covers: string }[];
  days: ReferentDay[];
}
