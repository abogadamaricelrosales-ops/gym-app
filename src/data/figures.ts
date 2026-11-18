/**
 * Muñeco de palitos para mostrar cada ejercicio en 2 posiciones (inicio y final).
 * Cada pose se arma por cinemática directa: una raíz (cadera o tobillo) y el ángulo de cada
 * segmento en grados (0 = derecha, 90 = abajo, -90 = arriba, 180 = izquierda). Mira a la derecha.
 * En vista "front" se dibuja de frente y el brazo/pierna izquierdos son el espejo del derecho.
 */

export type PatternId =
  | "bench" | "incline" | "machinePress" | "pushup" | "fly" | "dip"
  | "pullup" | "pulldown" | "row" | "cableRow" | "pullover" | "deadlift" | "backExt"
  | "squat" | "frontSquat" | "lunge" | "rdl" | "legPress" | "legExt" | "legCurl" | "hipThrust" | "glutKick" | "calf"
  | "ohp" | "lateral" | "frontRaise" | "rearDelt" | "facePull" | "uprightRow" | "shrug"
  | "curl" | "preacher" | "pushdown" | "skull" | "overheadExt" | "benchDip" | "triKick"
  | "swing" | "thruster" | "burpee" | "carry" | "plank" | "crunch" | "climber"
  | "run" | "bike" | "rower" | "jump"
  | "airSquat" | "jumpSquat" | "bridge" | "legRaise" | "superman" | "wallSit" | "jumpingJack"
  | "sidePlank" | "russianTwist" | "hollow" | "pike" | "highKnees";

type Prop =
  | { k: "seg"; x1: number; y1: number; x2: number; y2: number; w?: number } // banco, máquina, barra fija
  | { k: "bar" } // barra vista de costado (disco) en las manos
  | { k: "barBack" } // barra sobre la espalda
  | { k: "db" } // mancuerna en la mano
  | { k: "kb" } // pesa rusa
  | { k: "cable"; ax: number; ay: number } // cable desde la mano a una polea
  | { k: "footPlate" } // plataforma bajo los pies (prensa)
  | { k: "shinPad" } // rodillo en el tobillo (máquinas de piernas)
  | { k: "wheel"; x: number; y: number; r: number };

export interface Pose {
  root: [number, number];
  rootAt?: "hip" | "ankle";
  t: number; // torso (cadera → hombro)
  th: number; sh: number; f?: number; // muslo, pierna, pie
  ua: number; fa: number; // brazo, antebrazo
  th2?: number; sh2?: number; f2?: number; // pierna de atrás
  ua2?: number; fa2?: number; // brazo de atrás
  spread?: number; // vista de frente: apertura de piernas en grados
  props?: Prop[];
}

export interface Pattern { front?: boolean; poses: [Pose, Pose] }

const L = { torso: 28, head: 10, ua: 15, fa: 14, th: 21, sh: 21, foot: 7 };
export const GROUND = 104;

const floorBench = (y = 82, x1 = 8, x2 = 70): Prop[] => [
  { k: "seg", x1, y1: y, x2, y2: y, w: 5 },
  { k: "seg", x1: x1 + 6, y1: y, x2: x1 + 6, y2: GROUND, w: 3 },
  { k: "seg", x1: x2 - 6, y1: y, x2: x2 - 6, y2: GROUND, w: 3 },
];
const seat = (x: number, y: number, backX?: number): Prop[] => [
  { k: "seg", x1: x - 12, y1: y, x2: x + 14, y2: y, w: 5 },
  { k: "seg", x1: x, y1: y, x2: x, y2: GROUND, w: 3 },
  ...(backX != null ? [{ k: "seg", x1: backX, y1: y, x2: backX - 4, y2: y - 38, w: 5 } as Prop] : []),
];
const pullBar = (y: number): Prop => ({ k: "seg", x1: 20, y1: y, x2: 100, y2: y, w: 3 });

// de pie, raíz en el tobillo
const stand = (o: Partial<Pose> = {}): Pose => ({ root: [60, GROUND], rootAt: "ankle", t: -90, th: -90, sh: -90, ua: 90, fa: 90, ...o });

export const PATTERNS: Record<PatternId, Pattern> = {
  bench: { poses: [
    { root: [55, 76], t: 180, th: 20, sh: 95, ua: -90, fa: -90, props: [...floorBench(), { k: "bar" }] },
    { root: [55, 76], t: 180, th: 20, sh: 95, ua: 15, fa: -100, props: [...floorBench(), { k: "bar" }] },
  ] },
  incline: { poses: [
    { root: [60, 80], t: -145, th: 10, sh: 95, ua: -90, fa: -90, props: [{ k: "seg", x1: 52, y1: 84, x2: 78, y2: 84, w: 5 }, { k: "seg", x1: 54, y1: 84, x2: 26, y2: 64, w: 5 }, { k: "seg", x1: 62, y1: 84, x2: 62, y2: GROUND, w: 3 }, { k: "bar" }] },
    { root: [60, 80], t: -145, th: 10, sh: 95, ua: 25, fa: -95, props: [{ k: "seg", x1: 52, y1: 84, x2: 78, y2: 84, w: 5 }, { k: "seg", x1: 54, y1: 84, x2: 26, y2: 64, w: 5 }, { k: "seg", x1: 62, y1: 84, x2: 62, y2: GROUND, w: 3 }, { k: "bar" }] },
  ] },
  machinePress: { poses: [
    { root: [48, 80], t: -90, th: 0, sh: 90, ua: 160, fa: 0, props: [...seat(48, 82, 42), { k: "db" }] },
    { root: [48, 80], t: -90, th: 0, sh: 90, ua: 0, fa: 0, props: [...seat(48, 82, 42), { k: "db" }] },
  ] },
  pushup: { poses: [
    { root: [104, GROUND - 2], rootAt: "ankle", t: 197, th: 197, sh: 197, f: 60, ua: 92, fa: 90 },
    { root: [104, GROUND - 2], rootAt: "ankle", t: 186, th: 186, sh: 186, f: 60, ua: 30, fa: 115 },
  ] },
  fly: { front: true, poses: [
    stand({ ua: 0, fa: 10, props: [{ k: "cable", ax: 112, ay: 30 }] }),
    stand({ ua: 125, fa: 170, props: [{ k: "cable", ax: 112, ay: 30 }] }),
  ] },
  dip: { poses: [
    { root: [60, 62], t: -95, th: 95, sh: 140, ua: 85, fa: 90, props: [{ k: "seg", x1: 50, y1: 84, x2: 90, y2: 84, w: 3 }, { k: "seg", x1: 80, y1: 84, x2: 80, y2: GROUND, w: 3 }] },
    { root: [62, 76], t: -75, th: 95, sh: 140, ua: 150, fa: 45, props: [{ k: "seg", x1: 50, y1: 84, x2: 90, y2: 84, w: 3 }, { k: "seg", x1: 80, y1: 84, x2: 80, y2: GROUND, w: 3 }] },
  ] },

  pullup: { front: true, poses: [
    { root: [60, 72], t: -90, th: 92, sh: 90, ua: -70, fa: -85, props: [pullBar(15)] },
    { root: [60, 52], t: -90, th: 92, sh: 90, ua: 70, fa: -100, props: [pullBar(15)] },
  ] },
  pulldown: { front: true, poses: [
    { root: [60, 76], t: -90, th: 20, sh: 90, ua: -65, fa: -80, props: [{ k: "seg", x1: 30, y1: 20, x2: 90, y2: 20, w: 3 }, { k: "seg", x1: 60, y1: 2, x2: 60, y2: 20, w: 1.5 }, { k: "seg", x1: 40, y1: 79, x2: 80, y2: 79, w: 5 }] },
    { root: [60, 76], t: -90, th: 20, sh: 90, ua: 75, fa: -100, props: [{ k: "seg", x1: 34, y1: 38, x2: 86, y2: 38, w: 3 }, { k: "seg", x1: 60, y1: 2, x2: 60, y2: 38, w: 1.5 }, { k: "seg", x1: 40, y1: 79, x2: 80, y2: 79, w: 5 }] },
  ] },
  row: { poses: [
    stand({ root: [62, GROUND], sh: -75, th: -110, t: -25, ua: 90, fa: 90, props: [{ k: "bar" }] }),
    stand({ root: [62, GROUND], sh: -75, th: -110, t: -25, ua: 165, fa: 75, props: [{ k: "bar" }] }),
  ] },
  cableRow: { poses: [
    { root: [42, 88], t: -80, th: 0, sh: 5, ua: 5, fa: 0, props: [{ k: "seg", x1: 30, y1: 91, x2: 56, y2: 91, w: 5 }, { k: "cable", ax: 110, ay: 84 }, { k: "seg", x1: 86, y1: 80, x2: 86, y2: GROUND, w: 4 }] },
    { root: [42, 88], t: -95, th: 0, sh: 5, ua: 150, fa: 5, props: [{ k: "seg", x1: 30, y1: 91, x2: 56, y2: 91, w: 5 }, { k: "cable", ax: 110, ay: 84 }, { k: "seg", x1: 86, y1: 80, x2: 86, y2: GROUND, w: 4 }] },
  ] },
  pullover: { poses: [
    stand({ t: -70, sh: -85, th: -100, ua: -40, fa: -35, props: [{ k: "cable", ax: 112, ay: 6 }] }),
    stand({ t: -70, sh: -85, th: -100, ua: 75, fa: 75, props: [{ k: "cable", ax: 112, ay: 6 }] }),
  ] },
  deadlift: { poses: [
    stand({ root: [64, GROUND], sh: -60, th: -150, t: -30, ua: 90, fa: 90, props: [{ k: "bar" }] }),
    stand({ root: [64, GROUND], ua: 90, fa: 90, props: [{ k: "bar" }] }),
  ] },
  backExt: { poses: [
    { root: [62, 72], t: 120, th: 20, sh: 20, f: 80, ua: 100, fa: 95, props: [{ k: "seg", x1: 52, y1: 78, x2: 74, y2: 78, w: 5 }, { k: "seg", x1: 90, y1: 90, x2: 98, y2: 94, w: 5 }, { k: "seg", x1: 66, y1: 78, x2: 72, y2: GROUND, w: 3 }] },
    { root: [62, 72], t: 195, th: 20, sh: 20, f: 80, ua: 60, fa: 20, props: [{ k: "seg", x1: 52, y1: 78, x2: 74, y2: 78, w: 5 }, { k: "seg", x1: 90, y1: 90, x2: 98, y2: 94, w: 5 }, { k: "seg", x1: 66, y1: 78, x2: 72, y2: GROUND, w: 3 }] },
  ] },

  squat: { poses: [
    stand({ ua: 120, fa: -80, props: [{ k: "barBack" }] }),
    stand({ sh: -55, th: 180, t: -55, ua: 140, fa: -70, props: [{ k: "barBack" }] }),
  ] },
  frontSquat: { poses: [
    stand({ ua: 20, fa: -150, props: [{ k: "db" }] }),
    stand({ sh: -60, th: 175, t: -70, ua: 30, fa: -150, props: [{ k: "db" }] }),
  ] },
  lunge: { poses: [
    stand({ root: [50, GROUND], th2: 90, sh2: 90, f2: 0, props: [{ k: "db" }] }),
    stand({ root: [74, GROUND], sh: -80, th: 175, th2: 115, sh2: 175, f2: 70, ua: 90, fa: 90, props: [{ k: "db" }] }),
  ] },
  rdl: { poses: [
    stand({ ua: 90, fa: 90, props: [{ k: "bar" }] }),
    stand({ sh: -85, th: -120, t: -15, ua: 90, fa: 90, props: [{ k: "bar" }] }),
  ] },
  legPress: { poses: [
    { root: [36, 80], t: -125, th: -50, sh: 100, ua: 60, fa: 20, props: [{ k: "seg", x1: 30, y1: 84, x2: 10, y2: 56, w: 5 }, { k: "seg", x1: 28, y1: 84, x2: 50, y2: 84, w: 5 }, { k: "footPlate" }] },
    { root: [36, 80], t: -125, th: -38, sh: -38, ua: 60, fa: 20, props: [{ k: "seg", x1: 30, y1: 84, x2: 10, y2: 56, w: 5 }, { k: "seg", x1: 28, y1: 84, x2: 50, y2: 84, w: 5 }, { k: "footPlate" }] },
  ] },
  legExt: { poses: [
    { root: [48, 78], t: -95, th: 0, sh: 90, ua: 80, fa: 20, props: [...seat(52, 81, 44), { k: "shinPad" }] },
    { root: [48, 78], t: -95, th: 0, sh: 0, ua: 80, fa: 20, props: [...seat(52, 81, 44), { k: "shinPad" }] },
  ] },
  legCurl: { poses: [
    { root: [62, 76], t: 180, th: 0, sh: 0, f: 90, ua: 90, fa: 0, props: [...floorBench(80, 14, 90), { k: "shinPad" }] },
    { root: [62, 76], t: 180, th: 0, sh: -95, f: -10, ua: 90, fa: 0, props: [...floorBench(80, 14, 90), { k: "shinPad" }] },
  ] },
  hipThrust: { poses: [
    { root: [86, GROUND], rootAt: "ankle", sh: -95, th: 150, t: -170, ua: 30, fa: -20, props: [{ k: "seg", x1: 4, y1: 74, x2: 34, y2: 74, w: 5 }, { k: "seg", x1: 20, y1: 74, x2: 20, y2: GROUND, w: 3 }, { k: "bar" }] },
    { root: [86, GROUND], rootAt: "ankle", sh: -95, th: 180, t: 178, ua: 70, fa: 0, props: [{ k: "seg", x1: 4, y1: 74, x2: 34, y2: 74, w: 5 }, { k: "seg", x1: 20, y1: 74, x2: 20, y2: GROUND, w: 3 }, { k: "bar" }] },
  ] },
  glutKick: { poses: [
    stand({ root: [64, GROUND], t: -60, sh: -85, th: -95, th2: 100, sh2: 80, ua: 10, fa: 10, props: [{ k: "seg", x1: 92, y1: 30, x2: 92, y2: GROUND, w: 4 }] }),
    stand({ root: [64, GROUND], t: -60, sh: -85, th: -95, th2: 160, sh2: 175, ua: 10, fa: 10, props: [{ k: "seg", x1: 92, y1: 30, x2: 92, y2: GROUND, w: 4 }] }),
  ] },
  calf: { poses: [
    stand({ root: [58, GROUND - 6], props: [{ k: "seg", x1: 46, y1: GROUND - 3, x2: 66, y2: GROUND - 3, w: 6 }, { k: "db" }] }),
    stand({ root: [58, GROUND - 14], f: 55, props: [{ k: "seg", x1: 46, y1: GROUND - 3, x2: 66, y2: GROUND - 3, w: 6 }, { k: "db" }] }),
  ] },

  ohp: { poses: [
    stand({ ua: 60, fa: -100, props: [{ k: "bar" }] }),
    stand({ ua: -88, fa: -90, props: [{ k: "bar" }] }),
  ] },
  lateral: { front: true, poses: [
    stand({ ua: 80, fa: 85, props: [{ k: "db" }] }),
    stand({ ua: -5, fa: 0, props: [{ k: "db" }] }),
  ] },
  frontRaise: { poses: [
    stand({ ua: 85, fa: 85, props: [{ k: "db" }] }),
    stand({ ua: -5, fa: -5, props: [{ k: "db" }] }),
  ] },
  rearDelt: { poses: [
    stand({ sh: -80, th: -115, t: -20, ua: 90, fa: 90, props: [{ k: "db" }] }),
    stand({ sh: -80, th: -115, t: -20, ua: 190, fa: 190, props: [{ k: "db" }] }),
  ] },
  facePull: { poses: [
    stand({ ua: -5, fa: -5, props: [{ k: "cable", ax: 112, ay: 26 }] }),
    stand({ ua: 185, fa: -70, props: [{ k: "cable", ax: 112, ay: 26 }] }),
  ] },
  uprightRow: { front: true, poses: [
    stand({ ua: 95, fa: 100, props: [{ k: "bar" }] }),
    stand({ ua: -25, fa: 130, props: [{ k: "bar" }] }),
  ] },
  shrug: { front: true, poses: [
    stand({ ua: 90, fa: 90, props: [{ k: "db" }] }),
    stand({ root: [60, GROUND - 5], ua: 90, fa: 90, props: [{ k: "db" }] }),
  ] },

  curl: { poses: [
    stand({ ua: 80, fa: 85, props: [{ k: "db" }] }),
    stand({ ua: 82, fa: -70, props: [{ k: "db" }] }),
  ] },
  preacher: { poses: [
    stand({ t: -80, ua: 45, fa: 50, props: [{ k: "seg", x1: 66, y1: 42, x2: 82, y2: 58, w: 5 }, { k: "seg", x1: 80, y1: 58, x2: 80, y2: GROUND, w: 3 }, { k: "db" }] }),
    stand({ t: -80, ua: 45, fa: -75, props: [{ k: "seg", x1: 66, y1: 42, x2: 82, y2: 58, w: 5 }, { k: "seg", x1: 80, y1: 58, x2: 80, y2: GROUND, w: 3 }, { k: "db" }] }),
  ] },
  pushdown: { poses: [
    stand({ t: -82, ua: 92, fa: -15, props: [{ k: "cable", ax: 78, ay: 4 }] }),
    stand({ t: -82, ua: 92, fa: 88, props: [{ k: "cable", ax: 78, ay: 4 }] }),
  ] },
  skull: { poses: [
    { root: [55, 76], t: 180, th: 20, sh: 95, ua: -95, fa: -90, props: [...floorBench(), { k: "bar" }] },
    { root: [55, 76], t: 180, th: 20, sh: 95, ua: -110, fa: 175, props: [...floorBench(), { k: "bar" }] },
  ] },
  overheadExt: { poses: [
    stand({ ua: -95, fa: -90, props: [{ k: "db" }] }),
    stand({ ua: -100, fa: 125, props: [{ k: "db" }] }),
  ] },
  benchDip: { poses: [
    { root: [40, 74], t: -95, th: 0, sh: 75, ua: 100, fa: 95, props: [{ k: "seg", x1: 10, y1: 84, x2: 40, y2: 84, w: 5 }, { k: "seg", x1: 24, y1: 84, x2: 24, y2: GROUND, w: 3 }] },
    { root: [42, 90], t: -90, th: -10, sh: 70, ua: 155, fa: 60, props: [{ k: "seg", x1: 10, y1: 84, x2: 40, y2: 84, w: 5 }, { k: "seg", x1: 24, y1: 84, x2: 24, y2: GROUND, w: 3 }] },
  ] },
  triKick: { poses: [
    stand({ sh: -80, th: -115, t: -15, ua: 180, fa: 90, props: [{ k: "db" }] }),
    stand({ sh: -80, th: -115, t: -15, ua: 180, fa: 175, props: [{ k: "db" }] }),
  ] },

  swing: { poses: [
    stand({ sh: -75, th: -130, t: -25, ua: 110, fa: 115, props: [{ k: "kb" }] }),
    stand({ ua: -5, fa: -5, props: [{ k: "kb" }] }),
  ] },
  thruster: { poses: [
    stand({ sh: -55, th: 180, t: -65, ua: 40, fa: -120, props: [{ k: "bar" }] }),
    stand({ ua: -88, fa: -90, props: [{ k: "bar" }] }),
  ] },
  burpee: { poses: [
    { root: [104, GROUND - 2], rootAt: "ankle", t: 197, th: 197, sh: 197, f: 60, ua: 92, fa: 90 },
    stand({ root: [60, GROUND - 10], ua: -55, fa: -65, f: 50 }),
  ] },
  carry: { poses: [
    stand({ root: [50, GROUND], th: -80, sh: -100, th2: 100, sh2: 80, props: [{ k: "kb" }] }),
    stand({ root: [70, GROUND], th: -100, sh: -80, th2: 80, sh2: 100, props: [{ k: "kb" }] }),
  ] },
  plank: { poses: [
    { root: [104, GROUND - 2], rootAt: "ankle", t: 193, th: 193, sh: 193, f: 60, ua: 90, fa: 180 },
    { root: [104, GROUND - 2], rootAt: "ankle", t: 193, th: 193, sh: 193, f: 60, ua: 90, fa: 180 },
  ] },
  crunch: { poses: [
    { root: [60, 99], t: 180, th: -45, sh: 45, ua: -150, fa: 20 },
    { root: [60, 99], t: -140, th: -45, sh: 45, ua: -120, fa: 20 },
  ] },
  climber: { poses: [
    { root: [104, GROUND - 2], rootAt: "ankle", t: 200, th: 200, sh: 200, f: 60, th2: 100, sh2: 30, ua: 90, fa: 90 },
    { root: [104, GROUND - 2], rootAt: "ankle", t: 200, th: 200, sh: 200, f: 60, th2: 140, sh2: 160, ua: 90, fa: 90 },
  ] },

  run: { poses: [
    stand({ root: [70, GROUND], t: -80, th: -110, sh: -70, th2: 70, sh2: 140, ua: 120, fa: 30, ua2: 60, fa2: -40 }),
    stand({ root: [50, GROUND], t: -80, th: -70, sh: -110, th2: 120, sh2: 30, ua: 60, fa: -40, ua2: 120, fa2: 30 }),
  ] },
  bike: { poses: [
    { root: [50, 60], t: -55, th: 50, sh: 105, th2: 10, sh2: 80, ua: 20, fa: 15, props: [{ k: "wheel", x: 60, y: 92, r: 10 }, { k: "seg", x1: 44, y1: 62, x2: 60, y2: 92, w: 4 }, { k: "seg", x1: 76, y1: 40, x2: 60, y2: 92, w: 4 }] },
    { root: [50, 60], t: -55, th: 10, sh: 80, th2: 50, sh2: 105, ua: 20, fa: 15, props: [{ k: "wheel", x: 60, y: 92, r: 10 }, { k: "seg", x1: 44, y1: 62, x2: 60, y2: 92, w: 4 }, { k: "seg", x1: 76, y1: 40, x2: 60, y2: 92, w: 4 }] },
  ] },
  rower: { poses: [
    { root: [40, 92], t: -60, th: -40, sh: 60, ua: 30, fa: 0, props: [{ k: "seg", x1: 10, y1: 96, x2: 110, y2: 96, w: 4 }, { k: "cable", ax: 108, ay: 90 }] },
    { root: [18, 92], t: -110, th: 0, sh: 10, ua: 135, fa: 0, props: [{ k: "seg", x1: 10, y1: 96, x2: 110, y2: 96, w: 4 }, { k: "cable", ax: 108, ay: 90 }] },
  ] },
  airSquat: { poses: [
    stand({ ua: 85, fa: 85 }),
    stand({ sh: -55, th: 180, t: -55, ua: 0, fa: 0 }),
  ] },
  jumpSquat: { poses: [
    stand({ sh: -55, th: 180, t: -55, ua: 120, fa: 130 }),
    stand({ root: [60, GROUND - 6], ua: -35, fa: -45, f: 55 }),
  ] },
  bridge: { poses: [
    { root: [88, GROUND], rootAt: "ankle", sh: -100, th: 150, t: 180, ua: 5, fa: 0 },
    { root: [88, GROUND], rootAt: "ankle", sh: -100, th: 180, t: 160, ua: 20, fa: 0 },
  ] },
  legRaise: { poses: [
    { root: [56, 98], t: 180, th: -5, sh: 0, f: -60, ua: 5, fa: 0 },
    { root: [56, 98], t: 180, th: -90, sh: -90, f: 0, ua: 5, fa: 0 },
  ] },
  superman: { poses: [
    { root: [62, 98], t: 180, th: 0, sh: 0, f: 80, ua: 180, fa: 180 },
    { root: [62, 98], t: 192, th: -12, sh: -12, f: 70, ua: 198, fa: 198 },
  ] },
  wallSit: { poses: [
    stand({ root: [42, GROUND], ua: 90, fa: 90, props: [{ k: "seg", x1: 30, y1: 10, x2: 30, y2: GROUND, w: 4 }] }),
    stand({ root: [62, GROUND], sh: -90, th: 180, t: -90, ua: 0, fa: 0, props: [{ k: "seg", x1: 30, y1: 10, x2: 30, y2: GROUND, w: 4 }] }),
  ] },
  jumpingJack: { front: true, poses: [
    stand({ ua: 95, fa: 90 }),
    stand({ root: [60, GROUND - 4], ua: -55, fa: -70, spread: 16 }),
  ] },
  sidePlank: { poses: [
    { root: [104, GROUND - 2], rootAt: "ankle", t: 200, th: 200, sh: 200, f: 60, ua: 90, fa: 180, ua2: 90, fa2: 90 },
    { root: [104, GROUND - 2], rootAt: "ankle", t: 200, th: 200, sh: 200, f: 60, ua: 90, fa: 180, ua2: -90, fa2: -90 },
  ] },
  russianTwist: { poses: [
    { root: [58, 96], t: -125, th: -35, sh: 45, ua: 20, fa: -5 },
    { root: [58, 96], t: -125, th: -35, sh: 45, ua: 75, fa: 70 },
  ] },
  hollow: { poses: [
    { root: [60, 98], t: 180, th: 0, sh: 0, f: -60, ua: 180, fa: 180 },
    { root: [60, 96], t: 195, th: -15, sh: -10, f: -60, ua: 200, fa: 200 },
  ] },
  pike: { poses: [
    { root: [96, GROUND - 2], rootAt: "ankle", sh: -110, th: -110, t: 140, f: 50, ua: 120, fa: 80 },
    { root: [96, GROUND - 2], rootAt: "ankle", sh: -110, th: -110, t: 150, f: 50, ua: 60, fa: 130 },
  ] },
  highKnees: { poses: [
    stand({ th2: -10, sh2: 90, ua: 60, fa: -40, ua2: 120, fa2: 40 }),
    stand({ th2: 92, sh2: 90, ua: 120, fa: 40, ua2: 60, fa2: -40 }),
  ] },
  jump: { front: true, poses: [
    stand({ ua: 95, fa: 90 }),
    stand({ root: [60, GROUND - 10], ua: 70, fa: 70, f: 50 }),
  ] },
};

// ---------- geometría ----------
const rad = (a: number) => (a * Math.PI) / 180;
const step = (p: [number, number], ang: number, len: number): [number, number] => [p[0] + Math.cos(rad(ang)) * len, p[1] + Math.sin(rad(ang)) * len];
const mirror = (a: number) => 180 - a;

export type Prim =
  | { type: "line"; x1: number; y1: number; x2: number; y2: number; w: number; role: "body" | "active" | "back" | "prop" | "cable" }
  | { type: "circle"; cx: number; cy: number; r: number; role: "head" | "plate" | "prop"; fill?: boolean };

/** Dibuja una pose. `moving` marca qué segmentos cambian entre poses (se pintan en verde). */
export function drawPose(pose: Pose, front = false, moving: Set<string> = new Set()): Prim[] {
  const out: Prim[] = [];
  const line = (a: [number, number], b: [number, number], part: string, w = 6.5, role?: Prim["role"]) =>
    out.push({ type: "line", x1: a[0], y1: a[1], x2: b[0], y2: b[1], w, role: role ?? ((moving.has(part) ? "active" : "body") as any) });

  let hip: [number, number], knee: [number, number], ankle: [number, number];
  if (pose.rootAt === "ankle") {
    ankle = pose.root;
    // con raíz en el tobillo, sh y th apuntan hacia arriba: tobillo → rodilla → cadera
    knee = step(ankle, pose.sh, L.sh);
    hip = step(knee, pose.th, L.th);
  } else {
    hip = pose.root;
    knee = step(hip, pose.th, L.th);
    ankle = step(knee, pose.sh, L.sh);
  }
  const toe = step(ankle, pose.f ?? 0, L.foot);
  const shoulder = step(hip, pose.t, L.torso);
  const head = step(shoulder, pose.t, L.head);
  const elbow = (sh: [number, number], ua: number) => step(sh, ua, L.ua);

  const wrists: [number, number][] = [];
  if (front) {
    const sL: [number, number] = [shoulder[0] - 9, shoulder[1] + 2], sR: [number, number] = [shoulder[0] + 9, shoulder[1] + 2];
    const hL: [number, number] = [hip[0] - 5, hip[1]], hR: [number, number] = [hip[0] + 5, hip[1]];
    // piernas: de pie van rectas y algo abiertas; colgado o sentado siguen la pose
    for (const side of [1, -1]) {
      const h = side === 1 ? hR : hL;
      const sp = pose.spread ?? 4;
      const kAng = pose.rootAt === "ankle" ? (side === 1 ? 90 - sp : 90 + sp) : side === 1 ? pose.th : mirror(pose.th);
      const sAng = pose.rootAt === "ankle" ? (side === 1 ? 90 - sp / 2 : 90 + sp / 2) : side === 1 ? pose.sh : mirror(pose.sh);
      const k = step(h, kAng, L.th), a = step(k, sAng, L.sh);
      line(h, k, "th"); line(k, a, "sh");
    }
    line(sL, sR, "t"); line(hL, hR, "t"); line(shoulder, hip, "t");
    for (const side of [1, -1]) {
      const s = side === 1 ? sR : sL;
      const ua = side === 1 ? pose.ua : mirror(pose.ua), fa = side === 1 ? pose.fa : mirror(pose.fa);
      const e = elbow(s, ua), w = step(e, fa, L.fa);
      line(s, e, "ua"); line(e, w, "fa");
      wrists.push(w);
    }
  } else {
    // miembros de atrás primero (más tenues)
    if (pose.th2 != null) {
      const k2 = step(hip, pose.th2, L.th), a2 = step(k2, pose.sh2 ?? pose.th2, L.sh);
      line(hip, k2, "th2", 6, moving.has("th2") ? "active" : "back"); line(k2, a2, "sh2", 6, moving.has("sh2") ? "active" : "back");
      line(a2, step(a2, pose.f2 ?? 0, L.foot), "f2", 5, "back");
    }
    if (pose.ua2 != null) {
      const e2 = elbow(shoulder, pose.ua2), w2 = step(e2, pose.fa2 ?? pose.ua2, L.fa);
      line(shoulder, e2, "ua2", 6, "back"); line(e2, w2, "fa2", 6, "back");
    }
    line(hip, knee, "th"); line(knee, ankle, "sh"); line(ankle, toe, "f", 5.5);
    line(hip, shoulder, "t", 8);
    const e = elbow(shoulder, pose.ua), w = step(e, pose.fa, L.fa);
    line(shoulder, e, "ua"); line(e, w, "fa");
    wrists.push(w);
  }
  out.push({ type: "circle", cx: head[0], cy: head[1], r: 7, role: "head", fill: true });

  for (const p of pose.props ?? []) {
    if (p.k === "seg") out.unshift({ type: "line", x1: p.x1, y1: p.y1, x2: p.x2, y2: p.y2, w: p.w ?? 4, role: "prop" });
    else if (p.k === "cable") wrists.slice(0, 1).forEach(w => {
      out.unshift({ type: "line", x1: w[0], y1: w[1], x2: p.ax, y2: p.ay, w: 1.5, role: "cable" });
      out.push({ type: "circle", cx: p.ax, cy: p.ay, r: 3, role: "prop", fill: true });
    });
    else if (p.k === "bar") {
      if (front && wrists.length === 2) out.push({ type: "line", x1: wrists[1][0] - 8, y1: wrists[1][1], x2: wrists[0][0] + 8, y2: wrists[0][1], w: 3, role: "prop" });
      else wrists.forEach(w => out.push({ type: "circle", cx: w[0], cy: w[1], r: 7, role: "plate" }));
    } else if (p.k === "barBack") out.push({ type: "circle", cx: shoulder[0] - 2, cy: shoulder[1] + 1, r: 7, role: "plate" });
    else if (p.k === "db") wrists.forEach(w => {
      out.push({ type: "line", x1: w[0] - 5, y1: w[1], x2: w[0] + 5, y2: w[1], w: 5, role: "prop" });
    });
    else if (p.k === "kb") wrists.slice(0, 1).forEach(w => out.push({ type: "circle", cx: w[0], cy: w[1] + 5, r: 5, role: "prop", fill: true }));
    else if (p.k === "footPlate") {
      const n = step(ankle, (pose.sh ?? 0) + 90, 9), m = step(ankle, (pose.sh ?? 0) - 90, 9);
      out.push({ type: "line", x1: n[0], y1: n[1], x2: m[0], y2: m[1], w: 5, role: "prop" });
    } else if (p.k === "shinPad") out.push({ type: "circle", cx: ankle[0], cy: ankle[1], r: 4, role: "prop", fill: true });
    else if (p.k === "wheel") out.unshift({ type: "circle", cx: p.x, cy: p.y, r: p.r, role: "prop" });
  }
  return out;
}

const KEYS = ["t", "th", "sh", "f", "ua", "fa", "th2", "sh2"] as const;

/** Las dos poses del patrón, con los segmentos que se mueven resaltados. */
export function drawPattern(id: PatternId): [Prim[], Prim[]] {
  const p = PATTERNS[id];
  const [a, b] = p.poses;
  const moving = new Set<string>();
  KEYS.forEach(k => {
    if (Math.abs(((a as any)[k] ?? 0) - ((b as any)[k] ?? 0)) > 8) moving.add(k);
  });
  // si se mueve el antebrazo, el brazo también se ve como parte del gesto
  if (moving.has("ua")) moving.add("fa");
  return [drawPose(a, p.front, moving), drawPose(b, p.front, moving)];
}
