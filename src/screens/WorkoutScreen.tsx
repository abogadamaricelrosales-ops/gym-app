import { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { useRestTimer } from "../hooks/useRestTimer";
import { ensurePermissions } from "../services/notifications";
import { Stepper } from "../components/Stepper";
import { Ring } from "../components/Ring";
import { Icon } from "../components/ui/Icon";
import { fmtClock, fmtKg } from "../utils/format";
import { workoutVolume } from "../utils/progress";
import { C } from "../constants/theme";
import { Photo } from "../components/ui/Photo";
import { CATEGORY_PHOTO, PHOTOS } from "../constants/photos";
import type { Workout } from "../types/workout";

export default function WorkoutScreen() {
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const active = useWorkoutStore(s => s.active);
  const [menu, setMenu] = useState(false);
  const [summary, setSummary] = useState<Workout | null>(null);
  const finish = useWorkoutStore(s => s.finish);
  const discard = useWorkoutStore(s => s.discard);

  useEffect(() => { ensurePermissions(); }, []);

  const close = () => (nav.canGoBack() ? nav.goBack() : nav.navigate("Tabs"));

  if (summary) return <Summary workout={summary} onDone={close} />;
  if (!active) {
    return (
      <View className="flex-1 bg-ink items-center justify-center p-8">
        <Text className="text-white text-xl font-bold">No hay ningún entreno en curso</Text>
        <Pressable onPress={close} className="mt-6 h-14 px-8 rounded-full bg-lime items-center justify-center">
          <Text className="text-ink font-bold">Volver</Text>
        </Pressable>
      </View>
    );
  }

  const onFinish = async () => {
    setMenu(false);
    const done = await finish();
    if (done && done.exercises.length) setSummary(done);
    else close();
  };

  return (
    <View className="flex-1 bg-ink">
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 40 }} showsVerticalScrollIndicator={false}>
        <Photo source={active.category ? CATEGORY_PHOTO[active.category] : PHOTOS.gym} style={{ height: 300 + insets.top }}>
          <View className="flex-row items-center justify-between px-5 h-14" style={{ marginTop: insets.top }}>
            <Pressable onPress={close} className="w-11 h-11 rounded-full bg-black/40 border border-white/10 items-center justify-center">
              <Icon name="chevron-down" size={20} />
            </Pressable>
            <View className="bg-black/40 border border-white/10 rounded-full px-3 py-1.5">
              <Text className="text-white text-xs font-semibold tracking-wide">{(active.category ?? "Entreno").toUpperCase()}</Text>
            </View>
            <Pressable onPress={() => setMenu(true)} className="w-11 h-11 rounded-full bg-black/40 border border-white/10 items-center justify-center">
              <Icon name="ellipsis-horizontal" size={20} />
            </Pressable>
          </View>
          <View className="flex-1 justify-end px-5 pb-5">
            <Text className="text-white text-[34px] font-extrabold tracking-tight mb-4" numberOfLines={2}>{active.name}</Text>
            <ElapsedPill startedAt={active.startedAt} workout={active} />
          </View>
        </Photo>
        <View className="px-5">
        <CurrentExercise />
        <ExerciseList />
        <Pressable onPress={() => setMenu(true)} className="h-14 rounded-full bg-card border border-line items-center justify-center mt-4">
          <Text className="text-white font-semibold">Terminar entreno</Text>
        </Pressable>
        </View>
      </ScrollView>

      <Modal visible={menu} transparent animationType="fade" onRequestClose={() => setMenu(false)}>
        <Pressable onPress={() => setMenu(false)} className="flex-1 bg-black/70 justify-end">
          <Pressable className="bg-card rounded-t-4xl p-6 gap-3" style={{ paddingBottom: insets.bottom + 24 }}>
            <Text className="text-white text-xl font-bold mb-2">¿Terminamos?</Text>
            <Pressable onPress={onFinish} className="h-14 rounded-full bg-lime items-center justify-center">
              <Text className="text-ink font-bold text-base">Guardar y terminar</Text>
            </Pressable>
            <Pressable onPress={() => setMenu(false)} className="h-14 rounded-full bg-card2 items-center justify-center">
              <Text className="text-white font-semibold">Seguir entrenando</Text>
            </Pressable>
            <Pressable onPress={async () => { setMenu(false); await discard(); close(); }} className="h-12 items-center justify-center">
              <Text className="text-red-400">Descartar sin guardar</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function ElapsedPill({ startedAt, workout }: { startedAt: number; workout: Workout }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const iv = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(iv);
  }, []);
  const sets = workout.exercises.flatMap(e => e.sets);
  const done = sets.filter(s => s.completed).length;
  return (
    <View className="flex-row items-center bg-lime rounded-full p-2 pl-6">
      <Text className="flex-1 text-ink text-4xl font-extrabold" style={{ fontVariant: ["tabular-nums"] }}>
        {fmtClock(Math.floor((now - startedAt) / 1000))}
      </Text>
      <View className="h-14 px-4 rounded-full bg-ink items-center justify-center">
        <Text className="text-white font-bold">{done}/{sets.length}</Text>
        <Text className="text-mute text-[10px]">series</Text>
      </View>
    </View>
  );
}

function CurrentExercise() {
  const active = useWorkoutStore(s => s.active)!;
  const updateSet = useWorkoutStore(s => s.updateSet);
  const completeSet = useWorkoutStore(s => s.completeSet);
  const undoSet = useWorkoutStore(s => s.undoSet);
  const addSet = useWorkoutStore(s => s.addSet);
  const goTo = useWorkoutStore(s => s.goToExercise);
  const rest = useRestTimer();

  const idx = active.currentExercise;
  const ex = active.exercises[idx];
  if (!ex) return null;
  const setIdx = ex.sets.findIndex(s => !s.completed);
  const current = setIdx >= 0 ? ex.sets[setIdx] : null;
  const isLast = idx === active.exercises.length - 1;

  return (
    <View className="bg-card border border-line rounded-4xl p-5 mt-4">
      <Text className="text-mute font-semibold">Ejercicio {idx + 1} de {active.exercises.length}</Text>
      <Text className="text-white text-3xl font-extrabold mt-1">{ex.name}</Text>

      {/* Series: lima = hecha (tocá para deshacer), borde = la actual */}
      <View className="flex-row flex-wrap gap-2 mt-4">
        {ex.sets.map((s, i) => (
          <Pressable
            key={s.id}
            onPress={() => s.completed && undoSet(ex.id, s.id)}
            className={`h-9 min-w-[36px] px-2 rounded-full items-center justify-center ${
              s.completed ? "bg-lime" : i === setIdx ? "border-2 border-lime" : "bg-card2"}`}
          >
            <Text className={`font-bold text-xs ${s.completed ? "text-ink" : "text-white"}`}>
              {s.completed ? `${s.weight}×${s.reps}` : i + 1}
            </Text>
          </Pressable>
        ))}
        <Pressable onPress={() => addSet(ex.id)} className="h-9 w-9 rounded-full bg-card2 items-center justify-center">
          <Icon name="add" size={18} color={C.mute} />
        </Pressable>
      </View>

      {rest.active ? (
        <RestPanel label={rest.label} progress={rest.progress} next={current ? `Serie ${setIdx + 1} · ${current.weight} kg × ${current.reps}` : undefined} />
      ) : current ? (
        <>
          <Text className="text-mute mt-5 mb-3">Serie {setIdx + 1} de {ex.sets.length} · objetivo {ex.targetReps} reps</Text>
          <View className="flex-row gap-3">
            <Stepper label="KG" value={current.weight} step={2.5} decimals onChange={v => updateSet(ex.id, current.id, { weight: v })} />
            <Stepper label="REPS" value={current.reps} step={1} onChange={v => updateSet(ex.id, current.id, { reps: v })} />
          </View>
          <Pressable onPress={() => completeSet(ex.id, current.id)} className="h-16 rounded-full bg-lime flex-row items-center justify-center mt-4">
            <Icon name="checkmark-circle" size={24} color={C.ink} />
            <Text className="text-ink text-lg font-extrabold ml-2">Serie hecha</Text>
          </Pressable>
        </>
      ) : (
        <View className="items-center mt-6">
          <Icon name="checkmark-done-circle" size={44} color={C.lime} />
          <Text className="text-white text-lg font-bold mt-2">¡Ejercicio completo!</Text>
          {!isLast && (
            <Pressable onPress={() => goTo(idx + 1)} className="h-14 px-8 rounded-full bg-lime items-center justify-center mt-4">
              <Text className="text-ink font-bold">Siguiente ejercicio</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

function RestPanel({ label, progress, next }: { label: string; progress: number; next?: string }) {
  const adjust = useWorkoutStore(s => s.adjustRest);
  const skip = useWorkoutStore(s => s.skipRest);
  return (
    <View className="items-center mt-5">
      <View className="items-center justify-center">
        <Ring size={200} stroke={14} progress={1 - progress} />
        <View className="absolute items-center">
          <Text className="text-mute font-semibold tracking-widest text-xs">DESCANSO</Text>
          <Text className="text-white text-5xl font-extrabold" style={{ fontVariant: ["tabular-nums"] }}>{label}</Text>
        </View>
      </View>
      {next && <Text className="text-mute mt-3">Siguiente: {next}</Text>}
      <View className="flex-row gap-3 mt-4 w-full">
        <Pressable onPress={() => adjust(-15)} className="flex-1 h-14 rounded-full bg-card2 items-center justify-center">
          <Text className="text-white font-bold">−15 s</Text>
        </Pressable>
        <Pressable onPress={() => adjust(15)} className="flex-1 h-14 rounded-full bg-card2 items-center justify-center">
          <Text className="text-white font-bold">+15 s</Text>
        </Pressable>
        <Pressable onPress={skip} className="flex-1 h-14 rounded-full bg-lime items-center justify-center">
          <Text className="text-ink font-bold">Saltar</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ExerciseList() {
  const active = useWorkoutStore(s => s.active)!;
  const goTo = useWorkoutStore(s => s.goToExercise);
  return (
    <View className="mt-6">
      <Text className="text-white text-xl font-bold mb-3">Ejercicios</Text>
      {active.exercises.map((e, i) => {
        const done = e.sets.filter(s => s.completed).length;
        const current = i === active.currentExercise;
        return (
          <Pressable
            key={e.id}
            onPress={() => goTo(i)}
            className={`flex-row items-center rounded-3xl p-3 mb-2 border ${current ? "bg-card border-lime" : "bg-card border-line"}`}
          >
            <View className="items-center justify-center">
              <Ring size={44} stroke={5} progress={done / e.sets.length} />
              <Text className="absolute text-white text-xs font-bold">{done}/{e.sets.length}</Text>
            </View>
            <Text className="flex-1 text-white font-semibold ml-3" numberOfLines={1}>{e.name}</Text>
            {done === e.sets.length
              ? <Icon name="checkmark-circle" size={22} color={C.lime} />
              : <Icon name="chevron-forward" size={18} color={C.mute} />}
          </Pressable>
        );
      })}
    </View>
  );
}

function Summary({ workout: w, onDone }: { workout: Workout; onDone: () => void }) {
  const insets = useSafeAreaInsets();
  const minutes = Math.max(1, Math.round(((w.finishedAt ?? Date.now()) - w.startedAt) / 60000));
  const sets = w.exercises.reduce((t, e) => t + e.sets.length, 0);
  return (
    <View className="flex-1 bg-ink">
      <Photo source={w.category ? CATEGORY_PHOTO[w.category] : PHOTOS.gym} style={{ flex: 1 }} strength={1}>
      <View className="flex-1 px-6 justify-end" style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 32 }}>
      <View className="w-16 h-16 rounded-full bg-lime items-center justify-center">
        <Icon name="trophy" size={30} color={C.ink} />
      </View>
      <Text className="text-white text-4xl font-extrabold mt-6">¡Bien hecho!</Text>
      <Text className="text-mute text-lg mt-1">{w.name}</Text>
      <View className="flex-row gap-3 mt-8">
        <Stat label="Minutos" value={String(minutes)} />
        <Stat label="Series" value={String(sets)} />
      </View>
      <View className="mt-3">
        <Stat label="Volumen total" value={fmtKg(workoutVolume(w))} />
      </View>
      <Pressable onPress={onDone} className="h-16 rounded-full bg-lime items-center justify-center mt-10">
        <Text className="text-ink text-lg font-extrabold">Listo</Text>
      </Pressable>
      </View>
      </Photo>
    </View>
  );
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-1 bg-black/50 border border-white/10 rounded-3xl p-5">
    <Text className="text-mute">{label}</Text>
    <Text className="text-white text-3xl font-extrabold mt-1">{value}</Text>
  </View>
);
