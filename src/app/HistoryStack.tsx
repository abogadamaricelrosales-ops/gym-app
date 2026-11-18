import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HistoryListScreen from "../screens/history/HistoryListScreen";
import WorkoutDetailScreen from "../screens/history/WorkoutDetailScreen";
import ExerciseListScreen from "../screens/history/ExerciseListScreen";
import ExerciseProgressScreen from "../screens/history/ExerciseProgressScreen";

export type HistoryStackParams = {
  HistoryList: undefined; WorkoutDetail: { id: string };
  ExerciseList: undefined; ExerciseProgress: { name: string };
};
import { stackScreenOptions } from "../constants/theme";

const Stack = createNativeStackNavigator<HistoryStackParams>();

export default function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="HistoryList" component={HistoryListScreen} options={{ title: "Historial" }} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} options={{ title: "Detalle" }} />
      <Stack.Screen name="ExerciseList" component={ExerciseListScreen} options={{ title: "Ejercicios" }} />
      <Stack.Screen name="ExerciseProgress" component={ExerciseProgressScreen} options={{ title: "Progreso" }} />
    </Stack.Navigator>
  );
}
