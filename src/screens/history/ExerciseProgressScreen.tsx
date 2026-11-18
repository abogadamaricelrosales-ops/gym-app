import { useState } from "react";
import { ScrollView, View, Text, Pressable, useWindowDimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useExerciseProgress } from "../../store/selectors/history";
import { formatDate } from "../../utils/progress";

type Metric = "best1RM" | "topWeight" | "volume";
const METRICS: { key: Metric; label: string }[] = [
  { key: "best1RM", label: "1RM est." }, { key: "topWeight", label: "Peso máx." }, { key: "volume", label: "Volumen" },
];
const STATUS = {
  subiendo:  { text: "Estás progresando 📈", cls: "text-emerald-400" },
  estancado: { text: "Estancado: subí peso o reps la próxima", cls: "text-amber-400" },
  bajando:   { text: "Bajó el rendimiento: revisá descanso y recuperación", cls: "text-red-400" },
  sin_datos: { text: "Necesitás al menos 2 sesiones", cls: "text-zinc-400" },
};

export default function ExerciseProgressScreen({ route }: any) {
  const { name } = route.params;
  const { sessions, pr, status } = useExerciseProgress(name);
  const [metric, setMetric] = useState<Metric>("best1RM");
  const { width } = useWindowDimensions();
  const last = sessions[sessions.length - 1];
  const prev = sessions[sessions.length - 2];

  const data = sessions.slice(-12).map(s => ({
    value: s[metric],
    label: new Date(s.date).toLocaleDateString("es-AR", { day: "numeric", month: "numeric" }),
  }));

  return (
    <ScrollView className="flex-1 bg-zinc-950" contentContainerClassName="p-4 pb-10">
      <Text className="text-white text-2xl font-bold">{name}</Text>
      <Text className={`mt-1 ${STATUS[status].cls}`}>{STATUS[status].text}</Text>

      <View className="flex-row gap-3 mt-4">
        <Stat label="Récord 1RM" value={pr ? `${pr.best1RM} kg` : "—"} />
        <Stat label="Última" value={last ? `${last.topWeight}×${last.topReps}` : "—"} />
        <Stat label="Sesiones" value={String(sessions.length)} />
      </View>

      <View className="flex-row gap-2 mt-6 mb-3">
        {METRICS.map(m => (
          <Pressable key={m.key} onPress={() => setMetric(m.key)}
            className={`px-3 py-2 rounded-full ${metric === m.key ? "bg-orange-500" : "bg-zinc-900 border border-zinc-800"}`}>
            <Text className={metric === m.key ? "text-black font-semibold" : "text-zinc-300"}>{m.label}</Text>
          </Pressable>
        ))}
      </View>

      {data.length >= 2 ? (
        <View className="bg-zinc-900 rounded-2xl py-4">
          <LineChart data={data} width={width - 80} height={180} color="#f97316" thickness={3}
            dataPointsColor="#f97316" curved areaChart startFillColor="#f97316" startOpacity={0.25} endOpacity={0}
            yAxisTextStyle={{ color: "#a1a1aa" }} xAxisLabelTextStyle={{ color: "#a1a1aa", fontSize: 10 }}
            rulesColor="#27272a" xAxisColor="#3f3f46" yAxisColor="#3f3f46" />
        </View>
      ) : <Text className="text-zinc-500">Registrá más sesiones para ver el gráfico.</Text>}

      {last && prev && (
        <View className="bg-zinc-900 rounded-xl p-4 mt-4">
          <Text className="text-zinc-400 mb-1">vs. sesión anterior</Text>
          <Text className="text-white">
            {prev.topWeight}×{prev.topReps} → {last.topWeight}×{last.topReps}
            {"  "}({last.best1RM - prev.best1RM >= 0 ? "+" : ""}{(last.best1RM - prev.best1RM).toFixed(1)} kg 1RM)
          </Text>
        </View>
      )}

      <Text className="text-white font-semibold mt-6 mb-2">Sesiones</Text>
      {[...sessions].reverse().map(s => (
        <View key={s.workoutId} className="flex-row justify-between py-2 border-b border-zinc-800">
          <Text className="text-zinc-400">{formatDate(s.date)}</Text>
          <Text className="text-white">{s.sets.map(x => `${x.weight}×${x.reps}`).join("  ")}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-1 bg-zinc-900 rounded-xl p-3">
    <Text className="text-zinc-400 text-xs">{label}</Text>
    <Text className="text-white text-lg font-bold mt-1">{value}</Text>
  </View>
);
