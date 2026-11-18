import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsState {
  name: string;
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
      seeded: false,
      lastQuote: -1,
      setLastQuote: i => set({ lastQuote: i }),
      setName: name => set({ name }),
      markSeeded: () => set({ seeded: true }),
    }),
    { name: "settings-v1", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
