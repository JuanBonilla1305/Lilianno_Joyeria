import Venta from "../models/venta.js";

export const crearVenta = async (req, res) => {
  try {
    const { productos, total, notas } = req.body;

    if (!productos || productos.length === 0) {
      return res.status(400).json({ message: "Debe incluir productos" });
    }

    const venta = new Venta({
      productos: productos.map((p) => ({
        nombre: p.nombre,
        precioUnit: p.precioUnit,
        cantidad: p.cantidad,
        subtotal: p.subtotal,
      })),
      total,
      notas, // opcional, por ejemplo "Pedido por WhatsApp"
    });

    await venta.save();
    res.status(201).json({ message: "Venta registrada con éxito", venta });
  } catch (error) {
    console.error("❌ Error al crear venta:", error);
    res.status(500).json({ message: "Error al registrar la venta" });
  }
};

export const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find().sort({ fecha: -1 });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ventas" });
  }
};

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
