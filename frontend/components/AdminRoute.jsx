import { Navigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext.jsx";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center text-white">Cargando...</p>;
  if (!user) return <Navigate to="/login" />;
  if (user.rol?.toLowerCase() !== "admin") return <Navigate to="/catalogo" />;

  return children;
}
