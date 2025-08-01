import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReservasProvider } from "./context/ReservasProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReservasProvider>
      <App />
    </ReservasProvider>
  </StrictMode>
);
