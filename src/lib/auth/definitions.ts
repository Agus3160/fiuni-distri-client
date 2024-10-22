import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
export type LoginType = z.infer<typeof loginSchema>;

export interface Session {
  email: string;
  token: string;
}

export type AuthContextType = {
  session: Session | null;

  login: (session: Session) => void;
  isAuth: () => boolean;
  logout: () => void;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthActions =
  | { type: "LOGIN"; payload: Session }
  | { type: "GET_SESSION" }
  | { type: "LOGOUT" };

export const authReducer = (state: Session | null, action: AuthActions) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "GET_SESSION":
      return state;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};