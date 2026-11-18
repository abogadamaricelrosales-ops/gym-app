import { useMemo, useState } from "react";
import { View, Text, FlatList, Pressable, ScrollView, Alert } from "react-native";
import { getTemplates } from "../../store/useRoutineStore";
import { useRoutineStore } from "../../store/useRoutineStore";
import type { TemplateTag } from "../../types/template";

const FILTERS: TemplateTag[] = ["Fuerza", "Hipertrofia", "Masculino", "Femenino", "Funcional", "Pérdida de grasa"];

export default function TemplateLibraryScreen({ navigation }: any) {
  const [selected, setSelected] = useState<TemplateTag[]>([]);
  const adopt = useRoutineStore(s => s.adoptTemplate);
  const templates = getTemplates();

  const data = useMemo(
    () => templates.filter(t => selected.every(tag => t.tags.includes(tag))),
    [selected, templates]
  );
  const toggle = (t: TemplateTag) =>
    setSelected(p => (p.includes(t) ? p.filter(x => x !== t) : [...p, t]));

  const onAdopt = (id: string, name: string) =>
    Alert.alert("Agregar rutina", `¿Copiar "${name}" a tus rutinas?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Agregar", onPress: () => { adopt(id); navigation.navigate("Rutinas", { screen: "RoutineList" }); } },
    ]);

  return (
    <View className="flex-1 bg-black">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="max-h-14 px-3 py-2">
        {FILTERS.map(tag => {
          const on = selected.includes(tag);
          return (
            <Pressable key={tag} onPress={() => toggle(tag)}
              className={`mr-2 px-4 py-2 rounded-full border ${on ? "bg-emerald-500 border-emerald-500" : "border-zinc-700"}`}>
              <Text className={on ? "text-black font-semibold" : "text-zinc-300"}>{tag}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
        data={data}
        keyExtractor={t => t.id}
        contentContainerClassName="p-4 gap-4"
        ListEmptyComponent={<Text className="text-zinc-500 text-center mt-10">No hay rutinas con esos filtros.</Text>}
        renderItem={({ item: t }) => (
          <View className="bg-zinc-900 rounded-2xl p-4">
            <Text className="text-white text-lg font-bold">{t.name}</Text>
            <Text className="text-zinc-400 mt-1">{t.description}</Text>
            <Text className="text-zinc-500 mt-2 text-xs uppercase">
              {t.level} · {t.daysPerWeek} días/sem · {t.durationWeeks} semanas
            </Text>
            <View className="flex-row flex-wrap gap-2 mt-3">
              {t.tags.map(tag => (
                <View key={tag} className="bg-zinc-800 px-2 py-1 rounded-md">
                  <Text className="text-emerald-400 text-xs">{tag}</Text>
                </View>
              ))}
            </View>
            <Pressable onPress={() => onAdopt(t.id, t.name)} className="mt-4 bg-emerald-500 py-3 rounded-xl items-center">
              <Text className="text-black font-semibold">Usar esta rutina</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
