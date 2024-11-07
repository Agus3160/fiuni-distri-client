import { z } from "zod";
import { baseDtoSchema, BaseFilter } from "../../definitions";

export const createPuestoSchema = z.object({
    nombre: z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres"),
    
    sueldo: z
        .coerce
        .number()
        .min(0, "El sueldo no puede ser negativo")
});

export type CreatePuestoType = z.infer<typeof createPuestoSchema>;

export const puestoSchema = baseDtoSchema.merge(createPuestoSchema);
export type PuestoDto = z.infer<typeof puestoSchema>;

export interface PuestoFilter extends BaseFilter {
    "puesto"?: string;
}

export const updatePuestoSchema = createPuestoSchema.partial();
//export type UpdatePuestoType = z.infer<typeof updatePuestoSchema>;
