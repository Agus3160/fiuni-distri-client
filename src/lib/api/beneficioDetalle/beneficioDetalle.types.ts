import { z } from "zod";
import { baseDtoSchema, BaseFilter } from "../../definitions";

// Definir el esquema principal de BeneficioDetalle
export const beneficioDetalleSchema = z.object({
  beneficio_id: z.number().positive("El ID del beneficio es obligatorio"),
  monto: z.number().min(0, "El monto debe ser positivo"),
  empleado_id: z.number().positive("El ID del empleado es obligatorio"),
  activo: z.boolean(),
});

// Esquema de BeneficioDetalleDto (incluye los campos comunes de base)
export const beneficioDetalleDtoSchema = baseDtoSchema.merge(beneficioDetalleSchema);
export type BeneficioDetalleDto = z.infer<typeof beneficioDetalleDtoSchema>;

// Esquema de creación de BeneficioDetalle
export const createBeneficioDetalleSchema = beneficioDetalleSchema;
export type CreateBeneficioDetalleDto = z.infer<typeof createBeneficioDetalleSchema>;

// Definir el tipo de filtro para BeneficioDetalle
export type BeneficioDetalleFilter = BaseFilter & {
  beneficio_id?: number;
  activo?: boolean;
};
