import express from "express";
import passport from "passport";
import "../config/googleAuth.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🔹 Iniciar sesión con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🔹 Callback después del login de Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Generar token JWT
    const token = jwt.sign(
      {
        id: req.user._id,
        rol: req.user.rol,
        nombre: req.user.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🚀 Redirigir al frontend de Render con el token
    const FRONTEND_URL = "https://lilianno-joyeria-1.onrender.com"; // 👈 dominio frontend

    res.redirect(`${FRONTEND_URL}/login-success?token=${token}`);
  }
);

export default router;
