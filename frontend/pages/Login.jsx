import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail } from "lucide-react";
import api from "../src/api.js";
import { AuthContext } from "../src/context/AuthContext.jsx"; // 👈 importar contexto

const bgImage = new URL("../src/assets/lilianno.png", import.meta.url).href;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // 👈 leer usuario actual

  // 🚫 Si el usuario ya está autenticado, redirige automáticamente
  useEffect(() => {
    if (user) {
      // Redirige según el rol
      navigate(user.rol === "admin" ? "/panel" : "/catalogo");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const { data } = await api.post("/api/users/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const rol = data.user.rol?.toLowerCase();
      navigate(rol === "admin" ? "/panel" : "/catalogo");
    } catch (err) {
      console.error("❌ Error de login:", err);
      setMsg(err.response?.data?.message || "Credenciales incorrectas.");
    }
  };

  const handleGoogleLogin = () => {
  const API_URL =
    import.meta.env.MODE === "production"
      ? "https://lilianno-joyeria.onrender.com" // 👈 cambia esto por tu dominio real
      : "http://localhost:3001";

  window.location.href = `${API_URL}/api/auth/google`;
};
  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center text-white px-4">
      <div className="flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-[0_0_25px_rgba(212,175,55,0.25)] max-w-3xl w-full">
        {/* Panel izquierdo */}
        <div className="w-full md:w-1/2 bg-[#111]/90 p-10 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#d4af37]">Bienvenido de nuevo</h2>
            <p className="text-gray-300 text-sm mt-2">
              Inicia sesión para continuar tu experiencia con{" "}
              <span className="text-[#d4af37] font-medium">Lilianno</span>.
            </p>
          </div>

          {/* FORMULARIO */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-[#d4af37] mb-1">Correo electrónico</label>
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
              <label className="block text-sm text-[#d4af37] mb-1">Contraseña</label>
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
              <LogIn className="w-4 h-4" /> Entrar
            </button>
          </form>

          {/* BOTÓN DE GOOGLE */}
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-2 flex items-center justify-center gap-2 bg-[#fff] text-black font-semibold rounded-full hover:bg-[#d4af37]/20 transition"
            >
              <Mail className="w-5 h-5 text-[#d4af37]" />
              Iniciar sesión con Google
            </button>
          </div>

          {/* Mensaje de error */}
          {msg && <p className="text-center text-red-400 text-sm mt-3">{msg}</p>}

          <p className="text-center text-sm text-gray-400 mt-5">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-[#d4af37] hover:underline">
              Crear una cuenta
            </Link>
          </p>
        </div>

        {/* Panel derecho */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(11,11,11,0.3), rgba(11,11,11,0.7)), url(${bgImage})`,
          }}
        >
          <div className="h-full w-full flex flex-col justify-end p-8 text-[#f5d47a]">
            <h3 className="text-2xl font-semibold">Lilianno Joyería</h3>
            <p className="text-sm text-gray-200 mt-2 leading-relaxed">
              Elegancia, distinción y diseño hechos a mano.  
              Cada joya es una historia creada para brillar contigo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
