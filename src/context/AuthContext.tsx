import { createContext, useContext, useEffect, useReducer } from "react";
import {
  AuthContextType,
  AuthProviderProps,
  authReducer,
  Session,
} from "../lib/auth/auth.types";
import { useNavigate } from "react-router-dom";
import { authMe } from "../lib/auth/auth.service";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = function ({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, null);
  const navigate = useNavigate();

  const login = (session: Session) =>{
    localStorage.setItem("accessToken", JSON.stringify(session.accessToken));
    dispatch({ type: "LOGIN", payload: session });
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("accessToken");
    navigate("/login", { replace: true })
  };

  const getMe = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return logout();
    const { data: session, success } = await authMe(accessToken);
    if (!success || !session) return logout();
    login(session);
  };

  const isAuth = () => state;

  useEffect(()=>{
    getMe();
  }, [])

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
