import { useEffect, useMemo, useState } from "react";
import { mockCanchas } from "../mock/mockTurns";
import type { Reserva } from "../types/ReservasTypes";
import { useReservas } from "../hooks/useReservas";
import { Modal } from "./Modal";
import { Input } from "./Input";

type AvailableSlotsProps = { selectedDay: Date };

export const AvailableSlots = ({ selectedDay }: AvailableSlotsProps) => {
  const {
    reservas,
    loading,
    error,
    actualizarReserva,
    agregarReserva,
    eliminarReserva,
  } = useReservas();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
  });

  const [modalData, setModalData] = useState<
    | {
        open: boolean;
        modo: "ver" | "crear" | "editar";
        canchaId?: number;
        fechaHoraInicio?: string;
        reservaExistente?: Reserva;
      }
    | undefined
  >(undefined);

  // ✅ Fetch una sola vez al principio
  // ✅ Manejo de errores en caso de que se cargue la carga

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!modalData?.open) return;

    if (modalData.modo === "ver" && modalData.reservaExistente) {
      const { nombre, apellido, telefono } = modalData.reservaExistente.cliente;
      setFormData({ nombre, apellido, telefono });
    }

    if (modalData.modo === "crear") {
      setFormData({ nombre: "", apellido: "", telefono: "" });
    }
  }, [modalData]);

  return (
    <div className="mt-6 space-y-6">
      {loading && <p>Cargando...</p>}
      {error && <p className="text-principal">Error: {error}</p>}
      {mockCanchas.map((cancha) => (
        <div key={cancha.id} className="p-4 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-2">{cancha.nombre}</h3>
          <div className="flex flex-wrap max-w-md gap-2">
            {cancha.turnos.map((turno) => {
              const fechaHora = formatearFecha(selectedDay, turno.horaInicio);
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
                      setModalData({
                        open: true,
                        modo: "ver",
                        canchaId: cancha.id,
                        fechaHoraInicio: turno.horaInicio,
                        reservaExistente: turnoReservado,
                      });
                    } else {
                      setModalData({
                        open: true,
                        modo: "crear",
                        canchaId: cancha.id,
                        fechaHoraInicio: turno.horaInicio,
                      });
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
      {modalData?.open && (
        <Modal
          open={modalData.open}
          onClose={() => setModalData(undefined)}
          title={
            modalData.modo === "ver"
              ? "Detalles de la reserva"
              : modalData.modo === "editar"
              ? "Editar Reserva"
              : "Reservar Turno"
          }
          primaryLabel={
            modalData.modo === "ver"
              ? "Editar"
              : modalData.modo === "editar"
              ? "Guardar cambios"
              : "Guardar"
          }
          onPrimary={() => {
            if (!modalData) return;

            if (modalData.modo === "ver") {
              // Pasar a modo edición
              setModalData((prev) => prev && { ...prev, modo: "editar" });
              return;
            }

            if (modalData.modo === "crear") {
              const nuevaReserva: Reserva = {
                id: Date.now(), // simulamos ID único
                canchaId: modalData.canchaId!,
                fechaHoraInicio: formatearFecha(
                  selectedDay,
                  modalData.fechaHoraInicio!
                ),
                cliente: { ...formData },
                estado: "RESERVADA",
              };
              agregarReserva(nuevaReserva);
              setModalData(undefined);
              return;
            }

            if (modalData.modo === "editar" && modalData.reservaExistente) {
              const reservaActualizada: Reserva = {
                ...modalData.reservaExistente,
                cliente: { ...formData },
              };
              actualizarReserva(reservaActualizada.id, reservaActualizada);
              setModalData(undefined);
              return;
            }
          }}
          secondaryLabel={modalData.modo === "ver" ? "Eliminar" : "Cancelar"}
          onSecondary={() => {
            if (modalData?.modo === "ver" && modalData.reservaExistente) {
              eliminarReserva(modalData.reservaExistente.id);
            }
            setModalData(undefined);
          }}
        >
          {modalData.reservaExistente && (
            <div className="mb-4 space-y-1 text-sm text-gray-600">
              <p>
                <strong>Cancha:</strong> Cancha {modalData.canchaId}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {modalData.reservaExistente.fechaHoraInicio.split("T")[0]}
              </p>
              <p>
                <strong>Hora:</strong>{" "}
                {modalData.reservaExistente.fechaHoraInicio
                  .split("T")[1]
                  .slice(0, 5)}
              </p>
            </div>
          )}

          <form className="space-y-4">
            <Input
              id="nombre"
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              disabled={
                modalData.modo !== "editar" && modalData.modo !== "crear"
              }
            />
            <Input
              id="apellido"
              label="Apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              disabled={
                modalData.modo !== "editar" && modalData.modo !== "crear"
              }
            />
            <Input
              id="telefono"
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              disabled={
                modalData.modo !== "editar" && modalData.modo !== "crear"
              }
            />
          </form>
        </Modal>
      )}
    </div>
  );
};
