/**
 * Fotos de cada ejercicio (inicio y final) del banco libre "Free Exercise DB"
 * (github.com/yuhonas/free-exercise-db, publicado como dominio público / Unlicense).
 * La clave es el nombre del ejercicio en el catálogo de técnica (exerciseGuide.ts).
 */
import type { ImageSourcePropType } from "react-native";

export const EXERCISE_PHOTOS: Record<string, [ImageSourcePropType, ImageSourcePropType]> = {
  "Press banca": [require("../../assets/exercises/barbell-bench-press-medium-grip-0.jpg"), require("../../assets/exercises/barbell-bench-press-medium-grip-1.jpg")],
  "Press inclinado con barra": [require("../../assets/exercises/barbell-incline-bench-press-medium-grip-0.jpg"), require("../../assets/exercises/barbell-incline-bench-press-medium-grip-1.jpg")],
  "Press inclinado con mancuernas": [require("../../assets/exercises/incline-dumbbell-press-0.jpg"), require("../../assets/exercises/incline-dumbbell-press-1.jpg")],
  "Press con mancuernas": [require("../../assets/exercises/dumbbell-bench-press-0.jpg"), require("../../assets/exercises/dumbbell-bench-press-1.jpg")],
  "Press declinado": [require("../../assets/exercises/decline-barbell-bench-press-0.jpg"), require("../../assets/exercises/decline-barbell-bench-press-1.jpg")],
  "Press en máquina": [require("../../assets/exercises/machine-bench-press-0.jpg"), require("../../assets/exercises/machine-bench-press-1.jpg")],
  "Aperturas con mancuernas": [require("../../assets/exercises/dumbbell-flyes-0.jpg"), require("../../assets/exercises/dumbbell-flyes-1.jpg")],
  "Aperturas en máquina": [require("../../assets/exercises/butterfly-0.jpg"), require("../../assets/exercises/butterfly-1.jpg")],
  "Cruce de poleas": [require("../../assets/exercises/cable-crossover-0.jpg"), require("../../assets/exercises/cable-crossover-1.jpg")],
  "Fondos": [require("../../assets/exercises/dips-chest-version-0.jpg"), require("../../assets/exercises/dips-chest-version-1.jpg")],
  "Flexiones": [require("../../assets/exercises/pushups-0.jpg"), require("../../assets/exercises/pushups-1.jpg")],
  "Superman": [require("../../assets/exercises/superman-0.jpg"), require("../../assets/exercises/superman-1.jpg")],
  "Dominadas": [require("../../assets/exercises/pullups-0.jpg"), require("../../assets/exercises/pullups-1.jpg")],
  "Dominadas asistidas": [require("../../assets/exercises/band-assisted-pull-up-0.jpg"), require("../../assets/exercises/band-assisted-pull-up-1.jpg")],
  "Jalón al pecho": [require("../../assets/exercises/wide-grip-lat-pulldown-0.jpg"), require("../../assets/exercises/wide-grip-lat-pulldown-1.jpg")],
  "Jalón agarre cerrado": [require("../../assets/exercises/close-grip-front-lat-pulldown-0.jpg"), require("../../assets/exercises/close-grip-front-lat-pulldown-1.jpg")],
  "Remo con barra": [require("../../assets/exercises/bent-over-barbell-row-0.jpg"), require("../../assets/exercises/bent-over-barbell-row-1.jpg")],
  "Remo con mancuerna": [require("../../assets/exercises/one-arm-dumbbell-row-0.jpg"), require("../../assets/exercises/one-arm-dumbbell-row-1.jpg")],
  "Remo sentado en polea": [require("../../assets/exercises/seated-cable-rows-0.jpg"), require("../../assets/exercises/seated-cable-rows-1.jpg")],
  "Remo en máquina T": [require("../../assets/exercises/t-bar-row-with-handle-0.jpg"), require("../../assets/exercises/t-bar-row-with-handle-1.jpg")],
  "Pullover en polea": [require("../../assets/exercises/straight-arm-pulldown-0.jpg"), require("../../assets/exercises/straight-arm-pulldown-1.jpg")],
  "Peso muerto": [require("../../assets/exercises/barbell-deadlift-0.jpg"), require("../../assets/exercises/barbell-deadlift-1.jpg")],
  "Hiperextensiones": [require("../../assets/exercises/hyperextensions-back-extensions-0.jpg"), require("../../assets/exercises/hyperextensions-back-extensions-1.jpg")],
  "Sentadilla sin peso": [require("../../assets/exercises/bodyweight-squat-0.jpg"), require("../../assets/exercises/bodyweight-squat-1.jpg")],
  "Sentadilla con salto": [require("../../assets/exercises/freehand-jump-squat-0.jpg"), require("../../assets/exercises/freehand-jump-squat-1.jpg")],
  "Puente de glúteo a una pierna": [require("../../assets/exercises/single-leg-glute-bridge-0.jpg"), require("../../assets/exercises/single-leg-glute-bridge-1.jpg")],
  "Zancadas alternadas": [require("../../assets/exercises/bodyweight-walking-lunge-0.jpg"), require("../../assets/exercises/bodyweight-walking-lunge-1.jpg")],
  "Gemelos en escalón": [require("../../assets/exercises/standing-calf-raises-0.jpg"), require("../../assets/exercises/standing-calf-raises-1.jpg")],
  "Sentadilla": [require("../../assets/exercises/barbell-squat-0.jpg"), require("../../assets/exercises/barbell-squat-1.jpg")],
  "Sentadilla frontal": [require("../../assets/exercises/front-barbell-squat-0.jpg"), require("../../assets/exercises/front-barbell-squat-1.jpg")],
  "Sentadilla goblet": [require("../../assets/exercises/goblet-squat-0.jpg"), require("../../assets/exercises/goblet-squat-1.jpg")],
  "Prensa": [require("../../assets/exercises/leg-press-0.jpg"), require("../../assets/exercises/leg-press-1.jpg")],
  "Sentadilla hack": [require("../../assets/exercises/hack-squat-0.jpg"), require("../../assets/exercises/hack-squat-1.jpg")],
  "Zancadas": [require("../../assets/exercises/dumbbell-lunges-0.jpg"), require("../../assets/exercises/dumbbell-lunges-1.jpg")],
  "Sentadilla búlgara": [require("../../assets/exercises/split-squat-with-dumbbells-0.jpg"), require("../../assets/exercises/split-squat-with-dumbbells-1.jpg")],
  "Peso muerto rumano": [require("../../assets/exercises/romanian-deadlift-0.jpg"), require("../../assets/exercises/romanian-deadlift-1.jpg")],
  "Extensión de cuádriceps": [require("../../assets/exercises/leg-extensions-0.jpg"), require("../../assets/exercises/leg-extensions-1.jpg")],
  "Curl femoral": [require("../../assets/exercises/lying-leg-curls-0.jpg"), require("../../assets/exercises/lying-leg-curls-1.jpg")],
  "Hip thrust": [require("../../assets/exercises/barbell-hip-thrust-0.jpg"), require("../../assets/exercises/barbell-hip-thrust-1.jpg")],
  "Puente de glúteo": [require("../../assets/exercises/butt-lift-bridge-0.jpg"), require("../../assets/exercises/butt-lift-bridge-1.jpg")],
  "Patada de glúteo en polea": [require("../../assets/exercises/one-legged-cable-kickback-0.jpg"), require("../../assets/exercises/one-legged-cable-kickback-1.jpg")],
  "Gemelos de pie": [require("../../assets/exercises/standing-barbell-calf-raise-0.jpg"), require("../../assets/exercises/standing-barbell-calf-raise-1.jpg")],
  "Gemelos sentado": [require("../../assets/exercises/seated-calf-raise-0.jpg"), require("../../assets/exercises/seated-calf-raise-1.jpg")],
  "Press militar": [require("../../assets/exercises/standing-military-press-0.jpg"), require("../../assets/exercises/standing-military-press-1.jpg")],
  "Press con mancuernas sentado": [require("../../assets/exercises/dumbbell-shoulder-press-0.jpg"), require("../../assets/exercises/dumbbell-shoulder-press-1.jpg")],
  "Press Arnold": [require("../../assets/exercises/arnold-dumbbell-press-0.jpg"), require("../../assets/exercises/arnold-dumbbell-press-1.jpg")],
  "Elevaciones laterales": [require("../../assets/exercises/side-lateral-raise-0.jpg"), require("../../assets/exercises/side-lateral-raise-1.jpg")],
  "Elevaciones frontales": [require("../../assets/exercises/front-dumbbell-raise-0.jpg"), require("../../assets/exercises/front-dumbbell-raise-1.jpg")],
  "Pájaros": [require("../../assets/exercises/seated-bent-over-rear-delt-raise-0.jpg"), require("../../assets/exercises/seated-bent-over-rear-delt-raise-1.jpg")],
  "Face pull": [require("../../assets/exercises/face-pull-0.jpg"), require("../../assets/exercises/face-pull-1.jpg")],
  "Remo al mentón": [require("../../assets/exercises/upright-barbell-row-0.jpg"), require("../../assets/exercises/upright-barbell-row-1.jpg")],
  "Encogimientos": [require("../../assets/exercises/dumbbell-shrug-0.jpg"), require("../../assets/exercises/dumbbell-shrug-1.jpg")],
  "Curl con barra": [require("../../assets/exercises/barbell-curl-0.jpg"), require("../../assets/exercises/barbell-curl-1.jpg")],
  "Curl con mancuernas": [require("../../assets/exercises/dumbbell-bicep-curl-0.jpg"), require("../../assets/exercises/dumbbell-bicep-curl-1.jpg")],
  "Curl martillo": [require("../../assets/exercises/hammer-curls-0.jpg"), require("../../assets/exercises/hammer-curls-1.jpg")],
  "Curl predicador": [require("../../assets/exercises/preacher-curl-0.jpg"), require("../../assets/exercises/preacher-curl-1.jpg")],
  "Curl en polea": [require("../../assets/exercises/standing-biceps-cable-curl-0.jpg"), require("../../assets/exercises/standing-biceps-cable-curl-1.jpg")],
  "Curl concentrado": [require("../../assets/exercises/concentration-curls-0.jpg"), require("../../assets/exercises/concentration-curls-1.jpg")],
  "Curl inclinado": [require("../../assets/exercises/incline-dumbbell-curl-0.jpg"), require("../../assets/exercises/incline-dumbbell-curl-1.jpg")],
  "Flexiones diamante": [require("../../assets/exercises/push-ups-close-triceps-position-0.jpg"), require("../../assets/exercises/push-ups-close-triceps-position-1.jpg")],
  "Fondos en silla": [require("../../assets/exercises/bench-dips-0.jpg"), require("../../assets/exercises/bench-dips-1.jpg")],
  "Extensión de tríceps en polea": [require("../../assets/exercises/triceps-pushdown-0.jpg"), require("../../assets/exercises/triceps-pushdown-1.jpg")],
  "Extensión con cuerda": [require("../../assets/exercises/triceps-pushdown-rope-attachment-0.jpg"), require("../../assets/exercises/triceps-pushdown-rope-attachment-1.jpg")],
  "Press francés": [require("../../assets/exercises/ez-bar-skullcrusher-0.jpg"), require("../../assets/exercises/ez-bar-skullcrusher-1.jpg")],
  "Extensión por encima de la cabeza": [require("../../assets/exercises/standing-dumbbell-triceps-extension-0.jpg"), require("../../assets/exercises/standing-dumbbell-triceps-extension-1.jpg")],
  "Fondos en banco": [require("../../assets/exercises/bench-dips-0.jpg"), require("../../assets/exercises/bench-dips-1.jpg")],
  "Patada de tríceps": [require("../../assets/exercises/tricep-dumbbell-kickback-0.jpg"), require("../../assets/exercises/tricep-dumbbell-kickback-1.jpg")],
  "Press cerrado": [require("../../assets/exercises/close-grip-barbell-bench-press-0.jpg"), require("../../assets/exercises/close-grip-barbell-bench-press-1.jpg")],
  "Elevaciones de piernas": [require("../../assets/exercises/flat-bench-lying-leg-raise-0.jpg"), require("../../assets/exercises/flat-bench-lying-leg-raise-1.jpg")],
  "Bicicleta abdominal": [require("../../assets/exercises/air-bike-0.jpg"), require("../../assets/exercises/air-bike-1.jpg")],
  "Plancha lateral": [require("../../assets/exercises/side-bridge-0.jpg"), require("../../assets/exercises/side-bridge-1.jpg")],
  "Russian twist": [require("../../assets/exercises/russian-twist-0.jpg"), require("../../assets/exercises/russian-twist-1.jpg")],
  "Kettlebell swing": [require("../../assets/exercises/one-arm-kettlebell-swings-0.jpg"), require("../../assets/exercises/one-arm-kettlebell-swings-1.jpg")],
  "Thruster": [require("../../assets/exercises/kettlebell-thruster-0.jpg"), require("../../assets/exercises/kettlebell-thruster-1.jpg")],
  "Farmer walk": [require("../../assets/exercises/farmers-walk-0.jpg"), require("../../assets/exercises/farmers-walk-1.jpg")],
  "Plancha": [require("../../assets/exercises/plank-0.jpg"), require("../../assets/exercises/plank-1.jpg")],
  "Abdominales crunch": [require("../../assets/exercises/crunches-0.jpg"), require("../../assets/exercises/crunches-1.jpg")],
  "Mountain climbers": [require("../../assets/exercises/mountain-climbers-0.jpg"), require("../../assets/exercises/mountain-climbers-1.jpg")],
  "Cinta": [require("../../assets/exercises/running-treadmill-0.jpg"), require("../../assets/exercises/running-treadmill-1.jpg")],
  "Bicicleta": [require("../../assets/exercises/bicycling-stationary-0.jpg"), require("../../assets/exercises/bicycling-stationary-1.jpg")],
  "Remo ergómetro": [require("../../assets/exercises/rowing-stationary-0.jpg"), require("../../assets/exercises/rowing-stationary-1.jpg")],
  "Elíptica": [require("../../assets/exercises/elliptical-trainer-0.jpg"), require("../../assets/exercises/elliptical-trainer-1.jpg")],
  "Saltar la soga": [require("../../assets/exercises/rope-jumping-0.jpg"), require("../../assets/exercises/rope-jumping-1.jpg")],
  "Escaladora": [require("../../assets/exercises/stairmaster-0.jpg"), require("../../assets/exercises/stairmaster-1.jpg")],
};

/** Las mismas posturas hechas por una mujer, para las rutinas de referentes femeninas. */
export const FEMALE_PHOTOS: Record<string, [any, any]> = {
  "Hip thrust": [require("../../assets/exercises/barbell-hip-thrust-f0.jpg"), require("../../assets/exercises/barbell-hip-thrust-f1.jpg")],
  "Sentadilla": [require("../../assets/exercises/barbell-squat-f0.jpg"), require("../../assets/exercises/barbell-squat-f1.jpg")],
};

import { guideFor } from "./exerciseGuide";
import { REFERENTS } from "./referents";

/** Fotos (inicio, final) para un nombre de ejercicio cualquiera, o null si no hay.
 *  Con female=true usa la versión con una mujer cuando existe. */
export const photosFor = (name: string, female = false) => {
  const key = guideFor(name).key;
  if (!key) return null;
  return (female && FEMALE_PHOTOS[key]) || EXERCISE_PHOTOS[key] || null;
};

/** true si la rutina viene de una referente mujer (ids "ref:<referente>:<día>"). */
export const isFemaleRoutine = (routineId?: string) => {
  const m = routineId?.match(/^ref:(.+):\d+$/);
  return !!m && REFERENTS.find(r => r.id === m[1])?.gender === "female";
};
