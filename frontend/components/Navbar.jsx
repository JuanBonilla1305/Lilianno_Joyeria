import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingCart, LogOut, Shield } from "lucide-react";
import { useCart } from "../src/context/CartContext.jsx";
import { useAuth } from "../src/context/AuthContext.jsx";
import logo from "../src/assets/lilianno.png";
import { useEffect, useRef } from "react";

export default function Navbar() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // ✨ Fondo animado sutil de destellos blancos
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, particles = [];

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Crear partículas blancas suaves
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.3,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(11,11,11,0.9)";
      ctx.fillRect(0, 0, w, h);

      // partículas blancas brillantes
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.shadowColor = "rgba(255,255,255,0.8)";
        ctx.shadowBlur = 8;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      }

      requestAnimationFrame(animate);
    }
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0b0b0b]/90 border-b border-[#d4af37]/20 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.1)]">
      {/* ✨ Canvas de fondo animado */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between px-8 py-3">
        {/* 🔸 Texto izquierdo minimalista */}
        <div className="flex items-center gap-8">
          <Link
            to="/catalogo"
            className="text-[#d4af37] font-medium text-sm md:text-base tracking-wide hover:text-[#f5d47a] transition-colors"
          >
            Catálogo
          </Link>
          <Link
            to="/personalizar"
            className="text-[#d4af37] font-medium text-sm md:text-base tracking-wide hover:text-[#f5d47a] transition-colors"
          >
            Crear
          </Link>

          {/* ✅ Solo visible si es admin */}
          {user?.rol === "admin" && (
            <button
              onClick={() => navigate("/panel")}
              className="text-[#d4af37] font-medium text-sm md:text-base tracking-wide hover:text-[#f5d47a] transition-colors flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Panel Admin
            </button>
          )}
        </div>

        {/* 🟡 Logo central */}
        <Link to="/" className="flex flex-col items-center -mt-1">
          <img
            src={logo}
            alt="Lilianno Joyería"
            className="w-10 md:w-12 hover:scale-105 transition-transform duration-300 brightness-110 hover:brightness-125"
          />
        </Link>

        {/* 🔸 Iconos derecha */}
        <div className="flex items-center gap-6 text-[#d4af37]">
          {user ? (
            <>
              <span className="text-xs md:text-sm text-white font-medium">
                {user.nombre} ({user.rol})
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="hover:text-red-500 transition transform hover:scale-110"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hover:text-white transition transform hover:scale-110"
              title="Cuenta"
            >
              <User className="w-5 h-5" />
            </Link>
          )}

          <Link
            to="/carrito"
            className="relative hover:text-white transition transform hover:scale-110"
            title="Carrito"
          >
            <ShoppingCart className="w-5 h-5" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#d4af37] text-black text-xs font-bold rounded-full px-1.5 shadow-md">
                {items.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
