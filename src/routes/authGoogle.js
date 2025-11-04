import express from "express";
import passport from "passport";
import "../config/googleAuth.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🔹 Ruta para iniciar sesión con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🔹 Callback después del login en Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // 🔸 Crear token JWT
    const token = jwt.sign(
      {
        id: req.user._id,
        rol: req.user.rol,
        nombre: req.user.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔸 Detectar la URL del frontend
    // Render usará la variable FRONTEND_URL del entorno
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

    console.log("✅ Redirigiendo a:", `${FRONTEND_URL}/login-success?token=${token}`);

    // 🔸 Redirigir al frontend con el token
    res.redirect(`${FRONTEND_URL}/login-success?token=${token}`);
  }
);

export default router;
