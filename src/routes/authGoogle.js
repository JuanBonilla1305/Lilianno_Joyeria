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
   const token = jwt.sign(
  {
    id: req.user._id,
    rol: req.user.rol,
    nombre: req.user.nombre, // 👈 agregamos el nombre
  },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);


   const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://lilianno.onrender-1.com" // dominio del frontend en Render
    : "http://localhost:5173";

res.redirect(`${FRONTEND_URL}/login-success?token=${token}`);


  }
);

export default router;
