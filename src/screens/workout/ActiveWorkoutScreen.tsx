import { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable, Alert, Modal, TextInput } from "react-native";
import { useWorkoutStore } from "../../store/useWorkoutStore";
import { useRoutineStore } from "../../store/useRoutineStore";
import { SetRow } from "../../components/workout/SetRow";
import { RestTimerBar } from "../../components/workout/RestTimerBar";
import { ExerciseGuideCard } from "../../components/visual/ExerciseGuideCard";
import { Screen } from "../../components/ui/Screen";
import { ensurePermissions } from "../../services/notifications";
import { exerciseSessions, nextTarget } from "../../utils/progress";
import type { Workout, WorkoutExercise } from "../../types/workout";

export default function ActiveWorkoutScreen({ navigation }: any) {
  const active = useWorkoutStore(s => s.active);
  const finish = useWorkoutStore(s => s.finishWorkout);
  const discard = useWorkoutStore(s => s.discardWorkout);
  const [finishing, setFinishing] = useState(false);

  useEffect(() => { ensurePermissions(); }, []);

  if (!active) return <StartPicker />;

  const onDiscard = () =>
    Alert.alert("Descartar entrenamiento", "Se pierden las series registradas.", [
      { text: "Cancelar", style: "cancel" },
      { text: "Descartar", style: "destructive", onPress: () => discard() },
    ]);

  const onFinish = async (rpe: number) => {
    setFinishing(false);
    await finish(rpe);
    navigation.navigate("Historial", { screen: "HistoryList" });
  };

  return (
    <Screen
      title={active.dayName}
      subtitle={<Progress workout={active} />}
      right={
        <Pressable onPress={() => setFinishing(true)} className="h-11 px-5 rounded-xl bg-orange-500 items-center justify-center">
          <Text className="text-zinc-950 font-bold">Terminar</Text>
        </Pressable>
      }
    >
      <ScrollView className="flex-1" contentContainerClassName="px-4 pb-44" keyboardShouldPersistTaps="handled">
        {active.exercises.map(ex => <ExerciseCard key={ex.id} ex={ex} />)}
        <AddExercise />
        <Pressable onPress={onDiscard} className="h-12 mt-2 items-center justify-center">
          <Text className="text-zinc-500">Descartar entrenamiento</Text>
        </Pressable>
      </ScrollView>

      <RestTimerBar />
      <FinishModal visible={finishing} onPick={onFinish} onClose={() => setFinishing(false)} />
    </Screen>
  );
}

function Progress({ workout }: { workout: Workout }) {
  const sets = workout.exercises.flatMap(e => e.sets);
  const done = sets.filter(s => s.completed).length;
  return <Text className="text-zinc-500">{done}/{sets.length} series completadas</Text>;
}

function ExerciseCard({ ex }: { ex: WorkoutExercise }) {
  const history = useWorkoutStore(s => s.history);
  const addSet = useWorkoutStore(s => s.addSet);
  const sessions = exerciseSessions(history, ex.name);
  const last = sessions[sessions.length - 1];
  const target = last ? nextTarget(last, ex.targetReps) : null;
  const done = ex.sets.filter(s => s.completed).length;

  return (
    <View className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 mb-3">
      <View className="flex-row items-start justify-between gap-3">
        <Text className="flex-1 text-white text-xl font-bold">{ex.name}</Text>
        <Text className="text-zinc-500 font-semibold">{done}/{ex.sets.length}</Text>
      </View>
      <View className="flex-row flex-wrap gap-2 mt-2">
        <Tag label={`${ex.targetReps} reps`} />
        <Tag label={`Descanso ${ex.restSeconds}s`} />
      </View>
      {last && target && (
        <Text className="text-zinc-400 text-sm mt-3">
          Última: {last.topWeight} kg × {last.topReps} · Hoy: <Text className="text-white font-semibold">{target.weight} kg × {target.reps}</Text>
        </Text>
      )}

      <View className="mt-3">
        <ExerciseGuideCard name={ex.name} exerciseKey={ex.exerciseKey} />
      </View>

      <View className="flex-row gap-2 mb-1 mt-1">
        <Text className="w-8 text-zinc-600 text-xs font-bold text-center">SET</Text>
        <Text className="flex-1 text-zinc-600 text-xs font-bold text-center">KG</Text>
        <Text className="flex-1 text-zinc-600 text-xs font-bold text-center">REPS</Text>
        <View className="w-12" />
      </View>
      {ex.sets.map((st, i) => <SetRow key={st.id} exId={ex.id} set={st} index={i} />)}

      <Pressable onPress={() => addSet(ex.id)} className="h-12 mt-2 rounded-xl border border-dashed border-zinc-700 items-center justify-center">
        <Text className="text-zinc-400 font-semibold">+ Añadir serie</Text>
      </Pressable>
    </View>
  );
}

const Tag = ({ label }: { label: string }) => (
  <View className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800">
    <Text className="text-zinc-400 text-xs font-semibold">{label}</Text>
  </View>
);

function AddExercise() {
  const addExercise = useWorkoutStore(s => s.addExercise);
  const [name, setName] = useState("");
  const ok = !!name.trim();
  return (
    <View className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 mb-3 flex-row gap-2">
      <TextInput
        className="flex-1 h-12 bg-zinc-950 border border-zinc-800 rounded-xl px-4 text-white"
        placeholder="Agregar ejercicio"
        placeholderTextColor="#52525b"
        value={name}
        onChangeText={setName}
      />
      <Pressable
        disabled={!ok}
        onPress={() => { addExercise(name.trim()); setName(""); }}
        className={`h-12 px-4 rounded-xl bg-zinc-800 border border-zinc-700 items-center justify-center ${ok ? "" : "opacity-40"}`}
      >
        <Text className="text-white font-semibold">Agregar</Text>
      </Pressable>
    </View>
  );
}

function FinishModal({ visible, onPick, onClose }: { visible: boolean; onPick: (rpe: number) => void; onClose: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-zinc-950/80 justify-center p-6">
        <View className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
          <Text className="text-white text-xl font-bold">¿Qué tan duro fue?</Text>
          <Text className="text-zinc-500 mt-1 mb-4">RPE de la sesión: 1 muy fácil, 10 al límite. Se usa para calcular tu fatiga.</Text>
          <View className="flex-row flex-wrap gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
              <Pressable key={n} onPress={() => onPick(n)}
                className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 items-center justify-center">
                <Text className="text-white text-lg font-bold">{n}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable onPress={onClose} className="h-12 mt-4 items-center justify-center">
            <Text className="text-zinc-400 font-semibold">Seguir entrenando</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

/** Sin entreno activo: elegir un día de la rutina activa o empezar libre. */
function StartPicker() {
  const routines = useRoutineStore(s => s.routines);
  const activeRoutineId = useRoutineStore(s => s.activeRoutineId);
  const startFromRoutine = useWorkoutStore(s => s.startFromRoutine);
  const startEmpty = useWorkoutStore(s => s.startEmpty);
  const routine = routines.find(r => r.id === activeRoutineId) ?? routines[0];

  return (
    <Screen title="Entrenar" subtitle={routine ? routine.name : "Sin rutina activa"}>
      <ScrollView className="flex-1" contentContainerClassName="px-4 pb-10">
        {routine?.days.map(d => (
          <Pressable key={d.id} onPress={() => startFromRoutine(routine, d.id)}
            className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 mb-3 flex-row items-center">
            <View className="flex-1">
              <Text className="text-white text-xl font-bold">{d.name}</Text>
              <Text className="text-zinc-500 mt-1" numberOfLines={1}>
                {d.exercises.length} ejercicios · {d.exercises.map(e => e.name).join(", ")}
              </Text>
            </View>
            <View className="w-11 h-11 rounded-full bg-orange-500 items-center justify-center ml-3">
              <Text className="text-zinc-950 text-lg font-bold">▶</Text>
            </View>
          </Pressable>
        ))}
        {!routine && (
          <View className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 mb-3">
            <Text className="text-zinc-400">No tenés rutinas. Creá una en Rutinas o elegí una de la Librería.</Text>
          </View>
        )}
        {routine && routine.days.length === 0 && (
          <View className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 mb-3">
            <Text className="text-zinc-400">Esta rutina no tiene días todavía. Editala en la pestaña Rutinas.</Text>
          </View>
        )}
        <Pressable onPress={() => startEmpty()}
          className="h-12 rounded-xl bg-zinc-900 border border-zinc-800 items-center justify-center mt-2">
          <Text className="text-white font-semibold">Entrenamiento libre</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
