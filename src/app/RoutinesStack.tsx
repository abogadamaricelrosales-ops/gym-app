import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoutineListScreen from "../screens/routines/RoutineListScreen";
import RoutineEditorScreen from "../screens/routines/RoutineEditorScreen";
import type { RoutinesStackParams } from "./types";
import { stackScreenOptions } from "../constants/theme";

const Stack = createNativeStackNavigator<RoutinesStackParams>();

export default function RoutinesStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="RoutineList" component={RoutineListScreen} options={{ title: "Rutinas" }} />
      <Stack.Screen name="RoutineEditor" component={RoutineEditorScreen} options={{ title: "Editar rutina" }} />
    </Stack.Navigator>
  );
}
