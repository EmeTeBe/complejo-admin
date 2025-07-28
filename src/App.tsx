import "./App.css";
import "./index.css"
import { AppLayout } from "./layout/AppLayout";
import { CalendarPicker } from "./components/CalendarPicker";
import { useState } from "react";
import { TabsSelector } from "./components/TabsSelector";
import { AvailableSlots } from "./components/AvailableSlots";
import LoginPage from "./pages/LoginPage";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);
  const [activeDate, setActiveDate] = useState<Date | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleDateSelect = (dates: Date[] | undefined) => {
    setSelectedDate(dates ?? []);
    if (dates && dates.length > 0) {
      setActiveDate((prev) => (dates.includes(prev!) ? prev : dates[0]));
    } else {
      setActiveDate(null);
    }
  };

  return (
    <AppLayout>
      {loggedIn ? (
        <div className="container mx-auto flex justify-around py-4 h-full">
          <CalendarPicker
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
          <div className="flex flex-col">
            {selectedDate.length > 0 && (
              <TabsSelector
                dates={selectedDate}
                activeDate={activeDate}
                onChange={setActiveDate}
              />
            )}
            {activeDate && <AvailableSlots dates={activeDate} />}
          </div>
        </div>
      ) : (
        <LoginPage onLoginSuccess={() => setLoggedIn(true)} />
      )}
    </AppLayout>
  );
}

export default App;
