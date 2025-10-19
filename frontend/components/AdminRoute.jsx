import { Navigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext.jsx";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user?.token) return <Navigate to="/login" replace />;
  if ((user.rol || "").toLowerCase() !== "admin") return <Navigate to="/" replace />;
  return children;
}
