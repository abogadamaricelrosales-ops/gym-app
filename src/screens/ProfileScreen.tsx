import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Screen } from "../components/ui/Screen";
import { Icon, type IconName } from "../components/ui/Icon";
import { useSettingsStore } from "../store/useSettingsStore";
import { useRoutineStore } from "../store/useRoutineStore";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { QUOTES, pickQuote } from "../constants/quotes";
import { C } from "../constants/theme";
import { Photo } from "../components/ui/Photo";
import { PHOTOS } from "../constants/photos";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const name = useSettingsStore(s => s.name);
  const setName = useSettingsStore(s => s.setName);
  const lastQuote = useSettingsStore(s => s.lastQuote);
  const setLastQuote = useSettingsStore(s => s.setLastQuote);
  const history = useWorkoutStore(s => s.history);
  const routines = useRoutineStore(s => s.routines);
  const seed = useRoutineStore(s => s.seedExamples);
  const [confirm, setConfirm] = useState(false);
  const insets = useSafeAreaInsets();

  const wipe = () => {
    useRoutineStore.setState({ routines: [] });
    useWorkoutStore.setState({ history: [], active: null, timer: null });
    setConfirm(false);
  };

  return (
    <Screen edgeToEdge>
      <Photo source={PHOTOS.perfil} style={{ height: 220 + insets.top }}>
        <View className="flex-1 justify-end px-5 pb-6">
          <Text className="text-white text-4xl font-extrabold tracking-tight">Perfil</Text>
        </View>
      </Photo>

      <View className="mx-5 -mt-2 bg-card border border-line rounded-4xl p-5 flex-row items-center">
        <View className="w-16 h-16 rounded-full bg-lime items-center justify-center">
          <Text className="text-ink text-2xl font-extrabold">{(name || "A").charAt(0).toUpperCase()}</Text>
        </View>
        <View className="flex-1 ml-4">
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Escribí tu nombre"
            placeholderTextColor="#55555C"
            className="text-white text-xl font-bold"
          />
          <Text className="text-mute mt-0.5">{history.length} entrenos · {routines.length} rutinas</Text>
        </View>
        <Icon name="create-outline" size={18} color={C.mute} />
      </View>

      <View className="mx-5 mt-3 bg-card border border-line rounded-4xl p-5">
        <Text className="text-lime font-bold text-xs tracking-widest">TU FRASE DE HOY</Text>
        <Text className="text-white text-lg font-semibold mt-2">
          {lastQuote >= 0 ? QUOTES[lastQuote] : "Abrí la app para ver tu frase."}
        </Text>
        <Pressable onPress={() => setLastQuote(pickQuote(lastQuote))} className="flex-row items-center mt-4">
          <Icon name="refresh" size={16} color={C.lime} />
          <Text className="text-lime font-semibold ml-2">Otra frase</Text>
        </Pressable>
      </View>

      <View className="mx-5 mt-3 gap-2">
        <Row icon="albums-outline" label="Cargar rutinas de ejemplo" onPress={seed} />
        <Row
          icon="trash-outline"
          label={confirm ? "Tocá otra vez para borrar todo" : "Borrar todos mis datos"}
          danger
          onPress={() => (confirm ? wipe() : setConfirm(true))}
        />
      </View>

      <Text className="text-mute text-xs text-center mt-6 px-8">
        Tus datos se guardan solo en este dispositivo.{"\n"}Fotos: Unsplash.
      </Text>
    </Screen>
  );
}

function Row({ icon, label, onPress, danger }: {
  icon: IconName; label: string; onPress: () => void; danger?: boolean;
}) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center h-14 px-5 bg-card border border-line rounded-full">
      <Icon name={icon} size={18} color={danger ? "#F87171" : C.lime} />
      <Text className={`flex-1 ml-3 font-semibold ${danger ? "text-red-400" : "text-white"}`}>{label}</Text>
      <Icon name="chevron-forward" size={16} color={C.mute} />
    </Pressable>
  );
}
