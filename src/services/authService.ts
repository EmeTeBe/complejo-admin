import { type LoginRequest, type LoginResponse } from "../types/Auth.types";
import { type ApiResponse } from "../types/Reservas.types";

const BASE_URL = "http://localhost:8080";

export const SignUp = async (
  dto: LoginRequest
): Promise<ApiResponse<string>> => {
  try {
    const res = await fetch(`${BASE_URL}/admin/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    if (!res.ok) {
      throw new Error("Error en la creación de cuenta");
    }

    const data = (await res.json()) as ApiResponse<string>;
    console.log("Post successful:", data);
    return data;
  } catch (err) {
    console.error("Error en SignUp:", err);
    throw err;
  }
};

export const login = async (
  dto: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  try {
    const res = await fetch(`${BASE_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    if (!res.ok) {
      throw new Error("Credenciales incorrectas");
    }

    const data = (await res.json()) as ApiResponse<LoginResponse>;
    console.log("Login successful:", data);
    return data;
  } catch (err) {
    console.error("Error en login:", err);
    throw err;
  }
};
