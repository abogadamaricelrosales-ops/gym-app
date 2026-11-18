import { useEffect, useRef, useState } from "react";
import { Modal, View, Text, Pressable, Animated, Easing, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Photo } from "./ui/Photo";
import { PHOTOS } from "../constants/photos";
import { QUOTES, pickQuote } from "../constants/quotes";
import { useSettingsStore } from "../store/useSettingsStore";
import { Icon } from "./ui/Icon";
import { C } from "../constants/theme";

const native = Platform.OS !== "web";

/**
 * Frase épica al abrir la app. Entra con un zoom lento de la foto y la frase aparece
 * palabra por palabra; al salir se desvanece con un leve acercamiento.
 */
export function QuoteSplash() {
  const hydrated = useSettingsStore.persist.hasHydrated();
  const [ready, setReady] = useState(hydrated);
  const [index, setIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const insets = useSafeAreaInsets();

  const bgScale = useRef(new Animated.Value(1.18)).current;
  const fade = useRef(new Animated.Value(0)).current; // velo negro inicial → foto
  const eyebrow = useRef(new Animated.Value(0)).current;
  const button = useRef(new Animated.Value(0)).current;
  const out = useRef(new Animated.Value(0)).current; // 0 visible, 1 saliendo
  const closing = useRef(false);
  const words = index !== null ? QUOTES[index].split(" ") : [];
  const wordAnims = useRef<Animated.Value[]>([]).current;
  if (wordAnims.length !== words.length) {
    wordAnims.length = 0;
    words.forEach(() => wordAnims.push(new Animated.Value(0)));
  }

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
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 700, useNativeDriver: native }),
      Animated.timing(bgScale, { toValue: 1, duration: 6000, easing: Easing.out(Easing.quad), useNativeDriver: native }),
      Animated.sequence([
        Animated.delay(350),
        Animated.timing(eyebrow, { toValue: 1, duration: 500, useNativeDriver: native }),
        Animated.stagger(90, wordAnims.map(v => Animated.timing(v, { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: native }))),
        Animated.timing(button, { toValue: 1, duration: 450, useNativeDriver: native }),
      ]),
    ]).start();
    const t = setTimeout(close, 5500);
    return () => clearTimeout(t);
  }, [index]);

  function close() {
    if (closing.current) return;
    closing.current = true;
    Animated.timing(out, { toValue: 1, duration: 650, easing: Easing.in(Easing.quad), useNativeDriver: native }).start(() => setVisible(false));
  }

  if (index === null) return null;
  const outOpacity = out.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const outScale = out.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={close}>
      <Animated.View style={{ flex: 1, backgroundColor: C.ink, opacity: outOpacity }}>
        <Pressable onPress={close} style={{ flex: 1 }}>
          <Animated.View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: fade, transform: [{ scale: Animated.multiply(bgScale, outScale) }] }}>
            <Photo source={PHOTOS.splash} style={{ flex: 1 }} strength={1} />
          </Animated.View>
          <View className="flex-1 justify-end px-7" style={{ paddingBottom: insets.bottom + 48 }}>
            <Animated.View style={{ opacity: eyebrow, transform: [{ translateX: eyebrow.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] }}>
              <View className="flex-row items-center mb-6">
                <View className="w-10 h-10 rounded-full bg-lime items-center justify-center">
                  <Icon name="flash" size={20} color={C.ink} />
                </View>
                <Text className="text-lime text-xs font-extrabold tracking-[4px] ml-3">NO TE RINDAS</Text>
              </View>
            </Animated.View>
            <View className="flex-row flex-wrap">
              {words.map((w, i) => (
                <Animated.Text
                  key={i}
                  style={{
                    color: C.white, fontSize: 40, fontWeight: "800", lineHeight: 46, letterSpacing: -0.6,
                    opacity: wordAnims[i],
                    transform: [{ translateY: wordAnims[i].interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) }],
                  }}
                >
                  {w + " "}
                </Animated.Text>
              ))}
            </View>
            <Animated.View style={{ opacity: button, transform: [{ translateY: button.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }] }}>
              <View className="flex-row items-center justify-between mt-10 bg-white/10 border border-white/15 rounded-full p-1.5 pl-6">
                <Text className="text-white font-semibold">Tocá para empezar</Text>
                <View className="w-12 h-12 rounded-full bg-lime items-center justify-center">
                  <Icon name="arrow-forward" size={20} color={C.ink} />
                </View>
              </View>
            </Animated.View>
          </View>
        </Pressable>
      </Animated.View>
    </Modal>
  );
}
