import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./Inicio";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;