// src/components/CalendarPicker.tsx
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type CalendarPickerProps = {
  selectedDate: Date[] | undefined;
  onDateSelect: (date: Date[] | undefined) => void;
};

export const CalendarPicker = ({
  selectedDate,
  onDateSelect,
}: CalendarPickerProps) => {
  return (
    <div className="custom-calendar p-2 rounded-xl shadow-md bg-gris-claro w-1/2 h-10/12 mt-6">
      <DayPicker
        mode="multiple"
        min={1}
        max={4}
        required
        animate
        disabled={{
          before: new Date(),
        }}
        selected={selectedDate}
        onSelect={onDateSelect}
        navLayout="around"
        locale={es}
        footer={
          selectedDate && selectedDate.length > 0 ? (
            <p className="text-sm mt-2 text-gris-oscuro">
              {selectedDate.length === 1
                ? "Día seleccionado: "
                : "Días seleccionados: "}
              {selectedDate
                .map((date) => date.toLocaleDateString("es-AR"))
                .join(", ")}
            </p>
          ) : (
            <p className="text-sm mt-2 text-gris-oscuro">
              No hay día seleccionado aún
            </p>
          )
        }
      />
    </div>
  );
};
