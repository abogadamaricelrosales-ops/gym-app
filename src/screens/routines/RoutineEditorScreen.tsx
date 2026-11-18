import { useState } from "react";
import { ScrollView, View, Text, Pressable, Alert } from "react-native";
import { useRoutineStore } from "../../store/useRoutineStore";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Chip } from "../../components/ui/Chip";
import { EDITOR_MUSCLE_GROUPS } from "../../utils/muscleGroups";
import type { RoutineDay, ExerciseTemplate } from "../../types/routine";

const toInt = (v: string) => parseInt(v.replace(/\D/g, ""), 10) || 0;

export default function RoutineEditorScreen({ route }: any) {
  const id: string = route.params.id;
  const routine = useRoutineStore(s => s.routines.find(r => r.id === id));
  const rename = useRoutineStore(s => s.renameRoutine);
  const addDay = useRoutineStore(s => s.addDay);
  const [dayName, setDayName] = useState("");

  if (!routine) return <View className="flex-1 bg-zinc-950" />;

  return (
    <ScrollView className="flex-1 bg-zinc-950" contentContainerClassName="p-4 pb-20 gap-4" keyboardShouldPersistTaps="handled">
      <View>
        <Text className="text-zinc-400 mb-1">Nombre</Text>
        <Input value={routine.name} onChangeText={v => rename(id, v)} className="text-lg" />
      </View>

      {routine.days.map(d => <DayEditor key={d.id} routineId={id} day={d} />)}

      <View className="flex-row gap-2">
        <Input className="flex-1" placeholder="Nuevo día (ej. Push)" value={dayName} onChangeText={setDayName} />
        <Button title="+ Día" disabled={!dayName.trim()} onPress={() => { addDay(id, dayName.trim()); setDayName(""); }} />
      </View>
    </ScrollView>
  );
}

function DayEditor({ routineId, day }: { routineId: string; day: RoutineDay }) {
  const renameDay = useRoutineStore(s => s.renameDay);
  const removeDay = useRoutineStore(s => s.removeDay);
  const addExercise = useRoutineStore(s => s.addExercise);
  const [exName, setExName] = useState("");
  const [group, setGroup] = useState<string | undefined>();

  const onRemove = () =>
    Alert.alert("Borrar día", `¿Borrar "${day.name}"?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Borrar", style: "destructive", onPress: () => removeDay(routineId, day.id) },
    ]);

  const onAdd = () => {
    addExercise(routineId, day.id, {
      name: exName.trim(), muscleGroup: group, targetSets: 3, targetReps: "8-12", restSeconds: 90,
    });
    setExName("");
    setGroup(undefined);
  };

  return (
    <View className="bg-zinc-900 rounded-2xl p-4">
      <View className="flex-row items-center gap-2 mb-3">
        <Input className="flex-1 font-bold" value={day.name} onChangeText={v => renameDay(routineId, day.id, v)} />
        <Pressable onPress={onRemove} className="px-2 py-2"><Text className="text-red-400">Borrar</Text></Pressable>
      </View>

      {day.exercises.map((e, i) => (
        <ExerciseRow key={e.id} routineId={routineId} dayId={day.id} ex={e} index={i} count={day.exercises.length} />
      ))}

      <View className="mt-2 pt-3 border-t border-zinc-800">
        <Input placeholder="Nuevo ejercicio" value={exName} onChangeText={setExName} />
        <View className="flex-row flex-wrap mt-2">
          {EDITOR_MUSCLE_GROUPS.map(g => (
            <Chip key={g} label={g} selected={group === g} onPress={() => setGroup(group === g ? undefined : g)} />
          ))}
        </View>
        <Button title="+ Ejercicio" variant="secondary" disabled={!exName.trim()} onPress={onAdd} />
      </View>
    </View>
  );
}

function ExerciseRow({ routineId, dayId, ex, index, count }: {
  routineId: string; dayId: string; ex: ExerciseTemplate; index: number; count: number;
}) {
  const update = useRoutineStore(s => s.updateExercise);
  const remove = useRoutineStore(s => s.removeExercise);
  const move = useRoutineStore(s => s.moveExercise);
  const patch = (p: Partial<ExerciseTemplate>) => update(routineId, dayId, ex.id, p);

  return (
    <View className="mb-3 bg-zinc-950 rounded-xl p-3">
      <View className="flex-row items-center gap-2">
        <Input className="flex-1" value={ex.name} onChangeText={v => patch({ name: v })} />
        <Pressable disabled={index === 0} onPress={() => move(routineId, dayId, index, index - 1)} className="px-2">
          <Text className={index === 0 ? "text-zinc-700" : "text-zinc-300"}>▲</Text>
        </Pressable>
        <Pressable disabled={index === count - 1} onPress={() => move(routineId, dayId, index, index + 1)} className="px-2">
          <Text className={index === count - 1 ? "text-zinc-700" : "text-zinc-300"}>▼</Text>
        </Pressable>
        <Pressable onPress={() => remove(routineId, dayId, ex.id)} className="px-2">
          <Text className="text-red-400">✕</Text>
        </Pressable>
      </View>
      <View className="flex-row gap-2 mt-2">
        <Field label="Series" value={String(ex.targetSets)} onChange={v => patch({ targetSets: toInt(v) })} numeric />
        <Field label="Reps" value={ex.targetReps} onChange={v => patch({ targetReps: v })} />
        <Field label="Descanso (s)" value={String(ex.restSeconds)} onChange={v => patch({ restSeconds: toInt(v) })} numeric />
      </View>
      {ex.muscleGroup && <Text className="text-zinc-500 text-xs mt-2">{ex.muscleGroup}</Text>}
    </View>
  );
}

function Field({ label, value, onChange, numeric }: {
  label: string; value: string; onChange: (v: string) => void; numeric?: boolean;
}) {
  return (
    <View className="flex-1">
      <Text className="text-zinc-500 text-xs mb-1">{label}</Text>
      <Input value={value} onChangeText={onChange} keyboardType={numeric ? "number-pad" : "default"} className="text-center" />
    </View>
  );
}
