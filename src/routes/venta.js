// src/routes/venta.js
import express from "express";
import { isAuth, isAdmin } from "../middlewares/auth.js"; // 👈 Ojo, tu carpeta es "middleware", no "middlewares"
import {
  crearVenta,
  obtenerVentas,
  obtenerResumen,
  crearPedido, // 👈 AGREGA ESTA LÍNEA
} from "../controllers/ventaController.js";

const router = express.Router();

// 🛒 Crear venta (cliente autenticado)
router.post("/", isAuth, crearVenta);

// 🧾 Crear pedido por WhatsApp (no requiere autenticación estricta)
router.post("/pedido", crearPedido);

// 📦 Obtener todas las ventas (solo admin)
router.get("/", isAdmin, obtenerVentas);

// 📊 Resumen de ventas (solo admin)
router.get("/reporte/resumen", isAdmin, obtenerResumen);

export default router;
