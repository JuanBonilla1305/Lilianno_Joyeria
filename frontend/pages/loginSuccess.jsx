import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { AuthContext } from "../src/context/AuthContext.jsx";

export default function LoginSuccess() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // 1️⃣ Guardar token en localStorage
      localStorage.setItem("token", token);

      // 2️⃣ Decodificar token para obtener los datos del usuario
      const decoded = jwtDecode(token);
const userData = {
  id: decoded.id,
  rol: decoded.rol,
  nombre: decoded.nombre, // 👈 nuevo campo
};

      // 3️⃣ Guardar usuario en localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // 4️⃣ Actualizar el contexto (mantiene sesión sin recargar)
      if (login) login({ token, user: userData });

      // 5️⃣ Redirigir al inicio o al panel correspondiente
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate, login]);

  return (
    <div className="flex items-center justify-center h-screen text-lg text-gray-300">
      Iniciando sesión con Google...
    </div>
  );
}
