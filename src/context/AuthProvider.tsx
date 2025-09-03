import { useState, type ReactNode } from "react";
import { login as loginService } from "../services/authService";
import { AuthContext } from "./AuthContext";
import type { LoginRequest } from "../types/Auth.types";
import { useNavigate } from "react-router";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [adminId, setAdminId] = useState<number | null>(() =>
    localStorage.getItem("adminId")
      ? Number(localStorage.getItem("adminId"))
      : null
  );
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("site")
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function login(dto: LoginRequest) {
    try {
      setLoading(true);
      const response = await loginService(dto);
      const { data } = response;
      if (data) {
        const { token } = data; // suponiendo que después te devuelva el id
        setAdminId(adminId ?? 1); // ahora está hardcodeado en 1, pero cuando lo devuelva el back usás ese valor
        setToken(token);

        // persistimos en localStorage
        localStorage.setItem("site", token);
        localStorage.setItem("adminId", String(adminId ?? 1));

        console.log("Usuario logeado:", adminId, token);
        navigate("/home");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  }

  

  const logOut = () => {
    setAdminId(null);
    setToken(null);
    localStorage.removeItem("site");
    localStorage.removeItem("adminId");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ adminId, login, logOut, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
