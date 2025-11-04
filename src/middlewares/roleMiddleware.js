// src/middleware/roleMiddleware.js

export const autorizar = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    if (!rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }

    next();
  };
};
