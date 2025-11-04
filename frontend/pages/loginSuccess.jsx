import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Obtiene el token del query param
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      try {
        // Decodifica el token para extraer los datos del usuario
        const decoded = jwtDecode(token);

        const userData = {
          id: decoded.id,
          nombre: decoded.nombre,
          rol: decoded.rol,
        };

        // Guarda sesión
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirige según rol
        if (decoded.rol === "admin") {
          navigate("/panel");
        } else {
          navigate("/catalogo");
        }
      } catch (error) {
        console.error("❌ Error decodificando el token:", error);
        navigate("/login");
      }
    } else {
      console.warn("⚠️ No se encontró token en la URL");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-[#d4af37]">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Iniciando sesión...</h2>
        <p className="text-sm text-gray-400 mt-2">
          Redirigiendo a tu cuenta segura.
        </p>
      </div>
    </div>
  );
}
