import type { Category } from "../types/routine";

export const CATEGORIES: Category[] = ["Pecho", "Espalda", "Piernas", "Hombros", "Brazos", "Full body", "Cardio"];

/** Ejercicios comunes para agregar con un toque en el editor. */
export const EXERCISE_CATALOG: Record<Category, string[]> = {
  Pecho: ["Press banca", "Press inclinado con mancuernas", "Aperturas en máquina", "Fondos", "Cruce de poleas"],
  Espalda: ["Dominadas", "Jalón al pecho", "Remo con barra", "Remo sentado en polea", "Peso muerto"],
  Piernas: ["Sentadilla", "Prensa", "Peso muerto rumano", "Extensión de cuádriceps", "Curl femoral", "Hip thrust", "Gemelos de pie"],
  Hombros: ["Press militar", "Elevaciones laterales", "Face pull", "Pájaros"],
  Brazos: ["Curl con barra", "Curl martillo", "Extensión de tríceps en polea", "Press francés"],
  "Full body": ["Kettlebell swing", "Thruster", "Burpees", "Farmer walk"],
  Cardio: ["Cinta", "Bicicleta", "Remo ergómetro", "Elíptica"],
};

export const WEEKDAYS_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
