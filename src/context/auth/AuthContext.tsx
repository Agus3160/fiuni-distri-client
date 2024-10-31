import { createContext, useCallback, useEffect, useReducer } from "react";
import {
  AuthContextType,
  AuthProviderProps,
  authReducer,
  Session,
} from "../../lib/auth/auth.types";
import { useNavigate } from "react-router-dom";
import { authMe } from "../../lib/auth/auth.service";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = function ({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, null);
  const navigate = useNavigate();

  const login = (session: Session) => {
    console.log(session);
    localStorage.setItem("accessToken", session.accessToken);
    dispatch({ type: "LOGIN", payload: session });
  };

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("accessToken");
    navigate("/login", { replace: true });
  }, [navigate]);

  const getMe = useCallback(async () => {
    if(state) return;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return dispatch({ type: "LOGOUT" });
    try {
      const { data: session } = await authMe(accessToken);
      dispatch({
        type: "LOGIN",
        payload: { ...session, accessToken: accessToken },
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  const isAuth = () => state;

  useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <AuthContext.Provider value={{ session: state, login, logout, isAuth, getMe}}>
      {children}
    </AuthContext.Provider>
  );
};
