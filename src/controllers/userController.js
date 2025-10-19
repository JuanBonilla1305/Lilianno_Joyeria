import Usuario from "../models/user.js";          // ajusta si tu path es distinto
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// POST /api/users/register
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email y contraseña son obligatorios" });

    const ya = await Usuario.findOne({ email });
    if (ya) return res.status(400).json({ message: "El usuario ya existe" });

    const hash = await bcrypt.hash(password, 10);

    const nuevo = await Usuario.create({
      nombre,
      email,
      password: hash,
      rol: rol || "cliente",
    });

    const token = jwt.sign({ id: nuevo._id, rol: nuevo.rol }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      token,
      user: {
        id: nuevo._id,
        nombre: nuevo.nombre,
        email: nuevo.email,
        rol: nuevo.rol,
      },
    });
  } catch (err) {
    console.error("❌ registrarUsuario:", err);
    res.status(500).json({ message: "Error al registrar", error: err.message || err });
  }
};

// POST /api/users/login
export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email y contraseña son obligatorios" });

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    const ok = await bcrypt.compare(password, usuario.password);
    if (!ok) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,  // 👈 IMPORTANTÍSIMO
      },
    });
  } catch (err) {
    console.error("❌ loginUsuario:", err);
    res.status(500).json({ message: "Error al iniciar sesión", error: err.message || err });
  }
};
