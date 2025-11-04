import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// ✅ Configuración para Vite + Render
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Render sirve desde "dist"
  },
  publicDir: "public", // Se asegura de copiar la carpeta public (incluye _redirects)
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), // Permite imports con "@/archivo"
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
