import { createContext, useContext, useReducer } from "react";
import {
  AuthContextType,
  AuthProviderProps,
  authReducer,
  Session,
} from "../lib/auth/definitions";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = function ({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, null);
  const navigate = useNavigate();

  const login = (session: Session) =>
    dispatch({ type: "LOGIN", payload: session });

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    navigate("/login", { replace: true })
  };

  const isAuth = () => !!state;

  return (
    <AuthContext.Provider value={{ session: state, login, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};
