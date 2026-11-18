import { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable, Alert, Modal } from "react-native";
import { useWorkoutStore } from "../../store/useWorkoutStore";
import { useRoutineStore } from "../../store/useRoutineStore";
import { SetRow } from "../../components/workout/SetRow";
import { RestTimerBar } from "../../components/workout/RestTimerBar";
import { ExerciseGuideCard } from "../../components/visual/ExerciseGuideCard";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { ensurePermissions } from "../../services/notifications";
import { exerciseSessions, nextTarget } from "../../utils/progress";
import type { WorkoutExercise } from "../../types/workout";

export default function ActiveWorkoutScreen({ navigation }: any) {
  const active = useWorkoutStore(s => s.active);
  const history = useWorkoutStore(s => s.history);
  const addSet = useWorkoutStore(s => s.addSet);
  const addExercise = useWorkoutStore(s => s.addExercise);
  const finish = useWorkoutStore(s => s.finishWorkout);
  const discard = useWorkoutStore(s => s.discardWorkout);
  const [finishing, setFinishing] = useState(false);
  const [newExercise, setNewExercise] = useState("");

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

  const hint = (ex: WorkoutExercise) => {
    const sessions = exerciseSessions(history, ex.name);
    const last = sessions[sessions.length - 1];
    if (!last) return null;
    const t = nextTarget(last, ex.targetReps);
    return `Última: ${last.topWeight} kg × ${last.topReps} · Hoy probá ${t.weight} kg × ${t.reps}`;
  };

  return (
    <View className="flex-1 bg-black">
      <ScrollView contentContainerClassName="p-4 pb-40" keyboardShouldPersistTaps="handled">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-2xl font-bold flex-1 mr-2">{active.dayName}</Text>
          <Pressable onPress={onDiscard} className="px-3 py-2 mr-2">
            <Text className="text-zinc-400">Descartar</Text>
          </Pressable>
          <Pressable onPress={() => setFinishing(true)} className="bg-emerald-500 px-4 py-2 rounded-lg">
            <Text className="font-semibold">Terminar</Text>
          </Pressable>
        </View>

        {active.exercises.map(ex => (
          <View key={ex.id} className="mb-6 bg-zinc-900 rounded-xl p-3">
            <Text className="text-white text-lg font-semibold">{ex.name}</Text>
            <Text className="text-zinc-400">Objetivo: {ex.targetReps} reps · descanso {ex.restSeconds}s</Text>
            {hint(ex) && <Text className="text-emerald-400 text-xs mt-1">{hint(ex)}</Text>}
            <View className="mt-3">
              <ExerciseGuideCard name={ex.name} exerciseKey={ex.exerciseKey} />
            </View>
            <View className="flex-row gap-2 px-2 mb-1">
              <Text className="w-6 text-zinc-500 text-xs">#</Text>
              <Text className="flex-1 text-zinc-500 text-xs text-center">kg</Text>
              <Text className="flex-1 text-zinc-500 text-xs text-center">reps</Text>
              <View className="w-10" />
            </View>
            {ex.sets.map((st, i) => <SetRow key={st.id} exId={ex.id} set={st} index={i} />)}
            <Pressable onPress={() => addSet(ex.id)} className="mt-2 py-2 items-center rounded-lg bg-zinc-800">
              <Text className="text-zinc-300">+ Añadir serie</Text>
            </Pressable>
          </View>
        ))}

        <View className="flex-row gap-2">
          <Input className="flex-1" placeholder="Agregar ejercicio" value={newExercise} onChangeText={setNewExercise} />
          <Button
            title="Agregar"
            variant="secondary"
            disabled={!newExercise.trim()}
            onPress={() => { addExercise(newExercise.trim()); setNewExercise(""); }}
          />
        </View>
      </ScrollView>

      <RestTimerBar />

      <Modal visible={finishing} transparent animationType="fade" onRequestClose={() => setFinishing(false)}>
        <View className="flex-1 bg-black/70 justify-center p-6">
          <View className="bg-zinc-900 rounded-2xl p-5">
            <Text className="text-white text-lg font-bold">¿Qué tan duro fue? (RPE)</Text>
            <Text className="text-zinc-400 mb-4">1 = muy fácil · 10 = al límite. Se usa para calcular tu fatiga.</Text>
            <View className="flex-row flex-wrap gap-2">
              {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                <Pressable key={n} onPress={() => onFinish(n)}
                  className="w-12 h-12 rounded-xl bg-zinc-800 items-center justify-center">
                  <Text className="text-white text-lg font-semibold">{n}</Text>
                </Pressable>
              ))}
            </View>
            <Button title="Cancelar" variant="ghost" className="mt-4" onPress={() => setFinishing(false)} />
          </View>
        </View>
      </Modal>
    </View>
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
    <ScrollView className="flex-1 bg-black" contentContainerClassName="p-4 gap-3">
      <Text className="text-white text-xl font-bold">Empezar entrenamiento</Text>
      {routine ? (
        <>
          <Text className="text-zinc-400">{routine.name}</Text>
          {routine.days.map(d => (
            <Pressable key={d.id} onPress={() => startFromRoutine(routine, d.id)}
              className="bg-zinc-900 rounded-2xl p-4">
              <Text className="text-white text-lg font-semibold">{d.name}</Text>
              <Text className="text-zinc-400">{d.exercises.length} ejercicios</Text>
            </Pressable>
          ))}
          {routine.days.length === 0 && (
            <Text className="text-zinc-500">Esta rutina no tiene días todavía. Editala en la pestaña Rutinas.</Text>
          )}
        </>
      ) : (
        <Text className="text-zinc-500">No tenés rutinas. Creá una en Rutinas o elegí una de la Librería.</Text>
      )}
      <Button title="Entrenamiento libre" variant="secondary" onPress={() => startEmpty()} />
    </ScrollView>
  );
}
