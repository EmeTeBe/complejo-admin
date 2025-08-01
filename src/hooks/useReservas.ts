import { useContext } from "react";
import { ReservasContext } from "../context/ReservasContext";

export const useReservas = () => {
  const context = useContext(ReservasContext);
  if (context === undefined) {
    throw new Error("useReservas debe usarse dentro de <ReservasProvider>");
  }
  return context;
};
