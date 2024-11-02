import { z } from "zod";
import { baseDtoSchema, BaseFilter } from "../../definitions";

export const createRoleSchema = z.object({
  rol: z
    .string()
    .min(3)
    .transform((rol) => rol.toUpperCase()),
});
export type CreateRoleType = z.infer<typeof createRoleSchema>;

export const roleSchema = baseDtoSchema.merge(createRoleSchema);
export type RoleDto = z.infer<typeof roleSchema>;

export interface RoleFilter extends BaseFilter {
  "rol"?: string;
}

export const updateRoleSchema = createRoleSchema.partial();
export type UpdateRoleType = z.infer<typeof updateRoleSchema>;