import { useMemo, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Screen, SectionTitle } from "../components/ui/Screen";
import { Icon } from "../components/ui/Icon";
import { Chip } from "../components/ui/Chip";
import { WeekStrip, startOfDay } from "../components/WeekStrip";
import { useRoutineStore } from "../store/useRoutineStore";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { useSettingsStore } from "../store/useSettingsStore";
import { QUOTES } from "../constants/quotes";
import { CATEGORY_ICON, estimateMinutes, fmtDay } from "../utils/format";
import { C } from "../constants/theme";
import type { Routine, Category } from "../types/routine";

export default function HomeScreen() {
  const nav = useNavigation<any>();
  const name = useSettingsStore(s => s.name);
  const quoteIndex = useSettingsStore(s => s.lastQuote);
  const routines = useRoutineStore(s => s.routines);
  const history = useWorkoutStore(s => s.history);
  const active = useWorkoutStore(s => s.active);
  const start = useWorkoutStore(s => s.start);

  const today = startOfDay(new Date());
  const [selected, setSelected] = useState(today);
  const [filter, setFilter] = useState<Category | "Todas">("Todas");

  const trainedDays = useMemo(() => new Set(history.map(w => startOfDay(new Date(w.startedAt)))), [history]);
  const weekday = new Date(selected).getDay();
  const planned = routines.find(r => r.weekdays.includes(weekday));
  const isToday = selected === today;

  // Progreso semanal: entrenos hechos vs. días planificados
  const weekStart = today - ((new Date().getDay() + 6) % 7) * 86_400_000;
  const doneThisWeek = new Set(history.filter(w => w.startedAt >= weekStart).map(w => startOfDay(new Date(w.startedAt)))).size;
  const plannedPerWeek = Math.max(1, new Set(routines.flatMap(r => r.weekdays)).size);

  const categories = useMemo(() => [...new Set(routines.map(r => r.category))], [routines]);
  const list = filter === "Todas" ? routines : routines.filter(r => r.category === filter);

  const go = (r: Routine) => {
    if (!active) start(r);
    nav.navigate("Workout");
  };

  return (
    <Screen>
      {/* Saludo */}
      <View className="flex-row items-center px-5 pt-3">
        <View className="w-12 h-12 rounded-full bg-card border-2 border-lime items-center justify-center">
          <Text className="text-white text-lg font-bold">{(name || "A").charAt(0).toUpperCase()}</Text>
        </View>
        <View className="flex-1 ml-3">
          <Text className="text-mute text-sm capitalize">{fmtDay(Date.now())}</Text>
          <Text className="text-white text-2xl font-bold">Hola, {name || "atleta"} 👋</Text>
        </View>
        <View className="flex-row items-center h-11 px-3 rounded-full bg-card border border-line">
          <Icon name="flame" size={18} color={C.lime} />
          <Text className="text-white font-bold ml-1">{doneThisWeek}</Text>
        </View>
      </View>
      {quoteIndex >= 0 && (
        <Text className="text-mute px-5 mt-3 italic" numberOfLines={2}>“{QUOTES[quoteIndex]}”</Text>
      )}

      <View className="mt-5">
        <WeekStrip selected={selected} onSelect={setSelected} trainedDays={trainedDays} />
      </View>

      {/* Tarjeta principal */}
      <View className="px-5 mt-5">
        {active ? (
          <HeroCard
            eyebrow="Entreno en curso"
            title={active.name}
            meta={`${active.exercises.flatMap(e => e.sets).filter(s => s.completed).length} de ${active.exercises.flatMap(e => e.sets).length} series`}
            cta="Continuar"
            onPress={() => nav.navigate("Workout")}
          />
        ) : planned ? (
          <HeroCard
            eyebrow={isToday ? "Entreno de hoy" : "Entreno de ese día"}
            title={planned.name}
            meta={`${planned.exercises.length} ejercicios · ${estimateMinutes(planned)} min`}
            cta="Empezar"
            onPress={() => go(planned)}
          />
        ) : (
          <View className="bg-card border border-line rounded-4xl p-6">
            <Text className="text-mute font-semibold">{isToday ? "Hoy" : "Ese día"}</Text>
            <Text className="text-white text-3xl font-extrabold mt-1">Día de descanso</Text>
            <Text className="text-mute mt-2">
              {routines.length ? "Podés entrenar igual eligiendo una rutina de abajo." : "Creá tu primera rutina para empezar."}
            </Text>
          </View>
        )}
      </View>

      {/* Meta semanal */}
      <View className="mx-5 mt-4 flex-row items-center bg-card border border-line rounded-full p-2 pr-5">
        <View className="w-11 h-11 rounded-full bg-ink items-center justify-center">
          <Icon name="trophy" size={18} color={C.lime} />
        </View>
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between">
            <Text className="text-white font-semibold">Meta semanal</Text>
            <Text className="text-mute">{Math.min(doneThisWeek, plannedPerWeek)}/{plannedPerWeek}</Text>
          </View>
          <View className="h-2 rounded-full bg-card2 mt-2 overflow-hidden">
            <View className="h-2 rounded-full bg-lime" style={{ width: `${Math.min(1, doneThisWeek / plannedPerWeek) * 100}%` }} />
          </View>
        </View>
      </View>

      {/* Rutinas */}
      <SectionTitle title="Tus rutinas" action="Ver todas" onAction={() => nav.navigate("Rutinas")} />
      {categories.length > 1 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-5 pb-3">
          <Chip label="Todas" active={filter === "Todas"} onPress={() => setFilter("Todas")} />
          {categories.map(c => <Chip key={c} label={c} active={filter === c} onPress={() => setFilter(c)} />)}
        </ScrollView>
      )}
      <View className="px-5 flex-row flex-wrap justify-between">
        {list.map(r => <RoutineTile key={r.id} routine={r} onPlay={() => go(r)} />)}
        {routines.length === 0 && (
          <Pressable onPress={() => nav.navigate("Rutinas")} className="w-full bg-card border border-line rounded-3xl p-5 items-center">
            <Icon name="add-circle" size={32} color={C.lime} />
            <Text className="text-white font-semibold mt-2">Crear rutina</Text>
          </Pressable>
        )}
      </View>
    </Screen>
  );
}

function HeroCard({ eyebrow, title, meta, cta, onPress }: {
  eyebrow: string; title: string; meta: string; cta: string; onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={["#D6F75A", "#B4E61E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 28, padding: 24 }}
      >
        <Text className="text-ink/70 font-semibold">{eyebrow}</Text>
        <Text className="text-ink text-3xl font-extrabold mt-1" numberOfLines={2}>{title}</Text>
        <View className="flex-row items-center justify-between mt-6">
          <Text className="text-ink/80 font-medium">{meta}</Text>
          <View className="flex-row items-center bg-ink rounded-full pl-5 pr-1.5 h-12">
            <Text className="text-white font-bold mr-3">{cta}</Text>
            <View className="w-9 h-9 rounded-full bg-lime items-center justify-center">
              <Icon name="arrow-forward" size={18} color={C.ink} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

function RoutineTile({ routine: r, onPlay }: { routine: Routine; onPlay: () => void }) {
  return (
    <Pressable onPress={onPlay} className="w-[48.5%] bg-card border border-line rounded-3xl p-4 mb-3">
      <View className="flex-row justify-between items-start">
        <View className="w-11 h-11 rounded-2xl bg-card2 items-center justify-center">
          <Icon name={CATEGORY_ICON[r.category]} size={20} color={C.lime} />
        </View>
        <View className="px-2 py-1 rounded-full bg-ink">
          <Text className="text-mute text-xs">{estimateMinutes(r)} min</Text>
        </View>
      </View>
      <Text className="text-white text-base font-bold mt-4" numberOfLines={2}>{r.name}</Text>
      <View className="flex-row items-center justify-between mt-2">
        <Text className="text-mute text-xs">{r.exercises.length} ejercicios</Text>
        <View className="w-8 h-8 rounded-full bg-lime items-center justify-center">
          <Icon name="play" size={14} color={C.ink} />
        </View>
      </View>
    </Pressable>
  );
}
