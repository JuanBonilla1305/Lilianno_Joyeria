import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";

import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import ventaRoutes from "./routes/venta.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
conectarDB();

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/ventas", ventaRoutes);

// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Servidor Lilianno escuchando en el puerto ${PORT}`)
);
