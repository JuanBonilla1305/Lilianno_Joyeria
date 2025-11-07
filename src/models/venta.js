import mongoose from "mongoose";

// Esquema de los elementos de la venta (producto)
const ItemSchema = new mongoose.Schema(
  {
    productoId: { type: String, required: true },
    nombre: { type: String, required: true },
    precioUnit: { type: Number, required: true, min: 0 },
    cantidad: { type: Number, required: true, min: 1 },
    imagen: { type: String, default: "" },
    subtotal: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

// Esquema principal de la venta
const VentaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  items: [ItemSchema],
  total: { type: Number, required: true },
  metodo_pago: { type: String, required: true },
  estado: { type: String, required: true },
  notas: { type: String, default: "" },
});

// Verifica si el modelo ya está definido antes de compilarlo
const Venta = mongoose.models.Venta || mongoose.model("Venta", VentaSchema);

export default Venta;
