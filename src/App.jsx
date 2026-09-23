import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./Inicio";
import Usuario from "./Usuario";
import Listas from "./Listas";
import Login from "./Login";
import Registro from "./Registro";
import Resenha from "./Resenha";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/resenhas" element={<Resenha/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cadastro" element={<Registro/>}/>
                <Route path="/usuario" element={<Usuario/>}/>
                <Route path="/listas" element={<Listas/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;