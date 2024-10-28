import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute() {
  const { isAuth } = useAuth();
  const session = isAuth();
  if (!session) return <Navigate to="/login" replace />;
  return <Outlet />;
}