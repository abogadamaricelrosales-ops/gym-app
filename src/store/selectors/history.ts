import { useMemo } from "react";
import { useWorkoutStore } from "../useWorkoutStore";
import { exerciseSessions, overloadStatus } from "../../utils/progress";

export const useHistory = () => useWorkoutStore(s => s.history);

export const useWorkoutById = (id: string) =>
  useWorkoutStore(s => s.history.find(w => w.id === id));

export const useExerciseNames = () => {
  const history = useHistory();
  return useMemo(() => {
    const set = new Set<string>();
    history.forEach(w => w.exercises.forEach(e => set.add(e.name)));
    return [...set].sort((a, b) => a.localeCompare(b, "es"));
  }, [history]);
};

export const useExerciseProgress = (name: string) => {
  const history = useHistory();
  return useMemo(() => {
    const sessions = exerciseSessions(history, name);
    const pr = sessions.reduce((b, s) => (s.best1RM > (b?.best1RM ?? 0) ? s : b), sessions[0]);
    return { sessions, pr, status: overloadStatus(sessions) };
  }, [history, name]);
};
