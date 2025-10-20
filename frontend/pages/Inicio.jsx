import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, MessageCircle } from "lucide-react";

export default function Inicio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b0b] to-[#1a1205] text-white overflow-hidden relative">
      {/* 🖼 HERO SECTION */}
<section
  className="relative flex flex-col justify-center items-center text-center px-6 py-32 md:py-48"
  style={{
    backgroundImage:
      "url('https://res.cloudinary.com/demo/image/upload/v1729521259/jewelry_background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="relative z-10 max-w-3xl flex flex-col items-center"
  >
    {/* TÍTULO CENTRAL */}
    <h1 className="text-5xl md:text-6xl font-semibold text-[#d4af37] mb-4 drop-shadow-lg">
      Lilianno Joyería
    </h1>

    {/* DESCRIPCIÓN CENTRAL */}
    <p className="text-lg md:text-xl text-zinc-200 mb-10 leading-relaxed max-w-2xl">
      Elegancia, exclusividad y diseño hechos a mano.<br />
      Cada joya es una obra de arte creada para brillar contigo 💫
    </p>

    {/* REDES SOCIALES */}
    <div className="flex justify-center gap-6">
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#d4af37] text-black px-6 py-3 rounded-full font-medium hover:bg-[#e8c157] hover:shadow-[0_0_15px_rgba(212,175,55,0.6)] transition"
      >
        <Instagram className="w-5 h-5" /> Instagram
      </a>

      <a
        href="https://wa.me/573001234567"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-400 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition"
      >
        <MessageCircle className="w-5 h-5" /> WhatsApp
      </a>
    </div>
  </motion.div>
</section>


     {/* 💍 GALERÍA DESTACADA */}
<section className="py-20 px-6 md:px-16 bg-[#0b0b0b] text-center">
  <h2 className="text-3xl md:text-4xl font-semibold text-[#d4af37] mb-12">
    Nuestras Creaciones Destacadas
  </h2>

  <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
    {[
      "https://res.cloudinary.com/dmbknclbp/image/upload/v1760912274/Manilla_Amarilla_uosuyl.jpg",
      "https://res.cloudinary.com/dmbknclbp/image/upload/v1760912274/Manilla_Roja_ca4jh0.jpg",
      "https://res.cloudinary.com/dmbknclbp/image/upload/v1760912274/Manilla_mtmts3.jpg",
    ].map((img, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.2 }}
        viewport={{ once: true }}
        className="w-[320px] h-[320px] rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all duration-300"
      >
        <img
          src={img}
          alt={`Joya ${i + 1}`}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>
    ))}
  </div>
</section>

      {/* 🌐 REDES SOCIALES */}
      <footer className="absolute bottom-6 right-6 flex flex-col items-end gap-4 z-50">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#d4af37] text-black px-4 py-2 rounded-full font-medium hover:bg-[#e8c157] transition"
        >
          <Instagram className="w-5 h-5" /> Instagram
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/573001234567"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full font-medium hover:bg-green-400 transition"
        >
          <MessageCircle className="w-5 h-5" /> WhatsApp
        </a>
      </footer>
    </div>
  );
}
