import { DarkTheme, type Theme } from "@react-navigation/native";

export const COLORS = {
  bg: "#000000",
  card: "#18181b",
  border: "#27272a",
  text: "#ffffff",
  muted: "#a1a1aa",
  primary: "#34d399",
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

export const stackScreenOptions = {
  headerStyle: { backgroundColor: COLORS.bg },
  headerTintColor: COLORS.text,
  contentStyle: { backgroundColor: COLORS.bg },
};
