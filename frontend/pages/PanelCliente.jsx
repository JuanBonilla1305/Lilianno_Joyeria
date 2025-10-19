import { useEffect, useState } from "react";
import { useAuth } from "../src/context/AuthContext.jsx";
import api from "../src/api.js";
import { Link } from "react-router-dom";

export default function PanelCliente() {
  const { user } = useAuth();
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const res = await api.get("/api/ventas");
        const misCompras = res.data.filter(
          (venta) => venta.cliente === user.email
        );
        setCompras(misCompras);
      } catch (err) {
        console.error("Error al cargar tus compras:", err);
      }
    };
    fetchCompras();
  }, [user]);

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white px-6 pt-28 pb-12">
      <h1 className="text-3xl font-semibold mb-6 text-[#d4af37]">
        Bienvenido, {user.nombre || user.email}
      </h1>

      <div className="bg-[#1a1a1a] border border-[#d4af37]/30 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#d4af37]">
          Tus Compras
        </h2>

        {compras.length === 0 ? (
          <p className="text-zinc-400">Aún no tienes compras registradas.</p>
        ) : (
          <div className="space-y-4">
            {compras.map((c) => (
              <div
                key={c._id}
                className="border border-[#d4af37]/20 rounded-lg p-4 bg-[#0f0f0f]"
              >
                <p className="text-sm text-zinc-400">
                  Fecha: {new Date(c.fecha).toLocaleString()}
                </p>
                <p className="font-semibold text-[#d4af37] mt-2">
                  Total: ${c.total.toLocaleString("es-CO")}
                </p>

                <ul className="list-disc ml-5 mt-2 text-sm text-zinc-300">
                  {c.items.map((i, idx) => (
                    <li key={idx}>
                      {i.nombre} × {i.qty} — $
                      {(i.precio * i.qty).toLocaleString("es-CO")}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <Link
          to="/catalogo"
          className="px-6 py-3 bg-[#d4af37] text-black font-semibold rounded-full hover:bg-[#e8c157] transition"
        >
          Ir al catálogo
        </Link>
      </div>
    </main>
  );
}
