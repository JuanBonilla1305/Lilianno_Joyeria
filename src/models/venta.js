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
const VentaSchema = new mongoose.Schema(
  {
    items:       { type: [ItemSchema], required: true },
    total:       { type: Number, required: true, min: 0 },
    metodo_pago: { type: String, enum: ["tarjeta", "pse", "contraentrega", "whatsapp"], default: "tarjeta" },
    estado:      { type: String, enum: ["pendiente", "pagada", "fallida"], default: "pendiente" },
    usuarioId:   { type: String, required: true },  // Asegúrate de que esto sea obligatorio
    notas:       { type: String, default: "" },
    fecha:       { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

// Modelo de la venta
export default mongoose.models.Venta || mongoose.model("Venta", VentaSchema);
