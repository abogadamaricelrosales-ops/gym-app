import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Photo } from "./ui/Photo";
import { Icon } from "./ui/Icon";
import { REFERENTS } from "../data/referents";
import { CATEGORY_PHOTO, REFERENT_PHOTO } from "../constants/photos";
import { useSettingsStore, type Sex } from "../store/useSettingsStore";
import { C } from "../constants/theme";

export const initials = (name: string) =>
  name.replace(/\(.*?\)/g, "").split(/\s+/).filter(w => /^[A-ZÁÉÍÓÚ]/.test(w)).slice(0, 2).map(w => w[0]).join("");

export const CONFIDENCE_TEXT = {
  alta: "Rutina publicada por el referente",
  media: "Basada en info pública: el split es suyo, algunos números son típicos",
  baja: "Aproximada: hay poca info publicada, se completó con su estilo",
} as const;

/** Tarjetas de referentes: primero elegís hombre o mujer, después ves las rutinas. */
export function ReferentsList() {
  const nav = useNavigation<any>();
  const profileSex = useSettingsStore(s => s.sex);
  const setProfile = useSettingsStore(s => s.setProfile);
  const [sex, setSex] = useState<Sex | null>(profileSex);

  const choose = (s: Sex) => {
    setSex(s);
    if (!profileSex) setProfile({ sex: s });
  };

  if (!sex) {
    return (
      <View className="bg-card border border-line rounded-4xl p-6">
        <Text className="text-white text-2xl font-extrabold">¿Sos hombre o mujer?</Text>
        <Text className="text-mute mt-1">Así te mostramos los referentes que mejor se adaptan a vos.</Text>
        <View className="flex-row gap-3 mt-5">
          <SexButton label="Hombre" icon="male" onPress={() => choose("hombre")} />
          <SexButton label="Mujer" icon="female" onPress={() => choose("mujer")} />
        </View>
      </View>
    );
  }

  const list = REFERENTS.filter(r => r.gender === (sex === "hombre" ? "male" : "female"));
  return (
    <View>
      <View className="flex-row bg-card border border-line rounded-full p-1 mb-4">
        {(["hombre", "mujer"] as Sex[]).map(s => (
          <Pressable key={s} onPress={() => setSex(s)}
            className={`flex-1 h-11 rounded-full flex-row items-center justify-center ${sex === s ? "bg-lime" : ""}`}>
            <Icon name={s === "hombre" ? "male" : "female"} size={16} color={sex === s ? C.ink : C.mute} />
            <Text className={`font-bold ml-1.5 ${sex === s ? "text-ink" : "text-mute"}`}>{s === "hombre" ? "Hombres" : "Mujeres"}</Text>
          </Pressable>
        ))}
      </View>
      {list.map(r => (
        <Pressable key={r.id} onPress={() => nav.navigate("Referent", { id: r.id })} className="mb-3">
          <Photo source={REFERENT_PHOTO[r.id] ?? CATEGORY_PHOTO[r.days[0]?.category ?? "Full body"]} radius={28} style={{ height: REFERENT_PHOTO[r.id] ? 260 : 190 }}>
            <View className="flex-1 justify-between p-5">
              <View className="flex-row justify-between">
                {REFERENT_PHOTO[r.id] ? <View /> : (
                  <View className="w-12 h-12 rounded-full bg-lime items-center justify-center">
                    <Text className="text-ink font-extrabold text-base">{initials(r.name)}</Text>
                  </View>
                )}
                <View className="flex-row gap-1.5">
                  <Badge text={`${r.daysPerWeek} días`} />
                  <Badge text={r.goal} />
                </View>
              </View>
              <View>
                <Text className="text-white text-2xl font-extrabold tracking-tight" numberOfLines={1}>{r.name}</Text>
                <View className="flex-row items-center justify-between mt-1">
                  <Text className="text-lime font-semibold flex-1 mr-2" numberOfLines={1}>{r.split}</Text>
                  <View className="w-9 h-9 rounded-full bg-lime items-center justify-center">
                    <Icon name="arrow-forward" size={16} color={C.ink} />
                  </View>
                </View>
                <Text className="text-white/60 text-xs mt-1" numberOfLines={1}>{r.days.map(d => d.name).join(" · ")}</Text>
              </View>
            </View>
          </Photo>
        </Pressable>
      ))}
      <Text className="text-mute text-xs text-center mt-2 px-4">
        Rutinas armadas con información pública de cada referente. No son sus programas oficiales ni están avaladas por ellos.
      </Text>
    </View>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <View className="bg-black/55 rounded-full px-2.5 py-1">
      <Text className="text-white text-[11px] font-semibold">{text}</Text>
    </View>
  );
}

function SexButton({ label, icon, onPress }: { label: string; icon: "male" | "female"; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="flex-1 h-28 rounded-3xl bg-card2 border border-line items-center justify-center">
      <Icon name={icon} size={30} color={C.lime} />
      <Text className="text-white font-bold text-lg mt-2">{label}</Text>
    </Pressable>
  );
}
