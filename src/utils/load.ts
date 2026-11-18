import type { Activity } from "../types/activity";
import { ACTIVITY_INFO } from "../types/activity";
import type { Workout } from "../types/workout";
import type { Category, Goal } from "../types/routine";
import { workoutDurationMin } from "./progress";

/**
 * Carga de entrenamiento = minutos × esfuerzo percibido (método sRPE de Foster).
 * Se compara la carga de los últimos 7 días contra el promedio semanal de las últimas 4
 * (ratio agudo:crónico) y la fatiga reciente (48 h) del grupo muscular del entreno de hoy.
 */
const GOAL_RPE: Record<Goal, number> = { "Masa muscular": 8, Hipertrofia: 7, "Quemar grasa": 7, Cardio: 6 };
const DAY = 86_400_000;

export interface Session { at: number; load: number; regions: Category[]; label: string }

export function sessions(history: Workout[], activities: Activity[]): Session[] {
  const fromGym = history.map(w => ({
    at: w.startedAt,
    load: workoutDurationMin(w) * GOAL_RPE[w.goal ?? "Hipertrofia"],
    regions: w.category ? [w.category] : (["Full body"] as Category[]),
    label: w.name,
  }));
  const extra = activities.map(a => ({ at: a.at, load: a.minutes * a.rpe, regions: ACTIVITY_INFO[a.kind].regions, label: a.kind }));
  return [...fromGym, ...extra];
}

export type LoadLevel = "ok" | "alto" | "muy alto";

export interface Adjustment {
  setsFactor: number;
  weightFactor: number;
  label: string;
}

export interface LoadAnalysis {
  level: LoadLevel;
  acute: number;
  chronic: number;
  ratio: number | null;
  regionFatigue: number;
  reasons: string[];
  advice: string;
  adjustment: Adjustment | null;
}

const overlaps = (regions: Category[], target: Category) =>
  regions.includes(target) ||
  regions.includes("Full body") ||
  target === "Full body" ||
  // las piernas y el cardio se cansan juntos
  (target === "Cardio" && regions.includes("Piernas")) ||
  (target === "Piernas" && regions.includes("Cardio"));

export function analyzeLoad(all: Session[], today: Category | null, now = Date.now()): LoadAnalysis {
  const acute = all.filter(s => s.at > now - 7 * DAY && s.at <= now).reduce((t, s) => t + s.load, 0);
  const chronic = all.filter(s => s.at > now - 28 * DAY && s.at <= now).reduce((t, s) => t + s.load, 0) / 4;
  const ratio = chronic >= 300 ? acute / chronic : null;

  // fatiga del grupo de hoy: 100 % lo de las últimas 24 h, 50 % lo de 24–48 h
  let regionFatigue = 0;
  const recent: string[] = [];
  if (today) {
    all.filter(s => s.at > now - 2 * DAY && overlaps(s.regions, today)).forEach(s => {
      regionFatigue += s.load * (s.at > now - DAY ? 1 : 0.5);
      recent.push(s.label);
    });
  }

  const reasons: string[] = [];
  let score = 0;
  if (ratio != null && ratio > 1.5) { score = 2; reasons.push(`Esta semana cargaste ${Math.round((ratio - 1) * 100)} % más que tu promedio.`); }
  else if (ratio != null && ratio > 1.3) { score = 1; reasons.push(`Esta semana vas ${Math.round((ratio - 1) * 100)} % arriba de tu promedio.`); }
  else if (ratio == null && acute > 2500) { score = 2; reasons.push("Mucha carga acumulada en los últimos 7 días."); }
  else if (ratio == null && acute > 1800) { score = 1; reasons.push("Bastante carga en los últimos 7 días."); }

  if (today && regionFatigue >= 500) { score = 2; reasons.push(`${unique(recent)} en las últimas 48 h cansó lo mismo que entrenás hoy (${today}).`); }
  else if (today && regionFatigue >= 280) { score = Math.max(score, 1); reasons.push(`${unique(recent)} en las últimas 48 h ya trabajó ${today.toLowerCase()}.`); }

  const level: LoadLevel = score === 2 ? "muy alto" : score === 1 ? "alto" : "ok";
  const adjustment: Adjustment | null =
    level === "muy alto" ? { setsFactor: 0.6, weightFactor: 0.85, label: "Descarga: −40 % series y −15 % peso" }
    : level === "alto" ? { setsFactor: 0.75, weightFactor: 0.95, label: "Liviano: −25 % series y −5 % peso" }
    : null;
  const advice =
    level === "muy alto" ? "Hacé una versión de descarga o cambiá por otro grupo muscular. Si sentís mucho cansancio, descansá."
    : level === "alto" ? "Podés entrenar, pero conviene bajar un poco el volumen hoy."
    : "Tu carga está en orden: entrená normal.";
  return { level, acute, chronic, ratio, regionFatigue, reasons, advice, adjustment };
}

const unique = (xs: string[]) => [...new Set(xs)].join(", ");
