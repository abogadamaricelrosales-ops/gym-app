import type { Category, Goal } from "../types/routine";
import type { IconName } from "../components/ui/Icon";
import { CATALOG } from "../data/exerciseGuide";

export const CATEGORIES: Category[] = ["Pecho", "Espalda", "Piernas", "Bíceps", "Tríceps", "Hombros", "Full body", "Cardio"];

/** Ejercicios para agregar con un toque en el editor (con guía de técnica). */
export const EXERCISE_CATALOG = CATALOG;

export const WEEKDAYS_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

/** Valores sugeridos por objetivo. Al cambiar el objetivo se aplican a los ejercicios. */
export const GOALS: Record<Goal, {
  icon: IconName; short: string; description: string; sets: number; reps: number; rest: number;
}> = {
  "Masa muscular": {
    icon: "barbell", short: "Fuerza", sets: 5, reps: 5, rest: 150,
    description: "Pocas reps con mucho peso y descansos largos para ganar fuerza y masa.",
  },
  Hipertrofia: {
    icon: "body", short: "Volumen", sets: 4, reps: 10, rest: 90,
    description: "Rango medio de reps para hacer crecer el músculo.",
  },
  "Quemar grasa": {
    icon: "flame", short: "Definición", sets: 3, reps: 15, rest: 45,
    description: "Muchas reps y poco descanso para gastar más calorías.",
  },
  Cardio: {
    icon: "heart", short: "Resistencia", sets: 4, reps: 20, rest: 30,
    description: "Circuitos rápidos para mejorar tu resistencia cardiovascular.",
  },
};

export const GOAL_LIST = Object.keys(GOALS) as Goal[];
