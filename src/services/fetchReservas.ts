import type { Reserva } from "../types/ReservasTypes";

/**
 * Obtiene la lista de reservas desde un archivo JSON local.
 * En un futuro reemplazar por una API real (GET /reservas).
 */
export const fetchReservas = async (): Promise<Reserva[]> => {
  try {
    const response = await fetch("/mock-reservas.json");

    if (!response.ok) {
      throw new Error(`Error al obtener reservas: ${response.status}`);
    }

    const data: Reserva[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchReservas:", error);
    throw error; // Se propaga el error para manejarlo desde el context o componente
  }
};
