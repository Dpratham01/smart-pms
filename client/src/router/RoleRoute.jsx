import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleRoute({ children, allowedRoles }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/auth/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/auth/login" replace />;

  return children;
}
