import catalog from "./professionalTemplates.json";
import type { TemplateCatalog, ProfessionalTemplate } from "../types/template";

const TEMPLATES = (catalog as TemplateCatalog).templates;

// Congela el catálogo: si algo intenta mutarlo, falla en desarrollo
const deepFreeze = <T,>(o: T): T => {
  Object.values(o as object).forEach(v => v && typeof v === "object" && deepFreeze(v));
  return Object.freeze(o);
};
TEMPLATES.forEach(deepFreeze);

export const getTemplates = (): readonly ProfessionalTemplate[] => TEMPLATES;
export const getTemplate = (id: string) => TEMPLATES.find(t => t.id === id);
