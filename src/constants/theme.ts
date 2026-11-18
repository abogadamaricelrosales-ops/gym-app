import { DarkTheme, type Theme } from "@react-navigation/native";

export const COLORS = {
  bg: "#09090b",
  card: "#18181b",
  border: "#27272a",
  surface: "#18181b",
  text: "#ffffff",
  muted: "#a1a1aa",
  primary: "#f97316",
};

export const navTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: COLORS.primary,
    background: COLORS.bg,
    card: COLORS.bg,
    border: COLORS.border,
    text: COLORS.text,
  },
};

// Headers nativos desactivados: cada pantalla dibuja su propio <ScreenHeader>
export const stackScreenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: COLORS.bg },
};
