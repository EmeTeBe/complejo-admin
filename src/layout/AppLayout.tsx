import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 text-gray-800">
      <header className="bg-secundario anton-regular drop-shadow-md h-12 flex justify-center items-center w-full">
        <h1 className="text-2xl font-bold text-principal">MOLINO PADEL 360</h1>
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
