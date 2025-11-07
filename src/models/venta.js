import mongoose from "mongoose";

// Esquema de los elementos en la venta
const ItemSchema = new mongoose.Schema(
  {
    productoId: { type: String, required: true },
    nombre:     { type: String, required: true },
    precio:     { type: Number, required: true, min: 0 },
    cantidad:   { type: Number, required: true, min: 1 },
    imagen:     { type: String, default: "" },
    subtotal:   { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

// Esquema principal de la venta

export const crearPedido = async (req, res) => {
  try {
    const { items, total, nombre, direccion, telefono } = req.body;

    // Asegurarte de que req.user esté disponible, lo que indica que el usuario está autenticado
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "Usuario no autenticado" });
    }

    const nuevaVenta = new Venta({
      usuarioId: req.user._id, // Asignar el usuarioId del usuario autenticado
      items: items.map((p) => ({
        productId: p._id || p.id,
        nombre: p.nombre,
        precioUnit: p.precio,
        cantidad: p.qty,
        imagen: p.imagen || "",
        subtotal: p.precio * p.qty,
      })),
      total,
      metodo_pago: "whatsapp", // Se podría actualizar si decides agregar métodos de pago diferentes
      estado: "pendiente",
      notas: `Pedido por WhatsApp de ${nombre} - ${direccion} - ${telefono}`,
    });

    await nuevaVenta.save();
    res.status(201).json({ message: "Pedido registrado correctamente", nuevaVenta });
  } catch (error) {
    console.error("❌ Error al registrar pedido:", error);
    res.status(500).json({ message: "Error al registrar pedido" });
  }
};
// Modelo de la venta
export default mongoose.models.Venta || mongoose.model("Venta", VentaSchema);
