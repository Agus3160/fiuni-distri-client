import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { validateRoles } from "../../lib/utils";

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