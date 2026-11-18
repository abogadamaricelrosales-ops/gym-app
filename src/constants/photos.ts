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
  Brazos: require("../../assets/photos/brazos.jpg"),
  "Full body": require("../../assets/photos/fullbody.jpg"),
  Cardio: require("../../assets/photos/cardio.jpg"),
};
