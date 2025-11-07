import express from "express";
import {
  crearVenta,
  obtenerVentas,
  obtenerResumen,
} from "../controllers/ventaController.js";

const router = express.Router();

// Crear venta (pedido de WhatsApp)
router.post("/", crearVenta);

// Ver todas las ventas (opcional)
router.get("/", obtenerVentas);

// Resumen de ventas (opcional, para balances)
router.get("/reporte/resumen", obtenerResumen);

export default router;
