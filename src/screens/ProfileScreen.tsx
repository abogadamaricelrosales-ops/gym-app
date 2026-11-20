import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Screen } from "../components/ui/Screen";
import { Icon, type IconName } from "../components/ui/Icon";
import { useSettingsStore } from "../store/useSettingsStore";
import { useRoutineStore } from "../store/useRoutineStore";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { useActivityStore } from "../store/useActivityStore";
import { QUOTES, pickQuote } from "../constants/quotes";
import { C } from "../constants/theme";
import { Photo } from "../components/ui/Photo";
import { PHOTOS } from "../constants/photos";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IdealWeightCard } from "../components/IdealWeightCard";
import { BackupSheet } from "../components/BackupSheet";
import { fmtNum } from "../utils/exerciseKind";

export default function ProfileScreen() {
  const name = useSettingsStore(s => s.name);
  const setName = useSettingsStore(s => s.setName);
  const age = useSettingsStore(s => s.age);
  const weightKg = useSettingsStore(s => s.weightKg);
  const heightCm = useSettingsStore(s => s.heightCm);
  const sex = useSettingsStore(s => s.sex);
  const bodyFat = useSettingsStore(s => s.bodyFat);
  const setProfile = useSettingsStore(s => s.setProfile);
  const lastQuote = useSettingsStore(s => s.lastQuote);
  const setLastQuote = useSettingsStore(s => s.setLastQuote);
  const history = useWorkoutStore(s => s.history);
  const routines = useRoutineStore(s => s.routines);
  const seed = useRoutineStore(s => s.seedExamples);
  const [confirm, setConfirm] = useState(false);
  const [formKey, setFormKey] = useState(0); // remonta los campos al borrar o restaurar
  const [seedMsg, setSeedMsg] = useState<string | null>(null);
  const [backup, setBackup] = useState(false);
  const lastBackupAt = useSettingsStore(s => s.lastBackupAt);
  const clearProfile = useSettingsStore(s => s.clearProfile);
  const backupDays = lastBackupAt ? Math.floor((Date.now() - lastBackupAt) / 86_400_000) : null;
  const backupLabel = backupDays == null ? "nunca" : backupDays === 0 ? "hoy" : backupDays === 1 ? "ayer" : `hace ${backupDays} días`;
  const insets = useSafeAreaInsets();

  const wipe = () => {
    useRoutineStore.setState({ routines: [] });
    useWorkoutStore.setState({ history: [], active: null, timer: null });
    useActivityStore.setState({ activities: [] });
    clearProfile();
    setFormKey(k => k + 1);
    setConfirm(false);
  };

  return (
    <Screen edgeToEdge>
      <Photo source={PHOTOS.perfil} style={{ height: 220 + insets.top }}>
        <View className="flex-1 justify-end px-5 pb-6">
          <Text className="text-white text-4xl font-extrabold tracking-tight">Perfil</Text>
        </View>
      </Photo>

      <View className="mx-5 -mt-2 bg-card border border-line rounded-4xl p-5">
        <View className="flex-row items-center">
          <View className="w-16 h-16 rounded-full bg-lime items-center justify-center">
            <Text className="text-ink text-2xl font-extrabold">{(name || "A").charAt(0).toUpperCase()}</Text>
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-white text-xl font-bold" numberOfLines={1}>{name || "Tus datos"}</Text>
            <Text className="text-mute mt-0.5">{history.length} entrenos · {routines.length} rutinas</Text>
          </View>
        </View>

        <View key={formKey}>
        <Field label="Nombre" icon="person-outline">
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Tu nombre"
            placeholderTextColor="#55555C"
            className="flex-1 text-white text-base font-semibold"
          />
        </Field>
        <View className="flex-row gap-3">
          <Field label="Edad" icon="calendar-outline" suffix="años">
            <NumberInput value={age} onChange={v => setProfile({ age: v })} placeholder="30" />
          </Field>
          <Field label="Peso" icon="scale-outline" suffix="kg">
            <NumberInput value={weightKg} onChange={v => setProfile({ weightKg: v })} placeholder="70" decimals />
          </Field>
        </View>
        <View className="flex-row gap-3">
          <Field label="Estatura" icon="resize-outline" suffix="cm">
            <NumberInput value={heightCm} onChange={v => setProfile({ heightCm: v })} placeholder="170" />
          </Field>
          <View className="flex-1 min-w-0 mt-4">
            <Text className="text-mute text-xs mb-1.5">Sexo</Text>
            <View className="flex-row h-14 p-1 bg-card2 rounded-2xl">
              {(["hombre", "mujer"] as const).map(x => (
                <Pressable key={x} onPress={() => setProfile({ sex: x })}
                  className={`flex-1 rounded-xl items-center justify-center ${sex === x ? "bg-lime" : ""}`}>
                  <Text className={`font-bold ${sex === x ? "text-ink" : "text-mute"}`}>{x === "hombre" ? "Hombre" : "Mujer"}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
        <Field label="% de grasa (opcional, si lo mediste)" icon="water-outline" suffix="%">
          <NumberInput value={bodyFat} onChange={v => setProfile({ bodyFat: v != null && v < 60 ? v : null })} placeholder="Si no lo sabés, lo estimamos" decimals />
        </Field>
        </View>
        <Text className="text-mute text-xs mt-3">Con peso, estatura, edad y sexo calculamos tus calorías, tu peso ideal y los referentes que te mostramos.</Text>
      </View>

      <View className="mx-5 mt-3">
        <IdealWeightCard />
      </View>

      <View className="mx-5 mt-3">
        <Photo source={PHOTOS.splash} radius={28} style={{ minHeight: 220 }}>
          <View className="flex-1 justify-end p-6">
            <View className="flex-row items-center">
              <Icon name="flash" size={16} color={C.lime} />
              <Text className="text-lime font-extrabold text-xs tracking-[3px] ml-2">NO TE RINDAS</Text>
            </View>
            <Text className="text-white text-2xl font-extrabold leading-8 mt-2">
              {lastQuote >= 0 ? QUOTES[lastQuote] : "Abrí la app para ver tu frase."}
            </Text>
            <Pressable onPress={() => setLastQuote(pickQuote(lastQuote))} className="self-start flex-row items-center mt-4 h-10 px-4 rounded-full bg-lime">
              <Icon name="refresh" size={16} color={C.ink} />
              <Text className="text-ink font-bold ml-2">Otra frase</Text>
            </Pressable>
          </View>
        </Photo>
      </View>

      <View className="mx-5 mt-3 gap-2">
        <Row icon="cloud-upload-outline" label="Copia de seguridad" detail={`Última: ${backupLabel}`} onPress={() => setBackup(true)} />
        <Row
          icon="albums-outline"
          label="Cargar rutinas de ejemplo"
          detail={seedMsg ?? undefined}
          onPress={() => {
            const n = seed();
            setSeedMsg(n ? `Se agregaron ${n}` : "Ya las tenés todas");
          }}
        />
        <Row
          icon="trash-outline"
          label={confirm ? "Tocá otra vez para borrar todo" : "Borrar todos mis datos"}
          detail={confirm ? "Rutinas, entrenos, actividades y tus datos" : undefined}
          danger
          onPress={() => (confirm ? wipe() : setConfirm(true))}
        />
      </View>

      <BackupSheet visible={backup} onClose={() => setBackup(false)} onRestored={() => setFormKey(k => k + 1)} />

      <Text className="text-mute text-xs text-center mt-6 px-8">
        Tus datos se guardan solo en este dispositivo.{"\n"}Fotos: Unsplash.
      </Text>
    </Screen>
  );
}

function Row({ icon, label, detail, onPress, danger }: {
  icon: IconName; label: string; detail?: string; onPress: () => void; danger?: boolean;
}) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center h-14 px-5 bg-card border border-line rounded-full">
      <Icon name={icon} size={18} color={danger ? "#F87171" : C.lime} />
      <View className="flex-1 ml-3">
        <Text className={`font-semibold ${danger ? "text-red-400" : "text-white"}`}>{label}</Text>
        {!!detail && <Text className="text-mute text-xs">{detail}</Text>}
      </View>
      <Icon name="chevron-forward" size={16} color={C.mute} />
    </Pressable>
  );
}

function Field({ label, icon, suffix, children }: { label: string; icon: IconName; suffix?: string; children: React.ReactNode }) {
  return (
    <View className="flex-1 min-w-0 mt-4">
      <Text className="text-mute text-xs mb-1.5">{label}</Text>
      <View className="flex-row items-center h-14 px-4 bg-card2 rounded-2xl">
        <Icon name={icon} size={17} color={C.lime} />
        <View className="flex-1 min-w-0 flex-row items-center ml-3">{children}</View>
        {suffix && <Text className="text-mute ml-1">{suffix}</Text>}
      </View>
    </View>
  );
}

function NumberInput({ value, onChange, placeholder, decimals }: {
  value: number | null; onChange: (v: number | null) => void; placeholder: string; decimals?: boolean;
}) {
  const [text, setText] = useState(value != null ? fmtNum(value) : "");
  return (
    <TextInput
      value={text}
      onChangeText={t => {
        const clean = t.replace(",", ".").replace(decimals ? /[^0-9.]/g : /[^0-9]/g, "");
        setText(clean);
        const n = Number(clean);
        onChange(clean && n > 0 ? n : null);
      }}
      keyboardType={decimals ? "decimal-pad" : "number-pad"}
      placeholder={placeholder}
      placeholderTextColor="#55555C"
      className="flex-1 min-w-0 text-white text-base font-semibold"
    />
  );
}
