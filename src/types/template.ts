export type TemplateTag = "Fuerza" | "Hipertrofia" | "Pérdida de grasa" | "Funcional" | "Masculino" | "Femenino" | "Unisex";
export type Level = "principiante" | "intermedio" | "avanzado";

export interface TemplateExercise {
  id: string; name: string; muscleGroup: string;
  targetSets: number; targetReps: string; restSeconds: number;
  exerciseKey?: string; tempo?: string; notes?: string;
}
export interface TemplateDay { id: string; name: string; exercises: TemplateExercise[]; }
export interface ProfessionalTemplate {
  id: string; name: string; author: string; description: string;
  level: Level; daysPerWeek: number; durationWeeks: number;
  goal: "fuerza" | "hipertrofia" | "perdida_grasa" | "funcional";
  tags: TemplateTag[]; days: TemplateDay[];
}
export interface TemplateCatalog { schemaVersion: number; templates: ProfessionalTemplate[]; }
