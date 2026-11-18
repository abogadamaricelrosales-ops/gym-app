import type { ReactNode } from "react";
import { View, ImageBackground, type ImageSourcePropType, type ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

/**
 * Foto de fondo con degradé oscuro para que el texto encima siempre se lea.
 * `fade` = hasta dónde llega el negro (abajo).
 */
export function Photo({ source, children, style, className = "", radius = 0, fadeTo = "#0A0A0B", strength = 0.95 }: {
  source: ImageSourcePropType; children?: ReactNode; style?: ViewStyle; className?: string;
  radius?: number; fadeTo?: string; strength?: number;
}) {
  const end = fadeTo + Math.round(strength * 255).toString(16).padStart(2, "0");
  return (
    <View className={`overflow-hidden ${className}`} style={[{ borderRadius: radius }, style]}>
      <ImageBackground source={source} resizeMode="cover" style={{ flex: 1 }}>
        <LinearGradient
          colors={["#00000033", "#00000010", end]}
          locations={[0, 0.35, 1]}
          style={{ flex: 1 }}
        >
          {children}
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
