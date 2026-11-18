import { useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { useTodayRecommendation } from "../../hooks/useTodayRecommendation";
import { useWorkoutStore } from "../../store/useWorkoutStore";
import { useReadinessStore } from "../../store/useReadinessStore";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { MUSCLE_GROUPS } from "../../types/readiness";
import { ACTIVITIES } from "../../constants/activities";
import { formatDate } from "../../utils/progress";

const KIND_LABEL = {
  normal: { text: "Día normal", cls: "text-emerald-400" },
  deload: { text: "Deload", cls: "text-amber-400" },
  swap: { text: "Cambio de día", cls: "text-sky-400" },
  rest: { text: "Descanso sugerido", cls: "text-red-400" },
};

const barColor = (v: number) => (v > 55 ? "bg-red-500" : v > 40 ? "bg-amber-400" : "bg-emerald-500");

export default function HomeScreen({ navigation }: any) {
  const rec = useTodayRecommendation();
  const active = useWorkoutStore(s => s.active);
  const startFromDay = useWorkoutStore(s => s.startFromDay);
  const fatigue = useReadinessStore(s => s.muscleFatigue);
  const events = useReadinessStore(s => s.events);
  const removeEvent = useReadinessStore(s => s.removeEvent);
  const bodyWeight = useReadinessStore(s => s.settings.bodyWeightKg);
  const setBodyWeight = useReadinessStore(s => s.setBodyWeight);
  const [weightText, setWeightText] = useState(String(bodyWeight));

  const extras = events.filter(e => e.source === "extra").sort((a, b) => b.date - a.date).slice(0, 5);

  const onStart = () => {
    if (!rec) return;
    if (!active) startFromDay(rec.routineId, rec.day);
    navigation.navigate("Entrenar");
  };

  return (
    <ScrollView className="flex-1 bg-zinc-950" contentContainerClassName="p-4 pb-16 gap-4">
      <Card>
        <Text className="text-zinc-400">Hoy te recomiendo</Text>
        {rec ? (
          <>
            <View className="flex-row justify-between items-end mt-1">
              <Text className="text-white text-2xl font-bold flex-1">{rec.day.name}</Text>
              <Text className="text-white text-3xl font-extrabold">{rec.readiness}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className={`font-semibold ${KIND_LABEL[rec.kind].cls}`}>{KIND_LABEL[rec.kind].text}</Text>
              <Text className="text-zinc-500 text-xs">readiness</Text>
            </View>
            <Text className="text-zinc-300 mt-3">{rec.reason}</Text>
            <Text className="text-zinc-500 mt-2 text-xs">
              {rec.day.exercises.map(e => `${e.name} ${e.targetSets}×${e.targetReps}`).join(" · ")}
            </Text>
            <Button
              className="mt-4"
              title={active ? "Continuar entrenamiento en curso" : rec.kind === "rest" ? "Hacer versión liviana" : "Empezar"}
              onPress={onStart}
            />
          </>
        ) : (
          <>
            <Text className="text-white mt-1">Elegí o creá una rutina para recibir recomendaciones.</Text>
            <Button className="mt-4" title="Ver librería" variant="secondary" onPress={() => navigation.navigate("Libreria")} />
          </>
        )}
      </Card>

      <Card>
        <Text className="text-white font-semibold mb-3">Fatiga muscular</Text>
        {MUSCLE_GROUPS.map(g => (
          <View key={g} className="flex-row items-center mb-2">
            <Text className="text-zinc-400 w-20 capitalize">{g}</Text>
            <View className="flex-1 h-2 bg-zinc-800 rounded">
              <View className={`h-2 rounded ${barColor(fatigue[g])}`} style={{ width: `${fatigue[g]}%` }} />
            </View>
            <Text className="text-zinc-400 w-10 text-right">{fatigue[g]}</Text>
          </View>
        ))}
      </Card>

      <Card>
        <View className="flex-row justify-between items-center">
          <Text className="text-white font-semibold">Actividad extra</Text>
          <Pressable onPress={() => navigation.navigate("LogActivity")}>
            <Text className="text-orange-500 font-semibold">+ Registrar</Text>
          </Pressable>
        </View>
        {extras.length === 0 && (
          <Text className="text-zinc-500 mt-2">Fútbol, pádel, running... Registralos para ajustar tu entreno.</Text>
        )}
        {extras.map(e => (
          <View key={e.id} className="flex-row justify-between items-center mt-3">
            <Text className="text-zinc-300 flex-1">
              {e.activity ? ACTIVITIES[e.activity].label : "Actividad"} · {e.durationMin} min · RPE {e.rpe}
            </Text>
            <Text className="text-zinc-500 mr-3">{formatDate(e.date)}</Text>
            <Pressable onPress={() => removeEvent(e.id)}><Text className="text-red-400">✕</Text></Pressable>
          </View>
        ))}
      </Card>

      <Card>
        <Text className="text-white font-semibold mb-2">Tu peso corporal (para calorías)</Text>
        <View className="flex-row gap-2 items-center">
          <Input
            className="flex-1"
            keyboardType="decimal-pad"
            value={weightText}
            onChangeText={setWeightText}
            onEndEditing={() => {
              const kg = Number(weightText.replace(",", "."));
              if (kg > 0) setBodyWeight(kg); else setWeightText(String(bodyWeight));
            }}
          />
          <Text className="text-zinc-400">kg</Text>
        </View>
      </Card>
    </ScrollView>
  );
}
