import express from "express";
import { isAuth, isAdmin } from "../middlewares/auth.js";
import {
  crearVenta,
  obtenerVentas,
  obtenerResumen,
  crearPedido, // Asegúrate de que esta línea esté agregada
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
