
// los datos que pide el back para el login
export interface LoginRequest {
  usuario: string;
  contraseña: string;
}

// lo que devuelve al hacer login
export interface LoginResponse {
  token: string;
  usuario: string;
}

// datos de administrador (usuario)
export interface AdminDTO {
  id: number;
  usuario: string;
}

export interface AdminRequest {
  usuario: string;
  contraseña: string;
}

export interface AuthContextType {
  adminId: number | null;
  token: string | null;
  loading: boolean;
  login: (dto: LoginRequest) => Promise<void>;
  logOut: () => void;
}
