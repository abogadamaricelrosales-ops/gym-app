import type { ReactNode } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "./Icon";

/** Encabezado centrado con botones circulares, como en las referencias. */
export function TopBar({ title, back, right }: { title: string; back?: boolean; right?: ReactNode }) {
  const nav = useNavigation();
  return (
    <View className="flex-row items-center justify-between px-5 h-14">
      <View className="w-11">
        {back && (
          <Pressable onPress={() => nav.goBack()} className="w-11 h-11 rounded-full bg-black/40 border border-white/10 items-center justify-center">
            <Icon name="chevron-back" size={20} />
          </Pressable>
        )}
      </View>
      <Text className="text-white text-lg font-bold">{title}</Text>
      <View className="w-11 items-end">{right}</View>
    </View>
  );
}

/** Pantalla con fondo negro, margen del notch y espacio para la barra flotante. */
export function Screen({ children, scroll = true, padBottom = 120, edgeToEdge = false }: {
  children: ReactNode; scroll?: boolean; padBottom?: number;
  /** true = el contenido empieza bajo la barra de estado (para fotos de cabecera). */
  edgeToEdge?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const top = edgeToEdge ? 0 : insets.top;
  if (!scroll) return <View className="flex-1 bg-ink" style={{ paddingTop: top }}>{children}</View>;
  return (
    <ScrollView
      className="flex-1 bg-ink"
      contentContainerStyle={{ paddingTop: top, paddingBottom: padBottom + insets.bottom }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

export function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View className="flex-row items-center justify-between px-5 mt-7 mb-3">
      <Text className="text-white text-xl font-bold">{title}</Text>
      {action && <Pressable onPress={onAction} hitSlop={10}><Text className="text-mute">{action}</Text></Pressable>}
    </View>
  );
}
