import type { NavigatorScreenParams } from "@react-navigation/native";
import type { HistoryStackParams } from "./HistoryStack";

export type RoutinesStackParams = {
  RoutineList: undefined;
  RoutineEditor: { id: string };
};

export type TabParams = {
  Hoy: undefined;
  Rutinas: NavigatorScreenParams<RoutinesStackParams> | undefined;
  Entrenar: undefined;
  Historial: NavigatorScreenParams<HistoryStackParams> | undefined;
  Libreria: undefined;
};

export type RootStackParams = {
  Tabs: NavigatorScreenParams<TabParams> | undefined;
  LogActivity: undefined;
};
