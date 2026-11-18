import type { Goal, Routine } from "../types/routine";
import type { Sex } from "../store/useSettingsStore";

export interface Body {
  weightKg: number | null;
  heightCm: number | null;
  age: number | null;
  sex: Sex | null;
}

export const bmi = (kg: number, cm: number) => kg / (cm / 100) ** 2;

export const bmiLabel = (v: number) =>
  v < 18.5 ? "Bajo peso" : v < 25 ? "Saludable" : v < 30 ? "Sobrepeso" : "Obesidad";

/** Metabolismo basal (Mifflin-St Jeor). Sin sexo cargado usa el promedio de ambas fórmulas. */
export function bmr({ weightKg, heightCm, age, sex }: Body): number | null {
  if (!weightKg || !heightCm) return null;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * (age ?? 30);
  return base + (sex === "hombre" ? 5 : sex === "mujer" ? -161 : -78);
}

/**
 * Calorías de una actividad. Con estatura usa el MET corregido por tu metabolismo basal
 * (más preciso); si no, la fórmula clásica MET × kg × horas.
 */
export function kcalFor(met: number, minutes: number, body: Body): number | null {
  const b = bmr(body);
  if (b) return Math.round(met * (b / 1440) * minutes);
  if (body.weightKg) return Math.round(met * body.weightKg * (minutes / 60));
  return null;
}

export const METS: Record<Goal, number> = { "Masa muscular": 5, Hipertrofia: 5, "Quemar grasa": 6.5, Cardio: 8 };

/** Rango saludable (IMC 18,5–24,9) y peso de referencia (promedio Devine / Robinson). */
export function idealWeight(heightCm: number, sex: Sex | null) {
  const m2 = (heightCm / 100) ** 2;
  const min = 18.5 * m2;
  const max = 24.9 * m2;
  const inches = Math.max(0, heightCm / 2.54 - 60);
  const devine = (sex === "mujer" ? 45.5 : sex === "hombre" ? 50 : 47.75) + 2.3 * inches;
  const robinson = (sex === "mujer" ? 49 : sex === "hombre" ? 52 : 50.5) + (sex === "mujer" ? 1.7 : sex === "hombre" ? 1.9 : 1.8) * inches;
  const ref = Math.min(max, Math.max(min, (devine + robinson) / 2));
  return { min, max, ref };
}

/** Objetivo dominante y días por semana según en qué días tenés asignada cada rutina. */
export function weeklyPlan(routines: Routine[]) {
  const days = new Map<number, Goal>();
  routines.forEach(r => r.weekdays.forEach(d => { if (!days.has(d)) days.set(d, r.goal); }));
  const count = new Map<Goal, number>();
  days.forEach(g => count.set(g, (count.get(g) ?? 0) + 1));
  let goal: Goal | null = null;
  count.forEach((n, g) => { if (!goal || n > (count.get(goal) ?? 0)) goal = g; });
  return { goal: goal as Goal | null, daysPerWeek: days.size };
}

export interface WeightPlan {
  target: number;
  direction: "bajar" | "subir" | "mantener";
  weeks: number | null;
  ratePerWeek: number;
  note: string;
}

const dayFactor = (d: number) => (d <= 2 ? 0.6 : d <= 4 ? 1 : 1.15);

/**
 * Cuánto tardarías en llegar a tu peso de referencia con el objetivo elegido.
 * Ritmos conservadores: perder 0,5–1 % del peso por semana; ganar 0,1–0,25 kg/semana
 * de masa magra (menos en mujeres). Supone alimentación acorde.
 */
export function weightPlan(body: Body, goal: Goal, daysPerWeek: number): WeightPlan | null {
  const { weightKg: w, heightCm: h, sex } = body;
  if (!w || !h) return null;
  const { min, max, ref } = idealWeight(h, sex);
  const days = Math.max(1, daysPerWeek);
  const losing = goal === "Quemar grasa" || goal === "Cardio";

  if (w > max || (losing && w > ref + 1)) {
    const target = losing ? ref : max;
    const pct = (goal === "Quemar grasa" ? 0.75 : 0.6) * dayFactor(days) / 100;
    const rate = pct * (w + target) / 2;
    return {
      target, direction: "bajar", ratePerWeek: rate, weeks: Math.ceil((w - target) / rate),
      note: losing ? "Con déficit calórico moderado y tu frecuencia actual." : "Este objetivo no prioriza bajar de peso: si querés llegar más rápido, sumá días de Quemar grasa o Cardio.",
    };
  }
  if (w < min || (!losing && w < ref - 1)) {
    const target = losing ? min : ref;
    const base = (sex === "mujer" ? 0.12 : 0.22) * (goal === "Masa muscular" ? 1.15 : 1);
    const rate = base * dayFactor(days);
    return {
      target, direction: "subir", ratePerWeek: rate, weeks: Math.ceil((target - w) / rate),
      note: losing ? "Estás por debajo del rango: conviene un objetivo de Hipertrofia o Masa muscular." : "Con superávit calórico leve y proteína suficiente.",
    };
  }
  return {
    target: w, direction: "mantener", ratePerWeek: 0, weeks: null,
    note: losing
      ? "Estás en tu rango: vas a bajar grasa y marcar más sin cambiar mucho el peso."
      : "Estás en tu rango: vas a ganar músculo y fuerza con cambios chicos en la balanza (recomposición).",
  };
}
