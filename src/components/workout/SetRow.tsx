import { View, Text, TextInput, Pressable } from "react-native";
import type { LoggedSet } from "../../types/workout";
import { useWorkoutStore } from "../../store/useWorkoutStore";

const INPUT = "flex-1 min-w-0 h-12 bg-zinc-950 border border-zinc-800 text-white text-lg font-semibold rounded-xl text-center";

export function SetRow({ exId, set, index }: { exId: string; set: LoggedSet; index: number }) {
  const update = useWorkoutStore(s => s.updateSet);
  const complete = useWorkoutStore(s => s.completeSet);
  const num = (v: string) => Number(v.replace(",", ".")) || 0;
  const done = set.completed;

  return (
    <View className={`flex-row items-center gap-2 py-1.5 ${done ? "opacity-90" : ""}`}>
      <View className={`w-8 h-8 rounded-full items-center justify-center ${done ? "bg-orange-500/15" : "bg-zinc-950"}`}>
        <Text className={`font-bold ${done ? "text-orange-500" : "text-zinc-500"}`}>{index + 1}</Text>
      </View>
      <TextInput
        className={INPUT}
        keyboardType="decimal-pad"
        value={set.weight ? String(set.weight) : ""}
        placeholder="kg"
        placeholderTextColor="#52525b"
        onChangeText={v => update(exId, set.id, { weight: num(v) })}
      />
      <TextInput
        className={INPUT}
        keyboardType="number-pad"
        value={set.reps ? String(set.reps) : ""}
        placeholder="reps"
        placeholderTextColor="#52525b"
        onChangeText={v => update(exId, set.id, { reps: num(v) })}
      />
      <Pressable
        onPress={() => complete(exId, set.id)}
        accessibilityLabel={done ? "Desmarcar serie" : "Completar serie"}
        className={`w-12 h-12 rounded-xl items-center justify-center ${done ? "bg-orange-500" : "bg-zinc-950 border border-zinc-800"}`}
      >
        <Text className={`text-xl font-bold ${done ? "text-zinc-950" : "text-zinc-600"}`}>✓</Text>
      </Pressable>
    </View>
  );
}
