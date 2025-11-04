import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../src/api.js";

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // Decodifica el token
      const decoded = jwtDecode(token);

      // Guarda en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(decoded));

      // Configura Axios para futuras peticiones
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Redirige según rol
      const destino = decoded.rol === "admin" ? "/panel" : "/catalogo";
      navigate(destino);
    } catch (err) {
      console.error("❌ Error procesando token:", err);
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-black">
      <p className="text-lg text-[#d4af37] animate-pulse">
        Iniciando sesión con Google...
      </p>
    </div>
  );
}
