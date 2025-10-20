import { useNavigate } from "react-router-dom";
import { FileSpreadsheet, ShoppingBag, DollarSign, TrendingUp, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../src/api.js";

export default function PanelAdmin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    ventas: 0,
    gastos: 0,
    balance: 0,
  });

  useEffect(() => {
    // 🔹 Simulación de datos o llamada real al backend
    const loadStats = async () => {
      try {
        // const { data } = await api.get("/api/admin/stats");
        // setStats(data);
        // Por ahora datos simulados
        setStats({
          ventas: 12800000,
          gastos: 4200000,
          balance: 8600000,
        });
      } catch (err) {
        console.error("❌ Error al cargar estadísticas:", err);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col items-center py-16 px-6">
      {/* 🔹 Encabezado */}
      <h1 className="text-4xl font-bold text-[#d4af37] mb-2">
        Panel Administrativo
      </h1>
      <p className="text-gray-400 mb-10 text-center">
        Bienvenido al panel de control. Supervisa tus ventas, genera reportes y actualiza tu catálogo.
      </p>

      {/* 🔹 Tarjetas estadísticas */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full mb-10">
        <div className="bg-[#111] border border-[#d4af37]/40 rounded-2xl p-6 text-center hover:border-[#d4af37] transition">
          <DollarSign className="w-8 h-8 mx-auto text-[#d4af37] mb-3" />
          <h3 className="text-[#d4af37] text-lg font-semibold">Ventas Totales</h3>
          <p className="text-2xl font-bold mt-2">${stats.ventas.toLocaleString("es-CO")}</p>
        </div>

        <div className="bg-[#111] border border-[#d4af37]/40 rounded-2xl p-6 text-center hover:border-[#d4af37] transition">
          <CreditCard className="w-8 h-8 mx-auto text-[#d4af37] mb-3" />
          <h3 className="text-[#d4af37] text-lg font-semibold">Gastos Totales</h3>
          <p className="text-2xl font-bold mt-2">${stats.gastos.toLocaleString("es-CO")}</p>
        </div>

        <div className="bg-[#111] border border-[#d4af37]/40 rounded-2xl p-6 text-center hover:border-[#d4af37] transition">
          <TrendingUp className="w-8 h-8 mx-auto text-[#d4af37] mb-3" />
          <h3 className="text-[#d4af37] text-lg font-semibold">Balance General</h3>
          <p className="text-2xl font-bold mt-2">${stats.balance.toLocaleString("es-CO")}</p>
        </div>
      </div>

      {/* 🔹 Opciones principales */}
      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl w-full">
        {/* Botón editar catálogo */}
        <button
          onClick={() => navigate("/admin/catalogo")}
          className="flex flex-col items-center justify-center gap-3 bg-[#111] border border-[#d4af37]/40 hover:border-[#d4af37] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition rounded-2xl p-8 text-[#d4af37] font-semibold"
        >
          <ShoppingBag className="w-10 h-10" />
          <span className="text-lg">Editar Catálogo</span>
          <p className="text-xs text-gray-400 text-center mt-1">
            Agrega, edita o elimina joyas del catálogo.
          </p>
        </button>

        {/* Botón generar reportes */}
        <button
          onClick={() => navigate("/admin/reportes")}
          className="flex flex-col items-center justify-center gap-3 bg-[#111] border border-[#d4af37]/40 hover:border-[#d4af37] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition rounded-2xl p-8 text-[#d4af37] font-semibold"
        >
          <FileSpreadsheet className="w-10 h-10" />
          <span className="text-lg">Generar Reporte</span>
          <p className="text-xs text-gray-400 text-center mt-1">
            Exporta reportes en formato PDF o Excel.
          </p>
        </button>
      </div>

      {/* 🔹 Pie de página */}
      <footer className="mt-16 text-sm text-gray-500 text-center">
        © 2025 Lilianno Joyería · Hecho con amor y brillo ✨
      </footer>
    </div>
  );
}
