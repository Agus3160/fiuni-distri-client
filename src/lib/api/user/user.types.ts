import { z } from "zod";
import { baseDtoSchema, BaseFilter } from "../../definitions";

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(5),
  roles: z.string().array().min(1, "Debe seleccionar al menos un rol").default(["USER"]),
});
export type CreateUserType = z.infer<typeof createUserSchema>;

export const userDtoSchema = createUserSchema.merge(baseDtoSchema);
export type UserDto = z.infer<typeof userDtoSchema>;

export interface UserFilter extends BaseFilter {
  "username"?: string;
  "email"?: string;
}