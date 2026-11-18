import type { Routine, RoutineDay } from "../types/routine";
import type { Workout } from "../types/workout";
import type { MuscleFatigue, MuscleGroup } from "../types/readiness";
import { UPPER, LOWER } from "../types/readiness";
import { READINESS_CONFIG as C } from "../constants/activities";
import { fatigueGroupOf } from "../utils/muscleGroups";
import { avg } from "../utils/fatigue";

export type RecommendationKind = "normal" | "deload" | "swap" | "rest";

export interface Recommendation {
  kind: RecommendationKind;
  routineId: string;
  day: RoutineDay;              // día listo para usar (puede venir con series reducidas)
  originalDayId: string;
  reason: string;
  fatigue: MuscleFatigue;
  readiness: number;            // 0-100, 100 = fresco
}

type DayFocus = "lower" | "upper" | "full";

// Clasifica cada día de la rutina por los grupos que trabaja
function dayFocus(day: RoutineDay): DayFocus {
  let lower = 0, upper = 0;
  for (const ex of day.exercises) {
    const g: MuscleGroup | undefined = fatigueGroupOf(ex.name, ex.muscleGroup);
    if (!g) {
      // fallback por nombre del día
      if (/leg|pierna|glúteo|cuádr/i.test(day.name)) lower += ex.targetSets; else upper += ex.targetSets;
      continue;
    }
    if (LOWER.includes(g)) lower += ex.targetSets;
    else if (UPPER.includes(g)) upper += ex.targetSets;
  }
  const t = lower + upper || 1;
  if (lower / t >= 0.6) return "lower";
  if (upper / t >= 0.6) return "upper";
  return "full";
}

// Siguiente día de la rotación: el que sigue al último que hiciste de esta rutina
function nextDayInRotation(routine: Routine, history: Workout[]): RoutineDay {
  const last = history.find(w => w.routineId === routine.id);
  if (!last) return routine.days[0];
  let idx = routine.days.findIndex(d => d.id === last.dayId);
  if (idx < 0) idx = routine.days.findIndex(d => last.dayName.startsWith(d.name));
  return routine.days[(idx + 1) % routine.days.length];
}

// De-load: -20% de series (mínimo 1). Copia nueva, no muta la rutina.
function applyDeload(day: RoutineDay): RoutineDay {
  return {
    id: day.id,
    name: `${day.name} (Deload)`,
    exercises: day.exercises.map(e => ({
      ...e,
      targetSets: Math.max(1, Math.round(e.targetSets * C.deloadFactor)),
      notes: [e.notes, "Deload: misma carga, menos series, RPE ≤ 7"].filter(Boolean).join(" · "),
    })),
  };
}

export function getRecommendedWorkout(params: {
  routine: Routine | undefined;
  history: Workout[];                 // más reciente primero
  fatigue: MuscleFatigue;
}): Recommendation | null {
  const { routine, history, fatigue } = params;
  if (!routine || routine.days.length === 0) return null;

  const lowerF = avg(fatigue, LOWER);
  const upperF = avg(fatigue, UPPER);
  const readiness = Math.round(100 - Math.max(lowerF, upperF, fatigue.core * 0.5));
  const planned = nextDayInRotation(routine, history);
  const focus = dayFocus(planned);
  const base = { routineId: routine.id, originalDayId: planned.id, fatigue, readiness };

  // 1. Todo el cuerpo muy cargado → descanso activo
  if (lowerF > C.lowerThreshold && upperF > C.upperThreshold) {
    return { ...base, kind: "rest", day: applyDeload(planned),
      reason: `Fatiga alta general (piernas ${Math.round(lowerF)}, tren superior ${Math.round(upperF)}). Hoy conviene descansar o hacer movilidad.` };
  }

  // 2. Toca piernas
  if (focus === "lower" || focus === "full") {
    if (lowerF > C.lowerThreshold) {
      // Buscar un día de tren superior en la rutina para cambiarlo
      const swap = routine.days.find(d => d.id !== planned.id && dayFocus(d) === "upper");
      if (swap) {
        return { ...base, kind: "swap", day: swap,
          reason: `Piernas con fatiga ${Math.round(lowerF)}/100 por tu actividad reciente. Cambio ${planned.name} por ${swap.name}.` };
      }
      return { ...base, kind: "deload", day: applyDeload(planned),
        reason: `Piernas con fatiga ${Math.round(lowerF)}/100 y no hay día de tren superior. Hacé ${planned.name} con -20% de series.` };
    }
    if (lowerF > C.deloadThreshold) {
      return { ...base, kind: "deload", day: applyDeload(planned),
        reason: `Piernas con fatiga moderada (${Math.round(lowerF)}/100). ${planned.name} con -20% de series.` };
    }
  }

  // 3. Toca tren superior pero está cargado
  if (focus === "upper" && upperF > C.upperThreshold) {
    const swap = routine.days.find(d => d.id !== planned.id && dayFocus(d) === "lower");
    if (swap && lowerF < C.deloadThreshold) {
      return { ...base, kind: "swap", day: swap,
        reason: `Tren superior cargado (${Math.round(upperF)}/100). Hoy toca ${swap.name}.` };
    }
    return { ...base, kind: "deload", day: applyDeload(planned),
      reason: `Tren superior cargado (${Math.round(upperF)}/100). ${planned.name} con -20% de series.` };
  }

  return { ...base, kind: "normal", day: planned,
    reason: `Estás recuperado (readiness ${readiness}). Toca ${planned.name} normal.` };
}
