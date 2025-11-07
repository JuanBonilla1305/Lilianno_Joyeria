import { useNavigate } from "react-router-dom";
import { FileSpreadsheet, ShoppingBag, DollarSign, TrendingUp, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PanelAdmin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    ventas: 0,
    gastos: 0,
    balance: 0,
  });

  console.log("🔥 PANEL ADMIN: Cargando el componente correcto");
  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await axios.get(
          "https://lilianno-joyeria.onrender.com/api/ventas/reporte/resumen"
        );

        // Calculamos balance
        const ventas = data.totalIngresos || 0;
        const gastos = 0; // Si más adelante tienes un modelo de gastos, se actualiza
        const balance = ventas - gastos;

        setStats({
          ventas,
          gastos,
          balance,
        });
      } catch (err) {
        console.error("❌ Error al cargar estadísticas:", err);
      }
    };
    loadStats();
  }, []);

  const formatoCOP = (n) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(n || 0);

  console.log("🔥 PANEL ADMIN CORRECTO CARGANDO, versión de prueba");

  // Función para descargar el reporte de ventas en Excel
  const downloadReporteExcel = () => {
    // Realizamos una solicitud GET para obtener el archivo Excel
    axios({
      url: "https://lilianno-joyeria.onrender.com/api/ventas/reporte/excel", // La ruta para descargar el archivo
      method: "GET",
      responseType: "blob",  // Importante para manejar archivos
    }).then((response) => {
      // Crear un enlace para descargar el archivo Excel
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report_ventas.xlsx");  // Nombre del archivo
      document.body.appendChild(link);
      link.click();
    }).catch((error) => {
      console.error("❌ Error al descargar el reporte Excel:", error);
    });
  };

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
          <p className="text-2xl font-bold mt-2">{formatoCOP(stats.ventas)}</p>
        </div>

        <div className="bg-[#111] border border-[#d4af37]/40 rounded-2xl p-6 text-center hover:border-[#d4af37] transition">
          <CreditCard className="w-8 h-8 mx-auto text-[#d4af37] mb-3" />
          <h3 className="text-[#d4af37] text-lg font-semibold">Gastos Totales</h3>
          <p className="text-2xl font-bold mt-2">{formatoCOP(stats.gastos)}</p>
        </div>

        <div className="bg-[#111] border border-[#d4af37]/40 rounded-2xl p-6 text-center hover:border-[#d4af37] transition">
          <TrendingUp className="w-8 h-8 mx-auto text-[#d4af37] mb-3" />
          <h3 className="text-[#d4af37] text-lg font-semibold">Balance General</h3>
          <p className="text-2xl font-bold mt-2">{formatoCOP(stats.balance)}</p>
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
          onClick={downloadReporteExcel}
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