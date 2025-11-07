// src/controllers/ventaController.js
import Venta from "../models/venta.js";

export const crearVenta = async (req, res) => {
  try {
    const venta = new Venta(req.body);
    await venta.save();
    res.status(201).json(venta);
  } catch (error) {
    console.error("Error al crear venta:", error);
    res.status(500).json({ message: "Error al registrar la venta" });
  }
};

export const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ventas" });
  }
};

// 📊 Resumen simple
export const obtenerResumen = async (req, res) => {
  try {
    const totalVentas = await Venta.countDocuments();
    const totalIngresos = await Venta.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const metodosPago = await Venta.aggregate([
      { $group: { _id: "$metodo_pago", count: { $sum: 1 } } },
    ]);

    res.json({
      totalVentas,
      totalIngresos: totalIngresos[0]?.total || 0,
      metodosPago: metodosPago.reduce((acc, m) => {
        acc[m._id] = m.count;
        return acc;
      }, {}),
    });
  } catch (error) {
    console.error("Error al generar resumen:", error);
    res.status(500).json({ message: "Error al generar resumen" });
  }
};
export const crearPedido = async (req, res) => {
  try {
    const { items, total, nombre, direccion, telefono } = req.body;

    // Verifica que los datos requeridos están siendo enviados
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío" });
    }

    const nuevaVenta = new Venta({
      usuarioId: "pedido-whatsapp", // Asegúrate de que el `usuarioId` sea adecuado
      items: items.map((p) => ({
        productoId: p.productoId || "sin_id",  // Asegúrate de que este campo sea adecuado
        nombre: p.nombre,
        precio: p.precio || 0,
        cantidad: p.cantidad || 1,
        subtotal: (p.precio || 0) * (p.cantidad || 1),
      })),
      total,
      metodo_pago: "whatsapp",
      estado: "pendiente",
      notas: `Pedido de ${nombre} - ${direccion} - ${telefono}`,
    });

    // Guardar la venta en la base de datos
    await nuevaVenta.save();

    // Confirmar que la venta fue guardada correctamente
    res.status(201).json({ message: "Pedido registrado correctamente", nuevaVenta });
  } catch (error) {
    console.error("❌ Error al registrar pedido:", error);
    res.status(500).json({ message: "Error al registrar pedido" });
  }
};