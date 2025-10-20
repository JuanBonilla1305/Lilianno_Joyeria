// src/models/venta.js
import mongoose from "mongoose";

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

const VentaSchema = new mongoose.Schema(
  {
    items:       { type: [ItemSchema], required: true },
    total:       { type: Number, required: true, min: 0 },
    metodo_pago: { type: String, enum: ["tarjeta", "pse", "contraentrega"], default: "tarjeta" },
    estado:      { type: String, enum: ["pendiente", "pagada", "fallida"], default: "pagada" },
    usuarioId:   { type: String, default: "" }, // opcional si luego asocias al usuario autenticado
    notas:       { type: String, default: "" },
    fecha:       { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Venta", VentaSchema);
