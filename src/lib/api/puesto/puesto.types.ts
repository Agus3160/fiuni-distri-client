import { z } from "zod";
import { BaseDto, BaseFilter } from "../../definitions";

export interface PuestoDto extends BaseDto{
    nombre: string;
    sueldo: number;
}

export const createPuestoSchema = z.object({
    nombre: z
        .string()
        .min(3),
    
    sueldo: z
        .number()
        .min(0, "El sueldo no puede ser negativo")
});

export type CreatePuestoType = z.infer<typeof createPuestoSchema>;

export interface PuestoFilter extends BaseFilter {
    "puesto"?: string;
}

export const updatePuestoSchema = createPuestoSchema.partial();
export type UpdatePuestoType = z.infer<typeof updatePuestoSchema>;
