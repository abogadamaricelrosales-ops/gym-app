import { View, type ViewProps } from "react-native";

export function Card({ className = "", ...props }: ViewProps & { className?: string }) {
  return <View className={`bg-zinc-900 rounded-2xl border border-zinc-800 p-4 ${className}`} {...props} />;
}
