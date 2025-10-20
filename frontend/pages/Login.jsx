import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../src/context/AuthContext.jsx"; // ✅ para guardar la sesión
import api from "../src/api"; // asegúrate de que esté configurado correctamente

// ✅ sin "src" aquí, la ruta debe ser relativa a este archivo
const bgImage = new URL("../src/assets/lilianno.png", import.meta.url).href;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ importa desde AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      // Llamada al backend
      const { data } = await api.post("/api/users/login", { email, password });

      // ✅ Guarda sesión usando el contexto
      login(data);

      // ✅ Redirige según el rol
      const rol = data.user.rol?.toLowerCase();

      if (rol === "admin") {
        navigate("/panel"); // ruta de tu PanelAdmin
      } else {
        navigate("/catalogo");
      }
    } catch (err) {
      console.error("❌ Error de login:", err);
      setMsg(err.response?.data?.message || "Credenciales incorrectas.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center text-white px-4">
      <div className="flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-[0_0_25px_rgba(212,175,55,0.25)] max-w-3xl w-full">

        {/* Panel izquierdo: formulario */}
        <div className="w-full md:w-1/2 bg-[#111]/90 p-10 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#d4af37]">Bienvenido de nuevo</h2>
            <p className="text-gray-300 text-sm mt-2">
              Inicia sesión para continuar tu experiencia con{" "}
              <span className="text-[#d4af37] font-medium">Lilianno</span>.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-[#d4af37] mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#d4af37]/40 rounded-lg px-4 py-2 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#d4af37] outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#d4af37] mb-1">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#d4af37]/40 rounded-lg px-4 py-2 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#d4af37] outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#d4af37] text-black font-semibold rounded-full hover:bg-[#e5c158] transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              <LogIn className="w-4 h-4" />
              Entrar
            </button>
          </form>

          {/* Mensaje de error */}
          {msg && <p className="text-center text-red-400 text-sm mt-3">{msg}</p>}

          <p className="text-center text-sm text-gray-400 mt-5">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-[#d4af37] hover:underline">
              Crear una cuenta
            </Link>
          </p>
        </div>

        {/* Panel derecho: imagen */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(11,11,11,0.3), rgba(11,11,11,0.7)), url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="h-full w-full flex flex-col justify-end p-8 text-[#f5d47a]">
            <h3 className="text-2xl font-semibold drop-shadow-[0_0_10px_rgba(0,0,0,0.7)]">
              Lilianno Joyería
            </h3>
            <p className="text-sm text-gray-200 mt-2 leading-relaxed drop-shadow-[0_0_8px_rgba(0,0,0,0.7)]">
              Elegancia, distinción y diseño hechos a mano.  
              Cada joya es una historia creada para brillar contigo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
