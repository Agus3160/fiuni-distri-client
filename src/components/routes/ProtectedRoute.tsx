import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth/useContext";
import { useState, useEffect } from "react";

export default function ProtectedRoute() {
  const { getMe } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await getMe()
        setHasSession(true);
      } catch (error) {
        console.error("You are not authenticated", error);
        setHasSession(false);
      }finally{
        setIsLoading(false);
      }
    }
    verifyAuth();
  }, [getMe]);

  if(isLoading) return null
  if (!hasSession && !isLoading) return <Navigate to="/login" replace />;
  return <Outlet />;
}

