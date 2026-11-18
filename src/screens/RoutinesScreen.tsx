import { View, Text, Pressable, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Photo } from "../components/ui/Photo";
import { CATEGORY_PHOTO, PHOTOS } from "../constants/photos";
import { useNavigation } from "@react-navigation/native";
import { Screen } from "../components/ui/Screen";
import { Icon } from "../components/ui/Icon";
import { useRoutineStore } from "../store/useRoutineStore";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { estimateMinutes, totalSets } from "../utils/format";
import { WEEKDAYS_SHORT } from "../constants/exercises";
import { C } from "../constants/theme";

export default function RoutinesScreen() {
  const nav = useNavigation<any>();
  const routines = useRoutineStore(s => s.routines);
  const create = useRoutineStore(s => s.createRoutine);
  const active = useWorkoutStore(s => s.active);
  const start = useWorkoutStore(s => s.start);
  const insets = useSafeAreaInsets();

  const onNew = () => {
    const id = create("Nueva rutina", "Pecho");
    nav.navigate("RoutineEditor", { id });
  };

  return (
    <Screen edgeToEdge>
      <Photo source={PHOTOS.rack} style={{ height: 230 + insets.top }}>
        <View className="flex-1 justify-end px-5 pb-5">
          <Text className="text-white/70">{routines.length} {routines.length === 1 ? "rutina" : "rutinas"} · {routines.reduce((t, r) => t + r.weekdays.length, 0)} días por semana</Text>
          <View className="flex-row items-end justify-between mt-1">
            <Text className="text-white text-4xl font-extrabold tracking-tight">Rutinas</Text>
            <Pressable onPress={onNew} className="flex-row items-center h-12 pl-4 pr-5 rounded-full bg-lime">
              <Icon name="add" size={20} color={C.ink} />
              <Text className="text-ink font-bold ml-1">Nueva</Text>
            </Pressable>
          </View>
        </View>
      </Photo>

      <View className="px-5 mt-4">
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
              <Image source={CATEGORY_PHOTO[r.category]} style={{ width: 64, height: 64, borderRadius: 16 }} resizeMode="cover" />
              <View className="flex-1 ml-3">
                <Text className="text-lime text-xs font-semibold">{r.category.toUpperCase()}</Text>
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
