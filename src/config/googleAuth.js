// src/config/googleAuth.js
import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Usuario from "../models/user.js";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const CALLBACK_URL =
  process.env.NODE_ENV === "production"
    ? "https://lilianno-joyeria.onrender.com/api/auth/google/callback"
    : "http://localhost:3001/api/auth/google/callback";

console.log("🧭 Google OAuth listo →", CALLBACK_URL);

// Estrategia de autenticación Google
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Buscar usuario existente
        let user = await Usuario.findOne({ googleId: profile.id });

        // Si no existe, crear uno nuevo
        if (!user) {
          user = await Usuario.create({
            nombre: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            rol: "cliente",
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("❌ Error en autenticación Google:", error);
        return done(error, null);
      }
    }
  )
);

// 🔹 Serialización de usuario (guardar en sesión)
passport.serializeUser((user, done) => {
  // Passport usa este valor como referencia de sesión
  done(null, user._id);
});

// 🔹 Deserialización de usuario (leer sesión)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Usuario.findById(id);
    if (!user) return done(new Error("Usuario no encontrado"), null);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
