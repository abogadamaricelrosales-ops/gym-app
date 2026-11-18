import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Icon } from "./ui/Icon";
import { ActivitySheet } from "./ActivitySheet";
import { useLoadAnalysis } from "../hooks/useLoadAnalysis";
import { useActivityStore } from "../store/useActivityStore";
import { ACTIVITY_INFO } from "../types/activity";
import type { Adjustment, LoadLevel } from "../utils/load";
import type { Category } from "../types/routine";
import { C } from "../constants/theme";

export const LEVEL_STYLE: Record<LoadLevel, { color: string; label: string; icon: "checkmark-circle" | "alert-circle" | "warning" }> = {
  ok: { color: C.lime, label: "Carga en orden", icon: "checkmark-circle" },
  alto: { color: "#FBBF24", label: "Carga alta", icon: "alert-circle" },
  "muy alto": { color: "#F87171", label: "Sobrecarga", icon: "warning" },
};

const ago = (at: number) => {
  const d = Math.floor((Date.now() - at) / 86_400_000);
  return d <= 0 ? "Hoy" : d === 1 ? "Ayer" : `Hace ${d} días`;
};

/**
 * Tarjeta de sobrecarga: suma el gimnasio y lo que hiciste afuera, y ajusta el entreno
 * sugerido para hoy (sea tu rutina o la de un referente).
 */
export function LoadCard({ category, title, onStart }: {
  category: Category | null;
  title?: string;
  onStart?: (adj: Adjustment) => void;
}) {
  const a = useLoadAnalysis(category);
  const activities = useActivityStore(s => s.activities);
  const remove = useActivityStore(s => s.removeActivity);
  const [open, setOpen] = useState(false);
  const st = LEVEL_STYLE[a.level];
  const recent = activities.slice(0, 3);
  const pct = a.chronic > 0 ? Math.min(1, a.acute / (a.chronic * 1.5)) : Math.min(1, a.acute / 2500);

  return (
    <View className="bg-card border border-line rounded-4xl p-5">
      <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: st.color + "22" }}>
          <Icon name={st.icon} size={20} color={st.color} />
        </View>
        <View className="flex-1 ml-3">
          <Text className="text-mute text-xs font-semibold tracking-widest">CARGA Y RECUPERACIÓN</Text>
          <Text className="text-white text-lg font-bold" style={{ color: st.color }}>{st.label}</Text>
        </View>
        <Pressable onPress={() => setOpen(true)} className="flex-row items-center h-10 px-3.5 rounded-full bg-lime">
          <Icon name="add" size={18} color={C.ink} />
          <Text className="text-ink font-bold ml-1">Otra actividad</Text>
        </Pressable>
      </View>

      <View className="h-2 rounded-full bg-card2 mt-4 overflow-hidden">
        <View className="h-2 rounded-full" style={{ width: `${Math.max(4, pct * 100)}%`, backgroundColor: st.color }} />
      </View>
      <View className="flex-row justify-between mt-1.5">
        <Text className="text-mute text-[11px]">Últimos 7 días: {Math.round(a.acute)} pts</Text>
        <Text className="text-mute text-[11px]">Tu promedio: {a.chronic > 0 ? Math.round(a.chronic) : "—"} pts</Text>
      </View>

      {category && title && <Text className="text-white font-semibold mt-4">Para hoy: {title}</Text>}
      {a.reasons.map(r => <Text key={r} className="text-mute text-sm mt-1">• {r}</Text>)}
      <Text className="text-white/90 text-sm mt-2">{a.advice}</Text>

      {a.adjustment && onStart && (
        <Pressable onPress={() => onStart(a.adjustment!)} className="flex-row items-center justify-center h-12 rounded-full mt-4 border" style={{ borderColor: st.color }}>
          <Icon name="speedometer-outline" size={18} color={st.color} />
          <Text className="font-bold ml-2" style={{ color: st.color }}>Empezar ajustado · {a.adjustment.label.split(":")[0]}</Text>
        </Pressable>
      )}

      {recent.length > 0 && (
        <View className="mt-4 pt-3 border-t border-line">
          {recent.map(x => (
            <View key={x.id} className="flex-row items-center py-1.5">
              <Icon name={ACTIVITY_INFO[x.kind].icon} size={16} color={C.lime} />
              <Text className="text-white ml-2 flex-1" numberOfLines={1}>{x.kind} · {x.minutes} min · esfuerzo {x.rpe}</Text>
              <Text className="text-mute text-xs mr-2">{ago(x.at)}</Text>
              <Pressable onPress={() => remove(x.id)} hitSlop={8}><Icon name="close" size={15} color={C.mute} /></Pressable>
            </View>
          ))}
        </View>
      )}
      <ActivitySheet visible={open} onClose={() => setOpen(false)} />
    </View>
  );
}
