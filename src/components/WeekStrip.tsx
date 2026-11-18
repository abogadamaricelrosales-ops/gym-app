import { View, Text, Pressable } from "react-native";
import { WEEKDAYS_SHORT } from "../constants/exercises";

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

/** Semana actual (lunes a domingo) en pastillas verticales; hoy en lima, punto si entrenaste. */
export function WeekStrip({ selected, onSelect, trainedDays }: {
  selected: number; onSelect: (ts: number) => void; trainedDays: Set<number>;
}) {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  return (
    <View className="flex-row justify-between px-5">
      {days.map(d => {
        const ts = startOfDay(d);
        const isSel = ts === selected;
        const trained = trainedDays.has(ts);
        return (
          <Pressable
            key={ts}
            onPress={() => onSelect(ts)}
            className={`w-11 h-[72px] rounded-full items-center justify-center border ${isSel ? "bg-lime border-lime" : "bg-card border-line"}`}
          >
            <View className={`w-1.5 h-1.5 rounded-full mb-1 ${trained ? (isSel ? "bg-ink" : "bg-lime") : "bg-transparent"}`} />
            <Text className={`text-xs ${isSel ? "text-ink font-semibold" : "text-mute"}`}>{WEEKDAYS_SHORT[d.getDay()]}</Text>
            <Text className={`text-base font-bold ${isSel ? "text-ink" : "text-white"}`}>{d.getDate()}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export { startOfDay };
