import { useState } from "react";
import { create } from "zustand";
import { Modal, View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { navigationRef } from "../app/RootNavigator";
import type { Routine } from "../types/routine";
import type { Adjustment } from "../utils/load";

interface Pending { routine: Routine; adj?: Adjustment | null }
const usePending = create<{ pending: Pending | null; set: (p: Pending | null) => void }>()(set => ({
  pending: null,
  set: pending => set({ pending }),
}));

const openWorkout = () => { if (navigationRef.isReady()) navigationRef.navigate("Workout"); };

/**
 * Empieza un entreno. Si ya hay otro sin terminar, pregunta qué hacer en vez de
 * abrir el viejo sin avisar.
 */
export function startWorkout(routine: Routine, adj?: Adjustment | null) {
  const { active, start } = useWorkoutStore.getState();
  if (!active) { start(routine, adj); openWorkout(); return; }
  if (active.routineId === routine.id) { openWorkout(); return; }
  usePending.getState().set({ routine, adj });
}

/** Hoja que aparece cuando querés empezar una rutina con otro entreno en curso. */
export function StartGuard() {
  const pending = usePending(s => s.pending);
  const setPending = usePending(s => s.set);
  const active = useWorkoutStore(s => s.active);
  const insets = useSafeAreaInsets();
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const close = () => { setPending(null); setConfirmDiscard(false); };
  if (!pending || !active) return null;
  const done = active.exercises.flatMap(e => e.sets).filter(s => s.completed).length;

  const replace = async (save: boolean) => {
    const { finish, discard, start } = useWorkoutStore.getState();
    if (save) await finish(); else await discard();
    start(pending.routine, pending.adj);
    close();
    openWorkout();
  };

  return (
    <Modal visible transparent animationType="fade" onRequestClose={close}>
      <Pressable onPress={close} className="flex-1 bg-black/70 justify-end">
        <Pressable className="bg-card rounded-t-4xl p-6 gap-3" style={{ paddingBottom: insets.bottom + 24 }}>
          <Text className="text-white text-xl font-bold">Tenés un entreno sin terminar</Text>
          <Text className="text-mute mb-2">
            «{active.name}» va {done} {done === 1 ? "serie hecha" : "series hechas"}. ¿Qué hacemos antes de empezar «{pending.routine.name}»?
          </Text>
          <Pressable onPress={() => { close(); openWorkout(); }} className="h-14 rounded-full bg-lime items-center justify-center">
            <Text className="text-ink font-bold text-base">Seguir con el que tengo</Text>
          </Pressable>
          <Pressable onPress={() => replace(true)} className="h-14 rounded-full bg-card2 items-center justify-center">
            <Text className="text-white font-semibold">Guardar ese y empezar el nuevo</Text>
          </Pressable>
          <Pressable
            onPress={() => (confirmDiscard ? replace(false) : setConfirmDiscard(true))}
            className={`h-12 rounded-full items-center justify-center ${confirmDiscard ? "bg-red-500" : ""}`}
          >
            <Text className={confirmDiscard ? "text-white font-bold" : "text-red-400"}>
              {confirmDiscard ? "Tocá otra vez para descartarlo" : "Descartar ese y empezar el nuevo"}
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
