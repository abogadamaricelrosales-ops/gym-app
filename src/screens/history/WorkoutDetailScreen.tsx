import { ScrollView, View, Text, Pressable, Alert } from "react-native";
import { useWorkoutById } from "../../store/selectors/history";
import { useWorkoutStore } from "../../store/useWorkoutStore";
import { estimate1RM, formatDate, workoutVolume } from "../../utils/progress";

export default function WorkoutDetailScreen({ route, navigation }: any) {
  const w = useWorkoutById(route.params.id);
  const del = useWorkoutStore(s => s.deleteWorkout);
  if (!w) return <View className="flex-1 bg-black" />;

  const onDelete = () => Alert.alert("Borrar entrenamiento", "No se puede deshacer.", [
    { text: "Cancelar", style: "cancel" },
    { text: "Borrar", style: "destructive", onPress: () => { del(w.id); navigation.goBack(); } },
  ]);

  return (
    <ScrollView className="flex-1 bg-black" contentContainerClassName="p-4 pb-10">
      <Text className="text-white text-2xl font-bold">{w.dayName}</Text>
      <Text className="text-zinc-400 mb-4">{formatDate(w.startedAt)} · {workoutVolume(w).toLocaleString("es-AR")} kg totales</Text>
      {w.exercises.map(ex => (
        <Pressable key={ex.id} onPress={() => navigation.navigate("ExerciseProgress", { name: ex.name })}
          className="bg-zinc-900 rounded-xl p-3 mb-3">
          <Text className="text-white font-semibold mb-2">{ex.name} ›</Text>
          {ex.sets.map((s, i) => (
            <View key={s.id} className="flex-row justify-between py-1">
              <Text className="text-zinc-400">Serie {i + 1}</Text>
              <Text className="text-white">{s.weight} kg × {s.reps}</Text>
              <Text className="text-zinc-500">1RM≈{estimate1RM(s.weight, s.reps)}</Text>
            </View>
          ))}
        </Pressable>
      ))}
      <Pressable onPress={onDelete} className="mt-6 py-3 rounded-xl items-center border border-red-500">
        <Text className="text-red-400">Borrar entrenamiento</Text>
      </Pressable>
    </ScrollView>
  );
}
