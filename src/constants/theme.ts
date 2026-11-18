import { DarkTheme, type Theme } from "@react-navigation/native";

export const C = {
  ink: "#0A0A0B",
  card: "#18181A",
  card2: "#232326",
  line: "#2C2C30",
  lime: "#C8F135",
  mute: "#8A8A93",
  white: "#FFFFFF",
};

export const navTheme: Theme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, primary: C.lime, background: C.ink, card: C.ink, border: C.line, text: C.white },
};
