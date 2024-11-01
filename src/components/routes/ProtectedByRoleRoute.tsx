import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth/useContext";
import Loading from "../../pages/Loading";
import { validateRoles } from "../../lib/utils";

type Props = {
  rol: string[];
};

export default function ProtectedByRoleRoute({ rol }: Props) {
  const { isAuth, isLoading } = useAuth();
  const session = isAuth();
  if (isLoading) return <Loading />;
  if ((!session || !validateRoles(session.roles, rol)) && !isLoading)
    return <Navigate to="/login" replace />;
  return <Outlet />;
}
