import Svg, { Circle } from "react-native-svg";
import { C } from "../constants/theme";

/** Anillo de progreso (0 a 1). */
export function Ring({ size, stroke = 10, progress, color = C.lime, track = C.card2 }: {
  size: number; stroke?: number; progress: number; color?: string; track?: string;
}) {
  const r = (size - stroke) / 2;
  const len = 2 * Math.PI * r;
  const p = Math.min(1, Math.max(0, progress));
  return (
    <Svg width={size} height={size}>
      <Circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
      <Circle
        cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
        strokeDasharray={`${len} ${len}`} strokeDashoffset={len * (1 - p)} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  );
}
