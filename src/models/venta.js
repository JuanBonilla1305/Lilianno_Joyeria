import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    precioUnit: { type: Number, required: true, min: 0 },
    cantidad: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const VentaSchema = new mongoose.Schema({
  productos: [ItemSchema],
  total: { type: Number, required: true, min: 0 },
  notas: { type: String, default: "" },
  fecha: { type: Date, default: Date.now },
});

const Venta = mongoose.model("Venta", VentaSchema);
export default Venta;
