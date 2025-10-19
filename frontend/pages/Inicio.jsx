import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Inicio() {
  return (
    <main className="bg-transparent min-h-screen text-white flex flex-col items-center justify-center px-6 pt-32">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold mb-4 text-center"
      >
        Lilianno <span className="text-[#d4af37]">Joyas</span> ✨
      </motion.h1>

      <p className="text-[#cfcfcf] text-center max-w-2xl mb-10">
        Descubre la elegancia de nuestras piezas únicas hechas a mano, con
        diseños modernos y materiales de la más alta calidad.
      </p>

      <div className="flex gap-4">
        <Link
          to="/catalogo"
          className="bg-[#d4af37] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#e8c157] transition"
        >
          Ver Catálogo
        </Link>
        <Link
          to="/personalizar"
          className="border border-[#d4af37] text-[#d4af37] font-semibold px-6 py-3 rounded-full hover:bg-[#d4af37]/10 transition"
        >
          Personalizar Joya
        </Link>
      </div>
    </main>
  );
}
