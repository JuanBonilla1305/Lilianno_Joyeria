// src/config/googleAuth.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import Usuario from "../models/user.js"; // tu modelo de usuario

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Buscar o crear usuario
        let user = await Usuario.findOne({ googleId: profile.id });

        if (!user) {
          user = new Usuario({
            googleId: profile.id,
            nombre: profile.displayName,
            email: profile.emails?.[0]?.value,
            avatar: profile.photos?.[0]?.value,
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error("❌ Error en autenticación Google:", error);
        return done(error, null);
      }
    }
  )
);

// Requerido para sesiones
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Usuario.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
