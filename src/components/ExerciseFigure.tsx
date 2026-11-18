import Svg, { Line, Circle } from "react-native-svg";
import type { Prim } from "../data/figures";
import { GROUND } from "../data/figures";
import { C } from "../constants/theme";

const COLOR: Record<string, string> = {
  body: "#E8E8EA", active: C.lime, back: "#6B6B73", prop: "#55555C", cable: "#8A8A93", head: "#E8E8EA", plate: "#8A8A93",
};

/** Una pose del muñeco. Lo que se mueve en el ejercicio va en verde. */
export function ExerciseFigure({ prims, width = 150 }: { prims: Prim[]; width?: number }) {
  return (
    <Svg width={width} height={(width * 112) / 120} viewBox="0 0 120 112">
      <Line x1={0} y1={GROUND + 1} x2={120} y2={GROUND + 1} stroke={C.line} strokeWidth={2} />
      {prims.map((p, i) =>
        p.type === "line" ? (
          <Line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke={COLOR[p.role]} strokeWidth={p.w} strokeLinecap="round" />
        ) : (
          <Circle key={i} cx={p.cx} cy={p.cy} r={p.r}
            fill={p.fill ? COLOR[p.role] : "none"} stroke={p.fill ? undefined : COLOR[p.role]} strokeWidth={p.fill ? 0 : 3} />
        ),
      )}
    </Svg>
  );
}
