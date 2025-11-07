import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer token"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Decodifica el token y asigna el usuario al `req.user`
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Verificar si el usuario es administrador
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {  // Asegúrate de que el rol del usuario sea 'admin'
    return next();
  } else {
    return res.status(403).json({ message: "Access denied, you need admin rights" });
  }
};
