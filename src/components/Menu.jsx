import "../css/menu.css"
import { Link } from "react-router-dom";
function Menu() {
    return ( 
        <div>
            <nav className="navbar" id="navbar">
                <div className="navbar-container">
                    <a href="/index.html" className="navbar-logo" id="logo-link">
                        <span className="logo-text">CiNEPLANNER</span>
                    </a>
                    <ul className="navbar-links">
                        <li>
                            <Link to="/Inicio" className="nav-link">
                                Início
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="nav-link">
                                Filmes
                            </Link>
                        </li>
                       
                        <li>
                            <Link to="/listas" className="nav-link active">
                                Listas
                            </Link>
                        </li>
                        <li>
                            <Link to="/usuario" className="nav-link">
                                Usuário
                            </Link>
                        </li>
                    </ul>
                    <div className="navbar-actions">
                        <Link
                            to="Login.jsx"
                            className="btn-login"
                            id="btn-entrar"
                        >
                            Entrar
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
     );
}

export default Menu;