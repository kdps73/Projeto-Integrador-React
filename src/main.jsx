import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
  import App from "./App.jsx";
  import Menu from "./components/Menu.jsx"
import Rodape from "./components/Rodape.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Menu/>
    <App />
    <Rodape/>
  </StrictMode>,
);
