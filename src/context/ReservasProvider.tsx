import { useEffect, useState, type ReactNode } from "react";
import { ReservasContext } from "./ReservasContext";
import type {
  ReservaDTO,
  Canchas,
  ReservaRequestDTO,
} from "../types/Reservas.types";
import {
  crearReserva,
  obtenerReservas,
  actualizarReserva as actualizarReservaService,
  eliminarReserva as eliminarReservaService,
} from "../services/fetchReservas";
import { obtenerCanchas } from "../services/canchaService";

export function ReservasProvider({ children }: { children: ReactNode }) {
  const [reservas, setReservas] = useState<ReservaDTO[]>([]);
  const [canchas, setCanchas] = useState<Canchas[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function cargarReservas() {
    try {
      setLoading(true);
      const data = await obtenerReservas();
      setReservas(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("No se pudieron cargar las reservas");
    }
  }

  async function cargarCanchas() {
    try {
      setLoading(true);
      const data = await obtenerCanchas();
      setCanchas(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("No se pudieron cargar las canchas");
    }
  }

  async function generarReserva(dto: ReservaRequestDTO, token: string) {
    setError(null);
    try {
      const data = await crearReserva(dto, token);
      setReservas((prev) => [...prev, data.data]);
      return data.data;
    } catch (error) {
      console.error(error);
      setError("No se pudo crear la reserva");
      return null;
    }
  }

  async function actualizarReserva(
    id: number,
    dto: ReservaRequestDTO,
    token: string
  ) {
    setError(null);
    try {
      const data = await actualizarReservaService(id, dto, token);

      setReservas((prev) =>
        prev.map((reserva) => (reserva.id === id ? data.data : reserva))
      );
      return data.data;
    } catch (error) {
      console.error(error);
      setError("No se pudo actualizar la reserva");
      return null;
    }
  }

  async function eliminarReserva(id: number, token: string) {
    setError(null);
    try {
      const data = await eliminarReservaService(id, token);
      setReservas((prev) => prev.filter((reserva) => reserva.id !== id));
      console.log("Reserva eliminada:", data);
    } catch (error) {
      console.error(error);
      setError("No se pudo eliminar la reserva");
    }
  }

  useEffect(() => {
    cargarReservas();
    cargarCanchas();
  }, []);

  return (
    <ReservasContext.Provider
      value={{
        reservas,
        canchas,
        error,
        loading,
        cargarReservas,
        cargarCanchas,
        generarReserva,
        actualizarReserva,
        eliminarReserva,
      }}
    >
      {children}
    </ReservasContext.Provider>
  );
}
