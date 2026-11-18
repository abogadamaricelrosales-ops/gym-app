import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoutineListScreen from "../screens/routines/RoutineListScreen";
import RoutineEditorScreen from "../screens/routines/RoutineEditorScreen";
import type { RoutinesStackParams } from "./types";
import { stackScreenOptions } from "../constants/theme";
import { withScreen } from "../components/ui/Screen";

const RoutineEditor = withScreen(RoutineEditorScreen, "Editar rutina", { back: true });

const Stack = createNativeStackNavigator<RoutinesStackParams>();

export default function RoutinesStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="RoutineList" component={RoutineListScreen} options={{ title: "Rutinas" }} />
      <Stack.Screen name="RoutineEditor" component={RoutineEditor} options={{ title: "Editar rutina" }} />
    </Stack.Navigator>
  );
}
