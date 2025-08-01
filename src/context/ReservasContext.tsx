import { createContext } from "react";
import type { ReservasContextType } from "../types/ReservasTypes";

export const ReservasContext = createContext<ReservasContextType | undefined>(
  undefined
);
