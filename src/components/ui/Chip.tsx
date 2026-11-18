import { Pressable, Text } from "react-native";

export function Chip({ label, selected, onPress }: { label: string; selected?: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className={`mr-2 mb-2 px-3 py-2 rounded-full border ${selected ? "bg-emerald-500 border-emerald-500" : "border-zinc-700"}`}
    >
      <Text className={selected ? "text-black font-semibold" : "text-zinc-300"}>{label}</Text>
    </Pressable>
  );
}
