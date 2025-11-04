// src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import passport from "passport";

import conectarDB from "./config/db.js";
import "./config/googleAuth.js"; // 👈 importa estrategia Google antes de usar passport

// Rutas
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import ventaRoutes from "./routes/venta.js";
import googleAuthRoutes from "./routes/authGoogle.js";

dotenv.config();

const app = express();

// 🧱 Seguridad básica
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "http://localhost:3001",
          "https://lilianno-joyeria.onrender.com",
          "https://lilianno-joyeria-1.onrender.com",
          "ws://localhost:5173"
        ],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

// 🌐 CORS configurado
const allowedOrigins = [
  "http://localhost:5173",
  "https://lilianno-joyeria-1.onrender.com", // frontend en Render
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ⚙️ Middlewares base
app.use(express.json());

// 🧠 Conexión a la base de datos
conectarDB();

// 🔐 Sesión + Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "lilianno_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 🛣️ Rutas principales
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/ventas", ventaRoutes);

// 🔑 Rutas de autenticación Google
app.use("/api/auth", googleAuthRoutes);

// 🚀 Arranque del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor Lilianno escuchando en el puerto ${PORT}`);
});
