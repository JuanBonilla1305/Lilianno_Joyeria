import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// 🧩 Pages
import Inicio from "../pages/Inicio.jsx";
import Catalogo from "./catalogo.jsx";
import DetalleProducto from "./detalleProducto.jsx";
import Login from "../pages/Login.jsx";
import Registro from "../pages/Registro.jsx";
import Carrito from "../pages/Carrito.jsx";
import Personalizar from "../pages/Personalizar.jsx";
import PanelAdmin from "../pages/PanelAdmin.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import PanelCliente from "../pages/PanelCliente.jsx";
import Checkout from "./Checkout.jsx";

// 🧩 Context & Rutas protegidas
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import AdminRoute from "../components/AdminRoute.jsx";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0b0b0b] text-[#cfcfcf]">
        <AuthProvider>
          <Navbar />

          <main className="flex-grow">
            <Routes>
              {/* Páginas públicas */}
              <Route path="/" element={<Inicio />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/producto/:id" element={<DetalleProducto />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registro />} />
              <Route path="/personalizar" element={<Personalizar />} />

              {/* Páginas protegidas (requieren login) */}
              <Route
                path="/panel-cliente"
                element={
                  <ProtectedRoute>
                    <PanelCliente />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              {/* Panel administrativo (requiere rol admin) */}
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

              {/* Carrito (puede ser accesible sin login) */}
              <Route path="/carrito" element={<Carrito />} />
            </Routes>
          </main>

          <Footer />
        </AuthProvider>
      </div>
    </Router>
  );
}
