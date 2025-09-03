import { type AdminDTO } from "./Auth.types";

export type Cliente = {
  nombre: string;
  apellido: string;
  telefono: string;
};

export type Cancha = {
  id: number;
  nombre: string;
  activa: boolean;
};

export type Canchas = {
  id: number;
  nombre: string;
  turnos: Turno[];
};

export type Turno = {
  horaInicio: string;
  reservado: boolean;
  cliente?: Cliente;
};

export type EstadoReserva = "RESERVADA" | "EN_CURSO" | "FINALIZADA";

export type ModalData = {
  open: boolean;
  modo: "ver" | "crear" | "editar";
  fechaHoraInicio: string;
  canchaId: number;
  canchaNombre: string;
  reservaExistente?: ReservaDTO;
};

export type ReservasContextType = {
  reservas: ReservaDTO[];
  canchas: Canchas[];
  error: string | null;
  loading: boolean;
  cargarReservas: () => Promise<void>;
  cargarCanchas: () => Promise<void>;
  generarReserva: (
    dto: ReservaRequestDTO,
    token: string
  ) => Promise<ReservaDTO | null>;
  actualizarReserva: (
    id: number,
    dto: ReservaRequestDTO,
    token: string
  ) => Promise<ReservaDTO | null>;
  eliminarReserva: (id: number, token: string) => Promise<void>;
};

export interface ReservaDTO {
  id: number;
  fechaHoraInicio: string;
  estado: EstadoReserva;
  duracionMinutos: number;
  nombre: string;
  apellido: string;
  telefono: string;
  cancha: Cancha;
  administrador: AdminDTO;
}

export interface ApiResponse<T> {
  status: number;
  mensaje: string;
  data: T;
}

export interface ReservaRequestDTO {
  fechaHoraInicio: string;
  nombre: string;
  apellido: string;
  telefono: string;
  canchaId: number;
  administradorId: number;
}
