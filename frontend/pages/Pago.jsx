import { useEffect, useState } from "react";
import { useCart } from "../src/context/CartContext.jsx";
import api from "../src/api.js";
import { CheckCircle2, CreditCard, Wallet, Landmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const currency = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);

export default function Pago() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [metodo, setMetodo] = useState("tarjeta");
  const [procesando, setProcesando] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Checkout | Lilianno Joyería";
  }, []);

  const handlePagar = async () => {
    if (items.length === 0) return;
    setProcesando(true);
    setError("");

    try {
      const venta = {
        items: items.map((it) => ({
          productoId: it._id ?? it.id,
          nombre: it.nombre,
          precio: it.precio,
          cantidad: it.qty,
          imagen: it.imagen || "",
          subtotal: it.precio * it.qty,
        })),
        total: subtotal,
        metodo_pago: metodo,
        estado: "pagada",
      };

      await api.post("/api/ventas", venta); // 👈 POST al backend
      setOk(true);
      clearCart();
      setTimeout(() => navigate("/"), 1800);
    } catch (e) {
      console.error(e);
      setError("No se pudo registrar la venta. Intenta de nuevo.");
    } finally {
      setProcesando(false);
    }
  };

  if (items.length === 0 && !ok) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#0b0b0b] text-white">
        <div className="text-center">
          <p className="mb-4">Tu carrito está vacío.</p>
          <button
            onClick={() => navigate("/catalogo")}
            className="px-5 py-2 rounded-full bg-[#d4af37] text-black font-semibold"
          >
            Ver catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white py-16 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Resumen */}
        <section className="md:col-span-2 bg-[#111] rounded-2xl border border-[#d4af37]/30 p-5">
          <h2 className="text-xl font-semibold mb-4">Resumen de compra</h2>
          <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
            {items.map((it) => (
              <div key={it._id ?? it.id} className="flex items-center gap-3 border border-[#d4af37]/20 rounded-xl p-3 bg-[#0f0f0f]">
                <img
                  src={it.imagen || "/placeholder-jewel.jpg"}
                  onError={(e) => (e.currentTarget.src = "/placeholder-jewel.jpg")}
                  alt={it.nombre}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium">{it.nombre}</p>
                  <p className="text-sm text-zinc-300">{it.qty} x {currency(it.precio)}</p>
                </div>
                <div className="font-semibold text-[#d4af37]">
                  {currency(it.qty * it.precio)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pago */}
        <section className="bg-[#111] rounded-2xl border border-[#d4af37]/30 p-5 h-fit">
          <h3 className="text-lg font-semibold mb-3">Método de pago</h3>
          <div className="space-y-2">
            <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer ${metodo === "tarjeta" ? "border-[#d4af37] bg-[#171717]" : "border-[#d4af37]/20"}`}>
              <input type="radio" name="mp" checked={metodo === "tarjeta"} onChange={() => setMetodo("tarjeta")} />
              <CreditCard className="w-4 h-4 text-[#d4af37]" />
              Tarjeta (simulado)
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer ${metodo === "pse" ? "border-[#d4af37] bg-[#171717]" : "border-[#d4af37]/20"}`}>
              <input type="radio" name="mp" checked={metodo === "pse"} onChange={() => setMetodo("pse")} />
              <Landmark className="w-4 h-4 text-[#d4af37]" />
              PSE (simulado)
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer ${metodo === "contraentrega" ? "border-[#d4af37] bg-[#171717]" : "border-[#d4af37]/20"}`}>
              <input type="radio" name="mp" checked={metodo === "contraentrega"} onChange={() => setMetodo("contraentrega")} />
              <Wallet className="w-4 h-4 text-[#d4af37]" />
              Contraentrega
            </label>
          </div>

          <div className="border-t border-[#d4af37]/20 mt-4 pt-3">
            <div className="flex justify-between text-zinc-300 mb-2">
              <span>Subtotal</span>
              <span className="font-semibold text-white">{currency(subtotal)}</span>
            </div>

            {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

            {!ok ? (
              <button
                onClick={handlePagar}
                disabled={procesando}
                className="w-full py-2 rounded-full bg-[#d4af37] text-black font-semibold hover:opacity-90 disabled:opacity-50"
              >
                {procesando ? "Procesando..." : "Pagar (demo)"}
              </button>
            ) : (
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <p className="mt-2">¡Pago confirmado! Gracias por tu compra.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
