import { useState } from "react";
import { View, Text, Pressable, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Screen, TopBar } from "../components/ui/Screen";
import { Photo } from "../components/ui/Photo";
import { Icon } from "../components/ui/Icon";
import { REFERENTS } from "../data/referents";
import { CATEGORY_PHOTO, REFERENT_PHOTO } from "../constants/photos";
import { ExerciseGuideSheet } from "../components/ExerciseGuideSheet";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { useRoutineStore } from "../store/useRoutineStore";
import { useLoadAnalysis } from "../hooks/useLoadAnalysis";
import { LEVEL_STYLE } from "../components/LoadCard";
import { CONFIDENCE_TEXT, initials } from "../components/ReferentsList";
import { C } from "../constants/theme";
import type { Referent, ReferentDay } from "../types/referent";
import type { Routine } from "../types/routine";
import type { Adjustment } from "../utils/load";
import { uid } from "../utils/id";

const shortName = (n: string) => n.replace(/\s*\(.*?\)/, "");

const dayToRoutine = (r: Referent, d: ReferentDay, i: number): Routine => ({
  id: `ref:${r.id}:${i}`,
  name: `${d.name} · ${shortName(r.name)}`,
  category: d.category,
  goal: r.goal,
  weekdays: [],
  exercises: d.exercises.map(e => ({ id: uid(), name: e.name, targetSets: e.sets, targetReps: e.reps, restSeconds: e.rest })),
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

export default function ReferentScreen() {
  const { id } = useRoute<any>().params as { id: string };
  const r = REFERENTS.find(x => x.id === id);
  const insets = useSafeAreaInsets();
  const [guide, setGuide] = useState<string | null>(null);
  if (!r) return <Screen scroll={false}><TopBar title="Referente" back /></Screen>;
  const totalSets = (d: ReferentDay) => d.exercises.reduce((t, e) => t + e.sets, 0);

  return (
    <Screen padBottom={40} edgeToEdge>
      <Photo source={REFERENT_PHOTO[r.id] ?? CATEGORY_PHOTO[r.days[0]?.category ?? "Full body"]} style={{ height: (REFERENT_PHOTO[r.id] ? 400 : 270) + insets.top }}>
        <View style={{ paddingTop: insets.top }}><TopBar title="" back /></View>
        <View className="flex-1 justify-end px-5 pb-5">
          {!REFERENT_PHOTO[r.id] && (
            <View className="w-14 h-14 rounded-full bg-lime items-center justify-center mb-3">
              <Text className="text-ink font-extrabold text-lg">{initials(r.name)}</Text>
            </View>
          )}
          <Text className="text-white text-3xl font-extrabold tracking-tight">{r.name}</Text>
          <Text className="text-lime font-semibold mt-1">{r.split} · {r.goal}</Text>
        </View>
      </Photo>

      <View className="px-5 mt-4">
        <Text className="text-white/85 leading-5">{r.knownFor}</Text>
        <View className="flex-row flex-wrap mt-3">
          {r.days.map((d, i) => (
            <View key={i} className="bg-card border border-line rounded-full px-3 py-1.5 mr-2 mb-2">
              <Text className="text-white text-xs font-semibold">Día {i + 1}: {d.category}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="px-5 mt-3">
        {r.days.map((d, i) => <DayCard key={i} referent={r} day={d} index={i} sets={totalSets(d)} onGuide={setGuide} />)}
      </View>

      <ExerciseGuideSheet name={guide} onClose={() => setGuide(null)} />

      {!!r.videos?.length && (
        <View className="px-5 mt-2">
          <Text className="text-white text-xl font-bold mb-1">Sus videos</Text>
          <Text className="text-mute text-xs mb-3">Videos de YouTube donde se ven sus ejercicios y combinaciones.</Text>
          {r.videos.map(v => (
            <Pressable key={v.url} onPress={() => Linking.openURL(v.url)} className="flex-row items-center bg-card border border-line rounded-3xl p-3 mb-2">
              <View className="w-11 h-11 rounded-2xl bg-red-600 items-center justify-center">
                <Icon name="logo-youtube" size={20} color="#fff" />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-white font-semibold" numberOfLines={2}>{v.title || "Video"}</Text>
                {!!v.covers && <Text className="text-mute text-xs mt-0.5" numberOfLines={1}>{v.covers}</Text>}
              </View>
              <Icon name="open-outline" size={16} color={C.mute} />
            </Pressable>
          ))}
        </View>
      )}

      <View className="mx-5 mt-2 bg-card border border-line rounded-3xl p-4">
        <View className="flex-row items-center">
          <Icon name="information-circle-outline" size={18} color={C.lime} />
          <Text className="text-white font-semibold ml-2">Confianza {r.confidence}</Text>
        </View>
        <Text className="text-mute text-xs mt-1">{CONFIDENCE_TEXT[r.confidence]}. No es su programa oficial.</Text>
        <Text className="text-mute text-xs font-semibold mt-3 mb-1">Fuentes</Text>
        {r.sources.map(s => (
          <Pressable key={s} onPress={() => Linking.openURL(s)}>
            <Text className="text-lime/80 text-xs mb-1" numberOfLines={1}>{s.replace(/^https?:\/\/(www\.)?/, "")}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

function DayCard({ referent, day, index, sets, onGuide }: {
  referent: Referent; day: ReferentDay; index: number; sets: number; onGuide: (name: string) => void;
}) {
  const nav = useNavigation<any>();
  const active = useWorkoutStore(s => s.active);
  const start = useWorkoutStore(s => s.start);
  const importRoutine = useRoutineStore(s => s.importRoutine);
  const analysis = useLoadAnalysis(day.category);
  const [open, setOpen] = useState(index === 0);
  const [saved, setSaved] = useState(false);
  const st = LEVEL_STYLE[analysis.level];
  const minutes = Math.round(day.exercises.reduce((t, e) => t + e.sets * (40 + e.rest), 0) / 60);

  const go = (adj?: Adjustment) => {
    if (!active) start(dayToRoutine(referent, day, index), adj);
    nav.navigate("Workout");
  };
  const save = () => {
    const { id, createdAt, updatedAt, ...rest } = dayToRoutine(referent, day, index);
    importRoutine(rest);
    setSaved(true);
  };

  return (
    <View className="bg-card border border-line rounded-4xl mb-3 overflow-hidden">
      <Pressable onPress={() => setOpen(o => !o)} className="flex-row items-center p-4">
        <View className="w-10 h-10 rounded-full bg-card2 items-center justify-center">
          <Text className="text-lime font-extrabold">{index + 1}</Text>
        </View>
        <View className="flex-1 ml-3">
          <Text className="text-white text-base font-bold">{day.name}</Text>
          <Text className="text-mute text-xs">{day.exercises.length} ejercicios · {sets} series · ~{minutes} min</Text>
        </View>
        <Icon name={open ? "chevron-up" : "chevron-down"} size={18} color={C.mute} />
      </Pressable>
      {open && (
        <View className="px-4 pb-4">
          <Text className="text-mute text-sm mb-1">{day.focus}</Text>
          <Text className="text-lime/80 text-xs mb-3">Tocá un ejercicio para ver cómo se hace.</Text>
          {day.exercises.map((e, i) => (
            <Pressable key={i} onPress={() => onGuide(e.name)} className="flex-row py-2.5 border-t border-line">
              <View className="flex-1 pr-3">
                <View className="flex-row items-center">
                  <Text className="text-white font-semibold flex-shrink">{e.name}</Text>
                  <Icon name="body-outline" size={13} color={C.lime} />
                </View>
                {!!e.notes && <Text className="text-mute text-xs mt-0.5">{e.notes}</Text>}
              </View>
              <View className="items-end">
                <Text className="text-lime font-bold">{e.sets} × {e.repRange}</Text>
                <Text className="text-mute text-xs">{e.rest}s desc.</Text>
              </View>
            </Pressable>
          ))}

          {analysis.adjustment && (
            <View className="rounded-2xl p-3 mt-2" style={{ backgroundColor: st.color + "18" }}>
              <Text className="font-bold" style={{ color: st.color }}>{st.label} para {day.category.toLowerCase()}</Text>
              {analysis.reasons.map(t => <Text key={t} className="text-white/80 text-xs mt-1">• {t}</Text>)}
            </View>
          )}
          <View className="flex-row gap-2 mt-3">
            {analysis.adjustment ? (
              <>
                <Pressable onPress={() => go(analysis.adjustment!)} className="flex-1 h-12 rounded-full items-center justify-center" style={{ backgroundColor: st.color }}>
                  <Text className="text-ink font-bold">Empezar ajustado</Text>
                </Pressable>
                <Pressable onPress={() => go()} className="h-12 px-4 rounded-full bg-card2 items-center justify-center">
                  <Text className="text-white font-semibold">Normal</Text>
                </Pressable>
              </>
            ) : (
              <Pressable onPress={() => go()} className="flex-1 flex-row h-12 rounded-full bg-lime items-center justify-center">
                <Icon name="play" size={16} color={C.ink} />
                <Text className="text-ink font-bold ml-2">Empezar este día</Text>
              </Pressable>
            )}
            <Pressable onPress={save} disabled={saved} className="w-12 h-12 rounded-full bg-card2 items-center justify-center">
              <Icon name={saved ? "checkmark" : "bookmark-outline"} size={18} color={C.lime} />
            </Pressable>
          </View>
          {saved && <Text className="text-mute text-xs mt-2">Guardada en Mis rutinas. Ahí podés asignarle días.</Text>}
        </View>
      )}
    </View>
  );
}
