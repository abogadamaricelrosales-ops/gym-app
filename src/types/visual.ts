// Lienzo normalizado 100×100 (y crece hacia abajo)
export type Pt = [number, number];
export type JointName = "head" | "neck" | "shoulder" | "elbow" | "wrist" | "hip" | "knee" | "ankle" | "toe";
export type Pose = Partial<Record<JointName, Pt>>;

export interface Equipment { type: "barbell" | "dumbbell" | "kettlebell" | "none"; attachTo: "wrist" | "shoulder" | "hip"; }
export interface AngleMarker { joint: JointName; label: string; phase: "start" | "end"; }
export interface ExerciseVisual {
  phases: [{ label: string; pose: Pose }, { label: string; pose: Pose }];
  highlight: JointName[];      // articulaciones clave en naranja
  equipment?: Equipment;
  angles?: AngleMarker[];
  pathJoint?: JointName;       // trayectoria punteada en verde
  cue: string;
  durationMs?: number;
}
