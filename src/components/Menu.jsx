import "../css/menu.css"
function Menu() {
    return ( 
        <div>
            <nav className="navbar" id="navbar">
                <div className="navbar-container">
                    <a href="/" className="navbar-logo" id="logo-link">
                        <span className="logo-text">CiNEPLANNER</span>
                    </a>
                    <ul className="navbar-links">
                        <li>
                            <a href="/" className="nav-link">
                                Início
                            </a>
                        </li>
                        <li>
                            <a href="/listas" className="nav-link">
                                Listas
                            </a>
                        </li>
                        <li>
                            <a href="/usuario" className="nav-link active">
                                Usuário
                            </a>
                        </li>
                    </ul>
                    <div className="navbar-actions">
                        <a
                            href="/cadastro"
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