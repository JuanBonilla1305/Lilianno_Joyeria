import { ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "../src/context/CartContext.jsx";
import { Link } from "react-router-dom";
import Carrito from "../pages/Carrito.jsx";
import { useAuth } from "../src/context/AuthContext.jsx";

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((total, item) => total + item.qty, 0);
  const [abierto, setAbierto] = useState(false);
  const { user, logout, isAdmin } = useAuth();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0b0b0b]/95 backdrop-blur-md shadow-[0_2px_15px_rgba(212,175,55,0.25)] border-b border-[#d4af37]/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-4 text-white">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-semibold tracking-wide hover:text-[#e8c157] transition"
          >
            <span className="text-[#d4af37]">Lilianno</span> Joyería
          </Link>

          {/* Navegación */}
          <ul className="flex items-center space-x-8 font-medium">
            {[
              { name: "Inicio", path: "/" },
              { name: "Catálogo", path: "/catalogo" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="px-5 py-2 rounded-full bg-transparent border border-transparent hover:border-[#d4af37] hover:text-[#d4af37] transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* 🛒 Carrito */}
            <li>
              <button
                onClick={() => setAbierto(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#d4af37] font-semibold 
                           hover:bg-[#d4af37] hover:text-black hover:shadow-[0_0_10px_rgba(212,175,55,0.4)] transition relative"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-3 bg-[#d4af37] text-black font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md">
                      {count}
                    </span>
                  )}
                </div>
                <span>Carrito</span>
              </button>
            </li>

            {/* 🔐 Login o Usuario */}
            {!user ? (
              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#d4af37] text-black font-semibold border border-[#d4af37]/40 
                             hover:bg-transparent hover:text-[#d4af37] hover:border-[#d4af37] hover:shadow-[0_0_10px_rgba(212,175,55,0.4)] transition"
                >
                  <User className="w-5 h-5" />
                  Login
                </Link>
              </li>
            ) : (
              <li className="relative group">
                <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10 transition">
                  <User className="w-5 h-5" />
                  {user.nombre || user.email || "Usuario"}
                </button>

                {/* Menú desplegable */}
                <div className="absolute right-0 mt-3 w-52 bg-[#111]/95 backdrop-blur-md border border-[#d4af37]/40 rounded-2xl shadow-[0_8px_20px_rgba(212,175,55,0.15)] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
                  <div className="py-2 text-sm">
                    <p className="px-5 py-2 text-[#d4af37] border-b border-[#d4af37]/20">
                      {isAdmin ? "Administrador" : "Cliente"}
                    </p>

                    {isAdmin ? (
                      <Link to="/admin" className="block px-5 py-2 hover:bg-[#d4af37]/10 transition">
                        Panel Admin
                      </Link>
                    ) : (
                      <Link to="/panel-cliente" className="block px-5 py-2 hover:bg-[#d4af37]/10 transition">
                        Mi Panel
                      </Link>
                    )}

                    <Link to="/catalogo" className="block px-5 py-2 hover:bg-[#d4af37]/10 transition">
                      Catálogo
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full text-left px-5 py-2 text-red-400 hover:bg-[#d4af37]/10 transition"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Panel del carrito */}
      <Carrito abierto={abierto} onClose={() => setAbierto(false)} productos={items} />
    </>
  );
}
