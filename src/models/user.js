// src/models/user.js
import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function () {
      // Solo requiere contraseña si NO tiene googleId
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
    default: null,
  },
  rol: {
    type: String,
    enum: ["admin", "cliente"],
    default: "cliente",
  },
});

const Usuario = mongoose.model("User", usuarioSchema);
export default Usuario;
