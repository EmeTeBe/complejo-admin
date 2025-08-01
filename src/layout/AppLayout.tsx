import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 text-gray-800">
      <header className="bg-principal anton-regular drop-shadow-xl/20 h-16 flex justify-center px-7 items-center w-full">
        <div className="flex items-center gap-2">
          <img
            src="/images/logo-blanco.png"
            alt="Logo del complejo Molino Padel 360"
            className="h-16 w-auto"
          />
        </div>
        <h1 className="text-2xl font-bold text-gris-claro text-center flex-1">
          MOLINO PADEL 360
        </h1>
        {/* Aquí irá el selector de fecha */}
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
