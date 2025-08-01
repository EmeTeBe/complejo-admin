import { AvailableSlots } from "./AvailableSlots";
import { CalendarPicker } from "./CalendarPicker";
import { TabsSelector } from "./TabsSelector";


export const ReservaView = ({
  selectedDates,
  activeDate,
  onDateSelect,
  onActiveDateChange,
}: {
  selectedDates: Date[];
  activeDate: Date | null;
  onDateSelect: (dates: Date[] | undefined) => void;
  onActiveDateChange: (date: Date | null) => void;
}) => {
  return (
    <div className="container mx-auto flex justify-around py-4 h-full">
      <CalendarPicker
        selectedDates={selectedDates}
        onDateSelect={onDateSelect}
      />
      <div className="flex flex-col">
        {selectedDates.length > 0 && (
          <TabsSelector
            dates={selectedDates}
            activeDate={activeDate}
            onChange={onActiveDateChange}
          />
        )}
        {activeDate && <AvailableSlots selectedDay={activeDate} />}
      </div>
    </div>
  );
};
