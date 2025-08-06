import { useEffect, useState } from "react";
import { login } from "../services/authService";
import { Input } from "../components/Input";
import { EyeOpenIcon, EyeClosedIcon } from "../components/Icons";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  // Se fija si el form es válido cada vez que cambia
  useEffect(() => {
    const valid =
      form.username.trim() !== "" && form.password.trim().length >= 6;
    setIsValid(valid);
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null); // limpia posible error
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const success = await login(form.username, form.password);

    if (success) {
      navigate("/app");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="h-screen flex">
      <div className="flex-1 flex flex-col items-center justify-center bg-gris-claro">
        <div className="w-88 bg-white rounded-lg shadow-md/20">
          <div className="text-center pt-1.5 pb-1 min-h-24 border-b border-b-gray-200">
            {/* En pantallas md o más grandes → muestra el título */}
            <h1 className="text-2xl leading-21 font-semibold hidden md:block">
              INICIAR SESIÓN
            </h1>

            {/* En pantallas menores a md → muestra el logo */}
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
          <form onSubmit={handleSubmit} className="w-full p-10 ">
            <Input
              id="username"
              name="username"
              className="border-t rounded-t-lg cursor-text"
              placeholder="USUARIO"
              type="text"
              value={form.username}
              onChange={handleChange}
            />

            <Input
              id="password"
              name="password"
              className="border-b rounded-b-lg cursor-text"
              placeholder="CONTRASEÑA"
              type={showPw ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              onClick={() => setShowPw((prev) => !prev)}
              iconRight={showPw ? <EyeOpenIcon /> : <EyeClosedIcon />}
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
