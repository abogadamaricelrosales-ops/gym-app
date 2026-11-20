import { Platform, Vibration } from "react-native";
import * as Notifications from "expo-notifications";

const native = Platform.OS !== "web";

if (native) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

// ---- Navegador: pitido + vibración + aviso del sistema (si diste permiso) ----

let audio: AudioContext | null = null;
const webTimers = new Map<string, ReturnType<typeof setTimeout>>();

/** El navegador solo deja sonar audio después de un toque: se "despierta" al tocar "Serie hecha". */
function unlockAudio() {
  try {
    const Ctx = (globalThis as any).AudioContext ?? (globalThis as any).webkitAudioContext;
    if (!Ctx) return;
    audio = audio ?? new Ctx();
    if (audio!.state === "suspended") audio!.resume();
  } catch {
    // sin audio en este navegador
  }
}

function beep() {
  if (!audio) return;
  try {
    const t = audio.currentTime;
    [0, 0.25, 0.5].forEach((d, i) => {
      const osc = audio!.createOscillator();
      const gain = audio!.createGain();
      osc.frequency.value = i === 2 ? 1320 : 880;
      gain.gain.setValueAtTime(0.0001, t + d);
      gain.gain.exponentialRampToValueAtTime(0.4, t + d + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.2);
      osc.connect(gain).connect(audio!.destination);
      osc.start(t + d);
      osc.stop(t + d + 0.22);
    });
  } catch {
    // ignorar
  }
}

/** Aviso de "tiempo cumplido" en el momento (pitido en el navegador, vibración en el teléfono). */
export function alertNow(title = "¡Tiempo!", body = "Vamos con la siguiente serie 💪") {
  if (native) {
    Vibration.vibrate([0, 300, 150, 300]);
    return;
  }
  beep();
  try { (navigator as any).vibrate?.([300, 150, 300]); } catch { /* ignorar */ }
  try {
    const N = (globalThis as any).Notification;
    if (N?.permission === "granted" && document.visibilityState !== "visible") new N(title, { body });
  } catch { /* ignorar */ }
}

export async function ensurePermissions() {
  if (!native) {
    try {
      const N = (globalThis as any).Notification;
      if (N?.permission === "default") await N.requestPermission();
    } catch { /* ignorar */ }
    return;
  }
  try {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") await Notifications.requestPermissionsAsync();
  } catch (e) {
    console.warn("No se pudieron pedir permisos de notificación", e);
  }
}

/** Programa el aviso de fin de descanso. Devuelve su id (o undefined si falla). */
export async function scheduleRestEnd(seconds: number, title = "¡Descanso terminado!") {
  if (!native) {
    unlockAudio();
    const id = `web-${Date.now()}-${Math.random()}`;
    webTimers.set(id, setTimeout(() => { webTimers.delete(id); alertNow(title); }, Math.max(1, seconds) * 1000));
    return id;
  }
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

export { unlockAudio };

export async function cancelNotification(id?: string) {
  if (!id) return;
  if (!native) {
    const t = webTimers.get(id);
    if (t) clearTimeout(t);
    webTimers.delete(id);
    return;
  }
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch {
    // ya disparada o inexistente
  }
}
