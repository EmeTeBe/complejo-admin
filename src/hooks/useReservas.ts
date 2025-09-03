import { useContext } from "react";
import { ReservasContext } from "../context/ReservasContext";

export const useReservas = () => {
  const context = useContext(ReservasContext);
  if (!context) {
    throw new Error("useReservas debe usarse dentro de un ReservasProvider");
  }
  return context;
};
