import type { Category } from "../types/routine";
import type { PatternId } from "./figures";

export interface ExerciseGuide {
  name: string;
  category: Category;
  pattern: PatternId;
  muscles: string;
  tips: string[];
  mistake: string;
}

type Row = [name: string, pattern: PatternId, muscles: string, tips: string[], mistake: string];

const DATA: Record<Category, Row[]> = {
  Pecho: [
    ["Flexiones pica", "pike", "Hombros y tríceps (sin equipo)", [
      "Cadera bien arriba formando una V invertida.",
      "Bajá la cabeza hacia el piso entre las manos, codos hacia atrás.",
      "Empujá fuerte hasta estirar los brazos.",
    ], "Bajar la cadera y convertirla en una flexión común."],
    ["Press banca", "bench", "Pectoral, tríceps y hombro frontal", [
      "Juntá los omóplatos y llevalos hacia abajo antes de sacar la barra.",
      "Bajá la barra controlada hasta la parte baja del pecho, con los codos a unos 45–70° del cuerpo.",
      "Pies firmes en el piso y glúteos apoyados en el banco todo el tiempo.",
      "Empujá hacia arriba y un poco hacia atrás, hasta quedar sobre los hombros.",
    ], "Rebotar la barra en el pecho o abrir los codos a 90°: carga el hombro."],
    ["Press inclinado con barra", "incline", "Pectoral superior y hombro frontal", [
      "Banco a 30°: más inclinado ya trabaja sobre todo hombro.",
      "Bajá la barra hacia la clavícula, no al cuello.",
      "Mantené el pecho alto y los omóplatos juntos.",
    ], "Despegar la espalda del banco para mover más peso."],
    ["Press inclinado con mancuernas", "incline", "Pectoral superior", [
      "Banco a 30°, mancuernas a la altura del pecho con las palmas hacia adelante.",
      "Bajá hasta sentir estiramiento en el pecho, codos un poco por debajo del banco.",
      "Subí juntando levemente las mancuernas arriba, sin chocarlas.",
    ], "Bajar poco: perdés el estiramiento, que es lo que más hace crecer."],
    ["Press con mancuernas", "bench", "Pectoral y tríceps", [
      "Subí las mancuernas apoyándolas en las rodillas al acostarte.",
      "Bajá lento (2–3 s) hasta que los codos queden un poco debajo del banco.",
      "Muñecas rectas, encima de los codos.",
    ], "Dejar caer las mancuernas abiertas al final: es cuando más se lastima el hombro."],
    ["Press declinado", "bench", "Pectoral inferior", [
      "Trabá bien las piernas en el soporte antes de sacar la barra.",
      "Bajá a la parte baja del pecho.",
      "Pedí ayuda para sacar y dejar la barra.",
    ], "Usarlo como ejercicio principal: el press plano y el inclinado rinden más."],
    ["Press en máquina", "machinePress", "Pectoral y tríceps", [
      "Ajustá el asiento para que las manijas queden a la altura media del pecho.",
      "Espalda pegada al respaldo y omóplatos juntos.",
      "Empujá sin trabar del todo los codos y volvé lento.",
    ], "Asiento muy alto: el esfuerzo se va a los hombros."],
    ["Aperturas con mancuernas", "fly", "Pectoral (estiramiento)", [
      "Codos apenas flexionados y fijos durante todo el recorrido.",
      "Abrí como si abrazaras un árbol hasta sentir el estiramiento.",
      "Usá menos peso que en el press: es un ejercicio de control.",
    ], "Doblar y estirar los codos: lo convertís en un press."],
    ["Aperturas en máquina", "fly", "Pectoral", [
      "Manijas a la altura del pecho, codos levemente flexionados.",
      "Juntá las manos apretando el pecho 1 segundo.",
      "Volvé lento hasta sentir el estiramiento, sin pasarte.",
    ], "Dejar que la máquina te tire los brazos hacia atrás de golpe."],
    ["Cruce de poleas", "fly", "Pectoral (parte media e inferior)", [
      "Un pie adelante y el torso un poco inclinado.",
      "Llevá las manos hacia abajo y al centro, cruzándolas apenas.",
      "Controlá la vuelta: que el cable no te arrastre.",
    ], "Mover el torso para ayudar: perdés tensión en el pecho."],
    ["Fondos", "dip", "Pectoral inferior y tríceps", [
      "Inclinate un poco hacia adelante para cargar más el pecho.",
      "Bajá hasta que el brazo quede paralelo al piso, no más.",
      "Hombros lejos de las orejas todo el tiempo.",
    ], "Bajar demasiado con los hombros hacia adelante: es lo que más los lastima."],
    ["Flexiones", "pushup", "Pectoral, tríceps y core", [
      "Manos un poco más abiertas que los hombros.",
      "Cuerpo recto como una tabla: glúteos y abdomen apretados.",
      "Bajá hasta casi tocar el piso con el pecho.",
    ], "Dejar caer la cadera o levantar la cola."],
  ],
  Espalda: [
    ["Superman", "superman", "Lumbares, glúteos y espalda alta", [
      "Boca abajo con brazos estirados adelante.",
      "Levantá brazos, pecho y piernas a la vez.",
      "Aguantá 2 segundos arriba y bajá lento.",
    ], "Tirar el cuello hacia atrás: mirá al piso."],
    ["Dominadas", "pullup", "Dorsal ancho y bíceps", [
      "Empezá colgado con los brazos estirados y los hombros activos (hacia abajo).",
      "Pensá en llevar los codos al bolsillo, no en subir la pera.",
      "Subí hasta que el mentón pase la barra y bajá controlado.",
    ], "Balancearse o hacer medias repeticiones."],
    ["Dominadas asistidas", "pullup", "Dorsal ancho y bíceps", [
      "Usá la asistencia justa para hacer las reps con buena técnica.",
      "Bajala de a poco semana a semana.",
      "Mismo gesto que la dominada: codos hacia abajo y atrás.",
    ], "Dejar que la máquina haga todo el trabajo arriba."],
    ["Jalón al pecho", "pulldown", "Dorsal ancho", [
      "Agarre un poco más ancho que los hombros, pecho alto.",
      "Llevá la barra a la parte alta del pecho bajando los codos.",
      "Inclinación leve hacia atrás, sin balancearte.",
    ], "Llevar la barra detrás de la nuca o tirar con el cuerpo."],
    ["Jalón agarre cerrado", "pulldown", "Dorsal (parte baja) y bíceps", [
      "Agarre en V o neutro, codos pegados al cuerpo.",
      "Tirá hasta el esternón apretando la espalda.",
      "Estirá bien arriba para sentir el dorsal.",
    ], "Tirar solo con los brazos."],
    ["Remo con barra", "row", "Espalda media, dorsal y bíceps", [
      "Bisagra de cadera con la espalda recta, torso a unos 45° o más inclinado.",
      "Llevá la barra al ombligo, codos hacia atrás.",
      "Apretá los omóplatos arriba 1 segundo.",
    ], "Redondear la espalda o levantarte con cada repetición."],
    ["Remo con mancuerna", "row", "Dorsal y espalda media", [
      "Rodilla y mano en el banco, espalda plana.",
      "Llevá la mancuerna hacia la cadera, no al pecho.",
      "Dejá que baje hasta estirar bien la espalda.",
    ], "Girar el torso para subir más peso."],
    ["Remo sentado en polea", "cableRow", "Espalda media y dorsal", [
      "Sentate con las rodillas algo flexionadas y el pecho alto.",
      "Tirá hacia el abdomen juntando los omóplatos.",
      "Al volver, dejá que los hombros vayan hacia adelante sin redondear la espalda baja.",
    ], "Balancear el torso hacia atrás para mover el peso."],
    ["Remo en máquina T", "row", "Espalda media", [
      "Pecho apoyado o espalda recta en bisagra.",
      "Codos a 45° para trabajar la espalda alta.",
      "Pausa arriba y bajada controlada.",
    ], "Acortar el recorrido para cargar más."],
    ["Pullover en polea", "pullover", "Dorsal ancho", [
      "Brazos casi rectos y fijos.",
      "Llevá la barra o cuerda desde arriba hasta los muslos con los dorsales.",
      "Torso levemente inclinado y estable.",
    ], "Doblar los codos y convertirlo en un tríceps."],
    ["Peso muerto", "deadlift", "Cadena posterior: espalda, glúteos e isquios", [
      "Barra sobre el medio del pie, pegada a las piernas todo el recorrido.",
      "Antes de tirar: pecho alto, espalda neutra y abdomen apretado.",
      "Empujá el piso con las piernas y terminá apretando los glúteos.",
      "Bajá llevando la cadera hacia atrás primero.",
    ], "Redondear la espalda baja o alejar la barra del cuerpo."],
    ["Hiperextensiones", "backExt", "Lumbares y glúteos", [
      "Cadera apoyada justo en el borde del banco.",
      "Bajá con la espalda recta y subí hasta quedar en línea con las piernas.",
      "Apretá glúteos arriba; no hace falta arquearse de más.",
    ], "Subir con impulso y pasarse de la línea del cuerpo."],
  ],
  Piernas: [
    ["Sentadilla sin peso", "airSquat", "Cuádriceps y glúteos", [
      "Pies al ancho de hombros, brazos adelante para equilibrar.",
      "Bajá lo más profundo que puedas con la espalda recta.",
      "Hacelas lentas (3 s bajando) para que sean más intensas.",
    ], "Levantar los talones del piso."],
    ["Sentadilla con salto", "jumpSquat", "Piernas y potencia (cardio)", [
      "Bajá a sentadilla y saltá con fuerza usando los brazos.",
      "Caé suave, con las rodillas flexionadas.",
      "Encadená la siguiente sin pausa.",
    ], "Caer con las piernas rígidas."],
    ["Sentadilla isométrica en pared", "wallSit", "Cuádriceps (resistencia)", [
      "Espalda pegada a la pared y muslos paralelos al piso.",
      "Rodillas encima de los tobillos.",
      "Aguantá el tiempo indicado respirando normal.",
    ], "Apoyar las manos en las piernas."],
    ["Puente de glúteo a una pierna", "bridge", "Glúteos e isquios", [
      "Una pierna apoyada y la otra estirada al aire.",
      "Subí la cadera sin que se incline hacia un costado.",
      "Pausa de 2 segundos arriba.",
    ], "Empujar con la espalda baja."],
    ["Zancadas alternadas", "lunge", "Glúteos y cuádriceps", [
      "Paso largo adelante, alternando piernas.",
      "Rodilla de atrás casi toca el piso.",
      "Torso erguido.",
    ], "Que la rodilla de adelante se vaya hacia adentro."],
    ["Gemelos en escalón", "calf", "Gemelos", [
      "Puntas en un escalón, agarrate de algo para equilibrio.",
      "Bajá el talón por debajo del escalón y subí al máximo.",
      "Hacelas a una pierna para más intensidad.",
    ], "Rebotar."],
    ["Sentadilla", "squat", "Cuádriceps, glúteos y aductores", [
      "Barra sobre los trapecios, pies al ancho de hombros con las puntas un poco afuera.",
      "Tomá aire, apretá el abdomen y bajá llevando la cadera atrás y abajo.",
      "Rodillas en la dirección de las puntas de los pies.",
      "Bajá al menos hasta que el muslo quede paralelo y subí empujando el piso.",
    ], "Que las rodillas se vayan hacia adentro o levantar los talones."],
    ["Sentadilla frontal", "frontSquat", "Cuádriceps", [
      "Barra apoyada sobre los hombros, codos bien altos.",
      "Torso más vertical que en la sentadilla tradicional.",
      "Bajá profundo manteniendo el pecho arriba.",
    ], "Dejar caer los codos: la barra se va hacia adelante."],
    ["Sentadilla goblet", "frontSquat", "Cuádriceps y glúteos", [
      "Sostené la mancuerna o pesa rusa pegada al pecho.",
      "Bajá entre las piernas con el torso erguido.",
      "Ideal para aprender a hacer bien la sentadilla.",
    ], "Inclinar el torso hacia adelante."],
    ["Prensa", "legPress", "Cuádriceps y glúteos", [
      "Espalda y cola bien apoyadas en el respaldo.",
      "Pies al ancho de hombros en el medio de la plataforma.",
      "Bajá hasta que las rodillas lleguen a unos 90° sin que la cola se despegue.",
      "No trabes las rodillas al estirar.",
    ], "Bajar tanto que la pelvis se despega del asiento."],
    ["Sentadilla hack", "squat", "Cuádriceps", [
      "Espalda pegada al respaldo, pies un poco adelantados.",
      "Bajá profundo y controlado.",
      "Empujá con todo el pie, no solo con la punta.",
    ], "Rebotar abajo."],
    ["Zancadas", "lunge", "Glúteos y cuádriceps", [
      "Paso largo, torso erguido.",
      "Bajá hasta que la rodilla de atrás casi toque el piso.",
      "Empujá con el talón de la pierna de adelante.",
    ], "Paso muy corto: la rodilla se pasa mucho de la punta del pie."],
    ["Sentadilla búlgara", "lunge", "Glúteos y cuádriceps", [
      "Empeine de atrás apoyado en el banco.",
      "Para más glúteo, inclinate un poco hacia adelante.",
      "Bajá controlado y subí con la pierna de adelante.",
    ], "Empujar con la pierna de atrás."],
    ["Peso muerto rumano", "rdl", "Isquiotibiales y glúteos", [
      "Rodillas levemente flexionadas y fijas.",
      "Bajá llevando la cadera hacia atrás, barra pegada a las piernas.",
      "Bajá hasta sentir el estiramiento de los isquios (más o menos a la rodilla).",
      "Subí apretando los glúteos.",
    ], "Doblar las rodillas y convertirlo en una sentadilla."],
    ["Extensión de cuádriceps", "legExt", "Cuádriceps", [
      "Rodilla alineada con el eje de la máquina.",
      "Estirá por completo y apretá 1 segundo arriba.",
      "Bajá lento, en 2–3 segundos.",
    ], "Patear con impulso."],
    ["Curl femoral", "legCurl", "Isquiotibiales", [
      "Rodillas justo pasando el borde del banco.",
      "Cadera pegada al banco, sin levantarla.",
      "Llevá el talón hacia la cola y bajá controlado.",
    ], "Levantar la cadera para ayudarte."],
    ["Hip thrust", "hipThrust", "Glúteo mayor", [
      "Parte alta de la espalda apoyada en el banco, barra sobre la cadera (con almohadilla).",
      "Pies a una distancia tal que arriba las rodillas formen 90°.",
      "Subí hasta que el torso quede paralelo al piso, mentón hacia el pecho.",
      "Apretá los glúteos 1–2 segundos arriba.",
    ], "Arquear la espalda baja en lugar de extender la cadera."],
    ["Puente de glúteo", "bridge", "Glúteos", [
      "Acostada/o en el piso, pies cerca de la cola.",
      "Subí la cadera apretando los glúteos.",
      "Pausa arriba y bajada lenta.",
    ], "Empujar con la espalda en vez de con los glúteos."],
    ["Patada de glúteo en polea", "glutKick", "Glúteo mayor", [
      "Torso inclinado y apoyado en la máquina.",
      "Llevá la pierna hacia atrás sin arquear la espalda.",
      "Apretá el glúteo al final.",
    ], "Arquear la espalda para subir más la pierna."],
    ["Gemelos de pie", "calf", "Gemelos", [
      "Puntas de los pies en un escalón.",
      "Bajá el talón hasta estirar bien y hacé una pausa abajo.",
      "Subí al máximo y apretá 1 segundo.",
    ], "Rebotar rápido con poco recorrido."],
    ["Gemelos sentado", "calf", "Sóleo", [
      "Rodillas a 90° bajo el apoyo.",
      "Recorrido completo: bien abajo y bien arriba.",
      "Repeticiones lentas y controladas.",
    ], "Usar demasiado peso y acortar el recorrido."],
  ],
  Hombros: [
    ["Press militar", "ohp", "Hombro frontal y lateral, tríceps", [
      "De pie, glúteos y abdomen apretados para no arquear la espalda.",
      "Barra desde la clavícula hasta arriba de la cabeza.",
      "Al pasar la cara, llevá la cabeza un poco adelante.",
    ], "Arquear mucho la espalda baja para empujar."],
    ["Press con mancuernas sentado", "ohp", "Hombros", [
      "Respaldo casi vertical, espalda pegada.",
      "Mancuernas a la altura de las orejas, codos un poco adelante.",
      "Subí sin chocar las mancuernas arriba.",
    ], "Bajar poco las mancuernas."],
    ["Press Arnold", "ohp", "Hombro completo", [
      "Empezá con las palmas mirándote a la altura del pecho.",
      "Girá las muñecas mientras subís.",
      "Movimiento controlado, sin impulso.",
    ], "Hacerlo rápido y perder el giro."],
    ["Elevaciones laterales", "lateral", "Hombro lateral", [
      "Codos apenas flexionados, subí hacia los costados hasta la altura de los hombros.",
      "Guiá con los codos, no con las manos.",
      "Torso quieto y bajada lenta.",
    ], "Usar mucho peso y balancearse."],
    ["Elevaciones frontales", "frontRaise", "Hombro frontal", [
      "Subí hasta la altura de los ojos.",
      "Brazos casi rectos.",
      "Sin balancear el torso.",
    ], "Hacer demasiadas series: el hombro frontal ya trabaja en los press."],
    ["Pájaros", "rearDelt", "Hombro posterior", [
      "Torso inclinado casi paralelo al piso, espalda recta.",
      "Abrí los brazos hacia los costados y atrás.",
      "Peso liviano y pausa arriba.",
    ], "Juntar los omóplatos y convertirlo en un remo."],
    ["Face pull", "facePull", "Hombro posterior y manguito rotador", [
      "Cuerda a la altura de la cara.",
      "Tirá hacia la frente separando las manos y con los codos altos.",
      "Terminá con las manos al lado de las orejas.",
    ], "Tirar con los codos bajos."],
    ["Remo al mentón", "uprightRow", "Hombro lateral y trapecio", [
      "Agarre al ancho de hombros o un poco más.",
      "Subí los codos hasta la altura de los hombros, no más.",
      "Barra pegada al cuerpo.",
    ], "Agarre muy cerrado y subir de más: puede pinzar el hombro."],
    ["Encogimientos", "shrug", "Trapecio", [
      "Subí los hombros hacia las orejas, sin girarlos.",
      "Pausa arriba 1 segundo.",
      "Brazos sueltos: no flexiones los codos.",
    ], "Hacer círculos con los hombros."],
  ],
  Bíceps: [
    ["Curl con barra", "curl", "Bíceps", [
      "Codos pegados al cuerpo y fijos.",
      "Subí sin mover los hombros y apretá arriba.",
      "Bajá lento hasta estirar del todo.",
    ], "Balancear el cuerpo para subir el peso."],
    ["Curl con mancuernas", "curl", "Bíceps", [
      "Girá la palma hacia arriba mientras subís.",
      "Alterná brazos o hacelos juntos, siempre controlado.",
      "Estirá por completo abajo.",
    ], "Llevar los codos hacia adelante."],
    ["Curl martillo", "curl", "Braquial y antebrazo", [
      "Palmas mirándose durante todo el ejercicio.",
      "Codos quietos al costado del cuerpo.",
      "Subí hasta la altura del hombro.",
    ], "Mover el hombro para ayudar."],
    ["Curl predicador", "preacher", "Bíceps (parte baja)", [
      "Axilas bien apoyadas al borde del banco.",
      "Bajá casi hasta estirar, sin trabar el codo.",
      "Subí sin despegar los brazos del apoyo.",
    ], "Dejar caer el peso abajo: es donde más se lastima el codo."],
    ["Curl en polea", "curl", "Bíceps", [
      "Tensión constante: aprovechala con un movimiento lento.",
      "Codos fijos al costado.",
      "Apretá arriba 1 segundo.",
    ], "Inclinarte hacia atrás."],
    ["Curl concentrado", "preacher", "Bíceps", [
      "Codo apoyado en la cara interna del muslo.",
      "Subí girando la palma hacia vos.",
      "Bajada muy controlada.",
    ], "Mover el brazo en vez de solo el antebrazo."],
    ["Curl inclinado", "curl", "Bíceps (cabeza larga)", [
      "Banco a 45–60°, brazos colgando detrás del cuerpo.",
      "Subí sin adelantar los codos.",
      "Peso moderado: el estiramiento es intenso.",
    ], "Despegar la cabeza y los hombros del banco."],
  ],
  Tríceps: [
    ["Flexiones diamante", "pushup", "Tríceps y pecho interno", [
      "Manos juntas debajo del pecho formando un rombo con los dedos.",
      "Codos pegados al cuerpo al bajar.",
      "Si cuesta, apoyá las rodillas.",
    ], "Abrir los codos hacia los costados."],
    ["Fondos en silla", "benchDip", "Tríceps", [
      "Usá una silla firme contra la pared.",
      "Bajá hasta 90° de codo, espalda cerca de la silla.",
      "Piernas flexionadas = más fácil; estiradas = más difícil.",
    ], "Usar una silla que se mueve o bajar de más."],
    ["Extensión de tríceps en polea", "pushdown", "Tríceps", [
      "Codos pegados al cuerpo y quietos.",
      "Estirá por completo abajo y apretá.",
      "Subí hasta que el antebrazo quede paralelo al piso.",
    ], "Separar los codos o inclinarte encima del peso."],
    ["Extensión con cuerda", "pushdown", "Tríceps (cabeza lateral)", [
      "Abrí la cuerda hacia afuera al final del movimiento.",
      "Codos fijos al costado.",
      "Volvé lento.",
    ], "Usar los hombros para empujar."],
    ["Press francés", "skull", "Tríceps (cabeza larga)", [
      "Acostada/o, barra arriba del pecho con los brazos estirados.",
      "Bajá la barra hacia la frente o detrás de la cabeza moviendo solo los codos.",
      "Codos apuntando al techo, sin abrirse.",
    ], "Abrir los codos hacia afuera."],
    ["Extensión por encima de la cabeza", "overheadExt", "Tríceps (cabeza larga)", [
      "Mancuerna con ambas manos detrás de la cabeza.",
      "Codos cerca de la cabeza apuntando al techo.",
      "Estirá por completo arriba.",
    ], "Arquear la espalda baja."],
    ["Fondos en banco", "benchDip", "Tríceps", [
      "Manos en el borde del banco, cola cerca del banco.",
      "Bajá hasta que el codo forme 90°.",
      "Hombros abajo, lejos de las orejas.",
    ], "Bajar demasiado: estresa el hombro."],
    ["Patada de tríceps", "triKick", "Tríceps", [
      "Torso inclinado, brazo pegado al cuerpo y paralelo al piso.",
      "Estirá el codo hasta que el brazo quede recto.",
      "Solo se mueve el antebrazo.",
    ], "Balancear el brazo."],
    ["Press cerrado", "bench", "Tríceps y pectoral", [
      "Manos al ancho de hombros (no más cerradas).",
      "Codos pegados al cuerpo al bajar.",
      "Bajá a la parte baja del pecho.",
    ], "Agarre demasiado cerrado: carga las muñecas."],
  ],
  "Full body": [
    ["Elevaciones de piernas", "legRaise", "Abdomen bajo", [
      "Boca arriba, manos debajo de la cola y zona lumbar pegada al piso.",
      "Subí las piernas rectas hasta la vertical.",
      "Bajalas lento sin tocar el piso.",
    ], "Arquear la espalda baja al bajar."],
    ["Bicicleta abdominal", "crunch", "Oblicuos y recto abdominal", [
      "Llevá codo hacia la rodilla contraria girando el torso.",
      "La otra pierna se estira sin tocar el piso.",
      "Lento y controlado: no es una carrera.",
    ], "Mover solo los codos sin girar el torso."],
    ["Plancha lateral", "sidePlank", "Oblicuos y glúteo medio", [
      "Codo debajo del hombro y cuerpo en línea recta.",
      "Subí la cadera y no la dejes caer.",
      "Hacé los dos lados.",
    ], "Cadera caída o rotada hacia adelante."],
    ["Russian twist", "russianTwist", "Oblicuos", [
      "Sentada/o con el torso inclinado y los pies despegados.",
      "Girá el torso tocando el piso a cada lado.",
      "Espalda recta, no encorvada.",
    ], "Mover solo los brazos sin girar el torso."],
    ["Hollow hold", "hollow", "Zona media completa", [
      "Boca arriba, despegá hombros y piernas del piso.",
      "Lumbar bien pegada al piso: es la clave.",
      "Brazos estirados atrás para más dificultad.",
    ], "Dejar que se arquee la espalda baja."],
    ["Plancha con toque de hombros", "plank", "Core y estabilidad", [
      "Plancha alta con los pies un poco abiertos.",
      "Tocá el hombro contrario sin mover la cadera.",
      "Alterná lento y controlado.",
    ], "Balancear la cadera de lado a lado."],
    ["Kettlebell swing", "swing", "Glúteos, isquios y core", [
      "Es una bisagra de cadera, no una sentadilla.",
      "Llevá la pesa entre las piernas y proyectala con un golpe de cadera.",
      "Los brazos solo guían: la fuerza sale de los glúteos.",
    ], "Levantar la pesa con los hombros."],
    ["Thruster", "thruster", "Piernas, hombros y core", [
      "Sentadilla frontal y, al subir, empujá directo arriba de la cabeza.",
      "Un solo movimiento fluido.",
      "Abdomen apretado para proteger la espalda.",
    ], "Separarlo en dos movimientos y perder el impulso de las piernas."],
    ["Burpees", "burpee", "Cuerpo completo y cardio", [
      "Manos al piso, pies atrás y plancha.",
      "Volvé con los pies cerca de las manos y saltá.",
      "Mantené un ritmo que puedas sostener.",
    ], "Dejar caer la cadera en la plancha."],
    ["Farmer walk", "carry", "Agarre, trapecio y core", [
      "Pesas pesadas a los costados.",
      "Caminá erguida/o, pasos cortos y firmes.",
      "Hombros abajo y abdomen apretado.",
    ], "Inclinarte hacia un costado."],
    ["Plancha", "plank", "Core", [
      "Antebrazos debajo de los hombros.",
      "Cuerpo recto: apretá glúteos y abdomen.",
      "Respirá normal; mejor 3 × 30 s bien hechos que 2 minutos mal.",
    ], "Cadera caída o cola muy arriba."],
    ["Abdominales crunch", "crunch", "Recto abdominal", [
      "Rodillas flexionadas, manos al costado de la cabeza sin tirar del cuello.",
      "Despegá los omóplatos del piso enrollando el torso.",
      "Exhalá al subir.",
    ], "Tirar de la cabeza con las manos."],
    ["Mountain climbers", "climber", "Core y cardio", [
      "Desde plancha alta, llevá las rodillas al pecho alternando.",
      "Cadera baja y estable.",
      "Ritmo rápido pero controlado.",
    ], "Subir la cola."],
  ],
  Cardio: [
    ["Jumping jacks", "jumpingJack", "Cardio", [
      "Saltá abriendo piernas y subiendo los brazos.",
      "Caé sobre la punta de los pies.",
      "Ritmo constante y respiración regular.",
    ], "Caer con los talones y las piernas rígidas."],
    ["Rodillas al pecho", "highKnees", "Cardio y flexores de cadera", [
      "Corré en el lugar subiendo las rodillas a la altura de la cadera.",
      "Braceá fuerte.",
      "Torso erguido, apoyá la punta del pie.",
    ], "Inclinarte hacia atrás."],
    ["Cinta", "run", "Cardio y piernas", [
      "Entrada en calor de 5 minutos caminando.",
      "Pisá debajo del cuerpo, no adelante.",
      "Probá intervalos: 1 min rápido y 1 min suave.",
    ], "Agarrarte de las barandas."],
    ["Bicicleta", "bike", "Cardio y cuádriceps", [
      "Asiento a la altura de la cadera: rodilla casi estirada abajo.",
      "Resistencia que te deje hablar con algo de esfuerzo.",
      "Torso relajado, sin rebotar.",
    ], "Asiento muy bajo: cansa las rodillas."],
    ["Remo ergómetro", "rower", "Cardio, piernas y espalda", [
      "Orden: piernas, luego torso, luego brazos.",
      "Al volver: brazos, torso y después piernas.",
      "El 60 % de la fuerza sale de las piernas.",
    ], "Tirar primero con los brazos."],
    ["Elíptica", "run", "Cardio", [
      "Postura erguida, empujá con todo el pie.",
      "Usá los brazos para sumar trabajo.",
      "Variá la resistencia cada pocos minutos.",
    ], "Apoyarse en las manijas."],
    ["Saltar la soga", "jump", "Cardio y gemelos", [
      "Saltos bajos, sobre la punta de los pies.",
      "Girá la soga con las muñecas, no con los brazos.",
      "Empezá con series de 30–60 segundos.",
    ], "Saltar muy alto y caer con los talones."],
    ["Escaladora", "lunge", "Cardio y glúteos", [
      "Pisá el escalón completo.",
      "Torso erguido, sin colgarte de las barandas.",
      "Ritmo constante.",
    ], "Inclinarte sobre las barandas."],
  ],
};

export const GUIDES: ExerciseGuide[] = (Object.keys(DATA) as Category[]).flatMap(category =>
  DATA[category].map(([name, pattern, muscles, tips, mistake]) => ({ name, category, pattern, muscles, tips, mistake })),
);

/** Lista de ejercicios por grupo para agregar con un toque. */
export const CATALOG: Record<Category, string[]> = Object.fromEntries(
  (Object.keys(DATA) as Category[]).map(c => [c, DATA[c].map(r => r[0])]),
) as Record<Category, string[]>;

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// Para ejercicios propios o de referentes: se busca por palabras clave
const KEYWORDS: [RegExp, string][] = [
  [/press.*inclin|inclin.*press/, "Press inclinado con mancuernas"],
  [/press.*(banca|plano|pecho)|bench/, "Press banca"],
  [/press.*(militar|hombro)|press.*sentado|arnold/, "Press militar"],
  [/press.*franc|rompecraneos|skull/, "Press francés"],
  [/press.*cerrado/, "Press cerrado"],
  [/press.*maquina|chest press/, "Press en máquina"],
  [/apertura|fly|cruce|crossover|pec ?deck|contractor/, "Aperturas en máquina"],
  [/fondos? en banco/, "Fondos en banco"],
  [/fondo|dip/, "Fondos"],
  [/flexion|push ?up/, "Flexiones"],
  [/dominada|pull ?up|chin/, "Dominadas"],
  [/jalon|pulldown|lat pull/, "Jalón al pecho"],
  [/pullover|pull ?over/, "Pullover en polea"],
  [/remo.*(polea|sentado|cable)|seated row/, "Remo sentado en polea"],
  [/remo al menton|upright/, "Remo al mentón"],
  [/remo|row/, "Remo con barra"],
  [/rumano|rdl|piernas rigidas|good ?morning|buenos dias/, "Peso muerto rumano"],
  [/peso muerto|deadlift/, "Peso muerto"],
  [/hiperext|extension.*lumbar|back ext/, "Hiperextensiones"],
  [/sentadilla.*(frontal|goblet|copa)/, "Sentadilla goblet"],
  [/bulgara|zancada|estocada|lunge|split|step ?up|subida/, "Zancadas"],
  [/hack|sentadilla|squat|pendulo/, "Sentadilla"],
  [/prensa|leg press/, "Prensa"],
  [/extension.*(cuadriceps|pierna)|sillon|leg ext/, "Extensión de cuádriceps"],
  [/curl.*(femoral|isquio|pierna)|camilla|leg curl/, "Curl femoral"],
  [/puente/, "Puente de glúteo"],
  [/hip thrust|empuje de cadera/, "Hip thrust"],
  [/patada.*(gluteo|polea)|kickback|abduc|aduc|almeja/, "Patada de glúteo en polea"],
  [/gemelo|pantorrilla|calf/, "Gemelos de pie"],
  [/lateral/, "Elevaciones laterales"],
  [/frontal/, "Elevaciones frontales"],
  [/pajaro|posterior|reverse fly|rear/, "Pájaros"],
  [/face ?pull/, "Face pull"],
  [/encogim|shrug/, "Encogimientos"],
  [/predicador|scott|concentrado|arana/, "Curl predicador"],
  [/martillo|hammer/, "Curl martillo"],
  [/curl/, "Curl con mancuernas"],
  [/patada.*tricep|tricep.*patada/, "Patada de tríceps"],
  [/tricep.*(cabeza|nuca|overhead)|copa|katana/, "Extensión por encima de la cabeza"],
  [/tricep|cuerda|pushdown/, "Extensión de tríceps en polea"],
  [/swing|kettlebell/, "Kettlebell swing"],
  [/thruster/, "Thruster"],
  [/burpee/, "Burpees"],
  [/farmer|granjero|caminata/, "Farmer walk"],
  [/plancha|plank/, "Plancha"],
  [/crunch|abdominal|abs|elevacion de piernas/, "Abdominales crunch"],
  [/escalador|climber/, "Mountain climbers"],
  [/cinta|correr|trote|sprint/, "Cinta"],
  [/bici|spinning/, "Bicicleta"],
  [/remo ergo|ergometro/, "Remo ergómetro"],
  [/eliptic/, "Elíptica"],
  [/soga|cuerda de saltar|salto/, "Saltar la soga"],
  [/escalon|escaladora|stair/, "Escaladora"],
];

const byName = new Map(GUIDES.map(g => [norm(g.name), g]));

/** Guía del ejercicio: exacta si está en el catálogo, si no la del movimiento más parecido. */
/** `key` = nombre del ejercicio del catálogo que se usó (sirve para buscar sus fotos). */
export function guideFor(name: string): ExerciseGuide & { approx: boolean; key?: string } {
  const n = norm(name.replace(/\s*\([^)]*\)/g, "").trim());
  const exact = byName.get(n);
  if (exact) return { ...exact, approx: false, key: exact.name };
  for (const [re, target] of KEYWORDS) {
    if (re.test(n)) { const t = byName.get(norm(target))!; return { ...t, name, approx: true, key: t.name }; }
  }
  return {
    name, category: "Full body", pattern: "squat", muscles: "", approx: true,
    tips: [
      "Hacé las primeras series con poco peso para aprender el movimiento.",
      "Controlá la bajada (2–3 segundos) y subí con fuerza.",
      "Mantené el abdomen apretado y la espalda neutra.",
      "Si sentís dolor articular (no muscular), pará y revisá la técnica.",
    ],
    mistake: "Sacrificar la técnica para levantar más peso.",
  };
}
