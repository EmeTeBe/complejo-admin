import { useEffect, useState, useMemo } from "react";
import { mockCanchas } from "../mock/mockTurns";

type Reserva = {
  id: number;
  canchaId: number;
  cliente: {
    nombre: string;
    apellido: string;
    telefono: string;
  };
  fechaHoraInicio: string;
  duracionMinutos: number;
  estado: string;
};

type AvailableSlotsProps = { dates: Date };

export const AvailableSlots = ({ dates }: AvailableSlotsProps) => {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  // ✅ Fetch una sola vez al principio
  // ✅ Manejo de errores en caso de que se cague la carga
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch("/mock-reservas.json");
        const data = await response.json();
        setReservas(data);
      } catch (err) {
        console.error("Error cargando reservas:", err);
      }
    };

    fetchReservas();
  }, []);

  const formatearFecha = (date: Date, hora: string) => {
    // convierte "13:30" a "2025-07-17T13:30:00"
    const [hh, mm] = hora.split(":");
    const año = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}T${hh}:${mm}:00`;
  };

  const reservasPorFecha = useMemo(() => {
    const mapa = new Map<string, Reserva>();

    reservas.forEach((reserva) => {
      if (reserva.estado === "RESERVADA") {
        mapa.set(`${reserva.canchaId}-${reserva.fechaHoraInicio}`, reserva);
      }
    });

    return mapa;
  }, [reservas]);

  return (
    <div className="mt-6 space-y-6">
      {mockCanchas.map((cancha) => (
        <div key={cancha.id} className="p-4 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-2">{cancha.nombre}</h3>
          <div className="flex flex-wrap gap-2">
            {cancha.turnos.map((turno) => {
              const fechaHora = formatearFecha(dates, turno.horaInicio);
              const key = `${cancha.id}-${fechaHora}`;
              const turnoReservado = reservasPorFecha.get(key);
              const reservado = !!turnoReservado;

              return (
                <button
                  key={turno.horaInicio}
                  className={`px-3 py-1 rounded ${
                    reservado
                      ? "bg-gray-400 text-gris-claro cursor-pointer"
                      : "bg-secundario text-gris-oscuro hover:bg-principal hover:text-gris-claro cursor-pointer"
                  } text-sm`}
                  onClick={() => {
                    if (reservado) {
                      const c = turnoReservado.cliente;
                      
                      alert(
                        `Reservado por: ${c.nombre} ${c.apellido}\nTel: ${c.telefono}`
                      );
                    } else {
                      alert("Abrir modal para reservar");
                    }
                  }}
                >
                  {turno.horaInicio}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
