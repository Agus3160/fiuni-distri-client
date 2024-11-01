import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth/useContext";
import Loading from "../../pages/Loading";

export default function ProtectedRoute() {
  const { isAuth, isLoading } = useAuth();
  const session = isAuth();
  if(isLoading) return <Loading />
  if (!session && !isLoading) return <Navigate to="/login" replace />;
  return <Outlet />;
}

