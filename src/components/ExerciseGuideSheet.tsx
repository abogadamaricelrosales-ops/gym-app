import { useMemo } from "react";
import { View, Text, Pressable, Modal, ScrollView, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "./ui/Icon";
import { ExerciseFigure } from "./ExerciseFigure";
import { guideFor } from "../data/exerciseGuide";
import { drawPattern } from "../data/figures";
import { C } from "../constants/theme";
import { ExerciseMotion } from "./ExerciseMotion";
import { photosFor } from "../data/exercisePhotos";

/** Hoja con las fotos del ejercicio (o el muñeco si no hay fotos) en 2 posiciones y la mejor técnica del ejercicio. */
export function ExerciseGuideSheet({ name, onClose }: { name: string | null; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const g = useMemo(() => (name ? guideFor(name) : null), [name]);
  const poses = useMemo(() => (g ? drawPattern(g.pattern) : null), [g]);
  const photos = useMemo(() => (name ? photosFor(name) : null), [name]);
  const fig = Math.min(180, (Math.min(width, 520) - 40 - 12) / 2 - 8);

  return (
    <Modal visible={!!name} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/60" onPress={onClose} />
      {g && poses && (
        <View className="bg-card rounded-t-4xl px-5 pt-5 border-t border-line" style={{ paddingBottom: insets.bottom + 20, maxHeight: "90%" }}>
          <View className="flex-row items-start">
            <View className="flex-1 mr-3">
              <Text className="text-lime text-xs font-bold tracking-widest">{g.category.toUpperCase()}{g.muscles ? ` · ${g.muscles.toUpperCase()}` : ""}</Text>
              <Text className="text-white text-2xl font-extrabold mt-1">{name}</Text>
            </View>
            <Pressable onPress={onClose} hitSlop={10} className="w-10 h-10 rounded-full bg-card2 items-center justify-center">
              <Icon name="close" size={18} />
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
            {photos ? (
              <ExerciseMotion photos={photos} width={Math.min(width, 520) - 40} />
            ) : (
            <View className="flex-row gap-3">
              {poses.map((p, i) => (
                <View key={i} className="flex-1 bg-ink rounded-3xl items-center pt-3 pb-2">
                  <ExerciseFigure prims={p} width={fig} />
                  <View className="flex-row items-center mt-1">
                    <View className="w-5 h-5 rounded-full bg-lime items-center justify-center mr-1.5">
                      <Text className="text-ink text-[11px] font-extrabold">{i + 1}</Text>
                    </View>
                    <Text className="text-white font-semibold text-sm">{i === 0 ? "Inicio" : "Final"}</Text>
                  </View>
                </View>
              ))}
            </View>
            )}
            {g.approx && (
              <Text className="text-mute text-xs mt-2">Se muestra el movimiento más parecido de nuestro catálogo.</Text>
            )}

            <Text className="text-white text-lg font-bold mt-5 mb-2">La mejor técnica</Text>
            {g.tips.map((t, i) => (
              <View key={i} className="flex-row mb-2.5">
                <View className="w-6 h-6 rounded-full bg-card2 items-center justify-center mr-3 mt-0.5">
                  <Text className="text-lime text-xs font-bold">{i + 1}</Text>
                </View>
                <Text className="text-white/90 flex-1 leading-5">{t}</Text>
              </View>
            ))}
            <View className="flex-row bg-red-500/10 border border-red-500/30 rounded-2xl p-3 mt-2">
              <Icon name="alert-circle" size={18} color="#F87171" />
              <View className="flex-1 ml-2">
                <Text className="text-red-300 font-bold text-xs tracking-wide">ERROR COMÚN</Text>
                <Text className="text-white/85 text-sm mt-0.5">{g.mistake}</Text>
              </View>
            </View>
            {!photos && (
              <View className="flex-row items-center mt-4 mb-2">
                <Icon name="information-circle-outline" size={16} color={C.mute} />
                <Text className="text-mute text-xs ml-1.5 flex-1">En verde, la parte del cuerpo que se mueve.</Text>
              </View>
            )}
            <View className="h-3" />
          </ScrollView>
        </View>
      )}
    </Modal>
  );
}
