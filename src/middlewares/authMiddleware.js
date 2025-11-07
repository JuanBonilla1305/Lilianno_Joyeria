// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const protegerRuta = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id, email: decoded.email, rol: decoded.rol };
    next();
  } catch (error) {
    console.error("Error protegerRuta:", error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
