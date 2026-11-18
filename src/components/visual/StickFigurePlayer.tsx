import { useEffect } from "react";
import { View } from "react-native";
import Svg, { Line, Circle, Rect, Path, Text as SvgText, G } from "react-native-svg";
import Animated, {
  useSharedValue, useAnimatedProps, withRepeat, withTiming, withSequence, withDelay,
  Easing, cancelAnimation,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import type { ExerciseVisual, JointName, Pt } from "../../types/visual";

const ALine = Animated.createAnimatedComponent(Line);
const ACircle = Animated.createAnimatedComponent(Circle);
const ARect = Animated.createAnimatedComponent(Rect);

const C = { bone: "#e4e4e7", joint: "#f97316", path: "#22c55e", weight: "#a1a1aa", bg: "#09090b" };
const BONES: [JointName, JointName][] = [
  ["neck","shoulder"], ["shoulder","elbow"], ["elbow","wrist"],
  ["shoulder","hip"], ["hip","knee"], ["knee","ankle"], ["ankle","toe"],
];

const lerpPt = (a: Pt | undefined, b: Pt | undefined, t: number): Pt => {
  "worklet";
  const A = a ?? b ?? [0, 0], B = b ?? a ?? [0, 0];
  return [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
};

function Bone({ a, b, v, t }: { a: JointName; b: JointName; v: ExerciseVisual; t: SharedValue<number> }) {
  const [s, e] = v.phases;
  const props = useAnimatedProps(() => {
    const p1 = lerpPt(s.pose[a], e.pose[a], t.value), p2 = lerpPt(s.pose[b], e.pose[b], t.value);
    return { x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1] };
  });
  return <ALine animatedProps={props} stroke={C.bone} strokeWidth={2.4} strokeLinecap="round" />;
}

function Joint({ j, v, t, r, color }: { j: JointName; v: ExerciseVisual; t: SharedValue<number>; r: number; color: string }) {
  const [s, e] = v.phases;
  const props = useAnimatedProps(() => {
    const p = lerpPt(s.pose[j], e.pose[j], t.value);
    return { cx: p[0], cy: p[1] };
  });
  return <ACircle animatedProps={props} r={r} stroke={color} strokeWidth={1.6} fill={j === "head" ? C.bg : color} />;
}

function Weight({ v, t }: { v: ExerciseVisual; t: SharedValue<number> }) {
  const eq = v.equipment;
  const [s, e] = v.phases;
  const props = useAnimatedProps(() => {
    const at = eq?.attachTo ?? "wrist";
    const p = lerpPt(s.pose[at], e.pose[at], t.value);
    const w = eq?.type === "barbell" ? 7 : 5, h = eq?.type === "barbell" ? 14 : 7;
    return { x: p[0] - w / 2, y: p[1] - h / 2, width: w, height: h };
  });
  if (!eq || eq.type === "none") return null;
  return <ARect animatedProps={props} rx={1.5} fill={C.weight} />;
}

function MotionPath({ v }: { v: ExerciseVisual }) {
  if (!v.pathJoint) return null;
  const a = v.phases[0].pose[v.pathJoint], b = v.phases[1].pose[v.pathJoint];
  if (!a || !b) return null;
  const mx = (a[0] + b[0]) / 2 - (b[1] - a[1]) * 0.15, my = (a[1] + b[1]) / 2 + (b[0] - a[0]) * 0.15;
  return <Path d={`M${a[0]},${a[1]} Q${mx},${my} ${b[0]},${b[1]}`} stroke={C.path} strokeWidth={1.2} strokeDasharray="2,2" fill="none" />;
}

export function StickFigurePlayer({ visual, size = 220, paused = false, phase }: {
  visual: ExerciseVisual; size?: number; paused?: boolean; phase?: 0 | 1; // phase = miniatura estática
}) {
  const t = useSharedValue<number>(phase ?? 0);
  const d = visual.durationMs ?? 1400;

  useEffect(() => {
    if (phase !== undefined) { t.value = phase; return; }
    if (paused) { cancelAnimation(t); return; }
    const ease = Easing.inOut(Easing.cubic);
    t.value = withRepeat(withSequence(
      withDelay(400, withTiming(1, { duration: d, easing: ease })),
      withDelay(400, withTiming(0, { duration: d, easing: ease })),
    ), -1, false);
    return () => cancelAnimation(t);
  }, [paused, phase, d]);

  const pose = visual.phases[phase ?? 0].pose;
  const hl = new Set(visual.highlight);
  const joints: JointName[] = ["shoulder", "elbow", "wrist", "hip", "knee", "ankle"];

  return (
    <View style={{ width: size, height: size, backgroundColor: C.bg, borderRadius: 16 }}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Line x1={8} y1={91} x2={92} y2={91} stroke="#27272a" strokeWidth={1} />
        <MotionPath v={visual} />
        {BONES.map(([a, b]) => <Bone key={a + b} a={a} b={b} v={visual} t={t} />)}
        <Weight v={visual} t={t} />
        <Joint j="head" v={visual} t={t} r={5} color={C.bone} />
        {joints.map(j => <Joint key={j} j={j} v={visual} t={t}
          r={hl.has(j) ? 2.6 : 1.4} color={hl.has(j) ? C.joint : C.bone} />)}
        {phase !== undefined && visual.angles
          ?.filter(a => (a.phase === "end") === (phase === 1))
          .map(a => {
            const p = pose[a.joint]; if (!p) return null;
            return (
              <G key={a.joint}>
                <Circle cx={p[0]} cy={p[1]} r={7} stroke={C.path} strokeWidth={1} fill="none" strokeDasharray="3,2" />
                <SvgText x={p[0] + 9} y={p[1] - 6} fill={C.path} fontSize={7} fontWeight="bold">{a.label}</SvgText>
              </G>
            );
          })}
      </Svg>
    </View>
  );
}
