// src/server.js
import dotenv from "dotenv";
dotenv.config(); // 👈 solo aquí

import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import conectarDB from "./config/db.js";
import "./config/googleAuth.js"; // 👈 ya puede leer las variables .env

// Rutas
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import ventaRoutes from "./routes/venta.js";
import googleAuthRoutes from "./routes/authGoogle.js";

// Inicializar app
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lilianno-joyeria-1.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.json());
conectarDB();

// Sesión y Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "lilianno_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/auth", googleAuthRoutes);

// Servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor Lilianno escuchando en el puerto ${PORT}`);
});
