import { useState } from "react";
import { View, Text, Pressable, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Screen, TopBar } from "../components/ui/Screen";
import { Photo } from "../components/ui/Photo";
import { Icon, type IconName } from "../components/ui/Icon";
import { PHOTOS } from "../constants/photos";
import { useSettingsStore } from "../store/useSettingsStore";
import { useRoutineStore } from "../store/useRoutineStore";
import { buildStrategy, weeklyPlan } from "../utils/body";
import { GOAL_LIST, WEEKDAYS_SHORT } from "../constants/exercises";
import { CompositionChart, MacroChart, ProjectionChart, SexRateChart, PHASE_COLOR, PHASE_LABEL, Legend } from "../components/Charts";
import { kg, pct } from "../components/IdealWeightCard";
import type { Goal } from "../types/routine";
import { C } from "../constants/theme";

export default function StrategyScreen() {
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const s = useSettingsStore();
  const routines = useRoutineStore(st => st.routines);
  const plan = weeklyPlan(routines);
  const [goal, setGoal] = useState<Goal>(plan.goal ?? "Hipertrofia");
  const [days, setDays] = useState(Math.max(1, plan.daysPerWeek || 3));
  const st = buildStrategy({ weightKg: s.weightKg, heightCm: s.heightCm, age: s.age, sex: s.sex, bodyFat: s.bodyFat }, goal, days);
  const chartW = Math.min(width, 560) - 40 - 40;

  if (!st) {
    return (
      <Screen scroll={false}>
        <TopBar title="Mi estrategia" back />
        <View className="m-5 bg-card border border-line rounded-4xl p-6">
          <Text className="text-white text-xl font-bold">Faltan tus datos</Text>
          <Text className="text-mute mt-1">Cargá peso, estatura, edad y sexo en Perfil para armar tu estrategia.</Text>
          <Pressable onPress={() => nav.navigate("Tabs", { screen: "Perfil" })} className="h-12 rounded-full bg-lime items-center justify-center mt-5">
            <Text className="text-ink font-bold">Ir a Perfil</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  const first = st.phases[0];
  const gymDays = new Set(routines.flatMap(r => r.weekdays));
  const order = [1, 2, 3, 4, 5, 6, 0];
  // días de entreno sugeridos si no tenés rutinas asignadas
  const DEFAULT_DAYS: Record<number, number[]> = { 1: [1], 2: [1, 4], 3: [1, 3, 5], 4: [1, 2, 4, 5], 5: [1, 2, 3, 5, 6], 6: [1, 2, 3, 4, 5, 6], 7: order };
  const trainDays = gymDays.size ? gymDays : new Set(DEFAULT_DAYS[days]);
  const cardioN = first.kind === "definir" ? 3 : 1;
  const cardioDays = new Set(order.filter(d => !trainDays.has(d)).slice(0, cardioN));

  return (
    <Screen padBottom={40} edgeToEdge>
      <Photo source={PHOTOS.splash} style={{ height: 250 + insets.top }}>
        <View style={{ paddingTop: insets.top }}><TopBar title="" back /></View>
        <View className="flex-1 justify-end px-5 pb-5">
          <Text className="text-lime text-xs font-bold tracking-widest">ESTRATEGIA PERSONAL</Text>
          <Text className="text-white text-3xl font-extrabold tracking-tight mt-1">
            {st.phases.map(p => PHASE_LABEL[p.kind]).join(" → ")}
          </Text>
          <Text className="text-white/70 mt-1">{s.sex === "mujer" ? "Mujer" : "Hombre"} · {s.heightCm} cm · {kg(st.weight)} · {pct(st.bf)} grasa{st.bfEstimated ? " (estimada)" : ""}</Text>
        </View>
      </Photo>

      {/* Ajustes */}
      <View className="mx-5 mt-4 bg-card border border-line rounded-4xl p-4">
        <Text className="text-mute text-xs font-semibold tracking-widest mb-2">TIPO DE ENTRENAMIENTO</Text>
        <View className="flex-row flex-wrap">
          {GOAL_LIST.map(g => (
            <Pressable key={g} onPress={() => setGoal(g)} className={`h-9 px-3.5 rounded-full items-center justify-center mr-2 mb-2 ${goal === g ? "bg-lime" : "bg-card2"}`}>
              <Text className={`text-sm font-semibold ${goal === g ? "text-ink" : "text-white"}`}>{g}</Text>
            </Pressable>
          ))}
        </View>
        <View className="flex-row items-center justify-between bg-card2 rounded-full p-1.5 mt-1">
          <Pressable onPress={() => setDays(Math.max(1, days - 1))} className="w-9 h-9 rounded-full bg-ink items-center justify-center"><Icon name="remove" size={16} /></Pressable>
          <Text className="text-white font-semibold">{days} {days === 1 ? "día" : "días"} de pesas por semana</Text>
          <Pressable onPress={() => setDays(Math.min(7, days + 1))} className="w-9 h-9 rounded-full bg-ink items-center justify-center"><Icon name="add" size={16} /></Pressable>
        </View>
      </View>

      {/* Números clave */}
      <View className="flex-row flex-wrap justify-between px-5 mt-3">
        <Tile icon="trophy" label="Peso meta" value={kg(st.target.weight)} />
        <Tile icon="time" label="Tiempo" value={st.totalWeeks ? `${st.totalWeeks} sem` : "Ya estás"} sub={st.totalWeeks > 8 ? `≈ ${Math.round(st.totalWeeks / 4.3)} meses` : undefined} />
        <Tile icon="flame" label="Calorías hoy" value={`${first.kcal}`} sub={`mantener: ${st.maintenance}`} />
        <Tile icon="fish" label="Proteína" value={`${st.macros.protein} g`} sub="por día" />
      </View>

      <Card title="Proyección de tu peso" subtitle="Cómo debería moverse tu peso si seguís el plan.">
        <ProjectionChart st={st} width={chartW} />
        <View className="flex-row flex-wrap gap-4 mt-2">
          {st.phases.map((p, i) => <Legend key={i} color={PHASE_COLOR[p.kind]} text={PHASE_LABEL[p.kind]} />)}
          <Legend color={C.lime} text="- - Meta" />
        </View>
      </Card>

      <Card title="Tu cuerpo: hoy vs. meta" subtitle="La meta es un físico con buena masa muscular, no solo un número en la balanza.">
        <CompositionChart st={st} />
      </Card>

      <Card title="Tus fases" subtitle="Hacelas en este orden.">
        {st.phases.map((p, i) => (
          <View key={i} className="flex-row mb-3">
            <View className="w-1.5 rounded-full mr-3" style={{ backgroundColor: PHASE_COLOR[p.kind] }} />
            <View className="flex-1">
              <Text className="text-white font-bold text-base">{i + 1}. {PHASE_LABEL[p.kind]}{p.weeks ? ` · ${p.weeks} semanas` : ""}</Text>
              {p.kind !== "mantener" ? (
                <Text className="text-mute text-sm mt-0.5">
                  {kg(p.from)} → {kg(p.to)} · {p.ratePerWeek > 0 ? "+" : "−"}{Math.abs(p.ratePerWeek).toFixed(2).replace(".", ",")} kg/semana · {p.kcal} kcal/día
                </Text>
              ) : (
                <Text className="text-mute text-sm mt-0.5">{p.kcal} kcal/día, con foco en ganar fuerza.</Text>
              )}
            </View>
          </View>
        ))}
      </Card>

      <Card title="Qué comer cada día" subtitle={`Para la fase de ${PHASE_LABEL[first.kind].toLowerCase()}.`}>
        <MacroChart st={st} />
      </Card>

      <Card title="Tu semana" subtitle={`${st.steps} · ${st.cardio}.`}>
        <View className="flex-row gap-1.5">
          {order.map(d => {
            const gym = trainDays.has(d), cardio = cardioDays.has(d);
            return (
              <View key={d} className="flex-1 items-center">
                <View className="w-full h-14 rounded-2xl items-center justify-center" style={{ backgroundColor: gym ? C.lime : cardio ? "#60A5FA33" : C.card2 }}>
                  <Icon name={gym ? "barbell" : cardio ? "walk" : "bed-outline"} size={16} color={gym ? C.ink : cardio ? "#60A5FA" : C.mute} />
                </View>
                <Text className="text-mute text-[11px] mt-1">{WEEKDAYS_SHORT[d]}</Text>
              </View>
            );
          })}
        </View>
        <View className="flex-row gap-4 mt-3">
          <Legend color={C.lime} text="Pesas" />
          <Legend color="#60A5FA" text="Cardio" />
          <Legend color="#55555C" text="Descanso" />
        </View>
      </Card>

      <Card title="Hombres vs. mujeres" subtitle="Ritmos típicos con buena técnica y alimentación. En mujeres el cambio es más lento: es normal, no te desanimes.">
        <SexRateChart st={st} />
      </Card>

      <Card title="Qué tenés que hacer">
        {st.tips.map((t, i) => (
          <View key={i} className="flex-row mb-2.5">
            <View className="w-6 h-6 rounded-full bg-lime items-center justify-center mr-3 mt-0.5">
              <Text className="text-ink text-xs font-bold">{i + 1}</Text>
            </View>
            <Text className="text-white/90 flex-1 leading-5">{t}</Text>
          </View>
        ))}
      </Card>

      <Text className="text-mute text-[11px] px-6 mt-2">
        Basado en: índice de masa libre de grasa (Kouri 1995), % de grasa por Deurenberg (1991), metabolismo por Mifflin-St Jeor, pérdida de 0,5–1 % del peso por semana para cuidar el músculo (Helms 2014) y proteína de 1,6–2,2 g/kg (Morton 2018). Es una guía orientativa: consultá con un médico o nutricionista.
      </Text>
    </Screen>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <View className="mx-5 mt-3 bg-card border border-line rounded-4xl p-5">
      <Text className="text-white text-lg font-bold">{title}</Text>
      {subtitle && <Text className="text-mute text-sm mt-0.5 mb-3">{subtitle}</Text>}
      {!subtitle && <View className="h-3" />}
      {children}
    </View>
  );
}

function Tile({ icon, label, value, sub }: { icon: IconName; label: string; value: string; sub?: string }) {
  return (
    <View className="w-[48.5%] bg-card border border-line rounded-3xl p-4 mb-3">
      <Icon name={icon} size={18} color={C.lime} />
      <Text className="text-mute text-xs mt-2">{label}</Text>
      <Text className="text-white text-2xl font-extrabold">{value}</Text>
      {sub && <Text className="text-mute text-[11px]">{sub}</Text>}
    </View>
  );
}
