import { useEffect, useMemo, useState } from "react";
import { ReservasContext } from "./ReservasContext";
import type { Reserva, ReservasContextType } from "../types/ReservasTypes";
import { fetchReservas } from "../services/fetchReservas";

type Props = {
  children: React.ReactNode;
};

export const ReservasProvider = ({ children }: Props) => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // ✅ Cargar reservas al iniciar el contexto
  // ✅ Manejo de errores en caso de que se cargue la carga
  // ✅ Usar useMemo para optimizar el cálculo de reservas por fecha

  // Cargar reservas al iniciar el contexto
  useEffect(() => {
    const loadReservas = async () => {
      try {
        const data = await fetchReservas();
        setReservas(data);
      } catch (error) {
        setError("Error al cargar reservas: " + error);
      } finally {
        setLoading(false);
      }
    };
    loadReservas();
  }, []);

  const reservasPorFecha = useMemo(() => {
    const map = new Map<string, Reserva[]>();
    reservas.forEach((reserva) => {
      const fecha = reserva.fechaHoraInicio.split("T")[0];
      if (!map.has(fecha)) {
        map.set(fecha, []);
      }
      map.get(fecha)!.push(reserva);
    });
    return map;
  }, [reservas]);

  const agregarReserva = (reserva: Reserva) => {
    setReservas((prev) => [...prev, reserva]);
  };

  const eliminarReserva = (id: number) => {
    setReservas((prev) => prev.filter((reserva) => reserva.id !== id));
  };

  const actualizarReserva = (id: number, reserva: Reserva) => {
    setReservas((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...reserva } : r))
    );
  };

  const value: ReservasContextType = {
    reservas,
    reservasPorFecha,
    agregarReserva,
    actualizarReserva,
    eliminarReserva,
    loading,
    error,
  };

  return (
    <ReservasContext.Provider value={value}>
      {children}
    </ReservasContext.Provider>
  );
};
