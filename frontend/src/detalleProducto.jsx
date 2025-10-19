import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/products/${id}`);
        setProducto(res.data);
      } catch (error) {
        console.error("Error al obtener producto:", error);
      }
    };
    obtenerProducto();
  }, [id]);

  if (!producto) return <div className="text-center mt-10">Cargando producto...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full md:w-1/2 h-auto rounded-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-yellow-800 mb-3">{producto.nombre}</h1>
          <p className="text-gray-700 mb-3">{producto.descripcion}</p>
          <p className="text-gray-800 font-bold text-lg mb-2">
            Precio: ${producto.precio.toLocaleString("es-CO")}
          </p>
          <p className="text-gray-600 mb-1">Material: {producto.material}</p>
          <p className="text-gray-600 mb-1">Color: {producto.color}</p>
          <p className="text-gray-600 mb-1">Peso: {producto.peso} g</p>
          <p className="text-gray-600 mb-1">Stock disponible: {producto.stock}</p>
        </div>
      </div>
    </div>
  );
}
