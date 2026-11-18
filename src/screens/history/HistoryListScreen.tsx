import { View, Text, FlatList, Pressable } from "react-native";
import { useHistory } from "../../store/selectors/history";
import { workoutVolume, workoutDurationMin, formatDate } from "../../utils/progress";

export default function HistoryListScreen({ navigation }: any) {
  const history = useHistory();
  return (
    <View className="flex-1 bg-zinc-950">
      <Pressable onPress={() => navigation.navigate("ExerciseList")}
        className="m-4 bg-orange-500 py-3 rounded-xl items-center">
        <Text className="text-black font-semibold">Ver progreso por ejercicio</Text>
      </Pressable>
      <FlatList
        data={history}
        keyExtractor={w => w.id}
        contentContainerClassName="px-4 pb-10"
        ListEmptyComponent={<Text className="text-zinc-500 text-center mt-10">Todavía no registraste entrenamientos.</Text>}
        renderItem={({ item: w }) => (
          <Pressable onPress={() => navigation.navigate("WorkoutDetail", { id: w.id })}
            className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 mb-3">
            <View className="flex-row justify-between">
              <Text className="text-white text-lg font-bold">{w.dayName}</Text>
              <Text className="text-zinc-400">{formatDate(w.startedAt)}</Text>
            </View>
            <View className="flex-row gap-4 mt-2">
              <Text className="text-zinc-400">⏱ {workoutDurationMin(w)} min</Text>
              <Text className="text-zinc-400">🏋️ {workoutVolume(w).toLocaleString("es-AR")} kg</Text>
              <Text className="text-zinc-400">{w.exercises.length} {w.exercises.length === 1 ? "ejercicio" : "ejercicios"}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
