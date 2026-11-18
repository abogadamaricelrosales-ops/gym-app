import { View, Text, Pressable } from "react-native";
import { useRestTimer } from "../../hooks/useRestTimer";
import { useWorkoutStore } from "../../store/useWorkoutStore";

export function RestTimerBar() {
  const { active, label, progress } = useRestTimer();
  const adjust = useWorkoutStore(s => s.adjustRest);
  const skip = useWorkoutStore(s => s.skipRest);
  if (!active) return null;
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-zinc-900 px-4 pb-8 pt-3">
      <View className="h-1 w-full rounded bg-zinc-700 mb-3">
        <View className="h-1 rounded bg-emerald-400" style={{ width: `${progress * 100}%` }} />
      </View>
      <View className="flex-row items-center justify-between">
        <Pressable onPress={() => adjust(-15)} className="px-4 py-2 rounded-lg bg-zinc-800"><Text className="text-white">-15s</Text></Pressable>
        <Text className="text-white text-3xl font-bold">{label}</Text>
        <Pressable onPress={() => adjust(15)} className="px-4 py-2 rounded-lg bg-zinc-800"><Text className="text-white">+15s</Text></Pressable>
        <Pressable onPress={skip} className="px-4 py-2 rounded-lg bg-emerald-500"><Text className="text-black font-semibold">Saltar</Text></Pressable>
      </View>
    </View>
  );
}
