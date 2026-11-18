import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Sex = "hombre" | "mujer";

interface SettingsState {
  name: string;
  age: number | null;
  weightKg: number | null;
  heightCm: number | null;
  sex: Sex | null;
  setProfile: (p: Partial<Pick<SettingsState, "name" | "age" | "weightKg" | "heightCm" | "sex">>) => void;
  seeded: boolean;
  lastQuote: number;
  setLastQuote: (i: number) => void;
  setName: (name: string) => void;
  markSeeded: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      name: "",
      age: null,
      weightKg: null,
      heightCm: null,
      sex: null,
      setProfile: p => set(p),
      seeded: false,
      lastQuote: -1,
      setLastQuote: i => set({ lastQuote: i }),
      setName: name => set({ name }),
      markSeeded: () => set({ seeded: true }),
    }),
    { name: "settings-v1", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
