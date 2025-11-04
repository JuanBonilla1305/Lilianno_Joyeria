// src/models/venta.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  nombre: { type: String, required: true },
  precioUnit: { type: Number, required: true, min: 0 },
  cantidad: { type: Number, required: true, min: 1 },
  subtotal: { type: Number, required: true, min: 0 },
}, { _id: false });

const ventaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: [itemSchema], required: true },
  total: { type: Number, required: true, min: 0 },
  metodoPago: { type: String, enum: ["efectivo","tarjeta","stripe","payu"], default: "efectivo" },
  estado: { type: String, enum: ["pagado","pendiente","fallido"], default: "pagado" },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Venta", ventaSchema);
