import { useState } from "react";
import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Screen, TopBar } from "../components/ui/Screen";
import { Icon } from "../components/ui/Icon";
import { Chip } from "../components/ui/Chip";
import { useRoutineStore } from "../store/useRoutineStore";
import { CATEGORIES, EXERCISE_CATALOG, WEEKDAYS_SHORT } from "../constants/exercises";
import { C } from "../constants/theme";
import type { ExerciseTemplate } from "../types/routine";

export default function RoutineEditorScreen() {
  const nav = useNavigation<any>();
  const { id } = useRoute<any>().params as { id: string };
  const routine = useRoutineStore(s => s.routines.find(r => r.id === id));
  const update = useRoutineStore(s => s.updateRoutine);
  const toggleDay = useRoutineStore(s => s.toggleWeekday);
  const addExercise = useRoutineStore(s => s.addExercise);
  const remove = useRoutineStore(s => s.deleteRoutine);
  const [custom, setCustom] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!routine) return <Screen scroll={false}><TopBar title="Rutina" back /></Screen>;

  const suggestions = EXERCISE_CATALOG[routine.category].filter(n => !routine.exercises.some(e => e.name === n));

  return (
    <Screen padBottom={40}>
      <TopBar title="Editar rutina" back />

      <View className="px-5 mt-2">
        <Text className="text-mute mb-2">Nombre</Text>
        <TextInput
          value={routine.name}
          onChangeText={v => update(id, { name: v })}
          selectTextOnFocus
          className="h-14 bg-card border border-line rounded-2xl px-4 text-white text-xl font-bold"
        />
      </View>

      <Text className="text-mute px-5 mt-6 mb-2">Grupo muscular</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5">
        {CATEGORIES.map(c => <Chip key={c} label={c} active={routine.category === c} onPress={() => update(id, { category: c })} />)}
      </ScrollView>

      <Text className="text-mute px-5 mt-6 mb-2">¿Qué días la hacés?</Text>
      <View className="flex-row gap-2 px-5">
        {[1, 2, 3, 4, 5, 6, 0].map(d => {
          const on = routine.weekdays.includes(d);
          return (
            <Pressable key={d} onPress={() => toggleDay(id, d)}
              className={`flex-1 h-12 rounded-full items-center justify-center ${on ? "bg-lime" : "bg-card border border-line"}`}>
              <Text className={`font-bold text-xs ${on ? "text-ink" : "text-white"}`}>{WEEKDAYS_SHORT[d]}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text className="text-white text-xl font-bold px-5 mt-8 mb-3">Ejercicios</Text>
      <View className="px-5">
        {routine.exercises.map((e, i) => (
          <ExerciseEditor key={e.id} routineId={id} ex={e} index={i} count={routine.exercises.length} />
        ))}
        {routine.exercises.length === 0 && (
          <Text className="text-mute mb-3">Agregá ejercicios con los botones de abajo.</Text>
        )}
      </View>

      {suggestions.length > 0 && (
        <>
          <Text className="text-mute px-5 mt-2 mb-2">Agregar rápido</Text>
          <View className="flex-row flex-wrap px-5">
            {suggestions.map(n => (
              <Pressable key={n} onPress={() => addExercise(id, n)}
                className="flex-row items-center h-10 px-4 rounded-full bg-card border border-line mr-2 mb-2">
                <Icon name="add" size={16} color={C.lime} />
                <Text className="text-white ml-1">{n}</Text>
              </Pressable>
            ))}
          </View>
        </>
      )}

      <View className="flex-row gap-2 px-5 mt-2">
        <TextInput
          value={custom}
          onChangeText={setCustom}
          placeholder="Otro ejercicio…"
          placeholderTextColor="#55555C"
          className="flex-1 h-12 bg-card border border-line rounded-full px-5 text-white"
        />
        <Pressable
          disabled={!custom.trim()}
          onPress={() => { addExercise(id, custom.trim()); setCustom(""); }}
          className={`w-12 h-12 rounded-full bg-lime items-center justify-center ${custom.trim() ? "" : "opacity-40"}`}
        >
          <Icon name="add" size={22} color={C.ink} />
        </Pressable>
      </View>

      <Pressable
        onPress={() => (confirmDelete ? (remove(id), nav.goBack()) : setConfirmDelete(true))}
        className={`mx-5 mt-10 h-12 rounded-full items-center justify-center border ${confirmDelete ? "bg-red-500 border-red-500" : "border-line"}`}
      >
        <Text className={confirmDelete ? "text-white font-bold" : "text-red-400"}>
          {confirmDelete ? "Tocá otra vez para borrar" : "Borrar rutina"}
        </Text>
      </Pressable>
    </Screen>
  );
}

function ExerciseEditor({ routineId, ex, index, count }: {
  routineId: string; ex: ExerciseTemplate; index: number; count: number;
}) {
  const update = useRoutineStore(s => s.updateExercise);
  const remove = useRoutineStore(s => s.removeExercise);
  const move = useRoutineStore(s => s.moveExercise);
  const patch = (p: Partial<ExerciseTemplate>) => update(routineId, ex.id, p);

  return (
    <View className="bg-card border border-line rounded-3xl p-4 mb-3">
      <View className="flex-row items-center">
        <View className="w-8 h-8 rounded-full bg-card2 items-center justify-center mr-3">
          <Text className="text-lime font-bold">{index + 1}</Text>
        </View>
        <TextInput value={ex.name} onChangeText={v => patch({ name: v })} className="flex-1 text-white text-base font-bold" />
        <Pressable disabled={index === 0} onPress={() => move(routineId, index, index - 1)} hitSlop={6} className="px-1.5">
          <Icon name="chevron-up" size={18} color={index === 0 ? C.line : C.mute} />
        </Pressable>
        <Pressable disabled={index === count - 1} onPress={() => move(routineId, index, index + 1)} hitSlop={6} className="px-1.5">
          <Icon name="chevron-down" size={18} color={index === count - 1 ? C.line : C.mute} />
        </Pressable>
        <Pressable onPress={() => remove(routineId, ex.id)} hitSlop={6} className="pl-2">
          <Icon name="close" size={18} color={C.mute} />
        </Pressable>
      </View>
      <View className="flex-row gap-2 mt-3">
        <Mini label="Series" value={ex.targetSets} onChange={v => patch({ targetSets: Math.max(1, v) })} step={1} />
        <Mini label="Reps" value={ex.targetReps} onChange={v => patch({ targetReps: Math.max(1, v) })} step={1} />
        <Mini label="Descanso" value={ex.restSeconds} onChange={v => patch({ restSeconds: Math.max(15, v) })} step={15} suffix="s" />
      </View>
    </View>
  );
}

function Mini({ label, value, onChange, step, suffix = "" }: {
  label: string; value: number; onChange: (v: number) => void; step: number; suffix?: string;
}) {
  return (
    <View className="flex-1 bg-card2 rounded-2xl py-2 items-center">
      <Text className="text-mute text-[11px]">{label}</Text>
      <View className="flex-row items-center mt-1">
        <Pressable onPress={() => onChange(value - step)} hitSlop={8} className="px-2"><Icon name="remove" size={16} color={C.mute} /></Pressable>
        <Text className="text-white font-bold text-base min-w-[36px] text-center">{value}{suffix}</Text>
        <Pressable onPress={() => onChange(value + step)} hitSlop={8} className="px-2"><Icon name="add" size={16} color={C.mute} /></Pressable>
      </View>
    </View>
  );
}
