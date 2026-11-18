import { View, Text, TextInput, Pressable } from "react-native";
import type { LoggedSet } from "../../types/workout";
import { useWorkoutStore } from "../../store/useWorkoutStore";

export function SetRow({ exId, set, index }: { exId: string; set: LoggedSet; index: number }) {
  const update = useWorkoutStore(s => s.updateSet);
  const complete = useWorkoutStore(s => s.completeSet);
  const num = (v: string) => Number(v.replace(",", ".")) || 0;
  return (
    <View className={`flex-row items-center gap-2 py-2 px-2 rounded-lg ${set.completed ? "bg-emerald-900/40" : ""}`}>
      <Text className="w-6 text-zinc-400">{index + 1}</Text>
      <TextInput className="flex-1 min-w-0 bg-zinc-800 text-white rounded px-2 py-2 text-center" keyboardType="decimal-pad"
        value={set.weight ? String(set.weight) : ""} placeholder="kg" placeholderTextColor="#71717a"
        onChangeText={v => update(exId, set.id, { weight: num(v) })} />
      <TextInput className="flex-1 min-w-0 bg-zinc-800 text-white rounded px-2 py-2 text-center" keyboardType="number-pad"
        value={set.reps ? String(set.reps) : ""} placeholder="reps" placeholderTextColor="#71717a"
        onChangeText={v => update(exId, set.id, { reps: num(v) })} />
      <Pressable onPress={() => complete(exId, set.id)}
        className={`w-10 h-10 rounded-lg items-center justify-center ${set.completed ? "bg-emerald-500" : "bg-zinc-700"}`}>
        <Text className="text-white text-lg">✓</Text>
      </Pressable>
    </View>
  );
}
