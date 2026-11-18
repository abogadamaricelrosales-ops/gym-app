import { View, Text, Pressable, TextInput } from "react-native";
import { Icon } from "./ui/Icon";

/** Número grande con botones − / + para usar con una mano en el gimnasio. */
export function Stepper({ label, value, step, onChange, decimals = false }: {
  label: string; value: number; step: number; onChange: (v: number) => void; decimals?: boolean;
}) {
  const set = (v: number) => onChange(Math.max(0, Math.round(v * 100) / 100));
  return (
    <View className="flex-1 bg-card2 rounded-3xl p-3 items-center">
      <Text className="text-mute text-xs font-semibold tracking-widest">{label}</Text>
      <TextInput
        value={value ? String(value) : ""}
        placeholder="0"
        placeholderTextColor="#55555C"
        keyboardType={decimals ? "decimal-pad" : "number-pad"}
        onChangeText={t => set(Number(t.replace(",", ".")) || 0)}
        className="text-white text-5xl font-extrabold text-center w-full my-1"
        style={{ fontVariant: ["tabular-nums"] }}
      />
      <View className="flex-row gap-2 w-full">
        <Pressable onPress={() => set(value - step)} className="flex-1 h-12 rounded-2xl bg-ink items-center justify-center">
          <Icon name="remove" size={22} />
        </Pressable>
        <Pressable onPress={() => set(value + step)} className="flex-1 h-12 rounded-2xl bg-ink items-center justify-center">
          <Icon name="add" size={22} />
        </Pressable>
      </View>
    </View>
  );
}
