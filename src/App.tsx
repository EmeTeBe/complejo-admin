import "./App.css";
import "./index.css";
import { ReservasProvider } from "./context/ReservasProvider";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <ReservasProvider>
      <AppRouter />
    </ReservasProvider>
  );
}

export default App;
