import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import conectarDB from "./config/db.js";
import "./config/googleAuth.js";

import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import ventaRoutes from "./routes/venta.js";
import googleAuthRoutes from "./routes/authGoogle.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://lilianno-joyeria-1.onrender.com"], // frontend en Render
    credentials: true,
  })
);

app.use(express.json());
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

// 🛣️ Rutas
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/auth", googleAuthRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`✅ Servidor desplegado en Render escuchando en el puerto ${PORT}`)
);
