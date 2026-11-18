import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Icon } from "./ui/Icon";
import { useSettingsStore } from "../store/useSettingsStore";
import { useRoutineStore } from "../store/useRoutineStore";
import { bmi, bmiLabel, bmr, idealWeight, weeklyPlan, weightPlan } from "../utils/body";
import { GOAL_LIST } from "../constants/exercises";
import type { Goal } from "../types/routine";
import { C } from "../constants/theme";

const kg = (v: number) => `${v.toFixed(1).replace(".", ",")} kg`;

/** Peso ideal según tus datos y cuánto tardarías con el tipo de entreno que elegís. */
export function IdealWeightCard() {
  const weightKg = useSettingsStore(s => s.weightKg);
  const heightCm = useSettingsStore(s => s.heightCm);
  const age = useSettingsStore(s => s.age);
  const sex = useSettingsStore(s => s.sex);
  const routines = useRoutineStore(s => s.routines);
  const plan = weeklyPlan(routines);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [days, setDays] = useState<number | null>(null);
  const g = goal ?? plan.goal ?? "Hipertrofia";
  const d = days ?? Math.max(1, plan.daysPerWeek || 3);

  if (!weightKg || !heightCm) {
    return (
      <View className="bg-card border border-line rounded-4xl p-5">
        <Text className="text-lime font-bold text-xs tracking-widest">TU PESO IDEAL</Text>
        <Text className="text-white text-lg font-semibold mt-2">Cargá tu peso y estatura arriba para calcularlo.</Text>
      </View>
    );
  }

  const body = { weightKg, heightCm, age, sex };
  const v = bmi(weightKg, heightCm);
  const ideal = idealWeight(heightCm, sex);
  const p = weightPlan(body, g, d)!;
  const b = bmr(body)!;
  const maintain = Math.round(b * Math.min(1.725, 1.2 + 0.075 * d));
  const daily = p.direction === "bajar" ? maintain - Math.round((p.ratePerWeek * 7700) / 7) : p.direction === "subir" ? maintain + 250 : maintain;
  const months = p.weeks ? Math.max(1, Math.round(p.weeks / 4.3)) : null;
  // posición de tu peso en la barra (rango ±25 % alrededor del saludable)
  const lo = ideal.min * 0.8, hi = ideal.max * 1.2;
  const pos = (x: number) => `${Math.min(100, Math.max(0, ((x - lo) / (hi - lo)) * 100))}%` as const;

  return (
    <View className="bg-card border border-line rounded-4xl p-5">
      <Text className="text-lime font-bold text-xs tracking-widest">TU PESO IDEAL</Text>
      <View className="flex-row items-end mt-2">
        <Text className="text-white text-4xl font-extrabold">{kg(ideal.ref)}</Text>
        <Text className="text-mute ml-2 mb-1.5">de referencia</Text>
      </View>
      <Text className="text-mute mt-1">Rango saludable para {heightCm} cm: {kg(ideal.min)} – {kg(ideal.max)}</Text>

      <View className="h-3 rounded-full bg-card2 mt-4">
        <View className="absolute h-3 rounded-full bg-lime/30" style={{ left: pos(ideal.min), right: `${100 - parseFloat(pos(ideal.max))}%` }} />
        <View className="absolute w-4 h-4 -top-0.5 rounded-full bg-white border-2 border-ink" style={{ left: pos(weightKg), marginLeft: -8 }} />
      </View>
      <View className="flex-row justify-between mt-2">
        <Text className="text-white text-sm">Hoy: <Text className="font-bold">{kg(weightKg)}</Text></Text>
        <Text className="text-white text-sm">IMC {v.toFixed(1).replace(".", ",")} · <Text className="text-lime">{bmiLabel(v)}</Text></Text>
      </View>

      <Text className="text-mute text-xs font-semibold tracking-widest mt-5 mb-2">CON QUÉ ENTRENAMIENTO</Text>
      <View className="flex-row flex-wrap">
        {GOAL_LIST.map(x => (
          <Pressable key={x} onPress={() => setGoal(x)} className={`h-9 px-3.5 rounded-full items-center justify-center mr-2 mb-2 ${g === x ? "bg-lime" : "bg-card2"}`}>
            <Text className={`text-sm font-semibold ${g === x ? "text-ink" : "text-white"}`}>{x}</Text>
          </Pressable>
        ))}
      </View>
      <View className="flex-row items-center justify-between bg-card2 rounded-full p-1.5 mt-1">
        <Pressable onPress={() => setDays(Math.max(1, d - 1))} className="w-9 h-9 rounded-full bg-ink items-center justify-center"><Icon name="remove" size={16} /></Pressable>
        <Text className="text-white font-semibold">{d} {d === 1 ? "día" : "días"} por semana</Text>
        <Pressable onPress={() => setDays(Math.min(7, d + 1))} className="w-9 h-9 rounded-full bg-ink items-center justify-center"><Icon name="add" size={16} /></Pressable>
      </View>
      {plan.goal && goal == null && days == null && (
        <Text className="text-mute text-xs mt-2">Tomado de tus rutinas asignadas en la semana.</Text>
      )}

      <View className="bg-ink rounded-3xl p-4 mt-4">
        {p.direction === "mantener" ? (
          <Text className="text-white text-lg font-bold">Mantener ~{kg(weightKg)}</Text>
        ) : (
          <>
            <Text className="text-white text-lg font-bold">
              {p.direction === "bajar" ? "Bajar" : "Subir"} {kg(Math.abs(weightKg - p.target))} → {kg(p.target)}
            </Text>
            <Text className="text-lime text-2xl font-extrabold mt-1">
              ~{p.weeks} semanas{months && months > 1 ? ` (≈ ${months} meses)` : ""}
            </Text>
            <Text className="text-mute text-xs mt-0.5">A un ritmo de ~{kg(p.ratePerWeek).replace(" kg", "")} kg por semana</Text>
          </>
        )}
        <Text className="text-white/80 text-sm mt-2">{p.note}</Text>
        <View className="flex-row items-center mt-3 pt-3 border-t border-line">
          <Icon name="flame-outline" size={16} color={C.lime} />
          <Text className="text-white text-sm ml-2 flex-1">
            Comé ~<Text className="font-bold">{daily} kcal/día</Text> (mantener: {maintain})
          </Text>
        </View>
      </View>
      <Text className="text-mute text-[11px] mt-3">
        Estimación orientativa (IMC, fórmulas Devine/Robinson y Mifflin-St Jeor). No reemplaza la consulta con un profesional de salud o nutrición.
      </Text>
    </View>
  );
}
