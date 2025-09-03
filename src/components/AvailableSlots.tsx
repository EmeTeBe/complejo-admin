import { useEffect, useMemo, useState } from "react";
import { useReservas } from "../hooks/useReservas";
import { Modal } from "./Modal";
import { Input } from "./Input";
import type {
  ReservaDTO,
  ModalData,
  ReservaRequestDTO,
} from "../types/Reservas.types";
import { useAuth } from "../hooks/useAuth";

type AvailableSlotsProps = { selectedDay: Date };

export const AvailableSlots = ({ selectedDay }: AvailableSlotsProps) => {
  const {
    reservas,
    canchas,
    loading,
    error,
    actualizarReserva,
    generarReserva,
    eliminarReserva,
  } = useReservas();

  const { adminId, token } = useAuth();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
  });

  const [modalData, setModalData] = useState<ModalData | undefined>(undefined);

  const formatearFecha = (date: Date, hora: string) => {
    // convierte "13:30" a "2025-07-17T13:30:00"
    const [hh, mm] = hora.split(":");
    const año = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}T${hh}:${mm}:00`;
  };

  const reservasPorFecha = useMemo(() => {
    const mapa = new Map<string, ReservaDTO>();

    reservas.forEach((reserva) => {
      if (reserva.estado === "RESERVADA") {
        const fechaNormalizada = reserva.fechaHoraInicio.slice(0, 16);
        mapa.set(`${reserva.cancha.id}-${fechaNormalizada}`, reserva);
      }
    });

    return mapa;
  }, [reservas]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // filtramos para que sean solo numeros en el telefono
    if (name === "telefono") {
      const soloNumeros = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: soloNumeros,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (!modalData?.open) return;

    if (modalData.modo === "ver" && modalData.reservaExistente) {
      const { nombre, apellido, telefono } = modalData.reservaExistente;
      setFormData({ nombre, apellido, telefono });
    }

    if (modalData.modo === "crear") {
      setFormData({ nombre: "", apellido: "", telefono: "" });
    }
  }, [modalData]);

  return (
    <div className="mt-6 space-y-6 max-md:px-1">
      {loading && (
        <p className="text-principal mx-auto text-center">Cargando...</p>
      )}
      {error && <p className="text-principal">Error: {error}</p>}
      {canchas.map((cancha) => (
        <div key={cancha.id} className="p-4 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-2">{cancha.nombre}</h3>
          <div className="flex flex-wrap max-w-md gap-2">
            {cancha.turnos.map((turno) => {
              const fechaHora = formatearFecha(selectedDay, turno.horaInicio);
              const fechaNormalizada = fechaHora.slice(0, 16);
              const key = `${cancha.id}-${fechaNormalizada}`;
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
                        fechaHoraInicio: turno.horaInicio,
                        reservaExistente: turnoReservado,
                        canchaId: cancha.id,
                        canchaNombre: cancha.nombre,
                      });
                    } else {
                      setModalData({
                        open: true,
                        modo: "crear",
                        fechaHoraInicio: turno.horaInicio,
                        canchaId: cancha.id,
                        canchaNombre: cancha.nombre,
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
              const nuevaReserva: ReservaRequestDTO = {
                canchaId: modalData.canchaId!,
                fechaHoraInicio: formatearFecha(
                  selectedDay,
                  modalData.fechaHoraInicio!
                ),
                administradorId: adminId!,
                nombre: formData.nombre,
                apellido: formData.apellido,
                telefono: formData.telefono,
              };
              generarReserva(nuevaReserva, token ? token : "").then(
                (reservaNueva) => {
                  if (reservaNueva) {
                    setModalData(
                      (prev) =>
                        prev && {
                          ...prev,
                          modo: "ver",
                          reservaExistente: reservaNueva,
                        }
                    );
                  }
                }
              );
              return;
            }

            if (modalData.modo === "editar" && modalData.reservaExistente) {
              const reservaActualizada: ReservaRequestDTO = {
                canchaId: modalData.reservaExistente.cancha.id,
                fechaHoraInicio: formatearFecha(
                  selectedDay,
                  modalData.fechaHoraInicio!
                ),
                administradorId: adminId!,
                nombre: formData.nombre,
                apellido: formData.apellido,
                telefono: formData.telefono,
              };
              actualizarReserva(
                modalData.reservaExistente.id,
                reservaActualizada,
                token ? token : ""
              ).then((reservaNuevaActualizada) => {
                if (reservaNuevaActualizada) {
                  setModalData(
                    (prev) =>
                      prev && {
                        ...prev,
                        modo: "ver",
                        reservaExistente: reservaNuevaActualizada,
                      }
                  );
                }
              });
              return;
            }
          }}
          secondaryLabel={modalData.modo === "ver" ? "Eliminar" : "Cancelar"}
          onSecondary={() => {
            if (modalData?.modo === "ver" && modalData.reservaExistente) {
              eliminarReserva(
                modalData.reservaExistente.id,
                token ? token : ""
              );
            }
            setModalData(undefined);
          }}
        >
          {(modalData.reservaExistente || modalData.modo === "crear") && (
            <div className="mb-4 space-y-1 text-sm text-gray-600">
              <p>
                <strong>Cancha:</strong>{" "}
                {modalData.reservaExistente
                  ? modalData.reservaExistente.cancha.nombre
                  : modalData.canchaNombre}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {modalData.reservaExistente
                  ? modalData.reservaExistente.fechaHoraInicio.split("T")[0]
                  : selectedDay.toISOString().split("T")[0]}
              </p>
              <p>
                <strong>Hora:</strong>{" "}
                {modalData.reservaExistente
                  ? modalData.reservaExistente.fechaHoraInicio
                      .split("T")[1]
                      .slice(0, 5)
                  : modalData.fechaHoraInicio}
              </p>
            </div>
          )}

          <form className="space-y-4">
            <Input
              type="text"
              id="nombre"
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              disabled={
                modalData.modo !== "editar" && modalData.modo !== "crear"
              }
            />
            <Input
              type="text"
              id="apellido"
              label="Apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              disabled={
                modalData.modo !== "editar" && modalData.modo !== "crear"
              }
            />
            <Input
              type="tel"
              id="telefono"
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              minLength={8}
              pattern="[0-9]{8}"
              required
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
