import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../src/api.js";
import { AuthContext } from "../src/context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [transitionActive, setTransitionActive] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (user) navigate(user.rol === "admin" ? "/panel" : "/catalogo");
  }, [user, navigate]);

  // Fondo animado dorado
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.5,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);

      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(1, "#1a1205");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      const glowX = mouse.current.x / w;
      const glowY = mouse.current.y / h;
      const radial = ctx.createRadialGradient(
        glowX * w,
        glowY * h,
        80,
        glowX * w,
        glowY * h,
        600
      );
      radial.addColorStop(0, "rgba(255,215,0,0.25)");
      radial.addColorStop(1, "transparent");
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, w, h);

      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,215,0,${p.alpha})`;
        ctx.shadowColor = "rgba(255,215,0,0.8)";
        ctx.shadowBlur = 8;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      }

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const offset = (Date.now() / 40 + i * 200) % h;
        ctx.moveTo(0, offset);
        ctx.lineTo(w, offset);
        ctx.strokeStyle = "rgba(255,215,0,0.12)";
        ctx.lineWidth = 2;
        ctx.shadowColor = "rgba(255,215,0,0.4)";
        ctx.shadowBlur = 20;
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    }

    function trackMouse(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }

    window.addEventListener("mousemove", trackMouse);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", trackMouse);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      setTransitionActive(true);
      const { data } = await api.post("/api/users/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🟡 Activamos animación y redirigimos después
      setTimeout(() => {
        navigate(data.user.rol?.toLowerCase() === "admin" ? "/panel" : "/catalogo");
      }, 1800);
    } catch (err) {
      setTransitionActive(false);
      setMsg(err.response?.data?.message || "Credenciales incorrectas.");
    }
  };

  const handleGoogleLogin = () => {
    setTransitionActive(true);
    setTimeout(() => {
      window.location.href = "https://lilianno-joyeria.onrender.com/api/auth/google";
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-white font-sans">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* 💫 Transición dorada */}
      <AnimatePresence>
        {transitionActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 bg-gradient-to-tr from-[#d4af37] via-[#e8c157] to-[#b8860b] z-50"
          />
        )}
      </AnimatePresence>

      {/* 🪞 Caja del login */}
      <div className="relative z-10 w-full max-w-md bg-black/75 backdrop-blur-md rounded-2xl p-8 border border-[#d4af37]/40 shadow-[0_0_35px_rgba(212,175,55,0.3)]">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-[#d4af37] tracking-wide drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]">
            Lilianno Joyería
          </h2>
          <p className="text-gray-300 text-sm mt-2 leading-relaxed">
            Elegancia, distinción y diseño hechos a mano.  
            Inicia sesión para continuar tu experiencia.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-[#d4af37] mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a1a1a]/90 border border-[#d4af37]/40 rounded-lg px-4 py-2.5 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#d4af37] outline-none transition"
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
              className="w-full bg-[#1a1a1a]/90 border border-[#d4af37]/40 rounded-lg px-4 py-2.5 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#d4af37] outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#d4af37] text-black font-semibold rounded-full hover:scale-105 hover:bg-[#e5c158] transition flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.4)] relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></span>
            <LogIn className="w-5 h-5 relative z-10" /> 
            <span className="relative z-10">Entrar</span>
          </button>
        </form>

        <div className="mt-5">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2.5 flex items-center justify-center gap-3 bg-white text-black font-semibold rounded-full hover:bg-[#d4af37]/20 hover:text-[#d4af37] transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] relative overflow-hidden"
          >
            <Mail className="w-5 h-5 text-[#d4af37]" />
            <span>Iniciar sesión con Google</span>
          </button>
        </div>

        {msg && <p className="text-center text-red-400 text-sm mt-3">{msg}</p>}

        <p className="text-center text-sm text-gray-400 mt-5">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-[#d4af37] hover:underline">
            Crear una cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
