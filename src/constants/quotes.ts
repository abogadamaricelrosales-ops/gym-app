/** Frases que se muestran al abrir la app (nunca se repite la anterior). */
export const QUOTES: string[] = [
  "El único entrenamiento malo es el que no hiciste.",
  "Hoy duele, mañana es tu fuerza.",
  "No tenés que ser extremo, solo constante.",
  "Cada repetición cuenta. Hacé que valga.",
  "La disciplina te lleva donde la motivación no llega.",
  "Tu cuerpo puede más de lo que tu mente cree.",
  "Un poco más que la semana pasada. Eso es progreso.",
  "No pares por cansancio, pará cuando termines.",
  "La constancia le gana al talento cuando el talento no entrena.",
  "Entrená por cómo te vas a sentir, no por cómo te ves.",
  "El sudor de hoy es la confianza de mañana.",
  "Empezá donde estás. Usá lo que tenés. Hacé lo que puedas.",
  "Los resultados llegan a quienes no se rinden.",
  "Una serie más. Siempre una serie más.",
  "Lo difícil se vuelve fácil a fuerza de repetirlo.",
  "Competí con quien eras ayer.",
  "Tu única meta hoy: aparecer y dar lo mejor.",
  "Lento también es progreso.",
  "La fuerza no viene de lo que podés hacer, viene de superar lo que creías que no podías.",
  "El gimnasio no cambia tu vida. Vos la cambiás en el gimnasio.",
  "No cuentes los días, hacé que los días cuenten.",
  "Cada kilo que subís es una promesa cumplida.",
  "Hoy es un buen día para ser más fuerte.",
  "La motivación te hace empezar, el hábito te hace seguir.",
  "Si fuera fácil, todos lo harían.",
  "Respirá, apretá y empujá.",
  "Tu futuro yo te va a agradecer este entrenamiento.",
  "No busques excusas, buscá resultados.",
  "Pequeños pasos todos los días suman grandes cambios.",
  "El dolor es temporal, el orgullo dura para siempre.",
  "Ganale a tu récord, no a los demás.",
  "Vos contra vos. Siempre.",
  "Hacelo con miedo, pero hacelo.",
  "La meta está lejos, pero cada serie te acerca.",
  "Descansá si hace falta, pero no abandones.",
];

export function pickQuote(previous: number): number {
  if (QUOTES.length < 2) return 0;
  let i = previous;
  while (i === previous) i = Math.floor(Math.random() * QUOTES.length);
  return i;
}
