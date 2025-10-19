// src/models/product.js
import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  material: {
    type: String,
  },
  color: {
    type: String,
  },
  peso: {
    type: Number,
  },
  imagen: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
});

const Producto = mongoose.model("Producto", productoSchema);
export default Producto;
