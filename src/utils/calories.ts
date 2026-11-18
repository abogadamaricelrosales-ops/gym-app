import { ACTIVITIES } from "../constants/activities";
import type { ActivityType } from "../types/readiness";

// kcal = MET × peso(kg) × horas
export const estimateCalories = (activity: ActivityType, durationMin: number, bodyWeightKg: number) =>
  Math.round(ACTIVITIES[activity].met * bodyWeightKg * (durationMin / 60));

// Pesas: MET ≈ 3.5 (ligero) a 6 (intenso), según RPE medio
export const estimateGymCalories = (durationMin: number, rpe: number, bodyWeightKg: number) =>
  Math.round((3 + rpe * 0.3) * bodyWeightKg * (durationMin / 60));
