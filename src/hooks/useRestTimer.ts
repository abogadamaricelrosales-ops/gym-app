import { useEffect, useState } from "react";
import { AppState } from "react-native";
import { useWorkoutStore } from "../store/useWorkoutStore";

export function useRestTimer() {
  const timer = useWorkoutStore(s => s.timer);
  const skipRest = useWorkoutStore(s => s.skipRest);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!timer) return;
    const iv = setInterval(() => setNow(Date.now()), 250);
    // al volver de background recalcula al instante
    const sub = AppState.addEventListener("change", st => st === "active" && setNow(Date.now()));
    return () => { clearInterval(iv); sub.remove(); };
  }, [timer]);

  const remaining = timer ? Math.max(0, Math.ceil((timer.endsAt - now) / 1000)) : 0;
  useEffect(() => { if (timer && remaining === 0) skipRest(); }, [remaining, timer]);

  const progress = timer ? 1 - remaining / timer.durationSec : 0;
  const label = `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`;
  return { active: !!timer, remaining, progress, label };
}
