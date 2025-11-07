import express from "express";
import {
  crearVenta,
  obtenerVentas,
  obtenerResumen,
  generarReporteExcel,  // Importamos la función para generar el reporte
} from "../controllers/ventaController.js";

const router = express.Router();

// Ruta para crear una nueva venta (pedido desde WhatsApp)
router.post("/", crearVenta);

// Ruta para obtener todas las ventas
router.get("/", obtenerVentas);

// Ruta para obtener un resumen de ventas
router.get("/reporte/resumen", obtenerResumen);

// Ruta para generar el reporte de ventas en Excel
router.get("/reporte/excel", generarReporteExcel);  // Nueva ruta para generar Excel

export default router;
