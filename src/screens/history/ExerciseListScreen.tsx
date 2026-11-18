import { View, Text, FlatList, Pressable } from "react-native";
import { useExerciseNames } from "../../store/selectors/history";

export default function ExerciseListScreen({ navigation }: any) {
  const names = useExerciseNames();
  return (
    <FlatList className="flex-1 bg-zinc-950" data={names} keyExtractor={n => n}
      contentContainerClassName="p-4"
      renderItem={({ item }) => (
        <Pressable onPress={() => navigation.navigate("ExerciseProgress", { name: item })}
          className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 mb-3 flex-row justify-between">
          <Text className="text-white">{item}</Text><Text className="text-zinc-500">›</Text>
        </Pressable>
      )} />
  );
}
