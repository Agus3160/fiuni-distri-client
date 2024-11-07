import { z } from "zod";
import { beneficioSchema } from "./beneficio.types";
import { beneficioDetalleSchema } from "../beneficioDetalle/beneficioDetalle.types";

// Esquema para Beneficio con lista de BeneficioDetalle
export const beneficioConDetallesSchema = beneficioSchema.extend({
  detalles: z.array(beneficioDetalleSchema).min(1, "Debe tener al menos un detalle de beneficio"),
});

// Tipo de TypeScript inferido del esquema
export type BeneficioConDetalles = z.infer<typeof beneficioConDetallesSchema>;
