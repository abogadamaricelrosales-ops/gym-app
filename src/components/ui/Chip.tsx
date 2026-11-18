import { Pressable, Text } from "react-native";

export function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className={`h-10 px-5 rounded-full items-center justify-center mr-2 ${active ? "bg-lime" : "bg-card border border-line"}`}
    >
      <Text className={`font-semibold ${active ? "text-ink" : "text-white"}`}>{label}</Text>
    </Pressable>
  );
}
