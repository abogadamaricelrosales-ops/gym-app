import type { Category, Goal } from "../types/routine";
import type { IconName } from "../components/ui/Icon";

export const CATEGORIES: Category[] = ["Pecho", "Espalda", "Piernas", "Bíceps", "Tríceps", "Hombros", "Full body", "Cardio"];

/** Ejercicios comunes para agregar con un toque en el editor. */
export const EXERCISE_CATALOG: Record<Category, string[]> = {
  Pecho: ["Press banca", "Press inclinado con mancuernas", "Aperturas en máquina", "Fondos", "Cruce de poleas"],
  Espalda: ["Dominadas", "Jalón al pecho", "Remo con barra", "Remo sentado en polea", "Peso muerto"],
  Piernas: ["Sentadilla", "Prensa", "Peso muerto rumano", "Extensión de cuádriceps", "Curl femoral", "Hip thrust", "Gemelos de pie"],
  Hombros: ["Press militar", "Elevaciones laterales", "Face pull", "Pájaros"],
  Bíceps: ["Curl con barra", "Curl con mancuernas", "Curl martillo", "Curl predicador", "Curl en polea"],
  Tríceps: ["Extensión de tríceps en polea", "Press francés", "Fondos en banco", "Patada de tríceps", "Press cerrado"],
  "Full body": ["Kettlebell swing", "Thruster", "Burpees", "Farmer walk"],
  Cardio: ["Cinta", "Bicicleta", "Remo ergómetro", "Elíptica"],
};

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
