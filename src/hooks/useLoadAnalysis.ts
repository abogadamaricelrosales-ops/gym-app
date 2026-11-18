import { useMemo } from "react";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { useActivityStore } from "../store/useActivityStore";
import { analyzeLoad, sessions } from "../utils/load";
import type { Category } from "../types/routine";

/** Análisis de sobrecarga para el grupo muscular del entreno que vas a hacer hoy. */
export function useLoadAnalysis(category: Category | null) {
  const history = useWorkoutStore(s => s.history);
  const activities = useActivityStore(s => s.activities);
  return useMemo(() => analyzeLoad(sessions(history, activities), category), [history, activities, category]);
}
