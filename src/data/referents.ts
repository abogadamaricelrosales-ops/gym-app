// Generado a partir de videos y fuentes públicas de cada referente (ver `sources` y `videos`). No son programas oficiales.
import type { Referent } from "../types/referent";

export const REFERENTS: Referent[] = [
  {
    "id": "jeff-nippard",
    "name": "Jeff Nippard",
    "gender": "male",
    "knownFor": "Culturista natural y divulgador canadiense que basa su entrenamiento en la evidencia científica: frecuencia 2x por músculo, sobrecarga progresiva y RPE controlado.",
    "split": "Push/Pull/Legs (serie \"Ultimate\" 2023 de su canal)",
    "daysPerWeek": 3,
    "goal": "Hipertrofia",
    "confidence": "media",
    "sources": [
      "https://rosetta.to/u/jeffnippard/the-ultimate-push-workout-for-muscle-growth-chest-shoulders-triceps-2023",
      "https://rosetta.to/u/jeffnippard/the-ultimate-pull-workout-for-muscle-growth-back-biceps-rear-delts-2023",
      "https://rosetta.to/u/jeffnippard/the-ultimate-science-based-leg-day-for-muscle-growth-2023",
      "https://rosetta.to/u/jeffnippard/what-my-leg-days-really-look-like-all-sets-reps-exercises-volume-included",
      "https://rosetta.to/u/jeffnippard/my-new-training-split-why-i-completely-changed-my-program",
      "https://jeffnippard.com/pages/about"
    ],
    "days": [
      {
        "name": "Push (pecho, hombros y tríceps)",
        "focus": "Banca pesada, press de hombros, pecho en polea, deltoides lateral y tríceps en estiramiento y contracción",
        "category": "Pecho",
        "exercises": [
          {
            "name": "Press banca",
            "sets": 1,
            "reps": 4,
            "repRange": "3-5",
            "rest": 180,
            "notes": "Una serie tope cercana al máximo tras pirámide de entrada en calor; arco cómodo y escápulas retraídas"
          },
          {
            "name": "Press Larsen",
            "sets": 2,
            "reps": 10,
            "repRange": "10",
            "rest": 150,
            "notes": "Piernas elevadas sin empuje de piernas, agarre algo más cerrado, ~75% del peso de la serie tope"
          },
          {
            "name": "Press Arnold de pie con mancuernas",
            "sets": 3,
            "reps": 9,
            "repRange": "8-10",
            "rest": 120,
            "notes": "Rotar las palmas mientras empujás hasta extensión completa"
          },
          {
            "name": "Press alrededor en polea (cable press-around)",
            "sets": 2,
            "reps": 13,
            "repRange": "12-15",
            "rest": 90,
            "notes": "Un brazo por vez cruzando la línea media; entre series, estiramiento estático de pecho de 30 s por lado"
          },
          {
            "name": "Elevación en Y cruzada en polea",
            "sets": 3,
            "reps": 13,
            "repRange": "12-15",
            "rest": 60,
            "notes": "Movimiento diagonal hacia arriba y afuera, como desenvainar una espada"
          },
          {
            "name": "Extensión de tríceps en polea (solo contracción)",
            "sets": 3,
            "reps": 8,
            "repRange": "8",
            "rest": 0,
            "notes": "Superserie con la siguiente: solo la mitad inferior del recorrido"
          },
          {
            "name": "Extensión de tríceps sobre la cabeza (solo estiramiento)",
            "sets": 3,
            "reps": 8,
            "repRange": "8",
            "rest": 90,
            "notes": "Superserie con la anterior: solo la mitad de estiramiento del recorrido"
          },
          {
            "name": "Extensión de tríceps cruzada en polea",
            "sets": 2,
            "reps": 11,
            "repRange": "10-12",
            "rest": 60,
            "notes": "Codos abiertos hacia los costados"
          }
        ]
      },
      {
        "name": "Pull (espalda, bíceps y deltoides posterior)",
        "focus": "Dorsales al fallo, remo con apoyo de pecho, pullover en estiramiento, face pull y bíceps",
        "category": "Espalda",
        "exercises": [
          {
            "name": "Jalón al pecho",
            "sets": 2,
            "reps": 10,
            "repRange": "10 (al fallo)",
            "rest": 150,
            "notes": "Tras 3 series de aproximación; 2 series al fallo + mini drop set de 4-5 reps bajando ~30%"
          },
          {
            "name": "Remo en máquina con apoyo de pecho",
            "sets": 3,
            "reps": 11,
            "repRange": "10-12",
            "rest": 120,
            "notes": "Cambiar el agarre en cada serie: abierto, medio, neutro o supino"
          },
          {
            "name": "Pullover con mancuerna (mitad inferior)",
            "sets": 2,
            "reps": 12,
            "repRange": "10-12",
            "rest": 30,
            "notes": "Solo la parte de estiramiento; superserie con estiramiento estático de dorsal de 30 s por lado"
          },
          {
            "name": "Face pull omnidireccional",
            "sets": 3,
            "reps": 13,
            "repRange": "12-15",
            "rest": 60,
            "notes": "Serie 1 de abajo hacia arriba, serie 2 a la altura del hombro, serie 3 polea alta hacia los ojos"
          },
          {
            "name": "Curl con barra EZ",
            "sets": 3,
            "reps": 7,
            "repRange": "6-8",
            "rest": 90,
            "notes": "Pesado y con sobrecarga progresiva; negativa controlada"
          },
          {
            "name": "Curl predicador (mitad inferior)",
            "sets": 2,
            "reps": 11,
            "repRange": "10-12",
            "rest": 60,
            "notes": "Un brazo por vez, de 0 a ~50° de flexión; empezar por el brazo débil"
          }
        ]
      },
      {
        "name": "Legs (piernas y abdomen)",
        "focus": "Sentadilla pesada con pausa, bisagra de cadera, estocadas, femorales, gemelos y abdomen",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Sentadilla con barra",
            "sets": 3,
            "reps": 4,
            "repRange": "2-4 + 5 con pausa",
            "rest": 180,
            "notes": "1 serie tope de 2-4 reps (RPE 8-9) y 2 series de 5 reps con pausa al ~75%"
          },
          {
            "name": "Peso muerto rumano con barra",
            "sets": 3,
            "reps": 9,
            "repRange": "8-10",
            "rest": 150,
            "notes": "Tibias casi verticales, barra pegada al cuerpo"
          },
          {
            "name": "Estocadas caminando con mancuernas",
            "sets": 2,
            "reps": 10,
            "repRange": "10 por pierna",
            "rest": 120,
            "notes": "Bajada controlada a profundidad completa"
          },
          {
            "name": "Curl femoral sentado",
            "sets": 3,
            "reps": 11,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Inclinarte hacia adelante para estirar el isquio; variar la posición de los pies por serie"
          },
          {
            "name": "Gemelos en prensa",
            "sets": 4,
            "reps": 11,
            "repRange": "10-12",
            "rest": 60,
            "notes": "Puntas afuera, adentro o al frente según la serie"
          },
          {
            "name": "Abdominales declinados con disco",
            "sets": 3,
            "reps": 11,
            "repRange": "10-12",
            "rest": 60,
            "notes": "Flexionar la columna apretando el abdomen, no desde la cadera"
          }
        ]
      }
    ],
    "videos": [
      {
        "title": "The Ultimate Push Workout For Muscle Growth [Chest, Shoulders, Triceps] (2023)",
        "url": "https://www.youtube.com/watch?v=c3pbe3qzatQ",
        "covers": "Día Push: pecho, hombros y tríceps"
      },
      {
        "title": "The Ultimate PULL Workout For Muscle Growth [Back, Biceps, Rear Delts] (2023)",
        "url": "https://www.youtube.com/watch?v=spKGN0XzErU",
        "covers": "Día Pull: espalda, bíceps y deltoides posterior"
      },
      {
        "title": "The Ultimate Science-Based Leg Day For Muscle Growth (2023)",
        "url": "https://www.youtube.com/watch?v=H6mRkx1x77k",
        "covers": "Día Legs: cuádriceps, isquios, glúteos, gemelos y abdomen"
      },
      {
        "title": "What My Leg Days REALLY Look Like: All Sets, Reps, Exercises & Volume Included",
        "url": "https://www.youtube.com/watch?v=cP77gUDvAPA",
        "covers": "Su día de piernas real dentro de un upper/lower: sentadilla, estocadas, step-ups, glúteos y core"
      },
      {
        "title": "My New Training Split (Why I Completely Changed My Program)",
        "url": "https://www.youtube.com/watch?v=ETunfrqaldM",
        "covers": "Explica su split personal actual (upper/lower 4 días con foco en espalda, trapecio y bíceps)"
      }
    ]
  },
  {
    "id": "chris-bumstead",
    "name": "Chris Bumstead (CBum)",
    "gender": "male",
    "knownFor": "Seis veces Mr. Olympia Classic Physique; entrena pesado con técnica estricta, conexión mente-músculo y alto volumen en básicos.",
    "split": "Push / Pull / Piernas con días extra de hombros y de isquios (5 días: 3 on / 1 off / 2 on)",
    "daysPerWeek": 5,
    "goal": "Hipertrofia",
    "confidence": "media",
    "sources": [
      "https://barbend.com/news/chris-bumstead-tempo-training-chest-triceps-hypertrophy/",
      "https://barbend.com/chris-bumstead-high-volume-heavy-leg-workout",
      "https://fitnessvolt.com/chris-bumstead-off-season-leg-workout/",
      "https://fitnessvolt.com/chris-bumstead-isometric-holds-workout/",
      "https://generationiron.com/chris-bumstead-off-season/",
      "https://fitnessvolt.com/chris-bumstead-2024-grocery-haul-training-split/",
      "https://www.setforset.com/blogs/news/chris-bumstead-shoulder-workout",
      "https://fitnessvolt.com/chris-bumstead-high-volume-arms-workout"
    ],
    "days": [
      {
        "name": "Pecho y tríceps (push)",
        "focus": "Pecho superior, pecho medio y las tres cabezas del tríceps",
        "category": "Pecho",
        "exercises": [
          {
            "name": "Press inclinado con mancuernas",
            "sets": 3,
            "reps": 8,
            "repRange": "6-10",
            "rest": 150,
            "notes": "Tempo 3-1-1-0: 3 s de bajada y pausa en el estiramiento"
          },
          {
            "name": "Press de pecho en máquina",
            "sets": 3,
            "reps": 10,
            "repRange": "8-12",
            "rest": 120,
            "notes": "Bajada controlada sin rebote; última serie con rest-pause de 15 s"
          },
          {
            "name": "Cruce de poleas inclinado",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Press francés con barra",
            "sets": 3,
            "reps": 10,
            "repRange": "8-12",
            "rest": 0,
            "notes": "Serie gigante 1/3: codos algo abiertos"
          },
          {
            "name": "Fondos en máquina",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 0,
            "notes": "Serie gigante 2/3: torso erguido"
          },
          {
            "name": "Press francés en polea con soga",
            "sets": 3,
            "reps": 12,
            "repRange": "10-15",
            "rest": 90,
            "notes": "Serie gigante 3/3"
          },
          {
            "name": "Extensión de tríceps sobre la cabeza a un brazo en polea",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60,
            "notes": "Polea a la altura de la cabeza, agarre neutro"
          }
        ]
      },
      {
        "name": "Espalda y bíceps (pull)",
        "focus": "Grosor y amplitud de espalda, bíceps",
        "category": "Espalda",
        "exercises": [
          {
            "name": "Curl a un brazo con banda",
            "sets": 2,
            "reps": 15,
            "repRange": "12-15",
            "rest": 45,
            "notes": "Entrada en calor de bíceps"
          },
          {
            "name": "Remo con barra",
            "sets": 4,
            "reps": 10,
            "repRange": "8-10",
            "rest": 120
          },
          {
            "name": "Remo a un brazo con mancuerna",
            "sets": 3,
            "reps": 10,
            "repRange": "8-12",
            "rest": 90
          },
          {
            "name": "Remo con apoyo en pecho",
            "sets": 3,
            "reps": 6,
            "repRange": "6",
            "rest": 90,
            "notes": "10 s de isometría en la contracción y después 6 reps"
          },
          {
            "name": "Dominadas",
            "sets": 3,
            "reps": 10,
            "repRange": "8-12",
            "rest": 90
          },
          {
            "name": "Jalón al pecho",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Remo en máquina Hammer",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Curl alternado con mancuernas",
            "sets": 3,
            "reps": 10,
            "repRange": "8-12",
            "rest": 60,
            "notes": "Superserie con curl simultáneo"
          }
        ]
      },
      {
        "name": "Piernas (cuádriceps)",
        "focus": "Cuádriceps, con algo de isquios y gemelos",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Sillón de cuádriceps",
            "sets": 3,
            "reps": 12,
            "repRange": "10-15",
            "rest": 0,
            "notes": "Superserie con camilla de isquios como preagotamiento"
          },
          {
            "name": "Camilla de isquios",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Sentadilla en Smith",
            "sets": 4,
            "reps": 8,
            "repRange": "7-10",
            "rest": 180,
            "notes": "Pirámide ascendente hasta la serie más pesada"
          },
          {
            "name": "Sentadilla sissy",
            "sets": 3,
            "reps": 12,
            "repRange": "10-15",
            "rest": 90,
            "notes": "Peso corporal, en superserie con la Smith"
          },
          {
            "name": "Prensa unilateral",
            "sets": 2,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Rest-pause, una serie por pierna"
          },
          {
            "name": "Sillón de cuádriceps con drop set",
            "sets": 2,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Triple drop set, bajada lenta"
          },
          {
            "name": "Gemelos sentado",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60,
            "notes": "Superserie con curl femoral sentado"
          }
        ]
      },
      {
        "name": "Hombros y brazos",
        "focus": "Deltoides lateral y posterior, y un bloque de brazos",
        "category": "Hombros",
        "exercises": [
          {
            "name": "Vuelos posteriores a un brazo en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "15",
            "rest": 30,
            "notes": "Entrada en calor"
          },
          {
            "name": "Press de hombros en Smith",
            "sets": 4,
            "reps": 7,
            "repRange": "6-8",
            "rest": 150,
            "notes": "La barra no baja de la nariz"
          },
          {
            "name": "Elevaciones laterales sentado con mancuernas",
            "sets": 3,
            "reps": 12,
            "repRange": "12",
            "rest": 60
          },
          {
            "name": "Press de hombros en máquina",
            "sets": 3,
            "reps": 12,
            "repRange": "12",
            "rest": 90
          },
          {
            "name": "Elevaciones laterales en máquina",
            "sets": 4,
            "reps": 12,
            "repRange": "12",
            "rest": 60,
            "notes": "Drop set al fallo en la última serie"
          },
          {
            "name": "Pájaros en máquina",
            "sets": 2,
            "reps": 15,
            "repRange": "15",
            "rest": 60
          },
          {
            "name": "Curl martillo sentado",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60,
            "notes": "Superserie con curl con mancuernas"
          },
          {
            "name": "Extensión de tríceps en polea",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60,
            "notes": "Superserie con extensión sobre la cabeza"
          }
        ]
      },
      {
        "name": "Isquios y piernas",
        "focus": "Isquiotibiales, glúteos y gemelos",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Curl femoral acostado a un brazo/pierna",
            "sets": 3,
            "reps": 10,
            "repRange": "8-12",
            "rest": 60,
            "notes": "Igualar reps con la pierna más débil"
          },
          {
            "name": "Sentadilla péndulo",
            "sets": 3,
            "reps": 10,
            "repRange": "8-12",
            "rest": 150,
            "notes": "Cuarto de rep abajo antes de cada rep completa"
          },
          {
            "name": "Prensa 45°",
            "sets": 4,
            "reps": 12,
            "repRange": "10-15",
            "rest": 120,
            "notes": "2 series pies abiertos y profundos, 2 pies juntos y bajos"
          },
          {
            "name": "Hiperextensiones",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Curl femoral sentado",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          },
          {
            "name": "Gemelos parado",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Gemelos sentado",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          }
        ]
      }
    ],
    "videos": [
      {
        "title": "Chest and Triceps Workout",
        "url": "https://www.youtube.com/watch?v=hkaHHE0AbXo",
        "covers": "Día de pecho y tríceps: press inclinado con tempo, press en máquina con rest-pause, serie gigante de tríceps"
      },
      {
        "title": "Leg day pesado y de alto volumen",
        "url": "https://www.youtube.com/watch?v=3GoRtoZcUvc",
        "covers": "Día de piernas (cuádriceps): sillón + camilla, Smith + sissy, prensa unilateral, gemelos"
      },
      {
        "title": "Leg day de off-season",
        "url": "https://www.youtube.com/watch?v=Dh89BWNZo5o",
        "covers": "Día de isquios y piernas: curl acostado unilateral, péndulo, prensa, hiperextensiones, gemelos"
      },
      {
        "title": "Pecho y espalda con isometría",
        "url": "https://www.youtube.com/watch?v=_Ll60qTWmf8",
        "covers": "Pecho y espalda en superseries con pausas isométricas de 10 s"
      },
      {
        "title": "Vlog de compras + split push/pull/legs, día de espalda",
        "url": "https://www.youtube.com/watch?v=LtSMBD9bVBM",
        "covers": "Día pull: remo con barra, remo a un brazo, dominadas, curls"
      },
      {
        "title": "Sesión de hombros",
        "url": "https://www.youtube.com/watch?v=gBtfQoutWGo",
        "covers": "Día de hombros: deltoides posterior, press en Smith, laterales, press en máquina"
      }
    ]
  },
  {
    "id": "mike-israetel",
    "name": "Dr. Mike Israetel",
    "gender": "male",
    "knownFor": "Doctor en ciencias del deporte y cofundador de Renaissance Periodization, conocido por los conceptos de volumen (MEV/MRV), entrenar cerca del fallo y las series myo-rep.",
    "split": "Pull/Legs/Push 6 días (split flotante rotativo)",
    "daysPerWeek": 6,
    "goal": "Hipertrofia",
    "confidence": "media",
    "sources": [
      "https://rpstrength.com/blogs/video-guides/dr-mikes-exact-training-split-to-get-to-6-body-fat",
      "https://summaries.pages.dev/blog/renaissanceperiodization/dr-mikes-savage-300-rep-push-workout-gauntlet",
      "https://summaries.pages.dev/blog/renaissanceperiodization/mike-trains-legs-live-will-he-puke",
      "https://boxlifemagazine.com/dr-mike-rep-match-chest-lateral-heat-secrets/",
      "https://rpstrength.com/blogs/videos/dr-mike-israetel-tries-ronnie-colemans-back-workout",
      "https://rpstrength.com/pages/team/michael-israetel"
    ],
    "days": [
      {
        "name": "Pull A (vertical)",
        "focus": "Dorsales, espalda media, hombro lateral, bíceps y antebrazos",
        "category": "Espalda",
        "exercises": [
          {
            "name": "Dominadas agarre neutro con lastre",
            "sets": 3,
            "reps": 8,
            "repRange": "5-8",
            "rest": 150,
            "notes": "Primera serie pesada cerca del fallo; 3-5 series en total sumando las sin lastre"
          },
          {
            "name": "Dominadas agarre neutro",
            "sets": 2,
            "reps": 12,
            "repRange": "8-12",
            "rest": 120,
            "notes": "Sin lastre, mismo agarre"
          },
          {
            "name": "Remo en máquina con apoyo de pecho",
            "sets": 3,
            "reps": 12,
            "repRange": "10-15",
            "rest": 90,
            "notes": "Series myo-rep match"
          },
          {
            "name": "Elevaciones laterales sentado con mancuernas",
            "sets": 3,
            "reps": 15,
            "repRange": "10-15",
            "rest": 60,
            "notes": "Myo-reps"
          },
          {
            "name": "Curl acostado con mancuernas",
            "sets": 2,
            "reps": 20,
            "repRange": "10-20",
            "rest": 60,
            "notes": "Unas 40 repeticiones totales con myo-reps"
          },
          {
            "name": "Curl de muñeca en polea",
            "sets": 2,
            "reps": 20,
            "repRange": "15-20",
            "rest": 60
          }
        ]
      },
      {
        "name": "Legs A (cadena posterior y cuádriceps)",
        "focus": "Isquios, glúteos, cuádriceps y abdomen",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Abdominales en banco declinado",
            "sets": 3,
            "reps": 15,
            "repRange": "10-15",
            "rest": 60
          },
          {
            "name": "Buenos días con barra",
            "sets": 3,
            "reps": 10,
            "repRange": "8-10",
            "rest": 150
          },
          {
            "name": "Prensa",
            "sets": 3,
            "reps": 20,
            "repRange": "10-20",
            "rest": 120,
            "notes": "Series myo-rep"
          },
          {
            "name": "Sentadilla sissy en máquina",
            "sets": 1,
            "reps": 20,
            "repRange": "al fallo (~90 s)",
            "rest": 90,
            "notes": "Una serie myo-rep al fallo de ~90 segundos"
          }
        ]
      },
      {
        "name": "Push A (pecho y tríceps)",
        "focus": "Pecho, tríceps, hombros, gemelos y bíceps",
        "category": "Pecho",
        "exercises": [
          {
            "name": "Gemelos de pie",
            "sets": 3,
            "reps": 15,
            "repRange": "10-15",
            "rest": 60
          },
          {
            "name": "Press banca con barra cambered",
            "sets": 3,
            "reps": 10,
            "repRange": "6-10",
            "rest": 150,
            "notes": "Puede reemplazarse por press banca común; en otro video hace banca plana a 245 lb x 19 dejando 1-2 en reserva"
          },
          {
            "name": "Extensión de tríceps sobre la cabeza en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "10-15",
            "rest": 60,
            "notes": "En superserie con flexiones con déficit"
          },
          {
            "name": "Flexiones con déficit",
            "sets": 3,
            "reps": 15,
            "repRange": "al fallo",
            "rest": 90,
            "notes": "Superserie con las extensiones; reps al fallo técnico"
          },
          {
            "name": "Curl inclinado con mancuernas",
            "sets": 3,
            "reps": 15,
            "repRange": "10-15",
            "rest": 60,
            "notes": "Myo-rep match"
          },
          {
            "name": "Elevaciones laterales sentado con mancuernas",
            "sets": 1,
            "reps": 20,
            "repRange": "50-75 totales",
            "rest": 60,
            "notes": "Una sola serie myo-rep de 50-75 repeticiones totales"
          }
        ]
      },
      {
        "name": "Pull B (variación)",
        "focus": "Dorsales, espalda alta, hombro frontal, bíceps y antebrazos",
        "category": "Espalda",
        "exercises": [
          {
            "name": "Dominadas pronas con lastre",
            "sets": 3,
            "reps": 8,
            "repRange": "5-8",
            "rest": 150
          },
          {
            "name": "Dominadas pronas",
            "sets": 2,
            "reps": 12,
            "repRange": "8-15",
            "rest": 120,
            "notes": "Sin lastre, mucho volumen"
          },
          {
            "name": "Remo en máquina Smith",
            "sets": 3,
            "reps": 12,
            "repRange": "8-12",
            "rest": 120
          },
          {
            "name": "Elevaciones frontales en polea acostado",
            "sets": 2,
            "reps": 15,
            "repRange": "10-15",
            "rest": 60
          },
          {
            "name": "Curl en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "10-15",
            "rest": 60
          },
          {
            "name": "Curl de muñeca",
            "sets": 2,
            "reps": 20,
            "repRange": "15-20",
            "rest": 60
          }
        ]
      },
      {
        "name": "Legs B (isquios)",
        "focus": "Isquios, cuádriceps y glúteos",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Curl femoral acostado",
            "sets": 3,
            "reps": 20,
            "repRange": "15-20",
            "rest": 90
          },
          {
            "name": "Sentadilla con cinturón (belt squat)",
            "sets": 3,
            "reps": 15,
            "repRange": "10-15",
            "rest": 120,
            "notes": "Myo-rep match; alternativa: sentadilla hack"
          },
          {
            "name": "Sentadilla búlgara",
            "sets": 2,
            "reps": 12,
            "repRange": "8-12",
            "rest": 90,
            "notes": "Por pierna"
          },
          {
            "name": "Peso muerto con piernas rígidas",
            "sets": 2,
            "reps": 10,
            "repRange": "8-12",
            "rest": 150,
            "notes": "Tomado de su video de piernas en vivo; subir el peso semana a semana"
          }
        ]
      },
      {
        "name": "Push B (volumen)",
        "focus": "Pecho, tríceps, hombro frontal y bíceps",
        "category": "Pecho",
        "exercises": [
          {
            "name": "Press inclinado en máquina",
            "sets": 3,
            "reps": 12,
            "repRange": "8-12",
            "rest": 120
          },
          {
            "name": "Press banca",
            "sets": 3,
            "reps": 10,
            "repRange": "6-10",
            "rest": 150
          },
          {
            "name": "Rompecráneos con barra",
            "sets": 3,
            "reps": 12,
            "repRange": "10-15",
            "rest": 90
          },
          {
            "name": "Extensión de tríceps en polea",
            "sets": 3,
            "reps": 20,
            "repRange": "15-22",
            "rest": 60,
            "notes": "Inclinado hacia adelante, codos que viajan atrás al final; rep match (video 300 reps)"
          },
          {
            "name": "Curl en polea (free motion)",
            "sets": 3,
            "reps": 15,
            "repRange": "10-15",
            "rest": 60
          },
          {
            "name": "Elevaciones frontales en polea acostado",
            "sets": 1,
            "reps": 20,
            "repRange": "serie larga",
            "rest": 60,
            "notes": "Una sola serie larga myo-rep"
          }
        ]
      }
    ],
    "videos": [
      {
        "title": "Dr. Mike's Exact Training Split To Get To 6% Body Fat",
        "url": "https://www.youtube.com/watch?v=d7RjjYgxnJE",
        "covers": "Los 6 días del split flotante: Pull 1, Legs 1, Push 1, Pull 2, Legs 2 y Push 2"
      },
      {
        "title": "Dr. Mike's Savage 300-Rep Push Workout Gauntlet",
        "url": "https://youtu.be/rw6B7NmGe6U",
        "covers": "Día de empuje: banca en Smith, tríceps en polea, flexiones con déficit y remo al mentón en polea"
      },
      {
        "title": "Mike Trains Legs LIVE - Will He PUKE!?",
        "url": "https://youtu.be/9-FlizC5p4I",
        "covers": "Día de piernas: peso muerto piernas rígidas, sentadilla en máquina y estocadas caminando"
      },
      {
        "title": "Video de RP sobre rep match",
        "url": "https://www.youtube.com/watch?v=mWG__lt2z88",
        "covers": "Pecho, tríceps y hombro lateral: banca plana, rompecráneos, press inclinado y laterales con rep match"
      },
      {
        "title": "Dr. Mike Israetel Tries Ronnie Coleman's Back Workout",
        "url": "https://www.youtube.com/watch?v=OfRtDSpNTW8",
        "covers": "Espalda y bíceps: peso muerto, remo con barra, remo T y jalones"
      }
    ]
  },
  {
    "id": "ryan-terry",
    "name": "Ryan Terry",
    "gender": "male",
    "knownFor": "Campeón Mr. Olympia Men's Physique; entrena con alto volumen, ejecución controlada y prioridad en espalda ancha y hombros.",
    "split": "Split por grupo muscular, 6 días con espalda dos veces por semana (amplitud y grosor)",
    "daysPerWeek": 6,
    "goal": "Hipertrofia",
    "confidence": "media",
    "sources": [
      "https://barbend.com/news/4-back-exercises-ryan-terry-trained-for-2023-mens-physique-olympia/",
      "https://fitnessvolt.com/ryan-terry-back-workout/",
      "https://fitnessvolt.com/ryan-terry-back-workout-7-weeks-2026-mr-olympia/",
      "https://barbend.com/news/ryan-terry-chest-and-triceps-training-2024-olympia-prep/",
      "https://fitnessvolt.com/ryan-terry-shoulder-workout-2024-mr-olympia/",
      "https://barbend.com/news/ryan-terry-time-under-tension-leg-day/",
      "https://fitnessvolt.com/ryan-terry-superset-arm-workout-2024-olympia",
      "https://fitnessvolt.com/ryan-terry-profile/",
      "https://myprotein.com/blog/our-ambassadors/ryan-terry-training-split"
    ],
    "days": [
      {
        "name": "Espalda (amplitud) y bíceps",
        "focus": "Dorsales anchos, con bíceps como entrada en calor",
        "category": "Espalda",
        "exercises": [
          {
            "name": "Curl en polea",
            "sets": 2,
            "reps": 15,
            "repRange": "12-15",
            "rest": 45,
            "notes": "Entrada en calor de bíceps"
          },
          {
            "name": "Curl martillo alternado",
            "sets": 2,
            "reps": 12,
            "repRange": "10-12",
            "rest": 45
          },
          {
            "name": "Jalón al pecho en máquina",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Variar el agarre: supino, prono o neutro"
          },
          {
            "name": "Remo bajo con apoyo en pecho",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Pullover en máquina",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60,
            "notes": "Empujar con los codos contra el apoyo"
          },
          {
            "name": "Remo sentado en polea agarre cerrado",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Sin apoyo en pecho, codos abiertos"
          }
        ]
      },
      {
        "name": "Pecho y tríceps",
        "focus": "Pecho superior y tríceps, drop set al fallo en cada ejercicio",
        "category": "Pecho",
        "exercises": [
          {
            "name": "Cruce de poleas a la altura del pecho",
            "sets": 2,
            "reps": 10,
            "repRange": "10",
            "rest": 60,
            "notes": "Entrada en calor; la segunda serie es drop set al fallo"
          },
          {
            "name": "Press inclinado con mancuernas",
            "sets": 3,
            "reps": 11,
            "repRange": "10-12",
            "rest": 120
          },
          {
            "name": "Press inclinado con barra",
            "sets": 3,
            "reps": 10,
            "repRange": "10",
            "rest": 120,
            "notes": "Más 3 negativas al final de cada serie"
          },
          {
            "name": "Aperturas inclinadas con mancuernas",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          },
          {
            "name": "Press plano con barra",
            "sets": 2,
            "reps": 10,
            "repRange": "al fallo",
            "rest": 120,
            "notes": "Con ayuda del compañero"
          },
          {
            "name": "Press de pecho en máquina unilateral alternado",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Extensión de tríceps en polea (barra y soga)",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          }
        ]
      },
      {
        "name": "Piernas",
        "focus": "Cuádriceps, isquios y gemelos con tiempo bajo tensión",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Sillón de cuádriceps",
            "sets": 4,
            "reps": 12,
            "repRange": "12",
            "rest": 60,
            "notes": "Una serie de aproximación; la última con tiempo bajo tensión"
          },
          {
            "name": "Gemelos sentado",
            "sets": 4,
            "reps": 13,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Peso muerto piernas rígidas con hex bar",
            "sets": 4,
            "reps": 11,
            "repRange": "10-12",
            "rest": 120,
            "notes": "Lento y controlado"
          },
          {
            "name": "Elevación de piernas acostado",
            "sets": 4,
            "reps": 15,
            "repRange": "15",
            "rest": 45
          },
          {
            "name": "Gemelos parado en Smith",
            "sets": 4,
            "reps": 20,
            "repRange": "20",
            "rest": 60
          },
          {
            "name": "Estocadas caminando con barra",
            "sets": 4,
            "reps": 12,
            "repRange": "12 por pierna",
            "rest": 90
          }
        ]
      },
      {
        "name": "Hombros",
        "focus": "Deltoides lateral y posterior, trapecios",
        "category": "Hombros",
        "exercises": [
          {
            "name": "Push press con barra",
            "sets": 3,
            "reps": 8,
            "repRange": "8-10",
            "rest": 120
          },
          {
            "name": "Pájaros en banco inclinado",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 0,
            "notes": "Superserie con pájaros sentado agarre neutro"
          },
          {
            "name": "Pájaros sentado inclinado agarre neutro",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Vuelos posteriores acostado en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Elevaciones laterales parciales",
            "sets": 3,
            "reps": 15,
            "repRange": "15-20",
            "rest": 0,
            "notes": "Superserie con elevaciones laterales completas"
          },
          {
            "name": "Elevaciones laterales con mancuernas",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          },
          {
            "name": "Encogimientos con mancuernas",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 0,
            "notes": "Superserie con encogimientos invertidos en Smith"
          },
          {
            "name": "Encogimientos invertidos en Smith",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          }
        ]
      },
      {
        "name": "Espalda (grosor)",
        "focus": "Espalda media, zona lumbar y grosor",
        "category": "Espalda",
        "exercises": [
          {
            "name": "Hiperextensiones con peso",
            "sets": 4,
            "reps": 15,
            "repRange": "15",
            "rest": 0,
            "notes": "Superserie con peso muerto"
          },
          {
            "name": "Peso muerto",
            "sets": 4,
            "reps": 15,
            "repRange": "15",
            "rest": 120,
            "notes": "Peso moderado"
          },
          {
            "name": "Remo con mancuerna con apoyo",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Remo en T",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Primero agarre ancho prono y después cerrado neutro"
          },
          {
            "name": "Remo en máquina",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Remo con barra",
            "sets": 3,
            "reps": 10,
            "repRange": "8-10",
            "rest": 120
          },
          {
            "name": "Curl en máquina Scott",
            "sets": 3,
            "reps": 12,
            "repRange": "10-15",
            "rest": 60
          }
        ]
      },
      {
        "name": "Brazos",
        "focus": "Bíceps y tríceps en superseries de alto volumen",
        "category": "Bíceps",
        "exercises": [
          {
            "name": "Fondos en máquina",
            "sets": 4,
            "reps": 15,
            "repRange": "15-20",
            "rest": 0,
            "notes": "Superserie con curl en Scott; rest-pause en las últimas reps"
          },
          {
            "name": "Curl en máquina Scott",
            "sets": 4,
            "reps": 15,
            "repRange": "15-20",
            "rest": 75
          },
          {
            "name": "Press de banca con agarre cerrado",
            "sets": 4,
            "reps": 11,
            "repRange": "10-12",
            "rest": 0,
            "notes": "Superserie con curl en polea baja; codos pegados"
          },
          {
            "name": "Curl de bíceps en polea baja doble",
            "sets": 4,
            "reps": 11,
            "repRange": "10-12",
            "rest": 75
          },
          {
            "name": "Extensión de tríceps sobre la cabeza con mancuerna sentado",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 0,
            "notes": "Superserie con curl martillo con barra suiza"
          },
          {
            "name": "Curl martillo con barra suiza",
            "sets": 4,
            "reps": 12,
            "repRange": "12",
            "rest": 75
          },
          {
            "name": "Extensión de tríceps en polea con soga",
            "sets": 3,
            "reps": 12,
            "repRange": "10-15",
            "rest": 0,
            "notes": "Superserie con curl en polea sentado"
          },
          {
            "name": "Curl en polea sentado",
            "sets": 3,
            "reps": 12,
            "repRange": "10-15",
            "rest": 60
          }
        ]
      }
    ],
    "videos": [
      {
        "title": "HOW I MADE THE IMPROVEMENTS TO WIN",
        "url": "https://www.youtube.com/watch?v=2yE-yPg5Y0M",
        "covers": "Día de espalda (amplitud): jalón, remo con apoyo en pecho, pullover en máquina, remo en polea; bíceps de entrada en calor"
      },
      {
        "title": "Back day a 7 semanas del Olympia 2026",
        "url": "https://www.youtube.com/watch?v=9MfDdFeOKJM",
        "covers": "Día de espalda (grosor): remos con apoyo, remos en máquina y polea, hiperextensiones, curl en Scott"
      },
      {
        "title": "THE ROAD TO 2X MR OLYMPIA – Episode 3",
        "url": "https://www.youtube.com/watch?v=-Sj0-vbOOgw",
        "covers": "Día de pecho y tríceps: cruce de poleas, press inclinado, aperturas, press plano, máquina unilateral, extensiones en polea"
      },
      {
        "title": "Hombros para el Olympia 2024",
        "url": "https://www.youtube.com/watch?v=sXyYv2vrGLo",
        "covers": "Día de hombros: push press, deltoides posterior en tres variantes, laterales parciales, encogimientos"
      },
      {
        "title": "HOW TO BUILD BIG LEGS / RAW SERIES PART ONE",
        "url": "https://www.youtube.com/watch?v=XXwIzZeH8nc",
        "covers": "Día de piernas: sillón, peso muerto piernas rígidas con hex bar, estocadas, gemelos"
      },
      {
        "title": "Brazos en superseries para el Olympia 2024",
        "url": "https://www.youtube.com/watch?v=yarGLqfV9w8",
        "covers": "Día de brazos: superseries bíceps/tríceps"
      }
    ]
  },
  {
    "id": "francielle-mattos",
    "name": "Francielle Mattos",
    "gender": "female",
    "knownFor": "Atleta brasileña tricampeona de Wellness Olympia, famosa por su tren inferior y un entrenamiento de piernas y glúteos de altísima intensidad.",
    "split": "Tren inferior dividido (glúteos / cuádriceps) + tren superior, 5 días",
    "daysPerWeek": 5,
    "goal": "Masa muscular",
    "confidence": "baja",
    "sources": [
      "https://barbend.com/francielle-mattos",
      "https://www.youtube.com/watch?v=1bclOgXAbN0",
      "https://www.youtube.com/watch?v=kWwS9zy5uyI",
      "https://www.youtube.com/watch?v=XpEImouNSv0",
      "https://www.youtube.com/watch?v=PFWYyn5PC_U",
      "https://www.youtube.com/watch?v=jbdTiv8xBCk"
    ],
    "videos": [
      {
        "title": "Olympia Wellness Champion Francielle Mattos (Olympia TV)",
        "url": "https://www.youtube.com/watch?v=1bclOgXAbN0",
        "covers": "Glúteos e isquios: sentadilla sumo sobre cajones, peso muerto piernas rígidas, búlgara, puente de glúteo con barra, elevación lateral de pierna y patada en polea"
      },
      {
        "title": "BUMBUM DOS SONHOS - TREINO COMPLETO DE GLÚTEOS DA FRANCIELLE MATTOS",
        "url": "https://www.youtube.com/watch?v=kWwS9zy5uyI",
        "covers": "Día de glúteos completo"
      },
      {
        "title": "PERNAS TORNEADAS - TREINO COMPLETO DE QUADRÍCEPS DA FRANCIELLE MATTOS",
        "url": "https://www.youtube.com/watch?v=XpEImouNSv0",
        "covers": "Día de cuádriceps completo"
      },
      {
        "title": "TREINÃO DE QUADRÍCEPS - FALTANDO 4 SEMANAS PARA O ARNOLD OHIO 2024",
        "url": "https://www.youtube.com/watch?v=PFWYyn5PC_U",
        "covers": "Día de cuádriceps en preparación de competencia"
      },
      {
        "title": "TREINO DE QUADRÍCEPS DE WELLNESS FRANCIELLE MATTOS E MICHELLE IBATA",
        "url": "https://www.youtube.com/watch?v=jbdTiv8xBCk",
        "covers": "Día de cuádriceps (categoría Wellness)"
      }
    ],
    "days": [
      {
        "name": "Glúteos e isquios",
        "focus": "Glúteos e isquiotibiales",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Sentadilla sumo sobre cajones",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 120,
            "notes": "Parada sobre bloques para bajar más profundo, como en su video de Olympia TV"
          },
          {
            "name": "Peso muerto piernas rígidas con barra",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 120,
            "notes": "Bajar controlado sintiendo el estiramiento del isquio"
          },
          {
            "name": "Sentadilla búlgara",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Por pierna, torso algo inclinado para cargar glúteo"
          },
          {
            "name": "Puente de glúteo con barra",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Pausa arriba apretando glúteos"
          },
          {
            "name": "Patada de glúteo en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60,
            "notes": "Por pierna"
          },
          {
            "name": "Elevación lateral de pierna",
            "sets": 3,
            "reps": 20,
            "repRange": "15-20",
            "rest": 45,
            "notes": "Glúteo medio, sin balancear"
          }
        ]
      },
      {
        "name": "Espalda y hombros",
        "focus": "Dorsales y deltoides",
        "category": "Espalda",
        "exercises": [
          {
            "name": "Jalón al pecho",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Remo con mancuerna",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Por brazo"
          },
          {
            "name": "Remo sentado en polea",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 75
          },
          {
            "name": "Press de hombros con mancuernas",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Elevaciones laterales",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          }
        ]
      },
      {
        "name": "Cuádriceps",
        "focus": "Cuádriceps y glúteos",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Sentadilla libre o en Smith",
            "sets": 4,
            "reps": 10,
            "repRange": "8-12",
            "rest": 120,
            "notes": "Ejercicio principal de sus videos de cuádriceps"
          },
          {
            "name": "Prensa 45°",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 120
          },
          {
            "name": "Sentadilla hack",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Estocadas caminando",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Por pierna"
          },
          {
            "name": "Sillón de cuádriceps",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60,
            "notes": "Última serie al fallo"
          },
          {
            "name": "Abducción en máquina",
            "sets": 3,
            "reps": 20,
            "repRange": "15-20",
            "rest": 45
          }
        ]
      },
      {
        "name": "Tren superior y abdomen",
        "focus": "Pecho, brazos y core",
        "category": "Full body",
        "exercises": [
          {
            "name": "Press inclinado con mancuernas",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Aperturas en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Curl de bíceps con mancuernas",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          },
          {
            "name": "Extensión de tríceps en polea",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          },
          {
            "name": "Crunch en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 45
          }
        ]
      },
      {
        "name": "Glúteos (frecuencia extra)",
        "focus": "Glúteos",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Hip thrust con barra",
            "sets": 4,
            "reps": 12,
            "repRange": "8-12",
            "rest": 120
          },
          {
            "name": "Peso muerto rumano",
            "sets": 4,
            "reps": 10,
            "repRange": "8-10",
            "rest": 120
          },
          {
            "name": "Patada de glúteo en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60,
            "notes": "Por pierna"
          },
          {
            "name": "Elevación lateral de pierna",
            "sets": 3,
            "reps": 20,
            "repRange": "15-20",
            "rest": 45
          },
          {
            "name": "Abducción en máquina",
            "sets": 3,
            "reps": 20,
            "repRange": "15-20",
            "rest": 45,
            "notes": "Última serie al fallo"
          }
        ]
      }
    ]
  },
  {
    "id": "krissy-cela",
    "name": "Krissy Cela",
    "gender": "female",
    "knownFor": "Entrenadora británica creadora de la app Tone & Sculpt, centrada en glúteos, sobrecarga progresiva y fuerza sin dietas extremas.",
    "split": "Glúteos / Empuje / Piernas / Espalda / Glúteos, 5 días (hoy dice entrenar 3-4)",
    "daysPerWeek": 5,
    "goal": "Hipertrofia",
    "confidence": "media",
    "sources": [
      "https://chaindesk.ai/tools/youtube-summarizer/5-must-do-glutes-exercises-updated-krissy-cela-otKbwLAtnFo",
      "https://www.coachweb.com/fitness/leg-workouts/build-lower-body-strength-with-this-heavyweight-leg-session-from-krissy-celas-new-program",
      "https://www.purewow.com/wellness/minimal-equipment-lower-body-workout",
      "https://primalscreen.itvmedia.co.uk/krissy-cela-in-two-piece-workout-gear-shares-leg-day-workout-celebwell.html",
      "https://polarisfit.pages.dev/sources/krissy-cela",
      "https://www.cosmopolitan.in/beauty/features/a18737/undefined",
      "https://coachweb.com/workouts/leg-workouts/strengthen-your-lower-body-with-krissy-celas-six-move-workout-for-the-gym"
    ],
    "videos": [
      {
        "title": "5 MUST DO GLUTES EXERCISES [UPDATED] | Krissy Cela",
        "url": "https://www.youtube.com/watch?v=otKbwLAtnFo",
        "covers": "Glúteos: peso muerto piernas rígidas, peso muerto rumano, step-up, estocada inversa, hip thrust con pulsos, hiperextensión"
      },
      {
        "title": "INTENSE LEG WORKOUT",
        "url": "https://www.youtube.com/watch?v=UhGihoXJWck",
        "covers": "Día de piernas completo"
      },
      {
        "title": "SNATCH YOUR BACK FULL WORKOUT",
        "url": "https://www.youtube.com/watch?v=4IyMwqMBC9A",
        "covers": "Día de espalda completo"
      },
      {
        "title": "PERFECT CHEST, SHOULDER & TRICEP WORKOUT FOR WOMEN",
        "url": "https://www.youtube.com/watch?v=wUOBow4rsSY",
        "covers": "Día de empuje: pecho, hombros y tríceps"
      },
      {
        "title": "INSANE UPPER BODY WORKOUT FOR WOMEN",
        "url": "https://www.youtube.com/watch?v=OoA7a2lRxz8",
        "covers": "Tren superior completo"
      },
      {
        "title": "LET'S GET THAT BOOTY PUMP! Booty Workout",
        "url": "https://www.youtube.com/watch?v=ZeZfgyMXk34",
        "covers": "Día de glúteos"
      }
    ],
    "days": [
      {
        "name": "Glúteos e isquios",
        "focus": "Glúteos e isquiotibiales",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Peso muerto rumano con mancuernas",
            "sets": 4,
            "reps": 8,
            "repRange": "8-10",
            "rest": 90,
            "notes": "Rodilla apenas flexionada, mover desde la cadera"
          },
          {
            "name": "Peso muerto piernas rígidas",
            "sets": 3,
            "reps": 10,
            "repRange": "8-10",
            "rest": 90,
            "notes": "Piernas casi estiradas"
          },
          {
            "name": "Hip thrust con barra",
            "sets": 4,
            "reps": 10,
            "repRange": "8-12",
            "rest": 90,
            "notes": "Terminar con pulsos arriba para más tiempo bajo tensión"
          },
          {
            "name": "Step-up al cajón con mancuernas",
            "sets": 3,
            "reps": 10,
            "repRange": "10",
            "rest": 60,
            "notes": "Por pierna, empujar con la pierna de arriba"
          },
          {
            "name": "Estocada inversa",
            "sets": 3,
            "reps": 10,
            "repRange": "10",
            "rest": 60,
            "notes": "Por pierna, core firme"
          },
          {
            "name": "Hiperextensión enfocada en glúteo",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60,
            "notes": "Pies hacia afuera para cargar glúteo"
          }
        ]
      },
      {
        "name": "Empuje",
        "focus": "Pecho, hombros y tríceps",
        "category": "Hombros",
        "exercises": [
          {
            "name": "Press de hombros con mancuernas",
            "sets": 4,
            "reps": 10,
            "repRange": "8-12",
            "rest": 90
          },
          {
            "name": "Press inclinado con mancuernas",
            "sets": 3,
            "reps": 10,
            "repRange": "8-12",
            "rest": 90
          },
          {
            "name": "Elevaciones laterales",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Aperturas en polea",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          },
          {
            "name": "Flexiones de brazos",
            "sets": 3,
            "reps": 12,
            "repRange": "10-15",
            "rest": 60
          },
          {
            "name": "Extensión de tríceps en polea",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          }
        ]
      },
      {
        "name": "Piernas",
        "focus": "Cuádriceps, isquios y glúteos",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Peso muerto rumano",
            "sets": 4,
            "reps": 10,
            "repRange": "10",
            "rest": 120,
            "notes": "Sesión de piernas semana 1 de su programa en EvolveYou"
          },
          {
            "name": "Prensa 45°",
            "sets": 4,
            "reps": 10,
            "repRange": "10",
            "rest": 90
          },
          {
            "name": "Sillón de cuádriceps",
            "sets": 4,
            "reps": 10,
            "repRange": "10",
            "rest": 60
          },
          {
            "name": "Curl femoral",
            "sets": 4,
            "reps": 10,
            "repRange": "10",
            "rest": 60
          },
          {
            "name": "Sentadilla búlgara",
            "sets": 3,
            "reps": 8,
            "repRange": "8",
            "rest": 90,
            "notes": "Por pierna"
          }
        ]
      },
      {
        "name": "Espalda y bíceps",
        "focus": "Dorsales, espalda media y bíceps",
        "category": "Espalda",
        "exercises": [
          {
            "name": "Jalón al pecho",
            "sets": 4,
            "reps": 12,
            "repRange": "8-12",
            "rest": 90
          },
          {
            "name": "Remo con mancuerna",
            "sets": 3,
            "reps": 10,
            "repRange": "8-10",
            "rest": 90,
            "notes": "Por brazo"
          },
          {
            "name": "Remo sentado en polea",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          },
          {
            "name": "Face pull",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Curl de bíceps con mancuernas",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          }
        ]
      },
      {
        "name": "Glúteos y tren inferior",
        "focus": "Glúteos, aductores y glúteo medio",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Peso muerto sumo con barra",
            "sets": 3,
            "reps": 10,
            "repRange": "10",
            "rest": 120
          },
          {
            "name": "Hip thrust con barra",
            "sets": 3,
            "reps": 10,
            "repRange": "10",
            "rest": 90
          },
          {
            "name": "Sentadilla sumo con mancuerna",
            "sets": 4,
            "reps": 8,
            "repRange": "8",
            "rest": 90
          },
          {
            "name": "Estocada inversa con una mancuerna",
            "sets": 3,
            "reps": 10,
            "repRange": "10",
            "rest": 60,
            "notes": "Por pierna"
          },
          {
            "name": "Sentadilla búlgara con mancuernas",
            "sets": 3,
            "reps": 10,
            "repRange": "10",
            "rest": 60,
            "notes": "Por pierna"
          },
          {
            "name": "Estocada lateral",
            "sets": 3,
            "reps": 10,
            "repRange": "10",
            "rest": 60,
            "notes": "Por pierna"
          }
        ]
      }
    ]
  },
  {
    "id": "leanbeefpatty",
    "name": "LeanBeefPatty",
    "gender": "female",
    "knownFor": "Creadora de contenido fitness (Patty) que combina fuerza, hipertrofia de todo el cuerpo y algo de cardio, con mucho trabajo de piernas y espalda.",
    "split": "Por grupo muscular 5 días (piernas / espalda-hombros-bíceps / glúteos / pecho-hombros / brazos y cardio)",
    "daysPerWeek": 5,
    "goal": "Masa muscular",
    "confidence": "media",
    "sources": [
      "https://gist.ly/youtube-summarizer/lean-beef-pattys-ultimate-back-shoulder-bicep-workout",
      "https://summaries.pages.dev/blog/renaissanceperiodization/exercise-scientist-critiques-lean-beef-patty-s-training",
      "https://barbend.com/news/lean-beef-patty-brett-wilkin-chris-bumstead-leg-training/",
      "https://sportskeeda.com/health-and-fitness/lean-beef-patty-s-workout-routine-her-secret-attaining-iconic-physique",
      "https://charlie-www.soapcentral.com/bodybuilding/how-many-times-week-leanbeefpatty-workout"
    ],
    "videos": [
      {
        "title": "Lean Beef Patty's Ultimate Back, Shoulder & Bicep Workout",
        "url": "https://www.youtube.com/watch?v=IT8uuFKTB1k",
        "covers": "Espalda, hombros y bíceps: dominadas (40 reps), jalón, remo con apoyo en pecho, elevaciones laterales, superserie de curls"
      },
      {
        "title": "Exercise Scientist Critiques Lean Beef Patty's Training (Renaissance Periodization)",
        "url": "https://youtu.be/TY-BB7sPkfM",
        "covers": "Glúteos/piernas unilateral (estocada inversa con déficit, step-up, búlgara), jalón y crunch en polea"
      },
      {
        "title": "Leg day con Chris Bumstead y Brett Wilkin (canal de Chris Bumstead)",
        "url": "https://www.youtube.com/watch?v=GyGb9rZiKsE",
        "covers": "Piernas: abducción, sillón de cuádriceps, curl sentado, prensa con series ascendentes, péndulo con drop set, curl acostado"
      },
      {
        "title": "Optimized Dumbbell Leg & Glute Day w/ Lean Beef Patty",
        "url": "https://www.youtube.com/watch?v=-xfC3JPArnw",
        "covers": "Piernas y glúteos con mancuernas"
      },
      {
        "title": "BACK DAY w/ LeanBeefPatty",
        "url": "https://www.youtube.com/watch?v=rYSlioW5fCk",
        "covers": "Día de espalda"
      }
    ],
    "days": [
      {
        "name": "Piernas",
        "focus": "Cuádriceps e isquiotibiales",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Abducción en máquina",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60,
            "notes": "Para entrar en calor la cadera"
          },
          {
            "name": "Sillón de cuádriceps",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Curl femoral sentado",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          },
          {
            "name": "Prensa 45° con series ascendentes",
            "sets": 3,
            "reps": 12,
            "repRange": "12 + 5 por disco",
            "rest": 120,
            "notes": "Arrancar con 5 discos x12 y sumar un disco por lado cada 5 reps hasta el fallo"
          },
          {
            "name": "Sentadilla péndulo",
            "sets": 3,
            "reps": 10,
            "repRange": "8-12",
            "rest": 120,
            "notes": "Última serie con drop set"
          },
          {
            "name": "Curl femoral acostado",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          }
        ]
      },
      {
        "name": "Espalda, hombros y bíceps",
        "focus": "Dorsales, deltoides laterales y bíceps",
        "category": "Espalda",
        "exercises": [
          {
            "name": "Dominadas",
            "sets": 4,
            "reps": 10,
            "repRange": "40 totales",
            "rest": 120,
            "notes": "Objetivo: 40 repeticiones totales en la menor cantidad de series"
          },
          {
            "name": "Jalón al pecho",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Llevar la barra a la parte alta del pecho, bajar lento"
          },
          {
            "name": "Remo con mancuernas con apoyo en pecho",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Elevaciones laterales",
            "sets": 4,
            "reps": 12,
            "repRange": "12-20",
            "rest": 60
          },
          {
            "name": "Curl martillo + curl supino (superserie)",
            "sets": 4,
            "reps": 10,
            "repRange": "8-10 + 20-25",
            "rest": 90
          },
          {
            "name": "Crunch en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 45,
            "notes": "Flexionar la columna sin mover la cadera"
          }
        ]
      },
      {
        "name": "Glúteos y unilaterales",
        "focus": "Glúteos, cuádriceps e isquios",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Hip thrust",
            "sets": 4,
            "reps": 10,
            "repRange": "8-10",
            "rest": 120
          },
          {
            "name": "Estocada inversa con déficit",
            "sets": 3,
            "reps": 10,
            "repRange": "8-10",
            "rest": 90,
            "notes": "Por pierna, pie bien atrás sin golpear la rodilla"
          },
          {
            "name": "Step-up con mancuerna",
            "sets": 3,
            "reps": 10,
            "repRange": "10",
            "rest": 90,
            "notes": "Por pierna, no empujar con la pierna de atrás"
          },
          {
            "name": "Sentadilla búlgara",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Versión cuádriceps o glúteo según inclinación del torso"
          },
          {
            "name": "Patada de glúteo en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "15",
            "rest": 60,
            "notes": "Por pierna"
          },
          {
            "name": "Caminata lateral con banda",
            "sets": 2,
            "reps": 20,
            "repRange": "20",
            "rest": 45,
            "notes": "Finalizador"
          }
        ]
      },
      {
        "name": "Pecho y hombros",
        "focus": "Pecho y deltoides",
        "category": "Pecho",
        "exercises": [
          {
            "name": "Press de banca",
            "sets": 4,
            "reps": 10,
            "repRange": "8-12",
            "rest": 120,
            "notes": "Subir el peso en cada serie"
          },
          {
            "name": "Press inclinado con mancuernas",
            "sets": 3,
            "reps": 10,
            "repRange": "10",
            "rest": 90
          },
          {
            "name": "Aperturas en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Press de hombros sentado con mancuernas",
            "sets": 4,
            "reps": 10,
            "repRange": "8-12",
            "rest": 90,
            "notes": "Tras 3 series de aproximación"
          },
          {
            "name": "Elevaciones laterales",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Flexiones de brazos",
            "sets": 3,
            "reps": 20,
            "repRange": "15-20",
            "rest": 60
          }
        ]
      },
      {
        "name": "Brazos y cardio",
        "focus": "Bíceps, antebrazos y acondicionamiento",
        "category": "Bíceps",
        "exercises": [
          {
            "name": "Curl de bíceps con drop set",
            "sets": 3,
            "reps": 10,
            "repRange": "10 + al fallo",
            "rest": 75
          },
          {
            "name": "Curl Zottman",
            "sets": 3,
            "reps": 10,
            "repRange": "10",
            "rest": 60
          },
          {
            "name": "Jalón agarre cerrado",
            "sets": 3,
            "reps": 12,
            "repRange": "12",
            "rest": 60
          },
          {
            "name": "Remo sentado agarre cerrado",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 75
          },
          {
            "name": "Curl de muñeca",
            "sets": 3,
            "reps": 12,
            "repRange": "12",
            "rest": 45
          },
          {
            "name": "Correr 1 milla (1,6 km)",
            "sets": 1,
            "reps": 1,
            "repRange": "1",
            "rest": 0,
            "notes": "Objetivo: mantener o bajar 8:30 min; luego 10-15 min de soga"
          }
        ]
      }
    ]
  },
  {
    "id": "angela-borges",
    "name": "Angela Borges",
    "gender": "female",
    "knownFor": "Competidora brasileña IFBB Pro de Wellness, subcampeona del Wellness Olympia 2021, con un físico dominado por tren inferior y glúteos de gran volumen.",
    "split": "Énfasis en glúteos y cadena posterior, 5 días (cuádriceps con volumen reducido)",
    "daysPerWeek": 5,
    "goal": "Hipertrofia",
    "confidence": "baja",
    "sources": [
      "https://fitnessvolt.com/bodybuilding/athletes/angela-borges/",
      "https://www.youtube.com/watch?v=mqha5pG5MKg",
      "https://www.youtube.com/watch?v=FzYLwB5HO-g",
      "https://www.youtube.com/watch?v=CUKZXP1W144",
      "https://www.youtube.com/watch?v=cxcgcPQ_AtY",
      "https://www.youtube.com/watch?v=HWFfCDS8MBw",
      "https://videohighlight.com/v/mqha5pG5MKg"
    ],
    "videos": [
      {
        "title": "O TREINO DA MAIOR ATLETA WELLNESS DE TODOS OS TEMPOS (Angela Borges)",
        "url": "https://www.youtube.com/watch?v=mqha5pG5MKg",
        "covers": "Tren inferior completo con foco en glúteos; el único trabajo de cuádriceps es sillón de cuádriceps (3 series) al final. Cuenta que hace más de 3 años limita el cuádriceps por proporción."
      },
      {
        "title": "QUEM VAI FAZER ESSE TREINÃO DE PERNAS? (Angela Borges)",
        "url": "https://www.youtube.com/watch?v=FzYLwB5HO-g",
        "covers": "Su \"treino A\" de piernas: cuádriceps e isquiotibiales."
      },
      {
        "title": "ANGELA BORGES I TREINO POSTERIOR COM ENFASE EM GLÚTEO",
        "url": "https://www.youtube.com/watch?v=CUKZXP1W144",
        "covers": "Día de posterior (isquios) con énfasis en glúteo, pesado y técnico (canal Max Titanium)."
      },
      {
        "title": "TREININHO DE POSTERIOR E GLUTEO PARA MOTIVAR A SEMANINHA (Angela Borges)",
        "url": "https://www.youtube.com/watch?v=_667oAYx2ow",
        "covers": "Isquiotibiales y glúteos."
      },
      {
        "title": "TREINO PRO PARA COXAS E GLÚTEOS FIT (Angela Borges)",
        "url": "https://www.youtube.com/watch?v=cxcgcPQ_AtY",
        "covers": "Cuádriceps, isquios, glúteos y gemelos; foco en la unión glúteo-isquio."
      },
      {
        "title": "TREINO DE GLÚTEO EM DETALHES | Angela Borges mostra as estratégias para transformar seu glúteo.",
        "url": "https://www.youtube.com/watch?v=HWFfCDS8MBw",
        "covers": "Glúteos: elongación previa y ejercicios básicos para el \"glúteo gota\" de Wellness (Arnold South America)."
      }
    ],
    "days": [
      {
        "name": "Glúteos",
        "focus": "Glúteo mayor y medio; cuádriceps solo al final",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Abducción en máquina",
            "sets": 4,
            "reps": 20,
            "repRange": "15-20",
            "rest": 60,
            "notes": "Activación previa, pausa en la apertura"
          },
          {
            "name": "Hip thrust",
            "sets": 4,
            "reps": 12,
            "repRange": "8-12",
            "rest": 120,
            "notes": "Pausa de 1-2 s arriba"
          },
          {
            "name": "Sentadilla búlgara",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Torso inclinado para cargar glúteo"
          },
          {
            "name": "Patada de glúteo en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Sentadilla sumo con mancuerna",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 75
          },
          {
            "name": "Sillón de cuádriceps",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60,
            "notes": "Único ejercicio de cuádriceps del día, al final (así lo muestra en su video)"
          }
        ]
      },
      {
        "name": "Espalda y hombros",
        "focus": "Dorsales y deltoides para la cintura en V",
        "category": "Espalda",
        "exercises": [
          {
            "name": "Jalón al pecho",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Remo sentado en polea",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Remo con mancuerna",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 75
          },
          {
            "name": "Elevaciones laterales",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Press de hombros con mancuernas",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Pájaros (deltoides posterior)",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          }
        ]
      },
      {
        "name": "Piernas A",
        "focus": "Cuádriceps e isquiotibiales (volumen moderado de cuádriceps)",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Sillón de cuádriceps",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60,
            "notes": "Precalentamiento de rodillas"
          },
          {
            "name": "Sentadilla hack",
            "sets": 3,
            "reps": 10,
            "repRange": "8-10",
            "rest": 120,
            "notes": "Volumen de cuádriceps contenido para mantener la proporción"
          },
          {
            "name": "Prensa 45°",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 120,
            "notes": "Pies altos para repartir carga con glúteo"
          },
          {
            "name": "Camilla de isquios",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 75
          },
          {
            "name": "Peso muerto rumano",
            "sets": 3,
            "reps": 10,
            "repRange": "8-10",
            "rest": 120
          },
          {
            "name": "Aducción en máquina",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          }
        ]
      },
      {
        "name": "Brazos y abdomen",
        "focus": "Bíceps, tríceps y core",
        "category": "Tríceps",
        "exercises": [
          {
            "name": "Extensión de tríceps en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Press francés",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          },
          {
            "name": "Curl con mancuernas",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          },
          {
            "name": "Curl en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Elevación de piernas colgado",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 45
          },
          {
            "name": "Plancha",
            "sets": 3,
            "reps": 60,
            "repRange": "45-60 s",
            "rest": 45,
            "notes": "Reps = segundos"
          }
        ]
      },
      {
        "name": "Posterior y glúteos",
        "focus": "Isquiotibiales y unión glúteo-isquio",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Camilla de isquios",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 75
          },
          {
            "name": "Peso muerto rumano",
            "sets": 4,
            "reps": 10,
            "repRange": "8-10",
            "rest": 120,
            "notes": "Cadera atrás, foco en la unión glúteo-isquio"
          },
          {
            "name": "Hip thrust a una pierna",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 75
          },
          {
            "name": "Curl femoral sentado",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Abducción en máquina",
            "sets": 4,
            "reps": 20,
            "repRange": "15-20",
            "rest": 60
          },
          {
            "name": "Hiperextensiones para glúteo",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          }
        ]
      }
    ]
  },
  {
    "id": "anita-herbert",
    "name": "Anita Herbert",
    "gender": "female",
    "knownFor": "Modelo fitness húngara y creadora de programas de pérdida de grasa; entrena con volumen moderado-alto y ve el fitness como un estilo de vida a largo plazo.",
    "split": "Rutina dividida por grupos 6 días",
    "daysPerWeek": 6,
    "goal": "Quemar grasa",
    "confidence": "media",
    "sources": [
      "https://www.simplyshredded.com/?p=27501",
      "https://www.youtube.com/@anita_herbert/shorts",
      "https://www.youtube.com/watch?v=j6xIi2R1wrI",
      "https://www.youtube.com/watch?v=ho-IigGUma4"
    ],
    "videos": [
      {
        "title": "Anita Herbert (canal oficial, shorts)",
        "url": "https://www.youtube.com/@anita_herbert/shorts",
        "covers": "Clips cortos de ejercicios de glúteos, piernas, tríceps y abdomen."
      },
      {
        "title": "Terra-Core: Full Body Workout With Anita Herbert",
        "url": "https://www.youtube.com/watch?v=j6xIi2R1wrI",
        "covers": "Cuerpo completo con plataforma inestable (no forma parte de su split de gimnasio)."
      },
      {
        "title": "BEST Of ANITA HERBERT FITNESS GLUTE MOTIVATION WORKOUT",
        "url": "https://www.youtube.com/watch?v=ho-IigGUma4",
        "covers": "Recopilación de ejercicios de glúteos y piernas en gimnasio (canal de terceros)."
      },
      {
        "title": "Anita Herbert (Anitah Sabo) ABS: Gym Workout Routine for Bikini Girls",
        "url": "https://www.youtube.com/watch?v=_PtPRaaFXlc",
        "covers": "Abdomen (canal de terceros)."
      }
    ],
    "days": [
      {
        "name": "Glúteos",
        "focus": "Glúteos y cuádriceps",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Sentadilla en Smith",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 90
          },
          {
            "name": "Prensa 45°",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Sentadilla sumo con kettlebell",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 75
          },
          {
            "name": "Hip thrust en Smith",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Apretar glúteo arriba"
          }
        ]
      },
      {
        "name": "Isquios y pantorrillas",
        "focus": "Isquiotibiales, glúteo medio y gemelos",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Camilla de isquios",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          },
          {
            "name": "Curl femoral de pie",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Peso muerto",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 120
          },
          {
            "name": "Abducción en máquina",
            "sets": 4,
            "reps": 20,
            "repRange": "15-20",
            "rest": 45
          },
          {
            "name": "Gemelos de pie",
            "sets": 5,
            "reps": 20,
            "repRange": "15-20",
            "rest": 45
          }
        ]
      },
      {
        "name": "Hombros",
        "focus": "Deltoides anterior, lateral y posterior",
        "category": "Hombros",
        "exercises": [
          {
            "name": "Elevaciones laterales",
            "sets": 4,
            "reps": 10,
            "repRange": "8-10",
            "rest": 60
          },
          {
            "name": "Press de hombros",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 75
          },
          {
            "name": "Elevaciones frontales en polea",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          },
          {
            "name": "Pájaros (deltoides posterior)",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          }
        ]
      },
      {
        "name": "Espalda",
        "focus": "Dorsales, espalda media y lumbares",
        "category": "Espalda",
        "exercises": [
          {
            "name": "Dominadas",
            "sets": 4,
            "reps": 10,
            "repRange": "8-10",
            "rest": 90,
            "notes": "Asistidas si hace falta"
          },
          {
            "name": "Jalón al pecho agarre ancho",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 75
          },
          {
            "name": "Jalón al pecho agarre cerrado",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 75
          },
          {
            "name": "Remo sentado en polea",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 75
          },
          {
            "name": "Hiperextensiones lumbares",
            "sets": 4,
            "reps": 20,
            "repRange": "15-20",
            "rest": 60
          }
        ]
      },
      {
        "name": "Brazos",
        "focus": "Tríceps y bíceps",
        "category": "Tríceps",
        "exercises": [
          {
            "name": "Extensión de tríceps sobre la cabeza en polea",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Press francés",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          },
          {
            "name": "Patada de tríceps en polea",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 45
          },
          {
            "name": "Curl con mancuernas",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Curl en polea",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 45
          }
        ]
      },
      {
        "name": "Pecho y abdomen",
        "focus": "Pectorales y core",
        "category": "Pecho",
        "exercises": [
          {
            "name": "Aperturas con mancuernas",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Flexiones de brazos",
            "sets": 4,
            "reps": 20,
            "repRange": "15-20",
            "rest": 60
          },
          {
            "name": "Elevación de piernas colgado",
            "sets": 4,
            "reps": 20,
            "repRange": "15-20",
            "rest": 45
          },
          {
            "name": "Crunch abdominal",
            "sets": 4,
            "reps": 20,
            "repRange": "15-20",
            "rest": 45
          },
          {
            "name": "Plancha",
            "sets": 4,
            "reps": 60,
            "repRange": "60 s",
            "rest": 45,
            "notes": "Reps = segundos; el domingo descansa o hace cardio suave"
          }
        ]
      }
    ]
  },
  {
    "id": "yarishna-ayala",
    "name": "Yarishna Ayala",
    "gender": "female",
    "knownFor": "Competidora puertorriqueña IFBB Pro de Wellness; prioriza glúteos y piernas varias veces por semana con repeticiones lentas, pausas y mucho control.",
    "split": "Rutina dividida 6 días: glúteos, espalda, cuádriceps, hombros, isquios/glúteos, pecho-brazos-abdomen",
    "daysPerWeek": 6,
    "goal": "Hipertrofia",
    "confidence": "media",
    "sources": [
      "https://www.youtube.com/watch?v=ha6_RA0H1Js",
      "https://videohighlight.com/v/ha6_RA0H1Js",
      "https://www.youtube.com/watch?v=ps_liCTfmZ0",
      "https://fitnessvolt.com/dana-linn-bailey-yarishna-ayala-glute-workout/",
      "https://www.youtube.com/watch?app=desktop&v=_j--NMXLMBU",
      "https://fitnessvolt.com/yarishna-ayala-tips-hany-rambod-2026-new-york-pro-leg-workout/",
      "https://www.youtube.com/watch?v=kCnRcRmDK6A",
      "https://www.inkl.com/news/intense-glutes-workout-with-bret-contreras-and-yarishna-ayala"
    ],
    "videos": [
      {
        "title": "Mi Semana Completa de Entrenamiento💪🏻🍑 | Yarishna Ayala",
        "url": "https://www.youtube.com/watch?v=ha6_RA0H1Js",
        "covers": "Semana completa por días (canal Yarishna Sin Filtro): glúteos, piernas, espalda, hombros, pecho, brazos y abdomen."
      },
      {
        "title": "Día de Espalda🔥 | Rutina de Espalda con Yarishna Ayala Fitness",
        "url": "https://www.youtube.com/watch?v=ps_liCTfmZ0",
        "covers": "Espalda completa; clave técnica: llevar el codo atrás en vez de tirar con el brazo."
      },
      {
        "title": "Glúteos con Dana Linn Bailey (canal de DLB)",
        "url": "https://www.youtube.com/watch?app=desktop&v=_j--NMXLMBU",
        "covers": "Glúteos y piernas: abducción 4x8, hip thrust 4x12, sumo en Pit Shark 4x10, hack inversa 4x8, péndulo 4x10, prensa y estocadas, todo con tempo lento y pausas."
      },
      {
        "title": "Día de piernas con Hany Rambod (2026, rumbo al New York Pro)",
        "url": "https://www.youtube.com/watch?v=kCnRcRmDK6A",
        "covers": "Cuádriceps: abducción de calentamiento, sillón de cuádriceps reclinado, prensa con pies cerrados y estocadas caminando."
      }
    ],
    "days": [
      {
        "name": "Glúteos",
        "focus": "Glúteos con tempo lento y pausas",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Abducción en máquina",
            "sets": 4,
            "reps": 8,
            "repRange": "8",
            "rest": 60,
            "notes": "Pausa de 4 s en cada rep"
          },
          {
            "name": "Hip thrust",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 120,
            "notes": "Bajada de 4 s y apretar arriba unos segundos"
          },
          {
            "name": "Sentadilla sumo en máquina (Pit Shark)",
            "sets": 4,
            "reps": 10,
            "repRange": "10",
            "rest": 90,
            "notes": "Bajada de 3 s, pausa de 3 s abajo, sin manos"
          },
          {
            "name": "Hack inversa",
            "sets": 4,
            "reps": 8,
            "repRange": "8",
            "rest": 120,
            "notes": "Bajada de 3 s y pausa de 3 s; postura ancha, puntas algo afuera"
          },
          {
            "name": "Sentadilla péndulo",
            "sets": 4,
            "reps": 10,
            "repRange": "10",
            "rest": 120
          },
          {
            "name": "Prensa 45°",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Bajada lenta, pausa de 2 s abajo"
          },
          {
            "name": "Estocadas caminando",
            "sets": 3,
            "reps": 30,
            "repRange": "30 pasos",
            "rest": 90,
            "notes": "Lentas, con pausa abajo"
          }
        ]
      },
      {
        "name": "Espalda",
        "focus": "Dorsales y espalda media",
        "category": "Espalda",
        "exercises": [
          {
            "name": "Jalón al pecho",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Llevar el codo atrás, no tirar con el brazo"
          },
          {
            "name": "Remo sentado en polea",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Remo con mancuerna",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 75
          },
          {
            "name": "Pullover en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Hiperextensiones lumbares",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          }
        ]
      },
      {
        "name": "Cuádriceps",
        "focus": "Cuádriceps y glúteo medio",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Abducción en máquina",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60,
            "notes": "Calentamiento de glúteo"
          },
          {
            "name": "Sillón de cuádriceps",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60,
            "notes": "Torso reclinado, puntas hacia afuera, controlar la bajada"
          },
          {
            "name": "Prensa 45°",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 120,
            "notes": "Pies cerrados en posición neutra"
          },
          {
            "name": "Sentadilla hack",
            "sets": 3,
            "reps": 10,
            "repRange": "8-10",
            "rest": 120
          },
          {
            "name": "Estocadas caminando con mancuernas",
            "sets": 3,
            "reps": 30,
            "repRange": "30 pasos",
            "rest": 90,
            "notes": "Finalizador, sin apurarse"
          }
        ]
      },
      {
        "name": "Hombros",
        "focus": "Deltoides lateral, anterior y posterior",
        "category": "Hombros",
        "exercises": [
          {
            "name": "Elevaciones laterales",
            "sets": 4,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Press de hombros con mancuernas",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Elevaciones laterales en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Pájaros (deltoides posterior)",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Face pull en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          }
        ]
      },
      {
        "name": "Isquios y glúteos",
        "focus": "Isquiotibiales y glúteos",
        "category": "Piernas",
        "exercises": [
          {
            "name": "Hip thrust",
            "sets": 3,
            "reps": 12,
            "repRange": "8-15",
            "rest": 120,
            "notes": "En su sesión con Bret Contreras: series pesadas y una de 20 reps"
          },
          {
            "name": "Prensa a una pierna",
            "sets": 2,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90,
            "notes": "Pie alto en la plataforma para cargar glúteo"
          },
          {
            "name": "Peso muerto piernas rígidas",
            "sets": 2,
            "reps": 10,
            "repRange": "8-10",
            "rest": 120
          },
          {
            "name": "Buenos días",
            "sets": 3,
            "reps": 10,
            "repRange": "8-12",
            "rest": 90
          },
          {
            "name": "Camilla de isquios",
            "sets": 4,
            "reps": 12,
            "repRange": "10-12",
            "rest": 75
          },
          {
            "name": "Abducción sentada inclinada (pulsos)",
            "sets": 2,
            "reps": 20,
            "repRange": "15-20",
            "rest": 60
          }
        ]
      },
      {
        "name": "Pecho, brazos y abdomen",
        "focus": "Pectorales, bíceps, tríceps y core",
        "category": "Pecho",
        "exercises": [
          {
            "name": "Press inclinado con mancuernas",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 90
          },
          {
            "name": "Aperturas en máquina",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Curl con mancuernas",
            "sets": 3,
            "reps": 12,
            "repRange": "10-12",
            "rest": 60
          },
          {
            "name": "Extensión de tríceps en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 60
          },
          {
            "name": "Elevación de piernas colgado",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 45
          },
          {
            "name": "Crunch en polea",
            "sets": 3,
            "reps": 15,
            "repRange": "12-15",
            "rest": 45
          }
        ]
      }
    ]
  }
];
