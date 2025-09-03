import type {
  ApiResponse,
  ReservaRequestDTO,
  ReservaDTO,
} from "../types/Reservas.types";

const BASE_URL = "http://localhost:8080/reservas";

//* Obtiene todas las reservas
export const obtenerReservas = async (): Promise<ApiResponse<ReservaDTO[]>> => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error(`Error HTTP: $(res.status)`);
    }
    const data = (await res.json()) as ApiResponse<ReservaDTO[]>;
    if (data.status !== 200) {
      throw new Error(data.mensaje || "Error en la API");
    }
    console.log("Fetch successful:", data);
    return data;
  } catch (error) {
    console.error("Error en obtenerReservas:", error);
    throw error;
  }
};

//* Crea una reserva nueva
export async function crearReserva(
  dto: ReservaRequestDTO,
  token: string
): Promise<ApiResponse<ReservaDTO>> {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    });
    if (!res.ok) {
      throw new Error("Error al crear reserva");
    }
    const data = (await res.json()) as ApiResponse<ReservaDTO>;
    return data;
  } catch (error) {
    console.error("Error en crearReserva:", error);
    throw error;
  }
}

//* Actualiza una reserva existente
export async function actualizarReserva(
  id: number,
  dto: ReservaRequestDTO,
  token: string
): Promise<ApiResponse<ReservaDTO>> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    });
    if (!res.ok) {
      throw new Error("Error al actualizar reserva");
    }
    const data = (await res.json()) as ApiResponse<ReservaDTO>;
    return data;
  } catch (error) {
    console.error("Error en actualizarReserva:", error);
    throw error;
  }
}

//* Elimina una reserva
export async function eliminarReserva(
  id: number,
  token: string
): Promise<ApiResponse<string>> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Error al eliminar reserva");
    }
    const data = (await res.json()) as ApiResponse<string>;
    return data;
  } catch (error) {
    console.error("Error en eliminarReserva:", error);
    throw error;
  }
}
