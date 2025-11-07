// src/models/venta.js

import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema(
  {
    productos: [
      {
        precioUnit: { type: Number, required: true },
        cantidad: { type: Number, required: true },
        subtotal: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Venta = mongoose.model("Venta", ventaSchema);

export default Venta;
