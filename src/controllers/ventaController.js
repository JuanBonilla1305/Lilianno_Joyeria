// src/controllers/ventaController.js

import Venta from "../models/venta.js";
import XLSX from "xlsx";  

// Crear una nueva venta (solo guardamos los datos para balance)
export const crearVenta = async (req, res) => {
  try {
    const { productos, total } = req.body;

    if (!productos || productos.length === 0) {
      return res.status(400).json({ message: "Debe incluir productos" });
    }

    // Crear la venta
    const venta = new Venta({
      productos: productos.map((p) => ({
        precioUnit: p.precioUnit,
        cantidad: p.cantidad,
        subtotal: p.subtotal,
      })),
      total,
    });

    // Guardar la venta en la base de datos
    const nuevaVenta = await venta.save();

    // Responder con los detalles de la venta guardada
    res.status(201).json({
      message: "Venta registrada con éxito",
      venta: nuevaVenta,
    });
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



// Función para generar el reporte de ventas
export const generarReporteExcel = async (req, res) => {
  try {
    const ventas = await Venta.find();  // Obtener todas las ventas de la base de datos

    // Preparar los datos para el archivo Excel
    const data = ventas.map((venta) => ({
      "Fecha": new Date(venta.fecha).toLocaleDateString(),
      "Productos": venta.productos.map(p => `${p.nombre} x${p.cantidad}`).join(", "),
      "Total": venta.total,
      "Estado": venta.estado,
    }));

    // Convertir los datos a una hoja de Excel
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ventas");

    // Generar el archivo Excel
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    // Enviar el archivo como respuesta
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=report_ventas.xlsx");
    res.send(excelBuffer);  // Enviar el buffer del archivo Excel al cliente
  } catch (error) {
    console.error("❌ Error al generar el reporte de ventas:", error);
    res.status(500).json({ message: "Error al generar el reporte" });
  }
};
