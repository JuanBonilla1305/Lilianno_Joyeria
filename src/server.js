import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import conectarDB from "./config/db.js";

import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import ventaRoutes from "./routes/venta.js";

import session from "express-session";
import passport from "passport";
import googleAuthRoutes from "./routes/authGoogle.js";


dotenv.config();
const app = express();

// Middlewares


const allowedOrigins = [
  "http://localhost:5173",
  "https://lilianno.onrender.com" // frontend en Render
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Conexión a la base de datos
conectarDB();

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/ventas", ventaRoutes);


// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Servidor Lilianno escuchando en el puerto ${PORT}`)
);


// Middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use("/api/auth", googleAuthRoutes);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "lilianno_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 🔹 Rutas de autenticación Google
app.use("/api/auth", googleAuthRoutes);

import helmet from "helmet";

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "http://localhost:3001", "ws://localhost:5173"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

