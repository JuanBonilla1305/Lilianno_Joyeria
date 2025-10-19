import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../src/api.js";
import { useAuth } from "../src/context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await api.post("/api/users/login", { email, password });
      console.log("✅ Datos recibidos del backend:", data);

      // Normalizamos el payload
      const userData = {
        token: data.token,
        user: {
          nombre: data.user?.nombre || data.nombre || "Usuario",
          email: data.user?.email || data.email || email,
          rol: (data.user?.rol || data.user?.role || data.rol || data.role || "cliente").toLowerCase(),
        },
      };

      login(userData);

      // Redirección por rol
      if (userData.user.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/panel-cliente");
      }
    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err);
      const msg = err.response?.data?.message || "Credenciales inválidas o servidor no disponible.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center pt-24 px-4">
      <div className="w-full max-w-md bg-[#111] border border-[#d4af37]/30 rounded-2xl p-8">
        <h1 className="text-2xl font-semibold mb-2">Inicia sesión</h1>
        <p className="text-sm text-zinc-400 mb-6">
          Bienvenido de vuelta a <span className="text-[#d4af37]">Lilianno</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo"
            className="w-full p-3 rounded-lg bg-transparent border border-[#d4af37]/40 focus:border-[#d4af37] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 rounded-lg bg-transparent border border-[#d4af37]/40 focus:border-[#d4af37] outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#d4af37] text-black font-semibold hover:bg-[#e8c157] transition disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-sm mt-6 text-zinc-400">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-[#d4af37] hover:underline">
            Crear cuenta
          </Link>
        </p>
      </div>
    </main>
  );
}
