// src/routes/authGoogle.js
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      if (!req.user) {
        console.error("⚠️ No se recibió usuario tras autenticación Google");
        return res.status(500).send("Error en autenticación");
      }

      if (!process.env.JWT_SECRET) {
        console.error("❌ JWT_SECRET ausente en variables de entorno");
        return res
          .status(500)
          .json({ error: "Configuración inválida: falta JWT_SECRET" });
      }

      const token = jwt.sign(
        { id: req.user._id, rol: req.user.rol, nombre: req.user.nombre },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const FRONTEND_URL =
        process.env.NODE_ENV === "production"
          ? "https://lilianno-joyeria-1.onrender.com"
          : "http://localhost:5173";

      console.log("✅ Usuario autenticado con Google:", req.user.email);
      console.log("🔑 Token emitido (7d). Redirigiendo a:", `${FRONTEND_URL}/login-success?token=...`);

      // 🔄 MODO PRUEBA: responde JSON para validar que no reviente aquí
      // return res.json({ ok: true, token });

      // 🔁 MODO PROD: redirige al front con el token
      return res.redirect(`${FRONTEND_URL}/login-success?token=${token}`);
    } catch (err) {
      console.error("❌ Error final en callback Google:", err);
      return res.status(500).json({ error: "Error interno en autenticación Google" });
    }
  }
);

export default router;
