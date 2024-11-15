import { z } from "zod"
import { baseDtoSchema } from "../../definitions";

export const vacanteDetalleSchema = z.object({
    engargado_id: z.number(),
    vacante_id: z.number(),
    fue_revisado: z.boolean(),
    cv: z.string(),

});

export type CreateVacanteDetalleType = z.infer<typeof vacanteDetalleSchema>;

export const vacanteDetalleDtoSchema = baseDtoSchema.merge(vacanteDetalleSchema);

export type VacanteDetalleDto = z.infer<typeof vacanteDetalleDtoSchema>;

export const updateVacanteDetalleSchema = vacanteDetalleSchema.partial();