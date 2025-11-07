import Venta from "../models/venta.js";

export const crearVenta = async (req, res) => {
  try {
    // Crear la venta usando solo los datos necesarios
    const { productos, total, cliente } = req.body;

    // Validar que los productos existan y tengan precios
    if (!productos || productos.length === 0) {
      return res.status(400).json({ message: "Debe incluir productos" });
    }

    // Validar que el total sea mayor que 0
    if (total <= 0) {
      return res.status(400).json({ message: "El total debe ser mayor a 0" });
    }

    // Crear la venta con solo la información necesaria
    const nuevaVenta = new Venta({
      productos,
      total,
      cliente,  // Almacenamos solo el nombre del cliente
    });

    // Guardar la venta en la base de datos
    await nuevaVenta.save();

    // Retornar la respuesta con la venta creada
    res.status(201).json(nuevaVenta);
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

    res.json({
      totalVentas,
      totalIngresos: totalIngresos[0]?.total || 0,
    });
  } catch (error) {
    console.error("Error al generar resumen:", error);
    res.status(500).json({ message: "Error al generar resumen" });
  }
};

// Crear pedido (modificado para usar los datos esenciales)
export const crearPedido = async (req, res) => {
  try {
    const { productos, total, nombre, direccion, telefono } = req.body;

    // Validación básica
    if (!productos || productos.length === 0) {
      return res.status(400).json({ message: "Debe incluir productos" });
    }
    if (!nombre) {
      return res.status(400).json({ message: "Debe incluir el nombre del cliente" });
    }

    // Crear la venta con solo los datos necesarios
    const nuevaVenta = new Venta({
      cliente: nombre, // Solo guardamos el nombre del cliente
      productos: productos.map((p) => ({
        nombre: p.nombre,
        precio: p.precio,
        cantidad: p.cantidad,
        subtotal: p.precio * p.cantidad,
      })),
      total,
      metodo_pago: "whatsapp",
      estado: "pendiente",
      notas: `Pedido por WhatsApp de ${nombre}${direccion ? ` - ${direccion}` : ""}${telefono ? ` - ${telefono}` : ""}`,
    });

    await nuevaVenta.save();

    res.status(201).json({ message: "Pedido registrado correctamente", nuevaVenta });
  } catch (error) {
    console.error("❌ Error al registrar pedido:", error);
    res.status(500).json({ message: "Error al registrar pedido" });
  }
};
