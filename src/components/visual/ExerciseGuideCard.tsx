import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import { StickFigurePlayer } from "./StickFigurePlayer";
import { getExerciseVisual } from "../../utils/visuals";

export function ExerciseGuideCard({ name, exerciseKey, defaultOpen = false }: {
  name: string; exerciseKey?: string; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const info = getExerciseVisual(name, exerciseKey);
  if (!info) return null;
  const { visual, displayName } = info;
  if (!visual) return null;

  return (
    <Animated.View layout={LinearTransition} className="bg-zinc-950 border border-zinc-800 rounded-2xl mb-3 overflow-hidden">
      <Pressable onPress={() => setOpen(o => !o)} className="flex-row items-center justify-between px-4 py-3">
        <Text className="text-white font-extrabold tracking-wider">{displayName}</Text>
        <Text className="text-orange-400 font-semibold">{open ? "Ocultar ▲" : "Ver técnica ▼"}</Text>
      </Pressable>

      {open && (
        <Animated.View entering={FadeIn.duration(200)} className="px-4 pb-4">
          <View className="items-center">
            <StickFigurePlayer visual={visual} size={220} />
          </View>

          {visual && (
            <View className="flex-row gap-3 mt-4">
              {visual.phases.map((p, i) => (
                <View key={i} className="flex-1 items-center">
                  <StickFigurePlayer visual={visual} size={130} phase={i as 0 | 1} />
                  <Text className={`mt-2 font-bold text-xs tracking-widest ${i ? "text-orange-400" : "text-zinc-300"}`}>{p.label}</Text>
                </View>
              ))}
            </View>
          )}

          {!!visual?.angles?.length && (
            <View className="flex-row flex-wrap gap-2 mt-4">
              {visual.angles.map(a => (
                <View key={a.joint} className="bg-green-500/15 border border-green-500/40 px-2 py-1 rounded-md">
                  <Text className="text-green-400 text-xs font-semibold">{a.joint.toUpperCase()} {a.label}</Text>
                </View>
              ))}
            </View>
          )}

          {visual?.cue && (
            <View className="mt-3 bg-orange-500/10 border-l-4 border-orange-500 px-3 py-2 rounded-r-lg">
              <Text className="text-orange-200 font-medium">💬 {visual.cue}</Text>
            </View>
          )}
        </Animated.View>
      )}
    </Animated.View>
  );
}
