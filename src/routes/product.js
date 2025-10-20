import express from "express";
import {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productController.js";

const router = express.Router();

// CRUD de productos
router.get("/", obtenerProductos);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;
