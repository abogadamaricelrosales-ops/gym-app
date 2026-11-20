import { useState } from "react";
import { Modal, View, Text, Pressable, TextInput, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "./ui/Icon";
import { C } from "../constants/theme";
import { exportBackup, parseBackup, pickBackupFileWeb, restoreBackup, type BackupSummary } from "../services/backup";

const web = Platform.OS === "web";

/** Hoja para guardar una copia de tus datos o restaurarla en otro teléfono. */
export function BackupSheet({ visible, onClose, onRestored }: { visible: boolean; onClose: () => void; onRestored: () => void }) {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, setPending] = useState<{ data: any; summary: BackupSummary } | null>(null);

  const reset = () => { setText(""); setMsg(null); setPending(null); };
  const close = () => { reset(); onClose(); };

  const check = (t: string) => {
    const r = parseBackup(t);
    if ("error" in r) { setPending(null); setMsg({ ok: false, text: r.error }); }
    else { setPending(r); setMsg(null); }
  };

  const save = async () => {
    const ok = await exportBackup();
    setMsg(ok
      ? { ok: true, text: web ? "Listo: se descargó el archivo. Guardalo en Drive o mandátelo por mail." : "Listo. Guardala en Drive, en tu mail o en un chat con vos." }
      : { ok: false, text: "No se guardó la copia." });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={close}>
      <Pressable className="flex-1 bg-black/60" onPress={close} />
      <View className="bg-card rounded-t-4xl px-5 pt-5 border-t border-line" style={{ paddingBottom: insets.bottom + 20, maxHeight: "90%" }}>
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-2xl font-extrabold">Copia de seguridad</Text>
          <Pressable onPress={close} hitSlop={10} className="w-10 h-10 rounded-full bg-card2 items-center justify-center">
            <Icon name="close" size={18} />
          </Pressable>
        </View>
        <ScrollView className="mt-1" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Text className="text-mute">
            Tus datos viven solo en este {web ? "navegador" : "teléfono"}. Guardá una copia de vez en cuando: si cambiás de celular o borrás la app, la restaurás acá.
          </Text>

          <Pressable onPress={save} className="h-14 rounded-full bg-lime flex-row items-center justify-center mt-5">
            <Icon name="cloud-download-outline" size={20} color={C.ink} />
            <Text className="text-ink font-extrabold text-base ml-2">Guardar copia</Text>
          </Pressable>

          <Text className="text-mute text-xs font-semibold tracking-widest mt-6 mb-2">RESTAURAR UNA COPIA</Text>
          {web && (
            <Pressable
              onPress={async () => { const t = await pickBackupFileWeb(); if (t) check(t); }}
              className="h-12 rounded-full bg-card2 flex-row items-center justify-center mb-2"
            >
              <Icon name="document-outline" size={18} color={C.lime} />
              <Text className="text-white font-semibold ml-2">Elegir archivo de copia</Text>
            </Pressable>
          )}
          <TextInput
            value={text}
            onChangeText={t => { setText(t); if (t.trim()) check(t); else reset(); }}
            placeholder={web ? "…o pegá acá el texto de la copia" : "Pegá acá el texto de la copia"}
            placeholderTextColor="#55555C"
            multiline
            className="min-h-[80px] max-h-40 bg-card2 rounded-2xl p-4 text-white text-xs"
          />

          {pending && (
            <View className="bg-card2 rounded-2xl p-4 mt-3">
              <Text className="text-white font-semibold">
                Copia con {pending.summary.routines} rutinas, {pending.summary.workouts} entrenos y {pending.summary.activities} actividades
                {pending.summary.exportedAt ? ` (del ${new Date(pending.summary.exportedAt).toLocaleDateString("es-AR")})` : ""}.
              </Text>
              <Text className="text-mute text-xs mt-1">Reemplaza todo lo que tenés ahora en la app.</Text>
              <Pressable
                onPress={() => { restoreBackup(pending.data); reset(); setMsg({ ok: true, text: "Copia restaurada." }); onRestored(); }}
                className="h-12 rounded-full bg-lime items-center justify-center mt-3"
              >
                <Text className="text-ink font-bold">Restaurar esta copia</Text>
              </Pressable>
            </View>
          )}
          {msg && <Text className={`mt-3 ${msg.ok ? "text-lime" : "text-red-400"}`}>{msg.text}</Text>}
        </ScrollView>
      </View>
    </Modal>
  );
}
