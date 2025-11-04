// src/config/googleAuth.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import Usuario from "../models/user.js";

// Cargar variables del .env
dotenv.config();

// 🧠 Verifica que existan las credenciales (solo para debug)
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error("❌ ERROR: Falta GOOGLE_CLIENT_ID o GOOGLE_CLIENT_SECRET en el .env");
  process.exit(1);
}

// 🔹 URL dinámica del callback según entorno
const callbackURL =
  process.env.NODE_ENV === "production"
    ? "https://lilianno-joyeria.onrender.com/api/auth/google/callback" // 👈 tu backend en Render
    : "http://localhost:3001/api/auth/google/callback";

// 🔐 Estrategia de autenticación con Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Buscar usuario por correo
        let user = await Usuario.findOne({ email: profile.emails[0].value });

        // Si no existe, se crea automáticamente
        if (!user) {
          user = await Usuario.create({
            nombre: profile.displayName,
            email: profile.emails[0].value,
            password: "google_oauth", // marcamos una contraseña genérica
            rol: "cliente", // por defecto, los usuarios de Google son clientes
          });
        }

        return done(null, user);
      } catch (err) {
        console.error("❌ Error en autenticación de Google:", err);
        return done(err, null);
      }
    }
  )
);

// 🔁 Serialización y deserialización de usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Usuario.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
