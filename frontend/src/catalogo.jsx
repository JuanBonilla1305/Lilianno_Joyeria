import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../src/api";
import { useCart } from "../src/context/CartContext.jsx";
import ToastCenter from "../components/ToastCenter.jsx";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data } = await api.get("/api/products");
        setProductos(data);
      } catch (e) {
        console.error("Error cargando productos:", e);
      }
    };
    fetchProductos();
  }, []);

  const handleAddToCart = (producto) => {
    addItem(producto);
    setMensaje("✨ Producto añadido al carrito");
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1200] text-white py-20 px-8">
      {/* Título */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-4xl font-bold mb-10"
      >
        <span className="text-[#d4af37]">Colección</span> Lilianno
      </motion.h1>

      {/* Grid de productos */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto"
      >
        {productos.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-[#111]/80 border border-[#d4af37]/20 rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(212,175,55,0.15)] hover:shadow-[0_0_40px_rgba(212,175,55,0.25)] transition-all duration-300 flex flex-col"
          >
            {/* Imagen */}
            <div className="relative">
              <img
                src={p.imagen || "/placeholder-jewel.jpg"}
                alt={p.nombre}
                className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 bg-[#d4af37] text-black text-xs px-3 py-1 rounded-full shadow">
                {p.stock > 0 ? "Disponible" : "Agotado"}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between flex-grow p-5">
              <div>
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{p.nombre}</h3>
                <p className="text-sm text-zinc-400 line-clamp-2">{p.descripcion}</p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-[#d4af37] font-semibold">
                  ${p.precio?.toLocaleString("es-CO")}
                </span>
                <button
                  onClick={() => handleAddToCart(p)}
                  disabled={p.stock <= 0}
                  className="bg-[#d4af37] text-black font-semibold px-4 py-2 rounded-full hover:bg-[#e8c157] transition disabled:bg-gray-500"
                >
                  Añadir
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <ToastCenter mensaje={mensaje} />
    </div>
  );
}
