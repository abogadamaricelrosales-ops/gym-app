import type { Routine, Category } from "../types/routine";
import type { IconName } from "../components/ui/Icon";

/** Duración estimada: ~40 s por serie + descanso entre series. */
export const estimateMinutes = (r: Routine) =>
  Math.max(5, Math.round(r.exercises.reduce((t, e) => t + e.targetSets * (40 + e.restSeconds), 0) / 60));

export const totalSets = (r: Routine) => r.exercises.reduce((t, e) => t + e.targetSets, 0);

export const CATEGORY_ICON: Record<Category, IconName> = {
  Pecho: "barbell-outline",
  Espalda: "body-outline",
  Piernas: "walk-outline",
  Hombros: "fitness-outline",
  Brazos: "hand-left-outline",
  "Full body": "flash-outline",
  Cardio: "heart-outline",
};

export const fmtClock = (sec: number) => {
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  const mm = String(m).padStart(2, "0"), ss = String(s).padStart(2, "0");
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

export const fmtKg = (n: number) => `${Math.round(n).toLocaleString("es-AR")} kg`;

export const fmtDay = (ts: number) =>
  new Date(ts).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "short" });
