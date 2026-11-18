import { useState } from "react";
import { View, Text, FlatList, Pressable, Alert, TextInput } from "react-native";
import { useRoutineStore } from "../../store/useRoutineStore";
import { Screen } from "../../components/ui/Screen";
import type { Routine } from "../../types/routine";

export default function RoutineListScreen({ navigation }: any) {
  const routines = useRoutineStore(s => s.routines);
  const activeId = useRoutineStore(s => s.activeRoutineId);
  const create = useRoutineStore(s => s.createRoutine);
  const seedPPL = useRoutineStore(s => s.seedPPL);
  const [name, setName] = useState("");

  const onCreate = () => {
    const id = create(name.trim());
    setName("");
    navigation.navigate("RoutineEditor", { id });
  };

  return (
    <Screen title="Rutinas" subtitle={`${routines.length} ${routines.length === 1 ? "rutina" : "rutinas"}`}>
      <FlatList
        className="flex-1"
        data={routines}
        keyExtractor={r => r.id}
        contentContainerClassName="px-4 pb-10"
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View className="flex-row gap-2 mb-5">
            <TextInput
              className="flex-1 h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-white"
              placeholder="Nombre de la nueva rutina"
              placeholderTextColor="#52525b"
              value={name}
              onChangeText={setName}
              onSubmitEditing={() => name.trim() && onCreate()}
            />
            <Pressable
              onPress={onCreate}
              disabled={!name.trim()}
              className={`h-12 px-5 rounded-xl bg-orange-500 items-center justify-center ${name.trim() ? "" : "opacity-40"}`}
            >
              <Text className="text-zinc-950 font-bold">Crear</Text>
            </Pressable>
          </View>
        }
        ListEmptyComponent={
          <View className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 mb-3 items-center">
            <Text className="text-white text-lg font-bold">Todavía no tenés rutinas</Text>
            <Text className="text-zinc-500 text-center mt-1 mb-4">
              Creá una arriba, elegí una de la Librería o cargá el ejemplo.
            </Text>
            <Pressable onPress={() => seedPPL()} className="h-12 px-5 rounded-xl bg-orange-500 items-center justify-center">
              <Text className="text-zinc-950 font-bold">Cargar Push / Pull / Legs de ejemplo</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <RoutineCard
            routine={item}
            active={item.id === activeId}
            onOpen={() => navigation.navigate("RoutineEditor", { id: item.id })}
          />
        )}
      />
    </Screen>
  );
}

function RoutineCard({ routine: r, active, onOpen }: { routine: Routine; active: boolean; onOpen: () => void }) {
  const remove = useRoutineStore(s => s.deleteRoutine);
  const setActive = useRoutineStore(s => s.setActiveRoutine);
  const totalExercises = r.days.reduce((n, d) => n + d.exercises.length, 0);

  const onDelete = () =>
    Alert.alert("Borrar rutina", `¿Borrar "${r.name}"? Tu historial no se toca.`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Borrar", style: "destructive", onPress: () => remove(r.id) },
    ]);

  return (
    <Pressable onPress={onOpen} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 mb-3">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-white text-xl font-bold">{r.name}</Text>
          <Text className="text-zinc-500 mt-1">
            {r.days.length} {r.days.length === 1 ? "día" : "días"} · {totalExercises} ejercicios
          </Text>
        </View>
        {active && (
          <View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/15">
            <View className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <Text className="text-orange-500 text-xs font-bold tracking-wider">ACTIVA</Text>
          </View>
        )}
      </View>

      {r.days.length > 0 && (
        <View className="flex-row flex-wrap gap-2 mt-3">
          {r.days.map(d => (
            <View key={d.id} className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800">
              <Text className="text-zinc-300 text-xs font-semibold">{d.name}</Text>
            </View>
          ))}
        </View>
      )}

      <View className="flex-row items-center gap-5 mt-4 pt-3 border-t border-zinc-800">
        <Text className="text-zinc-300 font-semibold">Editar</Text>
        {!active && (
          <Pressable onPress={() => setActive(r.id)} hitSlop={8}>
            <Text className="text-zinc-300 font-semibold">Usar como activa</Text>
          </Pressable>
        )}
        <View className="flex-1" />
        <Pressable onPress={onDelete} hitSlop={8}>
          <Text className="text-zinc-500">Borrar</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
