import { Platform, Share } from "react-native";
import { useSettingsStore } from "../store/useSettingsStore";
import { useRoutineStore } from "../store/useRoutineStore";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { useActivityStore } from "../store/useActivityStore";

const KIND = "gym-app-backup";

/** Todo lo tuyo en un texto (JSON): perfil, rutinas, historial y actividades. */
export function buildBackup() {
  const st = useSettingsStore.getState();
  return JSON.stringify({
    kind: KIND,
    version: 1,
    exportedAt: new Date().toISOString(),
    settings: {
      name: st.name, age: st.age, weightKg: st.weightKg, heightCm: st.heightCm,
      sex: st.sex, bodyFat: st.bodyFat, kgStep: st.kgStep,
    },
    routines: useRoutineStore.getState().routines,
    history: useWorkoutStore.getState().history,
    activities: useActivityStore.getState().activities,
  });
}

/** Guarda la copia: en el navegador descarga un archivo; en el teléfono abre "Compartir" (Drive, mail, WhatsApp…). */
export async function exportBackup(): Promise<boolean> {
  const json = buildBackup();
  const file = `gym-copia-${new Date().toISOString().slice(0, 10)}.json`;
  try {
    if (Platform.OS === "web") {
      const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
      const a = document.createElement("a");
      a.href = url; a.download = file;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } else {
      const r = await Share.share({ title: file, message: json });
      if (r.action === Share.dismissedAction) return false;
    }
    useSettingsStore.getState().markBackup();
    return true;
  } catch {
    return false;
  }
}

/** En el navegador: elegir el archivo de copia. Devuelve su texto (o null si cancelás). */
export function pickBackupFileWeb(): Promise<string | null> {
  return new Promise(resolve => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json,.txt";
    input.onchange = () => {
      const f = input.files?.[0];
      if (!f) return resolve(null);
      f.text().then(resolve, () => resolve(null));
    };
    input.click();
  });
}

export interface BackupSummary { routines: number; workouts: number; activities: number; exportedAt?: string }

/** Revisa que el texto sea una copia válida. Devuelve el contenido o un mensaje de error. */
export function parseBackup(text: string): { data: any; summary: BackupSummary } | { error: string } {
  let data: any;
  try { data = JSON.parse(text.trim()); } catch { return { error: "Eso no parece una copia de la app. Pegá el texto completo." }; }
  if (data?.kind !== KIND || !Array.isArray(data.routines) || !Array.isArray(data.history))
    return { error: "El texto no es una copia de seguridad de esta app." };
  return {
    data,
    summary: {
      routines: data.routines.length, workouts: data.history.length,
      activities: Array.isArray(data.activities) ? data.activities.length : 0, exportedAt: data.exportedAt,
    },
  };
}

/** Reemplaza todos los datos actuales por los de la copia. */
export function restoreBackup(data: any) {
  const s = data.settings ?? {};
  useSettingsStore.setState({
    name: s.name ?? "", age: s.age ?? null, weightKg: s.weightKg ?? null, heightCm: s.heightCm ?? null,
    sex: s.sex ?? null, bodyFat: s.bodyFat ?? null, kgStep: s.kgStep ?? 2.5, seeded: true,
  });
  useRoutineStore.setState({ routines: data.routines });
  useWorkoutStore.setState({ history: data.history, active: null, timer: null });
  useActivityStore.setState({ activities: Array.isArray(data.activities) ? data.activities : [] });
}
