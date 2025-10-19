# Lilianno Joyería

Plataforma e-commerce para joyería con autenticación (roles admin/cliente), catálogo, carrito, checkout, panel cliente y base para panel admin.  
Diseño con estética dorado/negro, desarrollada con el stack MERN como proyecto académico.

---

## Descripción del proyecto

Lilianno Joyería es una aplicación web desarrollada para la gestión digital de una joyería.  
Permite a los usuarios explorar el catálogo, realizar compras y personalizar joyas.  
Los administradores pueden registrar productos, ventas, gastos y consultar balances.  

El diseño se enfoca en la elegancia visual (paleta dorado y negro) y en ofrecer una experiencia fluida al usuario final.

---

## Características principales

### Usuario Cliente
- Registro e inicio de sesión con JWT.  
- Roles diferenciados (cliente / admin).  
- Navegación por el catálogo de joyas.  
- Carrito de compras con persistencia.  
- Checkout funcional y registro de compra.  
- Acceso a un panel personal con historial.  
- Envío de solicitudes de personalización.

### Usuario Administrador
- CRUD de productos (añadir, editar, eliminar).  
- Listado de ventas realizadas.  
- Registro de gastos.  
- Generación de balance y reportes (en progreso).

---

## Tecnologías utilizadas

### Frontend
- React + Vite  
- TailwindCSS  
- Framer Motion  
- Axios  
- Lucide Icons  

### Backend
- Node.js + Express  
- MongoDB + Mongoose  
- JWT + Bcrypt.js  
- Cors + Dotenv  

---

## Estructura del proyecto

Lilianno_Joyeria/
├── src/
├── pages/
├── components/
├── controllers/
├── models/
├── server.js
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .env
└── .gitignore

---

## Instalación y ejecución local

### Requisitos
- Node.js 18 o superior  
- Base de datos MongoDB (Atlas o local)

### Pasos
```bash
git clone https://github.com/JuanBonilla1305/Lilianno_Joyeria.git
cd Lilianno_Joyeria
npm install
Configurar variables de entorno

Crea un archivo .env en la raíz con tus valores:

MONGO_URI=mongodb://127.0.0.1:27017/lilianno_joyeria
JWT_SECRET=clave_secreta_segura
PORT=3001

Ejecutar en modo desarrollo
npm run dev


El frontend se ejecutará en:
http://localhost:5173

Y la API en:
http://localhost:3001

| ID   | Requerimiento                   | Estado        |
| ---- | ------------------------------- | ------------- |
| RF01 | Registrar usuario               | Completado    |
| RF02 | Iniciar sesión                  | Completado    |
| RF03 | Verificar roles                 | Completado    |
| RF04 | Personalizar joya               | En desarrollo |
| RF05 | Mostrar catálogo                | Completado    |
| RF06 | Elegir joya / añadir al carrito | Completado    |
| RF07 | Realizar venta                  | Completado    |
| RF08 | Registrar venta                 | Completado    |
| RF09 | Listar ventas                   | En desarrollo |
| RF10 | Realizar pago                   | En desarrollo |
| RF18 | Registrar joya                  | En desarrollo |

Próximos pasos

Completar módulo de administración con gestión de productos y ventas.

Implementar módulo financiero (gastos, balance, reportes PDF/Excel).

Integrar inicio de sesión con Google (Firebase o Auth0).

Desplegar frontend en Vercel y backend en Render.

| Rol                                     | Nombre            | Responsabilidad                                                                      |
| --------------------------------------- | ----------------- | ------------------------------------------------------------------------------------ |
| Líder de Desarrollo / Scrum Master (SM) | Carlos Cáceres    | Coordina el equipo, revisa código y asegura calidad técnica.                         |
| Co-Developer                            | Juan Pablo Cortés | Facilita la metodología Scrum, asegura cumplimiento de procesos y resuelve bloqueos. |
| Developer (Frontend)                    | Felipe Báez       | Desarrolla la interfaz de usuario y estilos visuales.                                |
| Developer (Backend y Pruebas)           | Juan Bonilla      | Implementa la lógica del servidor, base de datos y pruebas funcionales.              |

Proyecto académico

Universidad de Ibagué
Ingeniería de Software – Avance 2 (2025)

Contacto: juan.bonilla3@estudiantesunibague.edu.co

Repositorio oficial

https://github.com/JuanBonilla1305/Lilianno_Joyeria

Este proyecto continúa en desarrollo.
Próximamente incluirá módulos financieros, reportes, inicio de sesión con Google y despliegue completo en la nube.