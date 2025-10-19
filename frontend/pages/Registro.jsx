import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../src/api";
import { useAuth } from "../src/context/AuthContext.jsx";

export default function Registro() {
  const { login } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/api/users/register", { nombre, email, password });
      // muchas APIs devuelven {token,user}; si no, login con /login
      if (data?.token) login(data); else {
        const res = await api.post("/api/users/login", { email, password });
        login(res.data);
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("No se pudo registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center pt-24 px-4">
      <div className="w-full max-w-md bg-[#111] border border-[#d4af37]/30 rounded-2xl p-8">
        <h1 className="text-2xl font-semibold mb-2">Crear cuenta</h1>
        <p className="text-sm text-zinc-400 mb-6">Únete a <span className="text-[#d4af37]">Lilianno</span></p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-3 rounded-lg bg-transparent border border-[#d4af37]/40 focus:border-[#d4af37] outline-none"
            value={nombre} onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo"
            className="w-full p-3 rounded-lg bg-transparent border border-[#d4af37]/40 focus:border-[#d4af37] outline-none"
            value={email} onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 rounded-lg bg-transparent border border-[#d4af37]/40 focus:border-[#d4af37] outline-none"
            value={password} onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#d4af37] text-black font-semibold hover:bg-[#e8c157] transition disabled:opacity-50"
          >
            {loading ? "Creando..." : "Crear cuenta"}
          </button>
        </form>

        <p className="text-sm mt-6 text-zinc-400">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-[#d4af37] hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </main>
  );
}
