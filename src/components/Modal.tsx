// components/Modal.tsx
import { useEffect } from "react";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
};

export function Modal({
  open,
  onClose,
  title,
  children,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}: ModalProps) {
  // Manejo cierre con tecla Esc
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6 z-10">
        {title && <div className="text-lg font-semibold mb-4">{title}</div>}
        <div className="mb-6">{children}</div>
        <div className="flex justify-end gap-3">
          {secondaryLabel && (
            <button
              onClick={onSecondary ?? onClose}
              className="px-4 py-2 rounded-lg border cursor-pointer"
            >
              {secondaryLabel}
            </button>
          )}
          {primaryLabel && (
            <button
              onClick={onPrimary}
              className="px-4 py-2 rounded-lg bg-secundario text-gris-oscuro border cursor-pointer"
            >
              {primaryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
