import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import RoutinesScreen from "../screens/RoutinesScreen";
import RoutineEditorScreen from "../screens/RoutineEditorScreen";
import ProgressScreen from "../screens/ProgressScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import { PillTabBar } from "../components/PillTabBar";
import { navTheme, C } from "../constants/theme";

export type RootStackParams = {
  Tabs: undefined;
  Workout: undefined;
  RoutineEditor: { id: string };
};

const Root = createNativeStackNavigator<RootStackParams>();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      tabBar={props => <PillTabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: C.ink } }}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Rutinas" component={RoutinesScreen} />
      <Tab.Screen name="Progreso" component={ProgressScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Root.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: C.ink } }}>
        <Root.Screen name="Tabs" component={Tabs} />
        <Root.Screen name="RoutineEditor" component={RoutineEditorScreen} />
        <Root.Screen name="Workout" component={WorkoutScreen} options={{ presentation: "fullScreenModal", gestureEnabled: false }} />
      </Root.Navigator>
    </NavigationContainer>
  );
}
