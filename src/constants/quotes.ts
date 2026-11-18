/** Frases épicas que se muestran al abrir la app (nunca se repite la anterior). */
export const QUOTES: string[] = [
  "Nadie va a venir a salvarte. Levantate y hacelo vos.",
  "El dolor es temporal. Rendirte te dura para siempre.",
  "Cuando tu cuerpo diga basta, tu mente dice una más.",
  "No naciste para la mitad. Dalo todo.",
  "Hoy se entrena como si fuera la última batalla.",
  "Las leyendas no se rinden en la última serie.",
  "Caer está permitido. Quedarte en el piso, no.",
  "Cada gota de sudor es una promesa que cumplís con vos.",
  "El fuego que llevás adentro es más fuerte que cualquier excusa.",
  "Nadie recuerda al que abandonó. Que te recuerden por no rendirte.",
  "Sos más fuerte que el cansancio. Demostralo.",
  "La versión que querés ser te está esperando del otro lado del esfuerzo.",
  "Que el peso tiemble antes que vos.",
  "Hoy no se negocia. Hoy se gana.",
  "Los días difíciles forjan cuerpos imparables.",
  "El hierro no miente: lo que sembrás hoy, mañana se nota.",
  "Entrená en silencio. Que los resultados hagan el ruido.",
  "No pares cuando duela. Pará cuando hayas terminado.",
  "Tu único rival te mira desde el espejo. Vencelo.",
  "La gloria se construye repetición por repetición.",
  "Si fuera fácil, todos lo harían. Por eso vos sí.",
  "Convertí cada excusa en una repetición más.",
  "El cansancio pasa. El orgullo de no haber aflojado queda.",
  "Somos lo que hacemos cuando nadie nos ve.",
  "Hay batallas que se ganan solo apareciendo. Hoy apareciste.",
  "Hacé que tu yo del futuro te agradezca este día.",
  "No viniste hasta acá para quedarte a medias.",
  "La disciplina es el puente entre tus sueños y tu cuerpo.",
  "El campeón se hace en los días que nadie aplaude.",
  "Romper tus límites también es entrenar.",
  "Respirá hondo. Apretá los dientes. Una más.",
  "El miedo a fallar pesa más que cualquier barra. Soltalo.",
  "Lo imposible es solo lo que todavía no entrenaste.",
  "Hoy tu mente manda y tu cuerpo obedece.",
  "Que tu constancia sea más fuerte que tus ganas de abandonar.",
  "Cada mañana tenés dos opciones: seguir durmiendo o ir por todo.",
  "No buscás motivación. Buscás guerra contra tu peor versión.",
  "Que tu última serie sea tu mejor serie.",
  "El sudor es la grasa llorando. Hacela llorar.",
  "Construí un cuerpo que cuente tu historia de lucha.",
];

export function pickQuote(previous: number): number {
  if (QUOTES.length < 2) return 0;
  let i = previous;
  while (i === previous) i = Math.floor(Math.random() * QUOTES.length);
  return i;
}
