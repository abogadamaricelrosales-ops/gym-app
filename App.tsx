import "./global.css";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/app/RootNavigator";
import { QuoteSplash } from "./src/components/QuoteSplash";
import { StartGuard } from "./src/components/StartGuard";
import { useSettingsStore } from "./src/store/useSettingsStore";
import { useRoutineStore } from "./src/store/useRoutineStore";

/** La primera vez que se abre la app carga 3 rutinas de ejemplo. */
function useFirstLaunchSeed() {
  useEffect(() => {
    const run = () => {
      const settings = useSettingsStore.getState();
      if (settings.seeded) return;
      if (useRoutineStore.getState().routines.length === 0) useRoutineStore.getState().seedExamples();
      settings.markSeeded();
    };
    const ready = () => useSettingsStore.persist.hasHydrated() && useRoutineStore.persist.hasHydrated();
    if (ready()) return run();
    const unsubs = [
      useSettingsStore.persist.onFinishHydration(() => ready() && run()),
      useRoutineStore.persist.onFinishHydration(() => ready() && run()),
    ];
    return () => unsubs.forEach(u => u());
  }, []);
}

export default function App() {
  useFirstLaunchSeed();
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <RootNavigator />
      <StartGuard />
      <QuoteSplash />
    </SafeAreaProvider>
  );
}
