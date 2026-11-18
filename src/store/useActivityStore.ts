import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Activity } from "../types/activity";
import { uid } from "../utils/id";

interface ActivityState {
  activities: Activity[]; // más reciente primero
  addActivity: (a: Omit<Activity, "id">) => void;
  removeActivity: (id: string) => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    set => ({
      activities: [],
      addActivity: a => set(s => ({ activities: [{ ...a, id: uid() }, ...s.activities].sort((x, y) => y.at - x.at) })),
      removeActivity: id => set(s => ({ activities: s.activities.filter(a => a.id !== id) })),
    }),
    { name: "activities-v1", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
