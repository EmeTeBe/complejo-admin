import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { EyeOpenIcon, EyeClosedIcon } from "../components/Icons";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [form, setForm] = useState({ usuario: "", contraseña: "" });
  const [error, setError] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const auth = useAuth();

  // Se fija si el form es válido cada vez que cambia
  useEffect(() => {
    const valid =
      form.usuario.trim() !== "" && form.contraseña.trim().length >= 6;
    setIsValid(valid);
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null); // limpia posible error
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      auth.login(form);
      return;
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="h-screen flex">
      <div className="flex-1 flex flex-col items-center justify-center bg-gris-claro">
        <div className="w-88 bg-white rounded-lg shadow-md/20">
          <div className="text-center pt-1.5 pb-1 min-h-24 border-b border-b-gray-200">
            <h1 className="text-2xl leading-21 font-semibold hidden md:block">
              INICIAR SESIÓN
            </h1>
            <img
              src="/images/logo-negro.png"
              alt="Logo Molino Padel 360"
              className="h-24 mx-auto block md:hidden leading-21"
            />
          </div>
          {error && (
            <p className="text-principal bg-principal/30 text-sm font-semibold text-center h-8 leading-8">
              {error}
            </p>
          )}
          {auth.loading && (
            <p className="text-gris-claro bg-gris-oscuro/30 text-sm font-semibold text-center h-8 leading-8">
              Cargando...
            </p>
          )}
          <form onSubmit={handleSubmit} className="w-full p-10 ">
            <Input
              id="usuario"
              name="usuario"
              className="border-t rounded-t-lg cursor-text"
              placeholder="USUARIO"
              type="text"
              value={form.usuario}
              onChange={handleChange}
            />

            <Input
              id="contraseña"
              name="contraseña"
              className="border-b rounded-b-lg cursor-text"
              placeholder="CONTRASEÑA"
              type={showPw ? "text" : "password"}
              value={form.contraseña}
              onChange={handleChange}
              iconRight={
                <button
                  type="button"
                  onClick={() => setShowPw((prev) => !prev)}
                  className="cursor-pointer"
                >
                  {showPw ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              }
            />

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full mt-4 h-12 rounded-lg border border-red-950 font-medium transition 
                ${
                  isValid
                    ? "bg-principal hover:bg-red-700 text-white cursor-pointer"
                    : "bg-principal text-white opacity-50 cursor-not-allowed pointer-events-none"
                }`}
            >
              INGRESAR
            </button>
          </form>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          ¿No tenés cuenta?{" "}
          <Link
            to="/signup"
            className="text-principal hover:text-red-700 font-semibold"
          >
            Registrate
          </Link>
        </p>
      </div>
      {/* Sección derecha: imagen e info */}
      <aside className="flex-1 bg-[url('/images/aside-login.jpg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-end p-2 text-center anton-regular max-md:hidden">
        <h2 className="text-3xl font-bold text-secundario ">
          Molino Padel 360
        </h2>
        <p className="text-secundario mt-4">Organizá turnos con facilidad</p>
      </aside>
    </div>
  );
};

export default LoginPage;
