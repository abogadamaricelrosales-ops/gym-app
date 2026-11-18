import { useEffect, useState } from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { QUOTES, pickQuote } from "../constants/quotes";
import { useSettingsStore } from "../store/useSettingsStore";
import { Icon } from "./ui/Icon";
import { C } from "../constants/theme";

/** Frase motivacional al abrir la app. Nunca repite la de la vez anterior. */
export function QuoteSplash() {
  const hydrated = useSettingsStore.persist.hasHydrated();
  const [ready, setReady] = useState(hydrated);
  const [index, setIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (ready) return;
    return useSettingsStore.persist.onFinishHydration(() => setReady(true));
  }, [ready]);

  useEffect(() => {
    if (!ready || index !== null) return;
    const { lastQuote, setLastQuote } = useSettingsStore.getState();
    const i = pickQuote(lastQuote);
    setLastQuote(i);
    setIndex(i);
  }, [ready, index]);

  useEffect(() => {
    if (index === null) return;
    const t = setTimeout(() => setVisible(false), 4500);
    return () => clearTimeout(t);
  }, [index]);

  if (index === null) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
      <Pressable onPress={() => setVisible(false)} className="flex-1 bg-ink px-8 justify-center">
        <View className="w-14 h-14 rounded-full bg-lime items-center justify-center mb-8">
          <Icon name="flash" size={26} color={C.ink} />
        </View>
        <Text className="text-mute text-sm font-semibold tracking-widest mb-3">FRASE DEL DÍA</Text>
        <Text className="text-white text-4xl font-extrabold leading-tight">{QUOTES[index]}</Text>
        <View className="flex-row items-center mt-12">
          <Text className="text-lime font-semibold mr-2">Tocá para empezar</Text>
          <Icon name="arrow-forward" size={18} color={C.lime} />
        </View>
      </Pressable>
    </Modal>
  );
}
