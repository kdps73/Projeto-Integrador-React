import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
  import App from "./App.jsx";
  import Menu from "./components/Menu.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Menu/>
    <App />
  </StrictMode>,
);
