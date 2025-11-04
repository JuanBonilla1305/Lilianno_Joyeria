// src/controllers/comentarioController.js
import Comentario from "../models/comentario.js";

export const crear = async (req, res) => {
  try {
    const { productoId, rating, texto } = req.body;
    const c = await Comentario.create({
      productoId,
      rating,
      texto,
      usuarioId: req.user.id,
      nombreUsuario: req.user.nombre || "Cliente",
    });
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ message: err.message || "Error creando comentario" });
  }
};

export const listarPorProducto = async (req, res) => {
  try {
    const { productoId } = req.params;
    const data = await Comentario.find({ productoId, aprobado: true }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error listando comentarios" });
  }
};

export const aprobar = async (req, res) => {
  try {
    const upd = await Comentario.findByIdAndUpdate(req.params.id, { aprobado: true }, { new: true });
    res.json(upd);
  } catch {
    res.status(400).json({ message: "No se pudo aprobar" });
  }
};

export const eliminar = async (req, res) => {
  try {
    await Comentario.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch {
    res.status(400).json({ message: "No se pudo eliminar" });
  }
};
