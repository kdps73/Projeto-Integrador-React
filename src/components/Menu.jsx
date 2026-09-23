import "../css/menu"
function Menu() {
    return ( 
        <div>
            <nav className="navbar" id="navbar">
                <div className="navbar-container">
                    <a href="frontend/index.html" className="navbar-logo" id="logo-link">
                        <span className="logo-text">CiNEPLANNER</span>
                    </a>
                    <ul className="navbar-links">
                        <li>
                            <a href="frontend/index.html" className="nav-link">
                                Início
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link">
                                Filmes
                            </a>
                        </li>
                        <li>
                            <a href="listas.html" className="nav-link active">
                                Listas
                            </a>
                        </li>
                        <li>
                            <a href="frontend/quiz.html" className="nav-link">
                                Usuário
                            </a>
                        </li>
                    </ul>
                    <div className="navbar-actions">
                        <a
                            href="frontend/registro.html"
                            className="btn-login"
                            id="btn-entrar"
                        >
                            Entrar
                        </a>
                    </div>
                </div>
            </nav>
        </div>
     );
}

export default Menu;