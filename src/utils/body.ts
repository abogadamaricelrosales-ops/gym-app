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

/** Objetivos de un físico atlético con buena masa muscular (FFMI y % de grasa). */
export const ATHLETIC = {
  hombre: { ffmi: 22, ffmiMin: 21, ffmiMax: 23.5, bf: 0.12, bfMin: 0.10, bfMax: 0.15, natCeil: 25 },
  mujer: { ffmi: 17.5, ffmiMin: 16.5, ffmiMax: 19, bf: 0.22, bfMin: 0.20, bfMax: 0.25, natCeil: 21 },
} as const;

/**
 * % de grasa estimado por fórmula de Deurenberg (IMC, edad y sexo) si no lo cargaste.
 * Ojo: en personas muy musculosas sobreestima la grasa.
 */
export function estimateBodyFat(kg: number, cm: number, age: number | null, sex: Sex): number {
  const v = 1.2 * bmi(kg, cm) + 0.23 * (age ?? 30) - 10.8 * (sex === "hombre" ? 1 : 0) - 5.4;
  return Math.min(50, Math.max(sex === "hombre" ? 6 : 12, v)) / 100;
}

/**
 * Peso ideal con buena masa muscular: masa magra para un FFMI atlético dividida por
 * (1 − % de grasa objetivo). Ej.: hombre de 1,94 m → ~94 kg en vez de los ~85 kg del IMC.
 */
export function idealWeight(heightCm: number, sex: Sex, age: number | null = null, leanNow = 0) {
  const a = ATHLETIC[sex];
  const h2 = (heightCm / 100) ** 2;
  const bfAdj = (age ?? 30) >= 40 ? 0.02 : 0; // después de los 40 un poco más de grasa es saludable
  const lean = Math.max(a.ffmi * h2, Math.min(leanNow, a.ffmiMax * h2));
  return {
    ref: lean / (1 - a.bf - bfAdj),
    min: (a.ffmiMin * h2) / (1 - a.bfMin - bfAdj),
    max: (a.ffmiMax * h2) / (1 - a.bfMax - bfAdj),
    lean, bf: a.bf + bfAdj,
  };
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

export interface Phase {
  kind: "definir" | "volumen" | "mantener";
  weeks: number;
  from: number;
  to: number;
  kcal: number;
  ratePerWeek: number; // kg/semana (negativo = bajar)
}

export interface Strategy {
  sex: Sex;
  weight: number;
  bf: number;
  bfEstimated: boolean;
  lean: number;
  fat: number;
  ffmi: number;
  target: { weight: number; min: number; max: number; lean: number; fat: number; bf: number };
  phases: Phase[];
  totalWeeks: number;
  maintenance: number;
  macros: { kcal: number; protein: number; carbs: number; fat: number };
  steps: string;
  cardio: string;
  tips: string[];
  /** proyección semana a semana para el gráfico */
  series: { week: number; kg: number; phase: Phase["kind"] }[];
}

const dayFactor = (d: number) => (d <= 2 ? 0.85 : d <= 4 ? 1 : 1.1);

/**
 * Estrategia según tus datos. Ritmos tomados de la evidencia:
 * - Perder 0,5–1 % del peso por semana preserva músculo (Helms y col.). Las mujeres
 *   bajan más lento en kg y con más fluctuación (ciclo, retención de líquidos): usamos 0,5 %
 *   vs 0,7 % en hombres.
 * - Ganancia de músculo natural: ~0,5–1 kg/mes en hombres y aprox. la mitad en mujeres.
 * - Proteína 1,6–2,2 g/kg (Morton 2018), más alta en déficit.
 */
export function buildStrategy(body: Body & { bodyFat?: number | null }, goal: Goal, daysPerWeek: number): Strategy | null {
  const { weightKg: w, heightCm: h, age, sex } = body;
  if (!w || !h || !sex) return null;
  const days = Math.max(1, Math.min(7, daysPerWeek));
  const bfEstimated = !body.bodyFat;
  const bf = body.bodyFat ? body.bodyFat / 100 : estimateBodyFat(w, h, age, sex);
  const lean = w * (1 - bf);
  const h2 = (h / 100) ** 2;
  const ideal = idealWeight(h, sex, age, lean);
  const tLean = ideal.lean;
  const targetWeight = tLean / (1 - ideal.bf);
  const b = bmr(body)!;
  const maintenance = Math.round(b * Math.min(1.725, 1.2 + 0.075 * days));
  const women = sex === "mujer";
  const cutBoost = goal === "Quemar grasa" ? 1.1 : goal === "Cardio" ? 1.05 : 0.9;
  const gainBoost = goal === "Masa muscular" ? 1.1 : goal === "Hipertrofia" ? 1 : 0.7;

  const phases: Phase[] = [];
  let cur = w;
  let curLean = lean;
  // 1) Definición si sobra grasa (si además falta músculo, se tolera un poco más de grasa
  //    antes de definir: conviene ganar músculo primero)
  const needsMuscle = lean < tLean - 0.8;
  if (bf > ideal.bf + (needsMuscle ? 0.05 : 0.02)) {
    const goalW = curLean / (1 - ideal.bf);
    const pct = (women ? 0.005 : 0.007) * dayFactor(days) * cutBoost;
    const rate = pct * (cur + goalW) / 2;
    const weeks = Math.ceil((cur - goalW) / rate);
    const deficit = Math.round((rate * 7700) / 7);
    const kcal = Math.max(Math.round(b * 1.05), women ? 1300 : 1600, maintenance - deficit);
    phases.push({ kind: "definir", weeks, from: cur, to: goalW, kcal, ratePerWeek: -rate });
    cur = goalW;
  }
  // 2) Volumen si falta músculo
  if (curLean < tLean - 0.8) {
    const leanPerWeek = ((women ? 0.35 : 0.75) / 4.3) * Math.min(1, dayFactor(days) * (days <= 2 ? 0.8 : 1)) * gainBoost;
    const weightPerWeek = leanPerWeek / 0.7; // ~70 % del peso ganado es magro con superávit leve
    const gainLean = tLean - curLean;
    const weeks = Math.ceil(gainLean / leanPerWeek);
    const to = cur + gainLean / 0.7;
    // si termina muy por encima de la meta, se cierra con una mini definición
    phases.push({ kind: "volumen", weeks, from: cur, to, kcal: maintenance + (women ? 150 : 250), ratePerWeek: weightPerWeek });
    cur = to;
    curLean = tLean;
    if (cur > targetWeight + 1.5) {
      const rate = (women ? 0.005 : 0.007) * cur;
      const weeks2 = Math.ceil((cur - targetWeight) / rate);
      phases.push({ kind: "definir", weeks: weeks2, from: cur, to: targetWeight, kcal: maintenance - Math.round((rate * 7700) / 7), ratePerWeek: -rate });
      cur = targetWeight;
    }
  }
  if (!phases.length) phases.push({ kind: "mantener", weeks: 0, from: w, to: w, kcal: maintenance, ratePerWeek: 0 });

  const first = phases[0];
  const protein = Math.round(w * (first.kind === "definir" ? 2.2 : 1.8));
  const fatG = Math.round(w * (women ? 0.9 : 0.8));
  const carbs = Math.max(50, Math.round((first.kcal - protein * 4 - fatG * 9) / 4));

  const series: Strategy["series"] = [{ week: 0, kg: w, phase: first.kind }];
  let wk = 0;
  phases.forEach(p => {
    for (let i = 1; i <= p.weeks; i++) {
      wk++;
      const kg = p.from + ((p.to - p.from) * i) / p.weeks;
      series.push({ week: wk, kg, phase: p.kind });
    }
  });

  const tips: string[] = [];
  if (first.kind === "definir") {
    tips.push("Comé en un déficit moderado: si bajás más rápido de lo indicado, perdés músculo.");
    tips.push("Seguí entrenando pesado con pesas: es la señal para conservar el músculo mientras bajás grasa.");
    tips.push("Proteína en cada comida (unos 30–40 g) y muchas verduras para tener saciedad.");
  } else if (first.kind === "volumen") {
    tips.push("Superávit chico: subir más de lo indicado por semana es casi todo grasa.");
    tips.push("Sobrecarga progresiva: intentá sumar una repetición o un poco de peso cada semana.");
    tips.push("10–20 series semanales por grupo muscular, repartidas en 2 días.");
  } else {
    tips.push("Ya estás en tu rango: mantené las calorías y buscá recomposición (más fuerza, misma balanza).");
    tips.push("Sobrecarga progresiva y proteína alta para seguir mejorando la forma.");
  }
  tips.push("Dormí 7–9 horas: con poco sueño se pierde más músculo y da más hambre.");
  if (women) tips.push("En mujeres el peso fluctúa 1–2 kg con el ciclo menstrual: compará la misma fase del ciclo, medí cintura y sacate fotos, no solo la balanza.");
  else tips.push("Pesate 3–4 veces por semana en ayunas y mirá el promedio semanal, no un día suelto.");
  if (bfEstimated) tips.push("Tu % de grasa es estimado. Si lo medís (bioimpedancia o pliegues) y lo cargás en Perfil, el cálculo mejora.");

  return {
    sex, weight: w, bf, bfEstimated, lean, fat: w - lean, ffmi: lean / h2,
    target: { weight: targetWeight, min: ideal.min, max: ideal.max, lean: tLean, fat: targetWeight - tLean, bf: ideal.bf },
    phases, totalWeeks: wk, maintenance,
    macros: { kcal: first.kcal, protein, carbs, fat: fatG },
    steps: first.kind === "definir" ? "8.000–10.000 pasos por día" : "6.000–8.000 pasos por día",
    cardio: first.kind === "definir" ? "2–3 sesiones de 20–30 min de cardio moderado" : "1–2 sesiones cortas de cardio para la salud",
    tips, series,
  };
}
