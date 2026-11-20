import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { Icon } from "./ui/Icon";
import { fmtNum } from "../utils/exerciseKind";

/** Número grande con botones − / + para usar con una mano en el gimnasio. */
export function Stepper({ label, value, step, onChange, decimals = false, hint, onHintPress }: {
  label: string; value: number; step: number; onChange: (v: number) => void; decimals?: boolean;
  /** Texto chico debajo del título (p. ej. "de a 2,5"); si tiene onHintPress se puede tocar. */
  hint?: string; onHintPress?: () => void;
}) {
  const show = (v: number) => (v ? fmtNum(v) : "");
  // Guardamos el texto tal cual lo escribís, así "22," no se convierte en "22" antes de poner el 5.
  const [text, setText] = useState(show(value));
  const focused = useRef(false);
  useEffect(() => { if (!focused.current) setText(show(value)); }, [value]);

  const set = (v: number) => {
    const n = Math.max(0, Math.round(v * 100) / 100);
    setText(show(n));
    onChange(n);
  };

  const onType = (t: string) => {
    const clean = t.replace(",", ".");
    const ok = decimals ? /^\d{0,4}(\.\d{0,2})?$/ : /^\d{0,4}$/;
    if (!ok.test(clean)) return; // ignora letras, dos comas, etc.
    setText(t.replace(".", ","));
    onChange(Number(clean) || 0);
  };

  return (
    <View className="flex-1 bg-card2 rounded-3xl p-3 items-center">
      <Text className="text-mute text-xs font-semibold tracking-widest">{label}</Text>
      {hint && (
        <Pressable onPress={onHintPress} disabled={!onHintPress} hitSlop={8} className="mt-1 h-6 px-2.5 rounded-full bg-ink items-center justify-center">
          <Text className="text-lime text-[11px] font-bold">{hint}</Text>
        </Pressable>
      )}
      <TextInput
        value={text}
        placeholder="0"
        placeholderTextColor="#55555C"
        keyboardType={decimals ? "decimal-pad" : "number-pad"}
        onFocus={() => { focused.current = true; }}
        onBlur={() => { focused.current = false; setText(show(value)); }}
        onChangeText={onType}
        className="text-white text-5xl font-extrabold text-center w-full my-1"
        style={{ fontVariant: ["tabular-nums"] }}
      />
      <View className="flex-row gap-2 w-full">
        <Pressable onPress={() => set(value - step)} className="flex-1 h-12 rounded-2xl bg-ink items-center justify-center">
          <Icon name="remove" size={22} />
        </Pressable>
        <Pressable onPress={() => set(value + step)} className="flex-1 h-12 rounded-2xl bg-ink items-center justify-center">
          <Icon name="add" size={22} />
        </Pressable>
      </View>
    </View>
  );
}
