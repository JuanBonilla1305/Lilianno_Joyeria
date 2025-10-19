import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../src/context/CartContext.jsx";

export default function Carrito({ abierto, onClose }) {
  const { items, removeItem, updateQty, total, clear } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {abierto && (
        <>
          {/* Overlay oscuro – hace clic para cerrar */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[70]"
          />

          {/* Panel deslizante */}
          <motion.aside
            key="panel"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#0f0f0f] text-white z-[80] border-l border-[#d4af37]/30 flex flex-col"
          >
            {/* Header */}
            <div className="h-16 px-4 flex items-center justify-between border-b border-[#d4af37]/20">
              <h2 className="text-lg font-semibold">Tu carrito</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-white/5"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido scrollable */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <p className="text-sm text-zinc-400">
                  Aún no hay productos en tu carrito.
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 border border-[#d4af37]/20 rounded-lg p-3"
                  >
                    <img
                      src={item.imagen || "https://placehold.co/64x64?text=Joya"}
                      alt={item.nombre}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.nombre}</p>
                      <p className="text-sm text-zinc-400">
                        ${item.precio.toLocaleString("es-CO")}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          className="px-2 border border-zinc-700 rounded hover:bg-white/5"
                          onClick={() => updateQty(item._id, item.qty - 1)}
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center text-sm">
                          {item.qty}
                        </span>
                        <button
                          className="px-2 border border-zinc-700 rounded hover:bg-white/5"
                          onClick={() => updateQty(item._id, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-400 text-sm hover:text-red-300"
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer fijo con total + acciones */}
            <div className="border-t border-[#d4af37]/20 p-4 bg-[#0f0f0f]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">Total</span>
                <span className="text-lg font-bold text-[#d4af37]">
                  ${total.toLocaleString("es-CO")}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 py-2 rounded-lg border border-zinc-700 text-sm hover:bg-white/5"
                  onClick={clear}
                  disabled={items.length === 0}
                >
                  Vaciar
                </button>
                <button
                  className="flex-1 py-2 rounded-lg bg-[#d4af37] text-black font-semibold text-sm hover:opacity-90 disabled:opacity-60"
                  onClick={() => {
                    onClose?.();
                    navigate("/checkout");
                  }}
                  disabled={items.length === 0}
                >
                  Ir a pagar
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
