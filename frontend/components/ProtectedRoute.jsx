import { Navigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user?.token) return <Navigate to="/login" replace />;
  return children;
}
