// src/middlewares/auth.js
import jwt from "jsonwebtoken";

// ✅ Verifica token y añade usuario al request
export const isAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "No autorizado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      rol: decoded.rol,
      nombre: decoded.nombre,
    };
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
};

// ✅ Verifica que el usuario tenga rol admin
export const isAdmin = (req, res, next) => {
  if (req.user?.rol !== "admin") {
    return res.status(403).json({ message: "Acceso restringido a administradores" });
  }
  next();
};
