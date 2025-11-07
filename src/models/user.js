import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  rol: { type: String, enum: ["admin", "doctora", "cliente"], default: "cliente" },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
