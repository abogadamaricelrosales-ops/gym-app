import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import LogActivityScreen from "../screens/home/LogActivityScreen";
import ActiveWorkoutScreen from "../screens/workout/ActiveWorkoutScreen";
import TemplateLibraryScreen from "../screens/templates/TemplateLibraryScreen";
import RoutinesStack from "./RoutinesStack";
import HistoryStack from "./HistoryStack";
import type { RootStackParams, TabParams } from "./types";
import { COLORS, navTheme, stackScreenOptions } from "../constants/theme";

const Root = createNativeStackNavigator<RootStackParams>();
const Tab = createBottomTabNavigator<TabParams>();

const icon = (glyph: string) => ({ color }: { color: string }) => (
  <Text style={{ color, fontSize: 18 }}>{glyph}</Text>
);

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.bg },
        headerTintColor: COLORS.text,
        tabBarStyle: { backgroundColor: COLORS.bg, borderTopColor: COLORS.border },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
      }}
    >
      <Tab.Screen name="Hoy" component={HomeScreen} options={{ title: "Hoy", tabBarIcon: icon("☀") }} />
      <Tab.Screen name="Rutinas" component={RoutinesStack} options={{ headerShown: false, tabBarIcon: icon("☰") }} />
      <Tab.Screen name="Entrenar" component={ActiveWorkoutScreen} options={{ title: "Entrenar", tabBarIcon: icon("🏋") }} />
      <Tab.Screen name="Historial" component={HistoryStack} options={{ headerShown: false, tabBarIcon: icon("📈") }} />
      <Tab.Screen name="Libreria" component={TemplateLibraryScreen} options={{ title: "Librería", tabBarIcon: icon("📚") }} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Root.Navigator screenOptions={stackScreenOptions}>
        <Root.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Root.Screen
          name="LogActivity"
          component={LogActivityScreen}
          options={{ presentation: "modal", title: "Registrar actividad" }}
        />
      </Root.Navigator>
    </NavigationContainer>
  );
}
