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
import { withScreen } from "../components/ui/Screen";

const Home = withScreen(HomeScreen, "Hoy");
const Library = withScreen(TemplateLibraryScreen, "Librería");
const LogActivity = withScreen(LogActivityScreen, "Registrar actividad", { back: true });

const Root = createNativeStackNavigator<RootStackParams>();
const Tab = createBottomTabNavigator<TabParams>();

const icon = (glyph: string) => ({ color }: { color: string }) => (
  <Text style={{ color, fontSize: 18 }}>{glyph}</Text>
);

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: COLORS.bg, borderTopColor: COLORS.border, height: 64, paddingTop: 6 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
      }}
    >
      <Tab.Screen name="Hoy" component={Home} options={{ title: "Hoy", tabBarIcon: icon("☀") }} />
      <Tab.Screen name="Rutinas" component={RoutinesStack} options={{ tabBarIcon: icon("☰") }} />
      <Tab.Screen name="Entrenar" component={ActiveWorkoutScreen} options={{ title: "Entrenar", tabBarIcon: icon("🏋") }} />
      <Tab.Screen name="Historial" component={HistoryStack} options={{ tabBarIcon: icon("📈") }} />
      <Tab.Screen name="Libreria" component={Library} options={{ title: "Librería", tabBarIcon: icon("📚") }} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Root.Navigator screenOptions={stackScreenOptions}>
        <Root.Screen name="Tabs" component={Tabs} />
        <Root.Screen name="LogActivity" component={LogActivity} options={{ presentation: "modal" }} />
      </Root.Navigator>
    </NavigationContainer>
  );
}
