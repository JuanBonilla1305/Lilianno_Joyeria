import { useEffect, useState } from "react";
import api from "../src/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [resumen, setResumen] = useState({ totalVentas: 0, totalIngresos: 0 });
  const nav = useNavigate();

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (rol !== "admin") {
      alert("Acceso denegado: solo para administradores");
      nav("/");
      return;
    }

    // Cargar productos
    api
      .get("https://lilianno-joyeria.onrender.com/api/products")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al cargar productos:", err));

    // Cargar ventas/pedidos
    api
      .get("https://lilianno-joyeria.onrender.com/api/ventas")
      .then((res) => setVentas(res.data))
      .catch((err) => console.error("Error al cargar ventas:", err));

    // Cargar resumen (balance general)
    api
      .get("https://lilianno-joyeria.onrender.com/api/ventas/reporte/resumen")
      .then((res) => {
        console.log("Resumen cargado:", res.data);
        setResumen(res.data);
      })
      .catch((err) => console.error("Error al cargar resumen:", err));
  }, []);

  const formatoCOP = (n) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(n || 0);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] text-white px-8 py-12">
      <h1 className="text-4xl font-serif text-[#d4af37] text-center mb-12 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
        Panel de Administración
      </h1>

      <div className="flex justify-end mb-8">
        <button
          onClick={() => {
            localStorage.clear();
            nav("/login");
          }}
          className="bg-[#d4af37] text-black font-semibold py-2 px-6 rounded-full hover:bg-[#e8c157] transition"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* 🔸 RESUMEN GENERAL */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[#121212]/80 border border-[#d4af37]/30 rounded-2xl p-6 shadow-[0_0_25px_rgba(212,175,55,0.15)] text-center">
          <h2 className="text-xl text-[#d4af37] font-semibold mb-2">
            Ventas Registradas
          </h2>
          <p className="text-4xl font-bold">{resumen.totalVentas || 0}</p>
        </div>
        <div className="bg-[#121212]/80 border border-[#d4af37]/30 rounded-2xl p-6 shadow-[0_0_25px_rgba(212,175,55,0.15)] text-center">
          <h2 className="text-xl text-[#d4af37] font-semibold mb-2">
            Ingresos Totales
          </h2>
          <p className="text-4xl font-bold">
            {formatoCOP(resumen.totalIngresos || 0)}
          </p>
        </div>
      </div>

      {/* 💎 PRODUCTOS */}
      <div className="overflow-x-auto bg-[#121212]/80 border border-[#d4af37]/30 rounded-2xl p-6 shadow-[0_0_25px_rgba(212,175,55,0.15)] mb-12">
        <h2 className="text-2xl text-[#d4af37] mb-4 font-semibold">Productos</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#d4af37]/30 text-[#d4af37]">
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-4">Descripción</th>
              <th className="py-3 px-4">Precio</th>
              <th className="py-3 px-4">Stock</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr
                key={p._id}
                className="border-b border-gray-700 hover:bg-[#1e1e1e] transition"
              >
                <td className="py-3 px-4">{p.nombre}</td>
                <td className="py-3 px-4 text-gray-400">{p.descripcion}</td>
                <td className="py-3 px-4">{formatoCOP(p.precio)}</td>
                <td className="py-3 px-4">{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🧾 VENTAS / PEDIDOS */}
      <div className="overflow-x-auto bg-[#121212]/80 border border-[#d4af37]/30 rounded-2xl p-6 shadow-[0_0_25px_rgba(212,175,55,0.15)]">
        <h2 className="text-2xl text-[#d4af37] mb-4 font-semibold">
          Pedidos Registrados
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#d4af37]/30 text-[#d4af37]">
              <th className="py-3 px-4">Fecha</th>
              <th className="py-3 px-4">Productos</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Notas</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length > 0 ? (
              ventas.map((v) => (
                <tr
                  key={v._id}
                  className="border-b border-gray-700 hover:bg-[#1e1e1e] transition"
                >
                  <td className="py-3 px-4">
                    {new Date(v.fecha).toLocaleDateString("es-CO")}
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {v.productos
                      .map((p) => `${p.nombre} x${p.cantidad}`)
                      .join(", ")}
                  </td>
                  <td className="py-3 px-4">{formatoCOP(v.total)}</td>
                  <td className="py-3 px-4">{v.notas || "Sin notas"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-400 py-6 italic"
                >
                  No hay ventas registradas todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
