import { View, Text } from "react-native";
import Svg, { Path, Line, Rect, Circle, Text as SvgText } from "react-native-svg";
import { C } from "../constants/theme";
import type { Strategy } from "../utils/body";

export const PHASE_COLOR = { definir: "#FB923C", volumen: C.lime, mantener: "#60A5FA" } as const;
export const PHASE_LABEL = { definir: "Definir", volumen: "Ganar músculo", mantener: "Mantener" } as const;

/** Proyección de peso semana a semana, con las fases sombreadas y la meta punteada. */
export function ProjectionChart({ st, width }: { st: Strategy; width: number }) {
  const H = 190, padL = 34, padR = 8, padT = 12, padB = 24;
  const pts = st.series;
  const weeks = Math.max(1, pts[pts.length - 1].week);
  const kgs = pts.map(p => p.kg).concat(st.target.weight);
  const minY = Math.floor(Math.min(...kgs) - 2), maxY = Math.ceil(Math.max(...kgs) + 2);
  const x = (w: number) => padL + (w / weeks) * (width - padL - padR);
  const y = (k: number) => padT + (1 - (k - minY) / (maxY - minY)) * (H - padT - padB);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${x(p.week).toFixed(1)},${y(p.kg).toFixed(1)}`).join(" ");
  let w0 = 0;
  const bands = st.phases.filter(p => p.weeks > 0).map(p => { const b = { x1: x(w0), x2: x(w0 + p.weeks), kind: p.kind }; w0 += p.weeks; return b; });
  const ticksY = [minY, (minY + maxY) / 2, maxY];
  const stepM = weeks > 52 ? 26 : weeks > 20 ? 8.7 : 4.3;
  const ticksX: number[] = [];
  for (let w = 0; w <= weeks + 0.1; w += stepM) ticksX.push(w);
  const last = pts[pts.length - 1];
  return (
    <Svg width={width} height={H}>
      {bands.map((b, i) => <Rect key={i} x={b.x1} y={padT} width={Math.max(1, b.x2 - b.x1)} height={H - padT - padB} fill={PHASE_COLOR[b.kind]} opacity={0.1} />)}
      {ticksY.map(t => (
        <SvgText key={t} x={padL - 6} y={y(t) + 4} fill={C.mute} fontSize={10} textAnchor="end">{Math.round(t)}</SvgText>
      ))}
      {ticksX.map(t => (
        <SvgText key={t} x={x(t)} y={H - 6} fill={C.mute} fontSize={10} textAnchor="middle">{t === 0 ? "Hoy" : `${Math.round(t / 4.3)} m`}</SvgText>
      ))}
      <Line x1={padL} x2={width - padR} y1={y(st.target.weight)} y2={y(st.target.weight)} stroke={C.lime} strokeDasharray="5 5" strokeWidth={1.5} opacity={0.7} />
      <Path d={d} stroke={C.white} strokeWidth={3} fill="none" strokeLinejoin="round" />
      <Circle cx={x(0)} cy={y(pts[0].kg)} r={5} fill={C.white} />
      <Circle cx={x(last.week)} cy={y(last.kg)} r={6} fill={C.lime} />
    </Svg>
  );
}

/** Barras apiladas de masa magra y grasa: hoy vs. meta. */
export function CompositionChart({ st }: { st: Strategy }) {
  const max = Math.max(st.weight, st.target.weight);
  const Bar = ({ label, lean, fat }: { label: string; lean: number; fat: number }) => (
    <View className="flex-1 items-center">
      <Text className="text-white font-bold">{(lean + fat).toFixed(1).replace(".", ",")} kg</Text>
      <View className="w-16 mt-2 rounded-2xl overflow-hidden justify-end" style={{ height: 150 }}>
        <View style={{ height: (fat / max) * 150, backgroundColor: "#FB923C" }} />
        <View style={{ height: (lean / max) * 150, backgroundColor: C.lime }} />
      </View>
      <Text className="text-mute mt-2">{label}</Text>
      <Text className="text-white/80 text-xs">{Math.round((fat / (lean + fat)) * 100)} % grasa</Text>
    </View>
  );
  return (
    <View>
      <View className="flex-row">
        <Bar label="Hoy" lean={st.lean} fat={st.fat} />
        <Bar label="Meta" lean={st.target.lean} fat={st.target.fat} />
      </View>
      <View className="flex-row justify-center gap-5 mt-3">
        <Legend color={C.lime} text={`Músculo y huesos (magro)`} />
        <Legend color="#FB923C" text="Grasa" />
      </View>
    </View>
  );
}

export function Legend({ color, text }: { color: string; text: string }) {
  return (
    <View className="flex-row items-center">
      <View className="w-3 h-3 rounded-full mr-1.5" style={{ backgroundColor: color }} />
      <Text className="text-mute text-xs">{text}</Text>
    </View>
  );
}

/** Reparto de calorías del día en proteína, carbohidratos y grasas. */
export function MacroChart({ st }: { st: Strategy }) {
  const { protein, carbs, fat, kcal } = st.macros;
  const parts = [
    { label: "Proteína", g: protein, kcal: protein * 4, color: C.lime },
    { label: "Carbohidratos", g: carbs, kcal: carbs * 4, color: "#60A5FA" },
    { label: "Grasas", g: fat, kcal: fat * 9, color: "#FB923C" },
  ];
  const total = parts.reduce((t, p) => t + p.kcal, 0);
  return (
    <View>
      <View className="flex-row items-end">
        <Text className="text-white text-3xl font-extrabold">{kcal}</Text>
        <Text className="text-mute ml-1.5 mb-1">kcal por día</Text>
      </View>
      <View className="flex-row h-4 rounded-full overflow-hidden mt-3">
        {parts.map(p => <View key={p.label} style={{ flex: p.kcal / total, backgroundColor: p.color }} />)}
      </View>
      <View className="flex-row mt-3">
        {parts.map(p => (
          <View key={p.label} className="flex-1">
            <Legend color={p.color} text={p.label} />
            <Text className="text-white font-bold text-lg mt-0.5">{p.g} g</Text>
            <Text className="text-mute text-xs">{Math.round((p.kcal / total) * 100)} %</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

/** Comparación de ritmos típicos entre hombres y mujeres, resaltando el tuyo. */
export function SexRateChart({ st }: { st: Strategy }) {
  const rows = [
    { title: "Bajar grasa (kg por semana)", m: 0.007 * st.weight, f: 0.005 * st.weight, max: 0.007 * st.weight },
    { title: "Ganar músculo (kg por mes)", m: 0.75, f: 0.35, max: 0.75 },
  ];
  return (
    <View className="gap-4">
      {rows.map(r => (
        <View key={r.title}>
          <Text className="text-white font-semibold mb-2">{r.title}</Text>
          {([["Hombre", r.m, "hombre"], ["Mujer", r.f, "mujer"]] as const).map(([label, v, sx]) => {
            const mine = st.sex === sx;
            return (
              <View key={label} className="flex-row items-center mb-1.5">
                <Text className={`w-16 text-xs ${mine ? "text-white font-bold" : "text-mute"}`}>{label}{mine ? " (vos)" : ""}</Text>
                <View className="flex-1 h-3 rounded-full bg-card2 overflow-hidden">
                  <View className="h-3 rounded-full" style={{ width: `${(v / r.max) * 100}%`, backgroundColor: mine ? C.lime : "#55555C" }} />
                </View>
                <Text className={`w-14 text-right text-xs ${mine ? "text-lime font-bold" : "text-mute"}`}>{v.toFixed(2).replace(".", ",")}</Text>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}
