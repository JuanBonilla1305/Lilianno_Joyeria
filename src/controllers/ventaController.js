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

// Crear pedido (modificado para usar usuario autenticado)
export const crearPedido = async (req, res) => {
  try {
    const { items, total, nombre, direccion, telefono } = req.body;

    // Verifica que el usuario esté autenticado
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "Usuario no autenticado" });
    }

    // Crear una nueva venta con el ID real del usuario
    const nuevaVenta = new Venta({
      usuarioId: req.user._id, // Guardamos el ID real del usuario autenticado
      items: items.map((p) => ({
        productoId: p.productoId || p._id,  // Asegúrate de que `productoId` esté presente
        nombre: p.nombre,
        precioUnit: p.precio,  // Asegúrate de que `precio` esté presente
        cantidad: p.qty,
        imagen: p.imagen || "",
        subtotal: p.precio * p.qty,
      })),
      total,
      metodo_pago: "whatsapp", // Esto puede cambiar según el método de pago
      estado: "pendiente",
      notas: `Pedido por WhatsApp de ${nombre} - ${direccion} - ${telefono}`,
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
