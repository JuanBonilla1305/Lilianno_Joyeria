import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/user.js"; // asegúrate de que esta ruta sea correcta

dotenv.config(); // carga las variables .env ANTES de usarlas

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Busca si el usuario ya existe
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Si no existe, lo crea
          user = new User({
            nombre: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            rol: "cliente", // rol por defecto
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error("Error en la estrategia Google:", error);
        return done(error, null);
      }
    }
  )
);

// Serialización y deserialización
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
