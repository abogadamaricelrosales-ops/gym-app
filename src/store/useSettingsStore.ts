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
  /** % de grasa medido (opcional) */
  bodyFat: number | null;
  setProfile: (p: Partial<Pick<SettingsState, "name" | "age" | "weightKg" | "heightCm" | "sex" | "bodyFat">>) => void;
  /** Cuánto suben/bajan los botones + y − de los kilos */
  kgStep: number;
  cycleKgStep: () => void;
  /** Fecha de la última copia de seguridad */
  lastBackupAt: number | null;
  markBackup: () => void;
  /** Borra tus datos personales (nombre, edad, peso, estatura, sexo y % de grasa). */
  clearProfile: () => void;
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
      bodyFat: null,
      setProfile: p => set(p),
      kgStep: 2.5,
      cycleKgStep: () => set(s => ({ kgStep: s.kgStep === 1 ? 2.5 : s.kgStep === 2.5 ? 5 : 1 })),
      lastBackupAt: null,
      markBackup: () => set({ lastBackupAt: Date.now() }),
      clearProfile: () => set({ name: "", age: null, weightKg: null, heightCm: null, sex: null, bodyFat: null }),
      seeded: false,
      lastQuote: -1,
      setLastQuote: i => set({ lastQuote: i }),
      setName: name => set({ name }),
      markSeeded: () => set({ seeded: true }),
    }),
    { name: "settings-v1", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
