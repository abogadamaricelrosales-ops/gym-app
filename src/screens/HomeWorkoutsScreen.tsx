import { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Screen, TopBar } from "../components/ui/Screen";
import { Photo } from "../components/ui/Photo";
import { Icon } from "../components/ui/Icon";
import { ExerciseFigure } from "../components/ExerciseFigure";
import { ExerciseGuideSheet } from "../components/ExerciseGuideSheet";
import { PHOTOS } from "../constants/photos";
import { HOME_WORKOUTS, type HomeWorkout } from "../data/homeWorkouts";
import { guideFor } from "../data/exerciseGuide";
import { drawPattern } from "../data/figures";
import { useWorkoutStore } from "../store/useWorkoutStore";
import type { Routine } from "../types/routine";
import { uid } from "../utils/id";
import { C } from "../constants/theme";

const toRoutine = (h: HomeWorkout): Routine => ({
  id: `home:${h.id}`, name: h.name, category: h.category, goal: h.goal, weekdays: [],
  exercises: h.exercises.map(e => ({ id: uid(), name: e.unit === "seg" ? `${e.name} (seg)` : e.name, targetSets: e.sets, targetReps: e.reps, restSeconds: e.rest })),
  createdAt: Date.now(), updatedAt: Date.now(),
});

export default function HomeWorkoutsScreen() {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState<string>(HOME_WORKOUTS[0].id);
  const [guide, setGuide] = useState<string | null>(null);

  return (
    <Screen padBottom={40} edgeToEdge>
      <Photo source={PHOTOS.perfil} style={{ height: 250 + insets.top }}>
        <View style={{ paddingTop: insets.top }}><TopBar title="" back /></View>
        <View className="flex-1 justify-end px-5 pb-5">
          <Text className="text-lime text-xs font-bold tracking-widest">SIN EQUIPO · CON TU PROPIO PESO</Text>
          <Text className="text-white text-4xl font-extrabold tracking-tight mt-1">Entrená en casa</Text>
          <Text className="text-white/70 mt-1">Hoy no hubo gimnasio, pero la racha no se corta.</Text>
        </View>
      </Photo>
      <View className="px-5 mt-4">
        {HOME_WORKOUTS.map(h => (
          <HomeCard key={h.id} h={h} open={open === h.id} onToggle={() => setOpen(open === h.id ? "" : h.id)} onGuide={setGuide} />
        ))}
        <Text className="text-mute text-xs text-center mt-2 px-4">
          Tocá un ejercicio para ver el muñeco y la técnica. En los que dicen "seg", las repeticiones son segundos.
        </Text>
      </View>
      <ExerciseGuideSheet name={guide} onClose={() => setGuide(null)} />
    </Screen>
  );
}

function HomeCard({ h, open, onToggle, onGuide }: { h: HomeWorkout; open: boolean; onToggle: () => void; onGuide: (n: string) => void }) {
  const nav = useNavigation<any>();
  const active = useWorkoutStore(s => s.active);
  const start = useWorkoutStore(s => s.start);
  const sets = h.exercises.reduce((t, e) => t + e.sets, 0);
  const minutes = Math.round(h.exercises.reduce((t, e) => t + e.sets * ((e.unit === "seg" ? e.reps : e.reps * 3) + e.rest), 0) / 60);
  const go = () => { if (!active) start(toRoutine(h)); nav.navigate("Workout"); };

  return (
    <View className="bg-card border border-line rounded-4xl mb-3 overflow-hidden">
      <Pressable onPress={onToggle} className="flex-row items-center p-4">
        <View className="w-12 h-12 rounded-2xl bg-lime items-center justify-center">
          <Icon name={h.icon} size={22} color={C.ink} />
        </View>
        <View className="flex-1 ml-3">
          <Text className="text-white text-base font-bold">{h.name}</Text>
          <Text className="text-mute text-xs">{h.subtitle} · {h.level}</Text>
          <Text className="text-lime/80 text-xs mt-0.5">{h.exercises.length} ejercicios · {sets} series · ~{minutes} min</Text>
        </View>
        <Icon name={open ? "chevron-up" : "chevron-down"} size={18} color={C.mute} />
      </Pressable>
      {open && (
        <View className="px-4 pb-4">
          {h.exercises.map((e, i) => <Row key={i} name={e.name} detail={`${e.sets} × ${e.reps}${e.unit === "seg" ? " seg" : ""}`} rest={e.rest} onPress={() => onGuide(e.name)} />)}
          <Pressable onPress={go} className="flex-row h-12 rounded-full bg-lime items-center justify-center mt-3">
            <Icon name="play" size={16} color={C.ink} />
            <Text className="text-ink font-bold ml-2">Empezar en casa</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function Row({ name, detail, rest, onPress }: { name: string; detail: string; rest: number; onPress: () => void }) {
  const thumb = useMemo(() => drawPattern(guideFor(name).pattern)[1], [name]);
  return (
    <Pressable onPress={onPress} className="flex-row items-center py-2 border-t border-line">
      <View className="w-12 h-12 rounded-xl bg-ink items-center justify-center mr-3">
        <ExerciseFigure prims={thumb} width={44} />
      </View>
      <Text className="text-white font-semibold flex-1">{name}</Text>
      <View className="items-end">
        <Text className="text-lime font-bold">{detail}</Text>
        <Text className="text-mute text-xs">{rest}s desc.</Text>
      </View>
    </Pressable>
  );
}
