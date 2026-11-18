import { useState } from "react";
import { View, Text, Pressable, Modal, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "./ui/Icon";
import { useActivityStore } from "../store/useActivityStore";
import { ACTIVITY_INFO, ACTIVITY_KINDS, type ActivityKind } from "../types/activity";
import { startOfDay } from "./WeekStrip";
import { C } from "../constants/theme";

const RPE_LABEL = ["", "Muy suave", "Muy suave", "Suave", "Moderado", "Moderado", "Exigente", "Exigente", "Muy duro", "Muy duro", "Máximo"];
const WHEN = [{ label: "Hoy", days: 0 }, { label: "Ayer", days: 1 }, { label: "Anteayer", days: 2 }];

/** Hoja para cargar una actividad hecha fuera del gimnasio. */
export function ActivitySheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const add = useActivityStore(s => s.addActivity);
  const insets = useSafeAreaInsets();
  const [kind, setKind] = useState<ActivityKind>("Correr");
  const [minutes, setMinutes] = useState(45);
  const [rpe, setRpe] = useState(6);
  const [when, setWhen] = useState(0);

  const save = () => {
    // hoy = ahora; días anteriores = a las 19 h de ese día
    const at = when === 0 ? Date.now() : startOfDay(new Date()) - when * 86_400_000 + 19 * 3_600_000;
    add({ kind, minutes, rpe, at });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/60" onPress={onClose} />
      <View className="bg-card rounded-t-4xl px-5 pt-5 border-t border-line" style={{ paddingBottom: insets.bottom + 20, maxHeight: "88%" }}>
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-2xl font-extrabold">Otra actividad</Text>
          <Pressable onPress={onClose} hitSlop={10} className="w-10 h-10 rounded-full bg-card2 items-center justify-center">
            <Icon name="close" size={18} />
          </Pressable>
        </View>
        <Text className="text-mute mt-1">Lo que hiciste fuera del gimnasio también suma carga.</Text>
        <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
          <Text className="text-mute text-xs font-semibold tracking-widest mb-2">¿QUÉ HICISTE?</Text>
          <View className="flex-row flex-wrap">
            {ACTIVITY_KINDS.map(k => {
              const on = k === kind;
              return (
                <Pressable key={k} onPress={() => setKind(k)}
                  className={`flex-row items-center h-10 px-3.5 rounded-full mr-2 mb-2 ${on ? "bg-lime" : "bg-card2"}`}>
                  <Icon name={ACTIVITY_INFO[k].icon} size={15} color={on ? C.ink : C.lime} />
                  <Text className={`ml-1.5 font-semibold ${on ? "text-ink" : "text-white"}`}>{k}</Text>
                </Pressable>
              );
            })}
          </View>

          <Text className="text-mute text-xs font-semibold tracking-widest mt-4 mb-2">DURACIÓN</Text>
          <View className="flex-row items-center bg-card2 rounded-3xl p-2">
            <Pressable onPress={() => setMinutes(m => Math.max(5, m - 5))} className="w-12 h-12 rounded-2xl bg-ink items-center justify-center">
              <Icon name="remove" size={22} />
            </Pressable>
            <Text className="flex-1 text-center text-white text-3xl font-extrabold">{minutes}<Text className="text-mute text-base"> min</Text></Text>
            <Pressable onPress={() => setMinutes(m => Math.min(300, m + 5))} className="w-12 h-12 rounded-2xl bg-ink items-center justify-center">
              <Icon name="add" size={22} />
            </Pressable>
          </View>

          <View className="flex-row justify-between items-end mt-4 mb-2">
            <Text className="text-mute text-xs font-semibold tracking-widest">ESFUERZO (1–10)</Text>
            <Text className="text-lime font-semibold">{RPE_LABEL[rpe]}</Text>
          </View>
          <View className="flex-row gap-1">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
              <Pressable key={n} onPress={() => setRpe(n)}
                className={`flex-1 h-11 rounded-xl items-center justify-center ${n <= rpe ? "bg-lime" : "bg-card2"}`}>
                <Text className={`font-bold ${n <= rpe ? "text-ink" : "text-mute"}`}>{n}</Text>
              </Pressable>
            ))}
          </View>

          <Text className="text-mute text-xs font-semibold tracking-widest mt-4 mb-2">¿CUÁNDO?</Text>
          <View className="flex-row gap-2">
            {WHEN.map(w => (
              <Pressable key={w.label} onPress={() => setWhen(w.days)}
                className={`flex-1 h-11 rounded-full items-center justify-center ${when === w.days ? "bg-lime" : "bg-card2"}`}>
                <Text className={`font-semibold ${when === w.days ? "text-ink" : "text-white"}`}>{w.label}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
        <Pressable onPress={save} className="h-14 rounded-full bg-lime items-center justify-center mt-5">
          <Text className="text-ink text-base font-extrabold">Guardar actividad</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
