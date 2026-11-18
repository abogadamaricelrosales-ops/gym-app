import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uid } from "../utils/id";
import type { LoadEvent, ActivityType, MuscleFatigue, MuscleGroup } from "../types/readiness";
import type { Workout } from "../types/workout";
import { ACTIVITIES } from "../constants/activities";
import { fatigueGroupOf } from "../utils/muscleGroups";
import { computeMuscleFatigue } from "../utils/fatigue";

interface Settings { bodyWeightKg: number; }

interface ReadinessState {
  events: LoadEvent[];
  settings: Settings;
  muscleFatigue: MuscleFatigue;   // caché derivada, NO se persiste
  lastComputedAt: number;

  logActivity: (a: { activity: ActivityType; durationMin: number; rpe: number; date?: number }) => void;
  logGymWorkout: (w: Workout, sessionRpe: number) => void;
  removeEvent: (id: string) => void;
  removeWorkoutEvents: (workoutId: string) => void;
  setBodyWeight: (kg: number) => void;
  refreshFatigue: () => MuscleFatigue;
}

export const useReadinessStore = create<ReadinessState>()(
  persist(
    immer((set, get) => ({
      events: [],
      settings: { bodyWeightKg: 75 },
      muscleFatigue: computeMuscleFatigue([]),
      lastComputedAt: 0,

      logActivity: ({ activity, durationMin, rpe, date = Date.now() }) => {
        set(s => {
          s.events.push({
            id: uid(), date, source: "extra", activity,
            durationMin, rpe, sRPE: durationMin * rpe,
            distribution: { ...ACTIVITIES[activity].distribution },
          });
        });
        get().refreshFatigue();
      },

      // Llamalo desde finishWorkout(): reparte el sRPE según las series por grupo
      logGymWorkout: (w, sessionRpe) => {
        const durationMin = Math.max(1, Math.round(((w.finishedAt ?? Date.now()) - w.startedAt) / 60000));
        const setsByGroup: Partial<Record<MuscleGroup, number>> = {};
        let total = 0;
        for (const ex of w.exercises) {
          const g: MuscleGroup = fatigueGroupOf(ex.name, ex.muscleGroup) ?? "core";
          setsByGroup[g] = (setsByGroup[g] ?? 0) + ex.sets.length;
          total += ex.sets.length;
        }
        if (!total) return;
        const distribution = Object.fromEntries(
          Object.entries(setsByGroup).map(([g, n]) => [g, n! / total])
        ) as Partial<Record<MuscleGroup, number>>;
        set(s => {
          s.events.push({
            id: uid(), date: w.finishedAt ?? Date.now(), source: "gym",
            workoutId: w.id, durationMin, rpe: sessionRpe, sRPE: durationMin * sessionRpe, distribution,
          });
        });
        get().refreshFatigue();
      },

      removeEvent: (id) => {
        set(s => { s.events = s.events.filter(e => e.id !== id); });
        get().refreshFatigue();
      },

      removeWorkoutEvents: (workoutId) => {
        set(s => { s.events = s.events.filter(e => e.workoutId !== workoutId); });
        get().refreshFatigue();
      },

      setBodyWeight: (kg) => set(s => { s.settings.bodyWeightKg = kg; }),

      refreshFatigue: () => {
        const f = computeMuscleFatigue(get().events);
        set(s => { s.muscleFatigue = f; s.lastComputedAt = Date.now(); });
        return f;
      },
    })),
    {
      name: "readiness-v1", version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: s => ({ events: s.events, settings: s.settings }),
      onRehydrateStorage: () => state => state?.refreshFatigue(), // recalcula al abrir
    }
  )
);
