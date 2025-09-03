import { createContext } from "react";
import type { ReservasContextType } from "../types/Reservas.types";

export const ReservasContext = createContext<ReservasContextType | undefined>(
  undefined
);
