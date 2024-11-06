import { z } from "zod";
import { baseDtoSchema, BaseFilter } from "../../definitions";
import { createUserSchema } from "../user/user.types";
export const empleadoSchema = z.object({
  ci: z.string().min(5),
  nombre: z.string().min(3),
  puesto_id: z.number(),
  user_id: z.number(),
});
export const empleadoDtoSchema = baseDtoSchema.merge(empleadoSchema);
export type EmpleadoDto = z.infer<typeof empleadoDtoSchema>;

export const createEmpleadoSchema = empleadoDtoSchema
.omit({
  user_id: true
})
.extend({
  userData: createUserSchema,
});
export type CreateEmpleadoDto = z.infer<typeof empleadoSchema>;

export type EmpleadoFilter = BaseFilter & {
  ci?: string;
}