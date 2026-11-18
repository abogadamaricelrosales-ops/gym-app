import type { ActivityType, MuscleGroup } from "../types/readiness";

export const ACTIVITIES: Record<ActivityType, {
  label: string; met: number; distribution: Partial<Record<MuscleGroup, number>>;
}> = {
  futbol:         { label: "Fútbol",         met: 7.0, distribution: { piernas: 0.8, core: 0.2 } },
  padel:          { label: "Pádel",          met: 6.0, distribution: { piernas: 0.5, hombros: 0.25, brazos: 0.1, core: 0.15 } },
  running:        { label: "Running",        met: 9.8, distribution: { piernas: 0.9, core: 0.1 } },
  trabajo_fisico: { label: "Trabajo físico", met: 4.5, distribution: { espalda: 0.35, piernas: 0.3, brazos: 0.2, core: 0.15 } },
  ciclismo:       { label: "Ciclismo",       met: 7.5, distribution: { piernas: 0.95, core: 0.05 } },
  natacion:       { label: "Natación",       met: 8.0, distribution: { espalda: 0.3, hombros: 0.3, brazos: 0.15, core: 0.1, piernas: 0.15 } },
};

// Para cargas del gym: muscleGroup del template → grupo de fatiga
export const EXERCISE_GROUP_MAP: Record<string, MuscleGroup> = {
  Pecho: "pecho", Hombro: "hombros", "Deltoide posterior": "hombros",
  Dorsal: "espalda", Espalda: "espalda", "Espalda media": "espalda", "Espalda baja": "espalda",
  Tríceps: "brazos", Bíceps: "brazos",
  Cuádriceps: "piernas", Isquios: "piernas", Glúteo: "piernas", "Glúteo medio": "piernas",
  Gemelos: "piernas", Piernas: "piernas", "Cadena posterior": "piernas", Core: "core",
  "Core / agarre": "core", "Full body": "piernas", Acondicionamiento: "piernas",
};

export const READINESS_CONFIG = {
  halfLifeHours: 36,     // la fatiga cae a la mitad cada 36 h
  sRPEtoFatigue: 0.15,   // 600 sRPE (90 min × RPE 7 de fútbol) ≈ 90 pts × % del grupo
  // 90 min de fútbol a RPE 7 deja las piernas en ~60 a las 12 h: con 55 el cambio de día se dispara
  lowerThreshold: 55,    // > 55 en piernas = no toca piernas pesado
  deloadThreshold: 40,   // 40-55 = piernas con deload
  upperThreshold: 60,
  deloadFactor: 0.8,     // -20% de series
  lookbackDays: 7,
};
