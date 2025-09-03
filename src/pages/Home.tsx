import { AppLayout } from "../layout/AppLayout";
import { useState } from "react";
import { ReservaView } from "../components/ReservasView";

function Home() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [activeDate, setActiveDate] = useState<Date | null>(null);

  const handleDateSelect = (dates: Date[] | undefined) => {
    setSelectedDates(dates ?? []);
    if (dates && dates.length > 0) {
      setActiveDate((prev) => (dates.includes(prev!) ? prev : dates[0]));
    } else {
      setActiveDate(null);
    }
  };

  return (
    <AppLayout>
      <ReservaView
        selectedDates={selectedDates}
        activeDate={activeDate}
        onDateSelect={handleDateSelect}
        onActiveDateChange={setActiveDate}
      />
    </AppLayout>
  );
}

export default Home;
