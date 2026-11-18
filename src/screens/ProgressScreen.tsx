import { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Screen, SectionTitle } from "../components/ui/Screen";
import { Icon, type IconName } from "../components/ui/Icon";
import { Chip } from "../components/ui/Chip";
import { startOfDay } from "../components/WeekStrip";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { workoutVolume, workoutDurationMin, personalRecords, formatDate } from "../utils/progress";
import { WEEKDAYS_SHORT } from "../constants/exercises";
import { fmtKg } from "../utils/format";
import { C } from "../constants/theme";
import type { Workout } from "../types/workout";

type Metric = "volumen" | "series" | "minutos";
const METRICS: { key: Metric; label: string; unit: string }[] = [
  { key: "volumen", label: "Volumen", unit: "kg" },
  { key: "series", label: "Series", unit: "series" },
  { key: "minutos", label: "Minutos", unit: "min" },
];
const DAY = 86_400_000;

const value = (w: Workout, m: Metric) =>
  m === "volumen" ? workoutVolume(w) : m === "series" ? w.exercises.reduce((t, e) => t + e.sets.length, 0) : workoutDurationMin(w);

export default function ProgressScreen() {
  const history = useWorkoutStore(s => s.history);
  const deleteWorkout = useWorkoutStore(s => s.deleteWorkout);
  const [metric, setMetric] = useState<Metric>("volumen");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const today = startOfDay(new Date());
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => today - (6 - i) * DAY), [today]);
  const series = useMemo(
    () => days.map(d => history.filter(w => startOfDay(new Date(w.startedAt)) === d).reduce((t, w) => t + value(w, metric), 0)),
    [days, history, metric],
  );
  const max = Math.max(1, ...series);
  const total = series.reduce((a, b) => a + b, 0);
  const unit = METRICS.find(m => m.key === metric)!.unit;

  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
  const monthCount = history.filter(w => w.startedAt >= monthStart).length;
  const weekMinutes = history.filter(w => w.startedAt >= today - 6 * DAY).reduce((t, w) => t + workoutDurationMin(w), 0);
  const records = useMemo(() => personalRecords(history).slice(0, 5), [history]);

  return (
    <Screen>
      <View className="px-5 pt-3">
        <Text className="text-mute">Últimos 7 días</Text>
        <Text className="text-white text-3xl font-extrabold">Progreso</Text>
      </View>

      <View className="flex-row px-5 mt-5">
        {METRICS.map(m => <Chip key={m.key} label={m.label} active={metric === m.key} onPress={() => setMetric(m.key)} />)}
      </View>

      {/* Gráfico de barras */}
      <View className="mx-5 mt-4 bg-card border border-line rounded-4xl p-5">
        <View className="flex-row items-baseline">
          <Text className="text-lime text-3xl font-extrabold">
            {metric === "volumen" ? Math.round(total).toLocaleString("es-AR") : total}
          </Text>
          <Text className="text-mute ml-2">{unit} esta semana</Text>
        </View>
        <View className="flex-row justify-between items-end h-44 mt-5">
          {series.map((v, i) => {
            const isToday = days[i] === today;
            return (
              <View key={days[i]} className="items-center flex-1">
                <View className="w-7 h-36 rounded-full bg-card2 justify-end overflow-hidden">
                  <View
                    className={`w-7 rounded-full ${isToday ? "bg-lime" : "bg-lime/70"}`}
                    style={{ height: v > 0 ? Math.max(14, (v / max) * 144) : 0 }}
                  />
                </View>
                <Text className={`text-[11px] mt-2 ${isToday ? "text-white font-bold" : "text-mute"}`}>
                  {WEEKDAYS_SHORT[new Date(days[i]).getDay()]}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Tarjetas */}
      <View className="flex-row gap-3 px-5 mt-3">
        <Tile icon="calendar" label="Entrenos del mes" value={String(monthCount)} />
        <Tile icon="time" label="Minutos (7 días)" value={String(weekMinutes)} />
      </View>

      <SectionTitle title="Récords personales" />
      <View className="px-5">
        {records.length === 0 && <Empty text="Terminá tu primer entreno para ver tus récords." />}
        {records.map(r => (
          <View key={r.name} className="flex-row items-center bg-card border border-line rounded-3xl p-4 mb-2">
            <View className="w-10 h-10 rounded-full bg-card2 items-center justify-center">
              <Icon name="medal" size={18} color={C.lime} />
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-white font-semibold" numberOfLines={1}>{r.name}</Text>
              <Text className="text-mute text-xs">{formatDate(r.date)}</Text>
            </View>
            <Text className="text-white font-extrabold text-lg">{r.weight} kg</Text>
            <Text className="text-mute ml-1">× {r.reps}</Text>
          </View>
        ))}
      </View>

      <SectionTitle title="Entrenos recientes" />
      <View className="px-5">
        {history.length === 0 && <Empty text="Todavía no hay entrenos guardados." />}
        {history.slice(0, 10).map(w => (
          <View key={w.id} className="bg-card border border-line rounded-3xl p-4 mb-2">
            <View className="flex-row items-center">
              <View className="flex-1">
                <Text className="text-white font-bold text-base">{w.name}</Text>
                <Text className="text-mute text-xs capitalize">{formatDate(w.startedAt)}</Text>
              </View>
              <Pressable
                onPress={() => (pendingDelete === w.id ? (deleteWorkout(w.id), setPendingDelete(null)) : setPendingDelete(w.id))}
                hitSlop={8}
                className={`h-8 px-3 rounded-full items-center justify-center ${pendingDelete === w.id ? "bg-red-500" : ""}`}
              >
                {pendingDelete === w.id
                  ? <Text className="text-white text-xs font-bold">Borrar</Text>
                  : <Icon name="trash-outline" size={16} color={C.mute} />}
              </Pressable>
            </View>
            <View className="flex-row gap-2 mt-3">
              <Pill icon="time-outline" text={`${workoutDurationMin(w)} min`} />
              <Pill icon="barbell-outline" text={fmtKg(workoutVolume(w))} />
              <Pill icon="list-outline" text={`${w.exercises.length} ejerc.`} />
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const Tile = ({ icon, label, value }: { icon: IconName; label: string; value: string }) => (
  <View className="flex-1 bg-card border border-line rounded-3xl p-4">
    <View className="w-9 h-9 rounded-full bg-lime items-center justify-center">
      <Icon name={icon} size={16} color={C.ink} />
    </View>
    <Text className="text-white text-3xl font-extrabold mt-3">{value}</Text>
    <Text className="text-mute text-xs mt-0.5">{label}</Text>
  </View>
);

const Pill = ({ icon, text }: { icon: IconName; text: string }) => (
  <View className="flex-row items-center h-8 px-3 rounded-full bg-card2">
    <Icon name={icon} size={13} color={C.mute} />
    <Text className="text-white text-xs ml-1.5">{text}</Text>
  </View>
);

const Empty = ({ text }: { text: string }) => (
  <View className="bg-card border border-line rounded-3xl p-5"><Text className="text-mute">{text}</Text></View>
);
