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
import { withScreen } from "../components/ui/Screen";

const HistoryList = withScreen(HistoryListScreen, "Historial");
const WorkoutDetail = withScreen(WorkoutDetailScreen, "Detalle", { back: true });
const ExerciseList = withScreen(ExerciseListScreen, "Ejercicios", { back: true });
const ExerciseProgress = withScreen(ExerciseProgressScreen, "Progreso", { back: true });

const Stack = createNativeStackNavigator<HistoryStackParams>();

export default function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="HistoryList" component={HistoryList} options={{ title: "Historial" }} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} options={{ title: "Detalle" }} />
      <Stack.Screen name="ExerciseList" component={ExerciseList} options={{ title: "Ejercicios" }} />
      <Stack.Screen name="ExerciseProgress" component={ExerciseProgress} options={{ title: "Progreso" }} />
    </Stack.Navigator>
  );
}
