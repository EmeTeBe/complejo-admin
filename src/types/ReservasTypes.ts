export type Cliente = {
  nombre: string;
  apellido: string;
  telefono: string;
};

export type Reserva = {
  id: number;
  canchaId: number;
  cliente: Cliente;
  fechaHoraInicio: string;
  estado: string;
};

export type ReservasContextType = {
  reservas: Reserva[];
  reservasPorFecha: Map<string, Reserva[]>;
  agregarReserva: (reserva: Reserva) => void;
  actualizarReserva: (id: number, reserva: Reserva) => void;
  eliminarReserva: (id: number) => void;
  loading: boolean;
  error: string | null;
};
