import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, Image, Animated, Easing, Platform, type ImageSourcePropType } from "react-native";
import { Icon } from "./ui/Icon";
import { C } from "../constants/theme";

const native = Platform.OS !== "web";
const HOLD = 1300; // ms que se queda cada posición

/**
 * Las 2 fotos del ejercicio (inicio y final) alternándose solas, como un video corto.
 * Tocá la foto para pausar, o una miniatura para ver esa posición quieta.
 */
export function ExerciseMotion({ photos, width }: { photos: [ImageSourcePropType, ImageSourcePropType]; width: number }) {
  const [step, setStep] = useState<0 | 1>(0);
  const [playing, setPlaying] = useState(true);
  const fade = useRef(new Animated.Value(0)).current; // 0 = inicio, 1 = final
  const height = Math.round(width * 0.68);

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => setStep(s => (s === 0 ? 1 : 0)), HOLD);
    return () => clearInterval(iv);
  }, [playing]);

  useEffect(() => {
    Animated.timing(fade, { toValue: step, duration: 450, easing: Easing.inOut(Easing.quad), useNativeDriver: native }).start();
  }, [step]);

  const pick = (i: 0 | 1) => { setPlaying(false); setStep(i); };

  return (
    <View>
      <Pressable onPress={() => setPlaying(p => !p)} style={{ width, height }} className="rounded-3xl overflow-hidden bg-ink">
        <Image source={photos[0]} style={{ position: "absolute", width, height }} resizeMode="contain" />
        <Animated.Image source={photos[1]} style={{ position: "absolute", width, height, opacity: fade }} resizeMode="contain" />
        <View className="absolute top-3 left-3 flex-row items-center bg-black/60 rounded-full pl-1 pr-3 py-1">
          <View className="w-6 h-6 rounded-full bg-lime items-center justify-center mr-1.5">
            <Text className="text-ink text-xs font-extrabold">{step + 1}</Text>
          </View>
          <Text className="text-white font-bold text-sm">{step === 0 ? "Inicio" : "Final"}</Text>
        </View>
        <View className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/60 items-center justify-center">
          <Icon name={playing ? "pause" : "play"} size={18} color={C.lime} />
        </View>
      </Pressable>
      <View className="flex-row gap-3 mt-3">
        {([0, 1] as const).map(i => (
          <Pressable key={i} onPress={() => pick(i)}
            className={`flex-1 flex-row items-center rounded-2xl p-1.5 border ${step === i ? "border-lime bg-card2" : "border-line bg-card2"}`}>
            <Image source={photos[i]} style={{ width: 56, height: 40, borderRadius: 10 }} resizeMode="cover" />
            <View className="ml-2">
              <Text className={`text-xs font-extrabold ${step === i ? "text-lime" : "text-mute"}`}>{i + 1}</Text>
              <Text className="text-white font-semibold text-sm">{i === 0 ? "Inicio" : "Final"}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      <Text className="text-mute text-xs mt-2">Se mueve solo. Tocá la foto para pausar o una posición para verla quieta.</Text>
    </View>
  );
}
