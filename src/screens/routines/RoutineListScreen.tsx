import { useState } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { useRoutineStore } from "../../store/useRoutineStore";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export default function RoutineListScreen({ navigation }: any) {
  const routines = useRoutineStore(s => s.routines);
  const activeId = useRoutineStore(s => s.activeRoutineId);
  const create = useRoutineStore(s => s.createRoutine);
  const remove = useRoutineStore(s => s.deleteRoutine);
  const setActive = useRoutineStore(s => s.setActiveRoutine);
  const seedPPL = useRoutineStore(s => s.seedPPL);
  const [name, setName] = useState("");

  const onCreate = () => {
    const id = create(name.trim());
    setName("");
    navigation.navigate("RoutineEditor", { id });
  };

  const onDelete = (id: string, n: string) =>
    Alert.alert("Borrar rutina", `¿Borrar "${n}"? Tu historial no se toca.`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Borrar", style: "destructive", onPress: () => remove(id) },
    ]);

  return (
    <FlatList
      className="flex-1 bg-black"
      data={routines}
      keyExtractor={r => r.id}
      contentContainerClassName="p-4 gap-3"
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View className="flex-row gap-2 mb-2">
          <Input className="flex-1" placeholder="Nombre de la nueva rutina" value={name} onChangeText={setName} />
          <Button title="Crear" onPress={onCreate} disabled={!name.trim()} />
        </View>
      }
      ListEmptyComponent={
        <View className="items-center mt-10 gap-3">
          <Text className="text-zinc-500 text-center">Todavía no tenés rutinas.</Text>
          <Button title="Cargar Push / Pull / Legs de ejemplo" variant="secondary" onPress={() => seedPPL()} />
        </View>
      }
      renderItem={({ item: r }) => {
        const isActive = r.id === activeId;
        return (
          <Pressable onPress={() => navigation.navigate("RoutineEditor", { id: r.id })}
            className={`bg-zinc-900 rounded-2xl p-4 border ${isActive ? "border-emerald-500" : "border-transparent"}`}>
            <View className="flex-row justify-between items-center">
              <Text className="text-white text-lg font-bold flex-1">{r.name}</Text>
              {isActive && <Text className="text-emerald-400 text-xs font-semibold">ACTIVA</Text>}
            </View>
            <Text className="text-zinc-400 mt-1">
              {r.days.length} días · {r.days.map(d => d.name).join(" / ") || "sin días"}
            </Text>
            <View className="flex-row gap-4 mt-3">
              {!isActive && (
                <Pressable onPress={() => setActive(r.id)}>
                  <Text className="text-emerald-400">Usar como activa</Text>
                </Pressable>
              )}
              <Pressable onPress={() => onDelete(r.id, r.name)}>
                <Text className="text-red-400">Borrar</Text>
              </Pressable>
            </View>
          </Pressable>
        );
      }}
    />
  );
}
