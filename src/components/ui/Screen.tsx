import type { ComponentType, ReactNode } from "react";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

/** Encabezado propio (los headers nativos de React Navigation están desactivados). */
export function ScreenHeader({ title, subtitle, back, right }: {
  title: string; subtitle?: ReactNode; back?: boolean; right?: ReactNode;
}) {
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center px-4 pt-2 pb-4 gap-3">
      {back && (
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={12}
          className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 items-center justify-center"
        >
          <Text className="text-white text-lg">‹</Text>
        </Pressable>
      )}
      <View className="flex-1">
        <Text className="text-white text-3xl font-extrabold tracking-tight" numberOfLines={1}>{title}</Text>
        {typeof subtitle === "string"
          ? <Text className="text-zinc-500 mt-0.5" numberOfLines={1}>{subtitle}</Text>
          : subtitle}
      </View>
      {right}
    </View>
  );
}

/** Contenedor de pantalla: fondo global zinc-950 + margen del notch + encabezado. */
export function Screen({ children, ...header }: {
  children: ReactNode; title: string; subtitle?: ReactNode; back?: boolean; right?: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-zinc-950" style={{ paddingTop: insets.top + 8 }}>
      <ScreenHeader {...header} />
      {children}
    </View>
  );
}

/** Envuelve una pantalla existente con <Screen> (para registrar en los navegadores). */
export function withScreen<P extends object>(
  Component: ComponentType<P>, title: string, opts: { back?: boolean } = {},
) {
  const Wrapped = (props: P) => (
    <Screen title={title} back={opts.back}>
      <Component {...props} />
    </Screen>
  );
  Wrapped.displayName = `withScreen(${Component.displayName ?? Component.name ?? "Screen"})`;
  return Wrapped;
}
