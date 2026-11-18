import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

const supported = Platform.OS !== "web";

if (supported) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export async function ensurePermissions() {
  if (!supported) return;
  try {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") await Notifications.requestPermissionsAsync();
  } catch (e) {
    console.warn("No se pudieron pedir permisos de notificación", e);
  }
}

/** Programa la notificación de fin de descanso. Devuelve su id (o undefined si falla). */
export async function scheduleRestEnd(seconds: number, title = "¡Descanso terminado!") {
  if (!supported) return undefined;
  try {
    return await Notifications.scheduleNotificationAsync({
      content: { title, body: "Vamos con la siguiente serie 💪", sound: true },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: Math.max(1, Math.round(seconds)),
      },
    });
  } catch (e) {
    console.warn("No se pudo programar la notificación", e);
    return undefined;
  }
}

export async function cancelNotification(id?: string) {
  if (!supported || !id) return;
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch {
    // ya disparada o inexistente
  }
}
