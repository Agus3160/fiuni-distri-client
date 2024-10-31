import { Navigate, Outlet } from "react-router-dom";
import { validateRoles } from "../../lib/utils";
import { useAuth } from "../../context/auth/useContext";

type Props = {
  rol:string[]
}

export default function ProtectedByRoleRoute({rol}: Props) {
  const { isAuth } = useAuth();
  const session = isAuth();
  if (!session) return <Navigate to="/login" replace />;
  if (validateRoles(rol, session.roles)) return <Outlet />;
  return <Navigate to="/forbiden" replace />;
}