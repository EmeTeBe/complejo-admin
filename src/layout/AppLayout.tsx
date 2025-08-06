import type { ReactNode } from "react";
import { useNavigate } from "react-router";

type Props = {
  children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/", { replace: true });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 text-gray-800">
      <header className="bg-principal anton-regular drop-shadow-xl/20 h-16 flex px-7 max-md:px-2 w-full">
        <div className="container mx-auto justify-between flex w-full">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo-blanco.png"
              alt="Logo del complejo Molino Padel 360"
              className="h-16 w-auto"
            />
            <h1 className="text-2xl max-md:text-sm font-bold text-gris-claro text-center">
              MOLINO PADEL 360
            </h1>
          </div>
          <div className="flex items-center justify-center max-md:w-auto">
            <button
              onClick={handlelogout}
              className="bg-white text-principal max-md:text-[0.5rem] max-md:text-wrap font-semibold px-2 py-1 rounded-md hover:bg-red-100 border border-red-300 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto items-center justify-center p-0">
        {children}
      </main>
      <footer className="bg-white shadow p-1 text-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Molino Padel 360. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
};
