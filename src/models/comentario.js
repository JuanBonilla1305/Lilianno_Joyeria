// src/models/comentario.js
import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  nombreUsuario: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  texto: { type: String, maxlength: 1000 },
  aprobado: { type: Boolean, default: true }, // moderación simple
}, { timestamps: true });

export default mongoose.model("Comentario", comentarioSchema);
