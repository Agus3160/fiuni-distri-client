import { z } from "zod";

// AUTH SCHEMAS

// SIGNUP SCHEMA
export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(5),
});
export type SignUpType = z.infer<typeof signUpSchema>;

// LOGIN SCHEMA
export const loginSchema = signUpSchema.pick({ email: true, password: true });
export type LoginType = z.infer<typeof loginSchema>;

// AUTH TYPES
export interface Session {
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
}

// AUTH CONTEXT TYPES
export type AuthContextType = {
  session: Session | null;

  getMe: () => Promise<void>;
  login: (session: Session) => void;
  isAuth: () => Session | null;
  logout: () => void;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};

// AUTH REDUCER TYPES AND DEFINITION
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
