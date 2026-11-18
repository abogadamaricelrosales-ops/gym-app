import type { LoadEvent, MuscleFatigue } from "../types/readiness";
import { MUSCLE_GROUPS } from "../types/readiness";
import { READINESS_CONFIG as C } from "../constants/activities";

const emptyFatigue = (): MuscleFatigue =>
  Object.fromEntries(MUSCLE_GROUPS.map(g => [g, 0])) as MuscleFatigue;

// Decaimiento exponencial: carga × 0.5^(horas / vidaMedia)
export function computeMuscleFatigue(events: LoadEvent[], now = Date.now()): MuscleFatigue {
  const f = emptyFatigue();
  const cutoff = now - C.lookbackDays * 86_400_000;
  for (const e of events) {
    if (e.date < cutoff || e.date > now) continue;
    const hours = (now - e.date) / 3_600_000;
    const decay = Math.pow(0.5, hours / C.halfLifeHours);
    const load = e.sRPE * C.sRPEtoFatigue * decay;
    for (const [g, pct] of Object.entries(e.distribution)) {
      f[g as keyof MuscleFatigue] += load * (pct ?? 0);
    }
  }
  for (const g of MUSCLE_GROUPS) f[g] = Math.min(100, Math.round(f[g]));
  return f;
}

export const avg = (f: MuscleFatigue, groups: (keyof MuscleFatigue)[]) =>
  groups.reduce((a, g) => a + f[g], 0) / groups.length;
