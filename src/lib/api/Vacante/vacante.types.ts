import { z } from "zod";
import { baseDtoSchema, BaseFilter } from "../../definitions";

export const vacanteSchema = z.object({
    esta_disponible: z.boolean(),
    puesto_id: z.number(),
    descripcion: z.string(),
});

export type CreateVacanteType = z.infer<typeof vacanteSchema>;

export const vacanteDtoSchema = baseDtoSchema.merge(vacanteSchema);

export type VacanteDto = z.infer<typeof vacanteDtoSchema>;

export const updateVacanteSchema = vacanteSchema.partial();

export interface VacanteFilter extends BaseFilter{
    "descripcion"?: string;
}