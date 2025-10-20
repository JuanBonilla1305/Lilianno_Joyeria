import Producto from "../models/product.js"; // ajusta el path si es diferente

// 🟢 Crear producto
export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(500).json({ message: "Error al crear producto", error: err.message });
  }
};

// 🟢 Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener productos", error: err.message });
  }
};

// 🟡 Actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar producto", error: err.message });
  }
};

// 🔴 Eliminar producto
export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar producto", error: err.message });
  }
};
