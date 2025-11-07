import { useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, MessageCircle } from "lucide-react";
import { AuthContext } from "../src/context/AuthContext";

export default function Inicio() {
  const { user } = useContext(AuthContext);
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let w, h;

    function resize() {
      w = (canvas.width = window.innerWidth);
      h = (canvas.height = window.innerHeight);
    }
    resize();
    window.addEventListener("resize", resize);

    // Crear partículas doradas
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.5,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);

      // Fondo base
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(1, "#1a1205");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Reflejo dorado reactivo al mouse
      const glowX = mouse.current.x / w;
      const glowY = mouse.current.y / h;
      const radial = ctx.createRadialGradient(
        glowX * w,
        glowY * h,
        80,
        glowX * w,
        glowY * h,
        600
      );
      radial.addColorStop(0, "rgba(255,215,0,0.25)");
      radial.addColorStop(1, "transparent");
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, w, h);

      // Partículas
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,215,0,${p.alpha})`;
        ctx.shadowColor = "rgba(255,215,0,0.8)";
        ctx.shadowBlur = 10;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      }

      // Rayos dorados
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const offset = (Date.now() / 40 + i * 200) % h;
        ctx.moveTo(0, offset);
        ctx.lineTo(w, offset);
        ctx.strokeStyle = "rgba(255,215,0,0.12)";
        ctx.lineWidth = 2;
        ctx.shadowColor = "rgba(255,215,0,0.5)";
        ctx.shadowBlur = 20;
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    }

    // ✅ Corregido: eliminado el guion que rompía el parser
    function trackMouse(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }

    window.addEventListener("mousemove", trackMouse);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", trackMouse);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden text-white font-sans">
      {/* 🌌 Fondo Canvas Animado con reflejo */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* 💎 HERO PRINCIPAL */}
      <section className="relative z-10 flex flex-col justify-center items-center text-center px-6 py-32 md:py-48">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-6xl md:text-7xl font-extrabold text-[#d4af37] drop-shadow-[0_0_40px_rgba(212,175,55,0.8)] mb-6"
        >
          Lilianno Joyería
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-lg md:text-xl text-zinc-300 max-w-2xl leading-relaxed mb-10"
        >
          Elegancia, exclusividad y diseño hechos a mano. <br />
          Cada joya es una obra de arte creada para brillar contigo 💫
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          {/* Ya no está el botón de "Iniciar sesión con Google" */}
          {user ? (
            <Link
              to="/catalogo"
              className="bg-[#d4af37] text-black px-10 py-4 rounded-full font-semibold text-lg hover:scale-105 hover:bg-[#e8c157] transition-all"
            >
              Ir al catálogo
            </Link>
          ) : (
            <></> // Si el usuario no está logueado, simplemente no mostrar nada
          )}

          <div className="flex gap-4 mt-6 sm:mt-0 justify-center">
            <a
              href="https://www.instagram.com/lilianno_joyeria?igsh=ZTh5bXh1Ymdrdmc3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#d4af37] text-black px-6 py-3 rounded-full font-medium hover:scale-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.6)]"
            >
              <Instagram className="w-5 h-5" /> Instagram
            </a>
            <a
              href="https://wa.me/573243595562"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,255,0,0.4)]"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

      {/* 💍 GALERÍA DESTACADA */}
      <section className="relative z-10 py-24 px-6 md:px-16 bg-[#0b0b0b]/80 text-center backdrop-blur-md">
        <h2 className="text-3xl md:text-5xl font-semibold text-[#d4af37] mb-16 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          Nuestras Creaciones Destacadas
        </h2>

        <div className="flex flex-wrap justify-center gap-10 max-w-7xl mx-auto">
          {[
            "https://res.cloudinary.com/dmbknclbp/image/upload/v1760912274/Manilla_Amarilla_uosuyl.jpg",
            "https://res.cloudinary.com/dmbknclbp/image/upload/v1760912274/Manilla_Roja_ca4jh0.jpg",
            "https://res.cloudinary.com/dmbknclbp/image/upload/v1760912274/Manilla_mtmts3.jpg",
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group relative w-[320px] h-[320px] rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:shadow-[0_0_45px_rgba(212,175,55,0.6)] transition-all duration-500"
            >
              <motion.img
                src={img}
                alt={`Joya ${i + 1}`}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[1200ms]"
                whileHover={{ rotate: 1.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end justify-center">
                <p className="text-[#d4af37] font-semibold text-lg mb-6">
                  Ver detalles ✨
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
