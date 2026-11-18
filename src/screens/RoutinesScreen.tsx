import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Screen } from "../components/ui/Screen";
import { Icon } from "../components/ui/Icon";
import { useRoutineStore } from "../store/useRoutineStore";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { CATEGORY_ICON, estimateMinutes, totalSets } from "../utils/format";
import { WEEKDAYS_SHORT } from "../constants/exercises";
import { C } from "../constants/theme";

export default function RoutinesScreen() {
  const nav = useNavigation<any>();
  const routines = useRoutineStore(s => s.routines);
  const create = useRoutineStore(s => s.createRoutine);
  const active = useWorkoutStore(s => s.active);
  const start = useWorkoutStore(s => s.start);

  const onNew = () => {
    const id = create("Nueva rutina", "Pecho");
    nav.navigate("RoutineEditor", { id });
  };

  return (
    <Screen>
      <View className="flex-row items-end justify-between px-5 pt-3">
        <View>
          <Text className="text-mute">{routines.length} {routines.length === 1 ? "rutina" : "rutinas"}</Text>
          <Text className="text-white text-3xl font-extrabold">Rutinas</Text>
        </View>
        <Pressable onPress={onNew} className="flex-row items-center h-12 pl-4 pr-5 rounded-full bg-lime">
          <Icon name="add" size={20} color={C.ink} />
          <Text className="text-ink font-bold ml-1">Nueva</Text>
        </Pressable>
      </View>

      <View className="px-5 mt-6">
        {routines.length === 0 && (
          <View className="bg-card border border-line rounded-3xl p-6 items-center">
            <Icon name="barbell-outline" size={36} color={C.lime} />
            <Text className="text-white text-lg font-bold mt-3">Todavía no tenés rutinas</Text>
            <Text className="text-mute text-center mt-1">Tocá "Nueva" para armar la primera.</Text>
          </View>
        )}
        {routines.map(r => (
          <Pressable
            key={r.id}
            onPress={() => nav.navigate("RoutineEditor", { id: r.id })}
            className="bg-card border border-line rounded-3xl p-4 mb-3"
          >
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-2xl bg-card2 items-center justify-center">
                <Icon name={CATEGORY_ICON[r.category]} size={22} color={C.lime} />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-white text-lg font-bold" numberOfLines={1}>{r.name}</Text>
                <Text className="text-mute text-sm">
                  {r.exercises.length} ejercicios · {totalSets(r)} series · {estimateMinutes(r)} min
                </Text>
              </View>
              <Pressable
                onPress={() => { if (!active) start(r); nav.navigate("Workout"); }}
                hitSlop={8}
                className="w-12 h-12 rounded-full bg-lime items-center justify-center"
              >
                <Icon name="play" size={18} color={C.ink} />
              </Pressable>
            </View>
            <View className="flex-row gap-1.5 mt-4">
              {[1, 2, 3, 4, 5, 6, 0].map(d => {
                const on = r.weekdays.includes(d);
                return (
                  <View key={d} className={`flex-1 h-8 rounded-full items-center justify-center ${on ? "bg-lime" : "bg-card2"}`}>
                    <Text className={`text-xs font-semibold ${on ? "text-ink" : "text-mute"}`}>{WEEKDAYS_SHORT[d].charAt(0)}</Text>
                  </View>
                );
              })}
            </View>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
