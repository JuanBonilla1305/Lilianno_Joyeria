// src/middleware/auth.js

import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer token"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Decodificar el token y guardar la información del usuario en req.user
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
