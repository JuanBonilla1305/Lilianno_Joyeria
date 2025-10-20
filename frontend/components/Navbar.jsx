import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingCart, LogOut, Shield } from "lucide-react";
import { useCart } from "../src/context/CartContext.jsx";
import { useAuth } from "../src/context/AuthContext.jsx";
import logo from "../src/assets/lilianno.png";

export default function Navbar() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0b0b0b]/95 border-b border-[#d4af37]/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3">
        {/* 🟡 BOTONES IZQUIERDA */}
        <div className="flex items-center gap-5">
          <Link
            to="/catalogo"
            className="px-5 py-2 bg-[#d4af37] text-black font-medium rounded-full hover:bg-[#e5c158] hover:shadow-[0_0_10px_rgba(212,175,55,0.4)] transition"
          >
            Catálogo
          </Link>
          <Link
            to="/personalizar"
            className="px-5 py-2 border border-[#d4af37] text-[#d4af37] font-medium rounded-full hover:bg-[#d4af37]/10 hover:shadow-[0_0_10px_rgba(212,175,55,0.4)] transition"
          >
            Crear
          </Link>

          {/* ✅ SOLO PARA ADMIN */}
          {user?.rol === "admin" && (
            <button
              onClick={() => navigate("/panel")}
              className="px-5 py-2 flex items-center gap-2 bg-[#1a1a1a] border border-[#d4af37]/40 text-[#d4af37] font-medium rounded-full hover:bg-[#d4af37]/10 hover:shadow-[0_0_10px_rgba(212,175,55,0.4)] transition"
            >
              <Shield className="w-4 h-4" />
              Panel Admin
            </button>
          )}
        </div>

        {/* 🟡 LOGO CENTRAL */}
        <div className="flex flex-col items-center justify-center -mt-1">
          <Link to="/" className="flex flex-col items-center">
            <img
              src={logo}
              alt="Lilianno Joyería"
              className="w-10 h-auto md:w-12 hover:scale-105 transition-transform duration-300 brightness-110 hover:brightness-125"
            />
          </Link>
        </div>

        {/* 🟡 ICONOS DERECHA */}
        <div className="flex items-center gap-6 text-[#d4af37]">
          {user ? (
            <>
              {/* Mostrar usuario logueado */}
              <span className="text-sm text-white font-medium">
                {user.nombre} ({user.rol})
              </span>

              {/* Botón logout */}
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

          {/* Carrito */}
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
