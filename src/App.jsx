import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu.jsx"
import Rodape from "./components/Rodape.jsx"
import Inicio from "./Inicio";
import Usuario from "./Usuario";
import Listas from "./Listas";
import Login from "./Login";
import Registro from "./Registro";
import Resenha from "./Resenha";
    return (
        <BrowserRouter>
            <Menu/>
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/resenhas" element={<Resenha/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cadastro" element={<Registro/>}/>
                <Route path="/usuario" element={<Usuario/>}/>
                <Route path="/listas" element={<Listas/>}/>
            </Routes>
            <Rodape/>
        </BrowserRouter>
    );
}

export default App;