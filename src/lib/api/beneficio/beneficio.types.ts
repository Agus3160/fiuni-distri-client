import { z } from "zod";
import { baseDtoSchema, BaseFilter } from "../../definitions";

// Definir el esquema principal de Beneficio
export const beneficioSchema = z.object({
  nombre: z.string().min(3, "El nombre es obligatorio"),
  activo: z.boolean(),
  porcentaje_de_sueldo: z
    .union([z.string(), z.number()])
    .transform((v) => typeof v === "string" ? parseFloat(v) : v)
    .pipe(z.number().min(0).max(100, "Debe estar entre 0 y 100")),
  fecha_inicio: z.string(),
  fecha_fin: z.string().optional(),
});

// Esquema de BeneficioDto (incluye los campos comunes de base)
export const beneficioDtoSchema = baseDtoSchema.merge(beneficioSchema);
export type BeneficioDto = z.infer<typeof beneficioDtoSchema>;
export type BeneficioCrearDto = z.infer<typeof beneficioSchema>;

// Esquema de creación de Beneficio (puede incluir campos adicionales)
export const createBeneficioSchema = beneficioSchema;
export type CreateBeneficioDto = z.infer<typeof createBeneficioSchema>;

// Definir el tipo de filtro para Beneficio
export type BeneficioFilter = BaseFilter & {
  nombre?: string;
  activo?: boolean;
};
