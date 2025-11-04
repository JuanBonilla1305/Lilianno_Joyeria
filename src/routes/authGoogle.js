import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🔹 Iniciar sesión con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🔹 Callback después del login de Google
/*router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user._id,
        rol: req.user.rol,
        nombre: req.user.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 👇 Redirigir al frontend desplegado en Render
    const FRONTEND_URL = "https://lilianno-joyeria-1.onrender.com";

    res.redirect(`${FRONTEND_URL}/login-success?token=${token}`);
  }
);*/


router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    try {
      const token = jwt.sign(
        {
          id: req.user._id,
          rol: req.user.rol,
          nombre: req.user.nombre,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const FRONTEND_URL = "https://lilianno-joyeria-1.onrender.com";
      res.redirect(`${FRONTEND_URL}/login-success?token=${token}`);
    } catch (error) {
      console.error("🔥 ERROR en callback de Google:", error);
      res.status(500).json({ message: "Error procesando autenticación Google" });
    }
  }
);


export default router;
