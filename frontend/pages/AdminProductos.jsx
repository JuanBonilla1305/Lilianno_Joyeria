import { useEffect, useState } from "react";
import api from "../src/api.js";
import { Plus, Edit3, Trash2, Upload, Home, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const empty = { nombre: "", descripcion: "", precio: 0, imagen: "", stock: 0 };

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Cargar productos al iniciar
  const load = async () => {
    try {
      const { data } = await api.get("/api/products");
      setProductos(data);
    } catch (err) {
      console.error("❌ Error cargando productos:", err);
      setMsg("Error al cargar los productos");
    }
  };

  useEffect(() => {
    load();
  }, []);

  // 🔹 Subir imagen a Cloudinary
  const uploadImage = async (file) => {
    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME || "dmbkxnlbp";
    const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET || "productos_upload";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Error al subir imagen (${res.statusText})`);
    }

    const data = await res.json();
    return data.secure_url;
  };

  // 🔹 Guardar / editar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      let imagenUrl = form.imagen;

      // ✅ Subida de imagen (solo si hay nuevo archivo)
      if (file) {
        imagenUrl = await uploadImage(file);
      }

      const dataToSend = { ...form, imagen: imagenUrl };

      if (editId) {
        await api.put(`/api/products/${editId}`, dataToSend);
        setMsg("✅ Producto actualizado correctamente");
      } else {
        await api.post("/api/products", dataToSend);
        setMsg("✅ Producto creado correctamente");
      }

      setForm(empty);
      setFile(null);
      setEditId(null);
      load();
    } catch (err) {
      console.error("❌ Error guardando el producto:", err);
      setMsg("Error al guardar el producto. Revisa Cloudinary o la API.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Eliminar producto
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await api.delete(`/api/products/${id}`);
      setMsg("🗑️ Producto eliminado");
      load();
    } catch (err) {
      console.error("❌ Error eliminando producto:", err);
      setMsg("Error al eliminar el producto");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white p-8">
      {/* 🔹 ENCABEZADO */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-[#d4af37]">
          Administrar Catálogo
        </h1>

        <div className="flex gap-3">
          {/* 🔙 Botón volver al panel */}
          <button
            onClick={() => navigate("/panel")}
            className="flex items-center gap-2 bg-[#1a1a1a] text-[#d4af37] px-4 py-2 rounded-full border border-[#d4af37]/40 hover:bg-[#d4af37]/10 transition"
          >
            <Home className="w-4 h-4" /> Panel principal
          </button>

          {/* ➕ Botón nuevo producto */}
          <button
            onClick={() => {
              setForm(empty);
              setEditId(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 bg-[#d4af37] text-black px-4 py-2 rounded-full hover:bg-[#e5c158] font-semibold transition"
          >
            <Plus className="w-4 h-4" /> Nueva joya
          </button>
        </div>
      </div>

      {/* 🔹 FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#111] p-6 rounded-2xl border border-[#d4af37]/40 mb-8 grid md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          className="p-2 rounded bg-[#1a1a1a] border border-[#d4af37]/40"
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
          className="p-2 rounded bg-[#1a1a1a] border border-[#d4af37]/40"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="p-2 rounded bg-[#1a1a1a] border border-[#d4af37]/40"
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          className="p-2 rounded bg-[#1a1a1a] border border-[#d4af37]/40 md:col-span-2"
        />

        {/* Subida de imagen */}
        <div className="md:col-span-2 flex items-center gap-3">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-sm text-gray-400"
          />
          <Upload className="w-5 h-5 text-[#d4af37]" />
        </div>

        {/* Vista previa */}
        {file && (
          <div className="md:col-span-2 flex justify-center">
            <img
              src={URL.createObjectURL(file)}
              alt="Vista previa"
              className="w-32 h-32 object-cover rounded-lg border border-[#d4af37]/40"
            />
          </div>
        )}

        {/* Botones */}
        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 bg-[#d4af37] text-black rounded-full hover:bg-[#e5c158] font-semibold disabled:opacity-60"
          >
            {loading
              ? "Guardando..."
              : editId
              ? "Guardar cambios"
              : "Registrar joya"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setForm(empty);
                setEditId(null);
              }}
              className="flex-1 py-2 border border-[#d4af37]/40 rounded-full hover:bg-[#1a1a1a]"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Mensaje */}
      {msg && (
        <p className="text-center text-[#d4af37] mb-4 font-medium">{msg}</p>
      )}

      {/* 🔹 TABLA DE PRODUCTOS */}
      <div className="overflow-x-auto bg-[#111] rounded-2xl border border-[#d4af37]/40">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0f0f0f] text-[#d4af37]">
              <th className="p-3 text-left">Imagen</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Precio</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p._id} className="border-t border-[#d4af37]/20">
                <td className="p-3">
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
                <td className="p-3">{p.nombre}</td>
                <td className="p-3">${p.precio}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => {
                      setForm(p);
                      setEditId(p._id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-[#d4af37] flex items-center gap-1 hover:underline"
                  >
                    <Edit3 className="w-4 h-4" /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-500 flex items-center gap-1 hover:underline"
                  >
                    <Trash2 className="w-4 h-4" /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-400 py-4 italic">
                  No hay productos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
