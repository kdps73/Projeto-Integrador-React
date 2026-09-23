import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Rodape from "./components/Rodape.jsx";
  import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
