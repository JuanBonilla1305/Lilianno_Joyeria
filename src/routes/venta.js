import express from "express";
import { obtenerVentas, crearVenta } from "../controllers/ventaController.js";
const router = express.Router();

router.get("/", obtenerVentas);
router.post("/", crearVenta);

export default router;
