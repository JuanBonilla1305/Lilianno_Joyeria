// src/pages/PanelCliente.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../src/context/AuthContext.jsx";
import api from "../src/api.js";
import { motion } from "framer-motion";

export default function PanelCliente() {
  const { user } = useContext(AuthContext);
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    if (user) {
      api
        .get(`/api/compras/${user.id}`)
        .then((res) => setCompras(res.data))
        .catch((err) => console.error("Error al obtener compras:", err));
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b0b] to-[#1a1205] text-white p-8">
      <h1 className="text-3xl font-semibold text-[#d4af37] mb-6 text-center">
        Mis Compras
      </h1>

      {compras.length === 0 ? (
        <p className="text-center text-gray-400">
          Aún no has realizado compras.
        </p>
      ) : (
        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {compras.map((compra, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111] border border-[#d4af37]/40 rounded-xl p-4 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition"
            >
              <p className="text-[#e5c158] font-medium mb-1">
                Pedido #{compra._id.slice(-5)}
              </p>
              <p className="text-sm text-gray-300 mb-2">
                Fecha: {new Date(compra.fecha).toLocaleDateString()}
              </p>
              <p className="text-gray-400 text-sm mb-3">
                Total: <span className="text-[#d4af37]">${compra.total}</span>
              </p>
              <ul className="text-sm text-gray-300 list-disc pl-5">
                {compra.productos.map((p, j) => (
                  <li key={j}>{p.nombre}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
