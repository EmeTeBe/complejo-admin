import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  label?: string;
  name: string;
  value: string;
  type?: string;
  classname?: string;
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  iconRight?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  label,
  name,
  value,
  type = "text",
  placeholder,
  className,
  error,
  onChange,
  onClick,
  required = false,
  iconRight,
  ...props
}: Props) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gris-oscuro"
        >
          {label}
        </label>
      )}
      {error && <p className="mt-1 text-sm text-principal">{error}</p>}
      <div className="relative">
        <input
          name={name}
          id={name}
          value={value}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={twMerge(
            `block w-full p-3.5 text-sm border-r border-l shadow-sm focus:outline-none focus:ring-2 + ${className}`,
            error
              ? "border-principal focus:ring-secundario"
              : "border-gray-300 focus:ring-secundario"
          )}
          {...props}
        />

        {iconRight && (
          <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
            <span onClick={onClick}>{iconRight}</span>
          </div>
        )}
      </div>
    </div>
  );
};
