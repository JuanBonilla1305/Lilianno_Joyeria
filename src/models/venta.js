import mongoose from "mongoose";

// Esquema de los elementos de la venta (producto)
const ItemSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    precio: { type: Number, required: true, min: 0 },
    cantidad: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

// Esquema principal de la venta
const VentaSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  productos: [ItemSchema], // Solo guardamos los productos con precios y cantidades
  total: { type: Number, required: true },
  metodo_pago: { type: String, required: true },
  estado: { type: String, required: true },
  notas: { type: String, default: "" },
});

const Venta = mongoose.models.Venta || mongoose.model("Venta", VentaSchema);

export default Venta;
