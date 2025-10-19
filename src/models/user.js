// src/models/user.js
import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {                    // 👈 cambia "correo" por "email"
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ["admin", "cliente"],
    default: "cliente"
  }
});

const Usuario = mongoose.model("User", usuarioSchema);
export default Usuario;
