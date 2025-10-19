// src/routes/user.js
import express from "express";
import { registrarUsuario, loginUsuario } from "../controllers/userController.js";

const router = express.Router();

// Registrar nuevo usuario
router.post("/register", registrarUsuario);

// Iniciar sesión
router.post("/login", loginUsuario);

export default router;
