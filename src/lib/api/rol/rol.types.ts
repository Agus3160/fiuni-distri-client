import { z } from "zod";
import { BaseDto, BaseFilter } from "../../definitions";

export interface RoleDto extends BaseDto {
  rol: string;
}

export const createRoleSchema = z.object({
  rol: z
    .string()
    .min(3)
    .transform((rol) => rol.toUpperCase()),
});
export type CreateRoleType = z.infer<typeof createRoleSchema>;

export interface RoleFilter extends BaseFilter {
  "rol"?: string;
}

export const updateRoleSchema = createRoleSchema.partial();
export type UpdateRoleType = z.infer<typeof updateRoleSchema>;