import { useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { useReadinessStore } from "../../store/useReadinessStore";
import { ACTIVITIES } from "../../constants/activities";
import { estimateCalories } from "../../utils/calories";
import type { ActivityType } from "../../types/readiness";
import { Chip } from "../../components/ui/Chip";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

const TYPES = Object.keys(ACTIVITIES) as ActivityType[];
const RPE_HINT = ["", "Muy fácil", "Fácil", "Suave", "Moderado", "Algo duro", "Duro", "Muy duro", "Muy, muy duro", "Casi al límite", "Al límite"];

export default function LogActivityScreen({ navigation }: any) {
  const logActivity = useReadinessStore(s => s.logActivity);
  const bodyWeight = useReadinessStore(s => s.settings.bodyWeightKg);
  const [type, setType] = useState<ActivityType>("futbol");
  const [minutes, setMinutes] = useState("60");
  const [rpe, setRpe] = useState(6);
  const [hoursAgo, setHoursAgo] = useState(0);

  const durationMin = parseInt(minutes, 10) || 0;
  const kcal = estimateCalories(type, durationMin, bodyWeight);

  const onSave = () => {
    logActivity({ activity: type, durationMin, rpe, date: Date.now() - hoursAgo * 3_600_000 });
    navigation.goBack();
  };

  return (
    <ScrollView className="flex-1 bg-black" contentContainerClassName="p-4 pb-16 gap-5" keyboardShouldPersistTaps="handled">
      <View>
        <Text className="text-zinc-400 mb-2">Tipo</Text>
        <View className="flex-row flex-wrap">
          {TYPES.map(t => <Chip key={t} label={ACTIVITIES[t].label} selected={type === t} onPress={() => setType(t)} />)}
        </View>
      </View>

      <View>
        <Text className="text-zinc-400 mb-2">Minutos</Text>
        <Input keyboardType="number-pad" value={minutes} onChangeText={v => setMinutes(v.replace(/\D/g, ""))} />
      </View>

      <View>
        <Text className="text-zinc-400 mb-2">Intensidad (RPE): {rpe} · {RPE_HINT[rpe]}</Text>
        <View className="flex-row flex-wrap gap-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
            <Pressable key={n} onPress={() => setRpe(n)}
              className={`w-11 h-11 rounded-xl items-center justify-center ${rpe === n ? "bg-emerald-500" : "bg-zinc-800"}`}>
              <Text className={rpe === n ? "text-black font-bold" : "text-white"}>{n}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View>
        <Text className="text-zinc-400 mb-2">¿Cuándo?</Text>
        <View className="flex-row flex-wrap">
          {[0, 3, 12, 24].map(h => (
            <Chip key={h} label={h === 0 ? "Ahora" : `Hace ${h} h`} selected={hoursAgo === h} onPress={() => setHoursAgo(h)} />
          ))}
        </View>
      </View>

      <View className="bg-zinc-900 rounded-2xl p-4">
        <Text className="text-zinc-400">Carga (sRPE): <Text className="text-white font-semibold">{durationMin * rpe}</Text></Text>
        <Text className="text-zinc-400 mt-1">Calorías estimadas: <Text className="text-white font-semibold">{kcal} kcal</Text></Text>
      </View>

      <Button title="Guardar actividad" onPress={onSave} disabled={durationMin <= 0} />
    </ScrollView>
  );
}
