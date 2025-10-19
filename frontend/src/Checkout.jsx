import { useCart } from "./context/CartContext.jsx";
import api from "./api.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleComprar = async () => {
    if (!nombre && !email) {
      alert("Por favor, ingresa tu nombre o correo.");
      return;
    }

    try {
      setLoading(true);

      // Estructura de venta que el backend espera
      const payload = {
        cliente: email || nombre || "Cliente anónimo",
        items: items.map((i) => ({
          productoId: i._id,
          nombre: i.nombre,
          precio: i.precio,
          qty: i.qty,
          imagen: i.imagen,
        })),
        total,
      };

      const res = await api.post("/api/ventas", payload);
      console.log("✅ Venta registrada:", res.data);

      clear(); // vacía el carrito
      alert("Compra realizada con éxito 💎");
      navigate("/"); // vuelve al inicio
    } catch (err) {
      console.error("❌ Error al registrar la venta:", err);
      alert("Ocurrió un error al procesar la compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white px-6 py-24">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Confirmar <span className="text-[#d4af37]">Compra</span>
      </h1>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Datos del cliente */}
        <div className="bg-[#1a1a1a] border border-[#d4af37]/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">
            Datos del cliente
          </h2>
          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-3 mb-3 bg-transparent border border-[#d4af37]/40 rounded-lg text-white placeholder-gray-400 focus:border-[#d4af37] outline-none"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-3 mb-3 bg-transparent border border-[#d4af37]/40 rounded-lg text-white placeholder-gray-400 focus:border-[#d4af37] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Resumen de compra */}
        <div className="bg-[#1a1a1a] border border-[#d4af37]/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">
            Resumen de la compra
          </h2>

          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-sm border-b border-[#d4af37]/20 pb-2"
              >
                <span>
                  {item.nombre} × {item.qty}
                </span>
                <span>${(item.precio * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 text-lg font-semibold">
            <span>Total:</span>
            <span className="text-[#d4af37]">
              ${total.toLocaleString("es-CO")}
            </span>
          </div>

          <button
            onClick={handleComprar}
            disabled={loading || !items.length}
            className="w-full mt-6 py-3 rounded-full bg-[#d4af37] text-black font-semibold hover:bg-[#e8c157] transition disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Confirmar compra"}
          </button>
        </div>
      </div>
    </main>
  );
}
