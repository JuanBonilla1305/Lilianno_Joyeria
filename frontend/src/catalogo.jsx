// src/catalogo.jsx
import { useEffect, useState } from "react";
import api from "./api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "./context/CartContext.jsx"; // 👈 importamos el contexto

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart(); // 👈 obtenemos la función addItem del carrito

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => {
        console.log("✅ Productos recibidos:", res.data);
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setProductos(data);
      })
      .catch((err) => {
        console.error("❌ Error al cargar productos:", err);
        setError("Error al cargar los productos.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f0f0f] text-gray-300 text-xl">
        Cargando catálogo...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f0f0f] text-red-400 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white py-20 px-8">
      <h2 className="text-5xl text-center font-semibold mb-16">
        Nuestro <span className="text-[#D4AF37]">Catálogo</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {productos.map((prod) => (
          <motion.div
            key={prod._id}
            whileHover={{ scale: 1.05 }}
            className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg border border-[#D4AF37]/40"
          >
            <img
              src={prod.imagen || "https://via.placeholder.com/300x300?text=Sin+Imagen"}
              alt={prod.nombre}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/300x300?text=Sin+Imagen")
              }
              className="w-full h-64 object-cover"
            />

            <div className="p-5 text-center">
              <h3 className="text-xl font-medium mb-2">{prod.nombre}</h3>
              <p className="text-[#D4AF37] font-semibold mb-3">
                ${prod.precio?.toLocaleString("es-CO")}
              </p>
              <p className="text-gray-400 text-sm mb-3">{prod.descripcion}</p>

              <div className="flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => addItem(prod, 1)} // 👈 aquí agregas al carrito
                  className="bg-[#D4AF37] text-black px-5 py-2 rounded-full font-medium hover:bg-[#b6912e] transition"
                >
                  Añadir al carrito
                </motion.button>

                <Link to={`/producto/${prod._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="border border-[#D4AF37] text-[#D4AF37] px-5 py-2 rounded-full font-medium hover:bg-[#b6912e]/10 transition"
                  >
                    Ver Detalle
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
