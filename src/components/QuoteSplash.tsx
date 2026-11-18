import { useEffect, useState } from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Photo } from "./ui/Photo";
import { PHOTOS } from "../constants/photos";
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
  const insets = useSafeAreaInsets();

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
      <Pressable onPress={() => setVisible(false)} className="flex-1 bg-ink">
        <Photo source={PHOTOS.splash} style={{ flex: 1 }} strength={1}>
          <View className="flex-1 justify-end px-7" style={{ paddingBottom: insets.bottom + 48 }}>
            <View className="flex-row items-center mb-6">
              <View className="w-10 h-10 rounded-full bg-lime items-center justify-center">
                <Icon name="flash" size={20} color={C.ink} />
              </View>
              <Text className="text-white/80 text-xs font-bold tracking-[3px] ml-3">FRASE DEL DÍA</Text>
            </View>
            <Text className="text-white text-[40px] font-extrabold leading-[46px] tracking-tight">{QUOTES[index]}</Text>
            <View className="flex-row items-center justify-between mt-10 bg-white/10 border border-white/15 rounded-full p-1.5 pl-6">
              <Text className="text-white font-semibold">Tocá para empezar</Text>
              <View className="w-12 h-12 rounded-full bg-lime items-center justify-center">
                <Icon name="arrow-forward" size={20} color={C.ink} />
              </View>
            </View>
          </View>
        </Photo>
      </Pressable>
    </Modal>
  );
}
