// src/server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import rateLimit from "express-rate-limit";

import conectarDB from "./config/db.js";
import "./config/googleAuth.js";

// Rutas
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import ventaRoutes from "./routes/venta.js";
import googleAuthRoutes from "./routes/authGoogle.js";

const app = express();

// 🧠 Conexión a base de datos
conectarDB();

// 🌐 CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lilianno-joyeria-1.onrender.com",
    ],
    credentials: true,
  })
);

// 🧱 Seguridad: limitar peticiones
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 600, // 600 solicitudes por IP
  message: "Demasiadas solicitudes desde esta IP. Intenta más tarde.",
});
app.use("/api/", apiLimiter);

// 🔐 Sesión y Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "lilianno_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 🧩 Parseo de JSON
app.use(express.json());

// 🛣️ Rutas principales
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/auth", googleAuthRoutes);

// 🚀 Servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor Lilianno escuchando en el puerto ${PORT}`);
});
