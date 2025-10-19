// src/routes/product.js
import express from "express";
import { obtenerProductos, obtenerProductoPorId, crearProducto } from "../controllers/productController.js";
import { protegerRuta } from "../middleware/authMiddleware.js";
import { autorizar } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Ver todos los productos
router.get("/", obtenerProductos);

// Ver producto por ID
router.get("/:id", obtenerProductoPorId);

// Registrar nuevo producto (solo admin)
router.post("/", protegerRuta, autorizar("admin"), crearProducto);

export default router;
