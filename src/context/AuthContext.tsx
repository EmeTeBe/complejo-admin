import { createContext } from "react";
import type { AuthContextType } from "../types/Auth.types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);