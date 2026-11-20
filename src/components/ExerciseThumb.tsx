import { useMemo } from "react";
import { Image, View } from "react-native";
import { ExerciseFigure } from "./ExerciseFigure";
import { photosFor } from "../data/exercisePhotos";
import { guideFor } from "../data/exerciseGuide";
import { drawPattern } from "../data/figures";

/** Miniatura del ejercicio: la foto de la posición final, o el muñeco si no hay foto. */
export function ExerciseThumb({ name, size }: { name: string; size: number }) {
  const photos = useMemo(() => photosFor(name), [name]);
  const prims = useMemo(() => (photos ? null : drawPattern(guideFor(name).pattern)[1]), [name, photos]);
  return (
    <View style={{ width: size, height: size }} className="rounded-2xl bg-ink items-center justify-center overflow-hidden">
      {photos
        ? <Image source={photos[1]} style={{ width: size, height: size }} resizeMode="cover" />
        : <ExerciseFigure prims={prims!} width={size - 6} />}
    </View>
  );
}
