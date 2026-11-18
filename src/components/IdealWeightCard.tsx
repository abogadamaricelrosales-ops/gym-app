import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "./ui/Icon";
import { useSettingsStore } from "../store/useSettingsStore";
import { useRoutineStore } from "../store/useRoutineStore";
import { buildStrategy, weeklyPlan } from "../utils/body";
import { C } from "../constants/theme";

export const kg = (v: number) => `${v.toFixed(1).replace(".", ",")} kg`;
export const pct = (v: number) => `${Math.round(v * 100)} %`;

/** Peso ideal con buena masa muscular y acceso a la estrategia completa. */
export function IdealWeightCard() {
  const nav = useNavigation<any>();
  const s = useSettingsStore();
  const routines = useRoutineStore(st => st.routines);
  const plan = weeklyPlan(routines);
  const st = buildStrategy(
    { weightKg: s.weightKg, heightCm: s.heightCm, age: s.age, sex: s.sex, bodyFat: s.bodyFat },
    plan.goal ?? "Hipertrofia", plan.daysPerWeek || 3,
  );

  if (!st) {
    return (
      <View className="bg-card border border-line rounded-4xl p-5">
        <Text className="text-lime font-bold text-xs tracking-widest">TU PESO IDEAL</Text>
        <Text className="text-white text-lg font-semibold mt-2">Cargá peso, estatura y sexo arriba para calcularlo.</Text>
      </View>
    );
  }
  const lo = st.target.min * 0.85, hi = st.target.max * 1.15;
  const at = (x: number) => `${Math.min(100, Math.max(0, ((x - lo) / (hi - lo)) * 100))}%` as const;
  const first = st.phases[0];

  return (
    <View className="bg-card border border-line rounded-4xl p-5">
      <Text className="text-lime font-bold text-xs tracking-widest">TU PESO IDEAL · CUERPO ATLÉTICO</Text>
      <View className="flex-row items-end mt-2">
        <Text className="text-white text-4xl font-extrabold">{kg(st.target.weight)}</Text>
        <Text className="text-mute ml-2 mb-1.5">con ~{pct(st.target.bf)} de grasa</Text>
      </View>
      <Text className="text-mute mt-1">Rango atlético para {s.heightCm} cm: {kg(st.target.min)} – {kg(st.target.max)}</Text>

      <View className="h-3 rounded-full bg-card2 mt-4">
        <View className="absolute h-3 rounded-full bg-lime/30" style={{ left: at(st.target.min), right: `${100 - parseFloat(at(st.target.max))}%` }} />
        <View className="absolute w-1 h-5 -top-1 rounded-full bg-lime" style={{ left: at(st.target.weight) }} />
        <View className="absolute w-4 h-4 -top-0.5 rounded-full bg-white border-2 border-ink" style={{ left: at(st.weight), marginLeft: -8 }} />
      </View>
      <View className="flex-row justify-between mt-2">
        <Text className="text-white text-sm">Hoy: <Text className="font-bold">{kg(st.weight)}</Text></Text>
        <Text className="text-white text-sm">Grasa {st.bfEstimated ? "estimada" : ""} <Text className="text-lime font-bold">{pct(st.bf)}</Text></Text>
      </View>

      <View className="bg-ink rounded-3xl p-4 mt-4">
        <Text className="text-mute text-xs font-semibold tracking-widest">TU PLAN</Text>
        <Text className="text-white text-lg font-bold mt-1">
          {st.phases.map(p => (p.kind === "definir" ? "Definir" : p.kind === "volumen" ? "Ganar músculo" : "Mantener")).join(" → ")}
        </Text>
        {st.totalWeeks > 0 && (
          <Text className="text-lime text-2xl font-extrabold mt-1">~{st.totalWeeks} semanas{st.totalWeeks > 8 ? ` (≈ ${Math.round(st.totalWeeks / 4.3)} meses)` : ""}</Text>
        )}
        <Text className="text-white/80 text-sm mt-1">Hoy: ~{first.kcal} kcal/día · {st.macros.protein} g de proteína</Text>
      </View>

      <Pressable onPress={() => nav.navigate("Strategy")} className="flex-row items-center justify-center h-12 rounded-full bg-lime mt-4">
        <Icon name="stats-chart" size={17} color={C.ink} />
        <Text className="text-ink font-bold ml-2">Ver mi estrategia con gráficos</Text>
      </Pressable>
      <Text className="text-mute text-[11px] mt-3">
        Se apunta a un físico con buena masa muscular (índice de masa libre de grasa atlético), no al IMC, que no distingue músculo de grasa. Es orientativo y no reemplaza a un profesional.
      </Text>
    </View>
  );
}
