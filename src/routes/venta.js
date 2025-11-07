// src/routes/venta.js

import express from "express";
import {
  crearVenta,  // Crear nueva venta
  obtenerVentas, // Obtener todas las ventas
  obtenerResumen, // Resumen de ventas (para balances)
} from "../controllers/ventaController.js"; // Importamos las funciones del controlador

const router = express.Router();

// Ruta para crear una nueva venta (pedido desde WhatsApp)
router.post("/", crearVenta); // Cuando el cliente hace un pedido, se registra en la base de datos

// Ruta para obtener todas las ventas
router.get("/", obtenerVentas); // Para el administrador, para ver todas las ventas registradas

// Ruta para obtener un resumen de ventas
router.get("/reporte/resumen", obtenerResumen); // Para mostrar un balance de ventas totales e ingresos

export default router;
