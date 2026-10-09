import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu.jsx"
import Rodape from "./components/Rodape.jsx"
import Inicio from "./Inicio";
import Usuario from "./Usuario";
import Listas from "./Listas";
import Login from "./Login";
import Registro from "./Registro";
import Resenha from "./Resenha";
import Planos from "./Planos";

function App() {
    return (
        <BrowserRouter>
            <Menu/>
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/resenhas/:id" element={<Resenha/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cadastro" element={<Registro/>}/>
                <Route path="/usuario" element={<Usuario/>}/>
                <Route path="/usuario/:id" element={<Usuario/>}/>
                <Route path="/listas" element={<Listas/>}/>
                <Route path="/planos" element={<Planos/>}/>
            </Routes>
            <Rodape/>
        </BrowserRouter>
    );
}

export default App;