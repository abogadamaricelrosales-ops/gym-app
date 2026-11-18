import { View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Icon, type IconName } from "./ui/Icon";
import { C } from "../constants/theme";

const ICONS: Record<string, IconName> = {
  Inicio: "home-outline",
  Rutinas: "grid-outline",
  Progreso: "stats-chart-outline",
  Perfil: "person-outline",
};

/** Barra inferior flotante tipo píldora: el ícono activo va en un círculo lima. */
export function PillTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View pointerEvents="box-none" className="absolute left-0 right-0 items-center" style={{ bottom: insets.bottom + 14 }}>
      <View className="flex-row bg-card border border-line rounded-full p-2 gap-2">
        {state.routes.map((route, i) => {
          const focused = state.index === i;
          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityLabel={route.name}
              accessibilityState={{ selected: focused }}
              onPress={() => {
                const e = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
                if (!focused && !e.defaultPrevented) navigation.navigate(route.name);
              }}
              className={`w-14 h-14 rounded-full items-center justify-center ${focused ? "bg-lime" : "bg-card2"}`}
            >
              <Icon name={ICONS[route.name] ?? "ellipse-outline"} size={22} color={focused ? C.ink : C.white} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
