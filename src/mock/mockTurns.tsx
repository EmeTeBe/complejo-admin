export type Turno = {
  horaInicio: string;
  reservado: boolean;
  nombre?: string;
  telefono?: string;
};

export interface Cancha {
  id: number;
  nombre: string;
  turnos: Turno[];
}

function generarTurnos(): Turno[] {
  const slots: Turno[] = [];
  let minutosTotales = 8 * 60; // 08:00 en minutos

  while (minutosTotales <= 24 * 60) {
    let hora = Math.floor(minutosTotales / 60);
    const minutos = minutosTotales % 60;

    // Si la hora es 24, mostremos como 00
    if (hora === 24) hora = 0;

    const hh = hora.toString().padStart(2, "0");
    const mm = minutos.toString().padStart(2, "0");

    slots.push({ horaInicio: `${hh}:${mm}`, reservado: false });
    minutosTotales += 90;
  }

  return slots;
}

export const mockCanchas: Cancha[] = [
  { id: 1, nombre: "Cancha 1", turnos: generarTurnos() },
  { id: 2, nombre: "Cancha 2", turnos: generarTurnos() },
];
