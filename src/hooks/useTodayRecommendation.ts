import { useEffect, useMemo } from "react";
import { AppState } from "react-native";
import { useRoutineStore } from "../store/useRoutineStore";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { useReadinessStore } from "../store/useReadinessStore";
import { getRecommendedWorkout } from "../services/recommender";

export function useTodayRecommendation() {
  const routines = useRoutineStore(s => s.routines);
  const activeRoutineId = useRoutineStore(s => s.activeRoutineId);
  const history = useWorkoutStore(s => s.history);
  const fatigue = useReadinessStore(s => s.muscleFatigue);
  const refresh = useReadinessStore(s => s.refreshFatigue);

  // la fatiga decae con el tiempo: recalcular al abrir y al volver a primer plano
  useEffect(() => {
    refresh();
    const sub = AppState.addEventListener("change", st => { if (st === "active") refresh(); });
    return () => sub.remove();
  }, [refresh]);

  const routine = routines.find(r => r.id === activeRoutineId) ?? routines[0];
  return useMemo(
    () => getRecommendedWorkout({ routine, history, fatigue }),
    [routine, history, fatigue],
  );
}
