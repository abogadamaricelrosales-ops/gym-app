import { View, Text, Pressable } from "react-native";
import { useRestTimer } from "../../hooks/useRestTimer";
import { useWorkoutStore } from "../../store/useWorkoutStore";

export function RestTimerBar() {
  const { active, label, progress } = useRestTimer();
  const adjust = useWorkoutStore(s => s.adjustRest);
  const skip = useWorkoutStore(s => s.skipRest);
  if (!active) return null;
  return (
    <View className="absolute bottom-3 left-3 right-3 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 pt-3 pb-4">
      <View className="h-1.5 w-full rounded-full bg-zinc-800 mb-3 overflow-hidden">
        <View className="h-1.5 rounded-full bg-orange-500" style={{ width: `${Math.min(1, progress) * 100}%` }} />
      </View>
      <View className="flex-row items-center justify-between">
        <Pressable onPress={() => adjust(-15)} className="w-14 h-12 rounded-xl bg-zinc-950 border border-zinc-800 items-center justify-center">
          <Text className="text-zinc-300 font-semibold">-15s</Text>
        </Pressable>
        <View className="items-center">
          <Text className="text-zinc-500 text-xs font-semibold tracking-widest">DESCANSO</Text>
          <Text className="text-orange-500 text-4xl font-extrabold" style={{ fontVariant: ["tabular-nums"] }}>{label}</Text>
        </View>
        <Pressable onPress={() => adjust(15)} className="w-14 h-12 rounded-xl bg-zinc-950 border border-zinc-800 items-center justify-center">
          <Text className="text-zinc-300 font-semibold">+15s</Text>
        </Pressable>
        <Pressable onPress={skip} className="h-12 px-4 rounded-xl bg-orange-500 items-center justify-center">
          <Text className="text-zinc-950 font-bold">Saltar</Text>
        </Pressable>
      </View>
    </View>
  );
}
