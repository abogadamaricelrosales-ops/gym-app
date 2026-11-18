import { Pressable, Text } from "react-native";

type Variant = "primary" | "secondary" | "danger" | "ghost";

const BG: Record<Variant, string> = {
  primary: "bg-emerald-500",
  secondary: "bg-zinc-800",
  danger: "border border-red-500",
  ghost: "",
};
const FG: Record<Variant, string> = {
  primary: "text-black font-semibold",
  secondary: "text-white",
  danger: "text-red-400",
  ghost: "text-emerald-400",
};

export function Button({ title, onPress, variant = "primary", className = "", disabled }: {
  title: string; onPress: () => void; variant?: Variant; className?: string; disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`py-3 px-4 rounded-xl items-center ${BG[variant]} ${disabled ? "opacity-40" : ""} ${className}`}
    >
      <Text className={FG[variant]}>{title}</Text>
    </Pressable>
  );
}
