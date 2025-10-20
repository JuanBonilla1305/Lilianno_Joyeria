import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// 🧩 Páginas
import Inicio from "../pages/Inicio.jsx";
import Catalogo from "./catalogo.jsx";
import DetalleProducto from "./detalleProducto.jsx";
import Login from "../pages/Login.jsx";
import Registro from "../pages/Registro.jsx";
import Carrito from "../pages/Carrito.jsx";
import Personalizar from "../pages/Personalizar.jsx";
import PanelAdmin from "../pages/PanelAdmin.jsx";
import AdminProductos from "../pages/AdminProductos.jsx"; // 👈 IMPORTANTE
import AdminDashboard from "../pages/AdminDashboard.jsx";
import PanelCliente from "../pages/PanelCliente.jsx";
import Checkout from "./Checkout.jsx";

// 🧠 Contextos y rutas protegidas
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import AdminRoute from "../components/AdminRoute.jsx";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#0b0b0b] text-[#cfcfcf]">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              {/* 🌟 Rutas públicas */}
              <Route path="/" element={<Inicio />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/producto/:id" element={<DetalleProducto />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registro />} />
              <Route path="/personalizar" element={<Personalizar />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/carrito" element={<Carrito />} />

              {/* 👤 Panel de cliente */}
              <Route
                path="/panel-cliente"
                element={
                  <ProtectedRoute>
                    <PanelCliente />
                  </ProtectedRoute>
                }
              />

              {/* 👑 Rutas de administrador */}
              <Route
                path="/panel"
                element={
                  <AdminRoute>
                    <PanelAdmin />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              {/* ✅ Ruta funcional para editar catálogo */}
              <Route
                path="/admin/catalogo"
                element={
                  <AdminRoute>
                    <AdminProductos />
                  </AdminRoute>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
