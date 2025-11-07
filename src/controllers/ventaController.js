// src/controllers/ventaController.js

import Venta from "../models/venta.js";

// Crear una nueva venta (solo guardamos los datos para balance)
export const crearVenta = async (req, res) => {
  try {
    const { productos, total } = req.body;

    if (!productos || productos.length === 0) {
      return res.status(400).json({ message: "Debe incluir productos" });
    }

    // Crear una nueva venta solo con los datos necesarios para el balance
    const venta = new Venta({
      productos: productos.map((p) => ({
        precioUnit: p.precioUnit,  // Solo guardamos el precio de cada producto
        cantidad: p.cantidad,      // Guardamos la cantidad
        subtotal: p.subtotal,      // Guardamos el subtotal
      })),
      total,  // Guardamos solo el total de la venta
    });

    await venta.save();
    res.status(201).json({ message: "Venta registrada con éxito", venta });
  } catch (error) {
    console.error("❌ Error al crear venta:", error);
    res.status(500).json({ message: "Error al registrar la venta" });
  }
};

// Obtener todas las ventas
export const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find().sort({ fecha: -1 });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ventas" });
  }
};

// Obtener resumen de ventas
export const obtenerResumen = async (req, res) => {
  try {
    const totalVentas = await Venta.countDocuments();
    const totalIngresos = await Venta.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    res.json({
      totalVentas,
      totalIngresos: totalIngresos[0]?.total || 0,
    });
  } catch (error) {
    console.error("Error al generar resumen:", error);
    res.status(500).json({ message: "Error al generar resumen" });
  }
};
