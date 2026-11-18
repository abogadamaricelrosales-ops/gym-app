import type { ImageSourcePropType } from "react-native";
import type { Category } from "../types/routine";

/**
 * Fotos de Unsplash (licencia gratuita de Unsplash), incluidas en la app para que
 * funcione sin conexión en el gimnasio. Créditos en README.md.
 */
export const PHOTOS = {
  splash: require("../../assets/photos/splash.jpg"),
  gym: require("../../assets/photos/gym.jpg"),
  rack: require("../../assets/photos/rack.jpg"),
  perfil: require("../../assets/photos/perfil.jpg"),
} satisfies Record<string, ImageSourcePropType>;

export const CATEGORY_PHOTO: Record<Category, ImageSourcePropType> = {
  Pecho: require("../../assets/photos/pecho.jpg"),
  Espalda: require("../../assets/photos/espalda.jpg"),
  Piernas: require("../../assets/photos/piernas.jpg"),
  Hombros: require("../../assets/photos/hombros.jpg"),
  "Bíceps": require("../../assets/photos/biceps.jpg"),
  "Tríceps": require("../../assets/photos/triceps.jpg"),
  "Full body": require("../../assets/photos/fullbody.jpg"),
  Cardio: require("../../assets/photos/cardio.jpg"),
};

/** Fotos de referentes (uso personal). Los que no tienen foto muestran sus iniciales. */
export const REFERENT_PHOTO: Record<string, ImageSourcePropType> = {
  "angela-borges": require("../../assets/referents/angela-borges.jpg"),
  "chris-bumstead": require("../../assets/referents/chris-bumstead.jpg"),
  "francielle-mattos": require("../../assets/referents/francielle-mattos.jpg"),
  "jeff-nippard": require("../../assets/referents/jeff-nippard.jpg"),
  "krissy-cela": require("../../assets/referents/krissy-cela.jpg"),
  "mike-israetel": require("../../assets/referents/mike-israetel.jpg"),
  "ryan-terry": require("../../assets/referents/ryan-terry.jpg"),
  "yarishna-ayala": require("../../assets/referents/yarishna-ayala.jpg"),
};
