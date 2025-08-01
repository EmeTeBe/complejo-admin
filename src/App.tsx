import "./App.css";
import "./index.css";
import { AppLayout } from "./layout/AppLayout";
import { useState } from "react";
import { ReservaView } from "./components/ReservasView";
import LoginPage from "./pages/LoginPage";

function App() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [activeDate, setActiveDate] = useState<Date | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

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
      {loggedIn ? (
        <ReservaView
          selectedDates={selectedDates}
          activeDate={activeDate}
          onDateSelect={handleDateSelect}
          onActiveDateChange={setActiveDate}
        />
      ) : (
        <LoginPage onLoginSuccess={() => setLoggedIn(true)} />
      )}
    </AppLayout>
  );
}

export default App;
