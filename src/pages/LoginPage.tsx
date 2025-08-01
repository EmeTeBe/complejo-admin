import { useState } from "react";
import { login } from "../services/authService";
import { Input } from "../components/Input";
import { EyeOpenIcon, EyeClosedIcon } from "../components/Icons";

type LoginPageProps = {
  onLoginSuccess: () => void;
};

type ErrorState = {
  username?: string;
  password?: string;
  general?: string;
};

const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<ErrorState>({});
  const [showPw, setShowPw] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: undefined })); // limpia posible error
  };

  const validate = () => {
    const errs: typeof error = {};
    if (!form.username) errs.username = "Usuario es requerido";
    if (!form.password) errs.password = "Contraseña es requerida";
    else if (form.password.length < 6)
      errs.password = "La contraseña debe tener al menos 6 caracteres";

    setError(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const success = await login(form.username, form.password);

    if (success) {
      onLoginSuccess();
    } else {
      setError((prev) => ({ ...prev, general: "Credenciales incorrectas" }));
    }
  };

  return (
    <div className="h-full flex">
      <div className="w-1/2 flex items-center justify-center bg-gris-claro">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-6 p-10 bg-white rounded-xl shadow-md/20"
        >
          <h2 className="text-2xl font-semibold text-center">Iniciar sesión</h2>

          <Input
            id="username"
            label="Usuario"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            error={error.username}
          />

          <Input
            id="password"
            label="Contraseña"
            name="password"
            type={showPw ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            onClick={() => setShowPw((prev) => !prev)}
            error={error.password}
            iconRight={showPw ? <EyeOpenIcon /> : <EyeClosedIcon />}
          />

          {error.general && (
            <p className="text-principal text-sm mt-2">{error.general}</p>
          )}

          <button
            type="submit"
            className="w-full bg-principal hover:bg-red-700 text-white font-medium py-2 rounded-lg transition border border-red-950"
          >
            Ingresar
          </button>
        </form>
      </div>
      {/* Sección derecha: imagen e info */}
      <aside className="w-1/2 bg-[url('/images/aside-login.jpg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-end p-10 text-center anton-regular">
        <h2 className="text-3xl font-bold text-secundario ">Molino Padel 360</h2>
        <p className="text-secundario mt-4">Organizá turnos con facilidad</p>
      </aside>
    </div>
  );
};

export default LoginPage;
