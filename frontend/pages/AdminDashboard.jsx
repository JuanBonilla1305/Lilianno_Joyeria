import { useEffect, useState } from "react";
import api from "../src/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [productos, setProductos] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (rol !== "admin") {
      alert("Acceso denegado: solo para administradores");
      nav("/");
      return;
    }

    api
      .get("http://localhost:3001/api/products")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

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

      <div className="overflow-x-auto bg-[#121212]/80 border border-[#d4af37]/30 rounded-2xl p-6 shadow-[0_0_25px_rgba(212,175,55,0.15)]">
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
                <td className="py-3 px-4">${p.precio.toLocaleString("es-CO")}</td>
                <td className="py-3 px-4">{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
