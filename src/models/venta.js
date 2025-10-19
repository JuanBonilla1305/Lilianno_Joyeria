import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  items: [
    {
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
      nombre: String,
      precio: Number,
      qty: Number,
      imagen: String,
    },
  ],
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
});

export default mongoose.model("Venta", ventaSchema);
