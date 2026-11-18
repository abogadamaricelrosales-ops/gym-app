import type { Category } from "./routine";
import type { IconName } from "../components/ui/Icon";

export type ActivityKind =
  | "Correr" | "Caminar" | "Bicicleta" | "Natación" | "Fútbol" | "Pádel / Tenis"
  | "Baile" | "Yoga / Pilates" | "Escalada" | "Trabajo físico" | "Otro";

export interface Activity {
  id: string;
  kind: ActivityKind;
  minutes: number;
  /** Esfuerzo percibido 1–10 */
  rpe: number;
  at: number;
  note?: string;
}

export const ACTIVITY_INFO: Record<ActivityKind, { icon: IconName; met: number; regions: Category[] }> = {
  Correr: { icon: "walk", met: 9, regions: ["Piernas", "Cardio"] },
  Caminar: { icon: "footsteps", met: 3.5, regions: ["Piernas"] },
  Bicicleta: { icon: "bicycle", met: 7, regions: ["Piernas", "Cardio"] },
  Natación: { icon: "water", met: 7, regions: ["Espalda", "Hombros", "Cardio"] },
  Fútbol: { icon: "football", met: 8, regions: ["Piernas", "Cardio"] },
  "Pádel / Tenis": { icon: "tennisball", met: 7, regions: ["Hombros", "Piernas", "Cardio"] },
  Baile: { icon: "musical-notes", met: 5, regions: ["Piernas", "Cardio"] },
  "Yoga / Pilates": { icon: "body", met: 3, regions: ["Full body"] },
  Escalada: { icon: "trending-up", met: 8, regions: ["Espalda", "Bíceps", "Hombros"] },
  "Trabajo físico": { icon: "hammer", met: 4, regions: ["Full body"] },
  Otro: { icon: "ellipse", met: 5, regions: ["Full body"] },
};

export const ACTIVITY_KINDS = Object.keys(ACTIVITY_INFO) as ActivityKind[];
