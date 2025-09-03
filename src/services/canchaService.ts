import type { Canchas } from "../types/Reservas.types";
import { generarTurnos } from "../utils/makerTurns";

const BASE_URL = "http://localhost:8080/canchas";

export const obtenerCanchas = async (): Promise<Canchas[]> => {
  try {
    const response = await fetch(`${BASE_URL}`);

    if (!response.ok) {
      throw new Error("Error al obtener las canchas");
    }
    const data = await response.json();
    console.log("Fetch successful:", data);
    return data.map((cancha: Canchas) => ({
      ...cancha,
      turnos: generarTurnos(),
    }));
  } catch (error) {
    console.error("Error fetching canchas:", error);
    throw error;
  }
};
