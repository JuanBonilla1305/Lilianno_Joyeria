// src/pages/Carrito.jsx
import { X, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "../src/context/CartContext.jsx";
import { Link } from "react-router-dom";

const currency = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);

export default function Carrito({ abierto, onClose }) {
  const { items, updateQty, removeItem, clearCart, subtotal } = useCart();

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 bg-[#0b0b0b] text-white border-b border-[#d4af37]/40 transition-all duration-300 shadow-[0_8px_20px_rgba(212,175,55,0.15)] ${
        abierto ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#d4af37]/20">
        <h3 className="text-lg font-semibold text-[#d4af37]">🛒 Tu carrito</h3>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto px-6 py-4 space-y-4">
        {items.length === 0 ? (
          <p className="text-center text-zinc-300">Tu carrito está vacío.</p>
        ) : (
          items.map((it) => {
            const id = it._id ?? it.id;
            return (
              <div
                key={id}
                className="flex gap-3 border border-[#d4af37]/20 rounded-xl p-3 bg-[#111]"
              >
                <img
                  src={it.imagen || "/placeholder-jewel.jpg"}
                  onError={(e) => (e.currentTarget.src = "/placeholder-jewel.jpg")}
                  alt={it.nombre}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold leading-5">{it.nombre}</h4>
                  <p className="text-[#d4af37] font-bold mt-1">{currency(it.precio)}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="p-1 rounded border border-[#d4af37]/40"
                      onClick={() => updateQty(id, it.qty - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center">{it.qty}</span>
                    <button
                      className="p-1 rounded border border-[#d4af37]/40"
                      onClick={() => updateQty(id, it.qty + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    <button
                      className="ml-auto p-2 rounded hover:bg-red-600/20 text-red-400"
                      onClick={() => removeItem(id)}
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {items.length > 0 && (
        <div className="border-t border-[#d4af37]/20 px-6 py-4 space-y-3 bg-[#0e0e0e]">
          <div className="flex justify-between text-zinc-300">
            <span>Subtotal</span>
            <span className="font-semibold text-white">
              {currency(subtotal)}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={clearCart}
              className="flex-1 py-2 rounded-full border border-[#d4af37]/40 text-zinc-200 hover:bg-white/5"
            >
              Vaciar
            </button>

            <Link
              to="/checkout"
              className="flex-1 text-center py-2 rounded-full bg-[#d4af37] text-black font-semibold hover:opacity-90"
              onClick={onClose}
            >
              Ir a pagar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
