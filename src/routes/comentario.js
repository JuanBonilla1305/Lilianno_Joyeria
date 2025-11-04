// src/routes/comentario.js
import express from "express";
import { isAuth, isAdmin } from "../middlewares/auth.js";
import * as ctrl from "../controllers/comentarioController.js";

const router = express.Router();

router.post("/", isAuth, ctrl.crear);
router.get("/producto/:productoId", ctrl.listarPorProducto);
router.patch("/:id/aprobar", isAdmin, ctrl.aprobar);
router.delete("/:id", isAdmin, ctrl.eliminar);

export default router;
