import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { token, nombre, email, rol }

  useEffect(() => {
    const raw = localStorage.getItem("auth");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);

  const login = (payload) => {
    // payload esperado: { token, user: { nombre, email, rol } }
    const auth = {
      token: payload.token,
      nombre: payload.user?.nombre,
      email: payload.user?.email,
      rol: (payload.user?.rol || "cliente").toLowerCase(),
    };
    setUser(auth);
    localStorage.setItem("auth", JSON.stringify(auth));
    localStorage.setItem("token", auth.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  };

  const value = useMemo(() => ({
    user,
    isAdmin: (user?.rol || "").toLowerCase() === "admin",
    login,
    logout
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
