// src/controllers/ventaController.js

// Arreglo temporal para guardar las ventas en memoria
let ventas = [];

// Obtener todas las ventas
export const obtenerVentas = (req, res) => {
    try {
        res.status(200).json(ventas);
    } catch (error) {
        console.error("Error al obtener las ventas:", error);
        res.status(500).json({ message: "Error al obtener las ventas" });
    }
};

// Crear una nueva venta
export const crearVenta = (req, res) => {
    try {
        const { cliente, producto, cantidad, total } = req.body;

        if (!cliente || !producto || !cantidad || !total) {
            return res.status(400).json({ message: "Faltan datos de la venta" });
        }

        // Crear objeto de venta con un ID automático
        const nuevaVenta = {
            id: ventas.length + 1,
            cliente,
            producto,
            cantidad,
            total,
            fecha: new Date().toISOString()
        };

        ventas.push(nuevaVenta);

        res.status(201).json({
            message: "Venta registrada con éxito",
            venta: nuevaVenta
        });
    } catch (error) {
        console.error("Error al registrar la venta:", error);
        res.status(500).json({ message: "Error al registrar la venta" });
    }
};
