import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Usuario from "../models/user.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://lilianno-joyeria.onrender.com/api/auth/google/callback", // 👈 dominio backend
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await Usuario.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await Usuario.create({
            nombre: profile.displayName,
            email: profile.emails[0].value,
            password: "google_oauth", // placeholder
            rol: "cliente",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await Usuario.findById(id);
  done(null, user);
});
