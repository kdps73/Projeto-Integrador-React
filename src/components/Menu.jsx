import { useState, useEffect, useRef } from "react";
import "../css/menu.css";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Menu() {
    const [user, setUser] = useState(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try { return JSON.parse(userStr); } catch (e) { return null; }
        }
        return null;
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigate = useNavigate();
    const searchTimeoutRef = useRef(null);

    const API_KEY = '168817e9845280fe6d28f3a939f4bc67';
    const BASE_URL = 'https://api.themoviedb.org/3';

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter' && searchTerm.trim() !== '') {
            setShowSuggestions(false);
            // Redireciona para a home enviando o termo como query parameter (ex: /?search=Batman)
            navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (value.trim() === '') {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        searchTimeoutRef.current = setTimeout(async () => {
            try {
                const res = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(value.trim())}&language=pt-BR&api_key=${API_KEY}`);
                const data = await res.json();

                if (data.results && data.results.length > 0) {
                    setSuggestions(data.results.slice(0, 5)); // Mostra no máximo 5 sugestões
                    setShowSuggestions(true);
                } else {
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            } catch (error) {
                console.error("Erro ao buscar sugestões", error);
            }
        }, 300); // 300ms de debounce
    };

    useEffect(() => {
        const checkUser = () => {
            const userStr = localStorage.getItem("user");
            if (userStr) {
                try {
                    setUser(JSON.parse(userStr));
                } catch (e) {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        window.addEventListener("storage", checkUser);
        window.addEventListener("authChanged", checkUser);

        return () => {
            window.removeEventListener("storage", checkUser);
            window.removeEventListener("authChanged", checkUser);
        };
    }, []);


    const avatarUrl = user?.url_img;
    const userName = user?.nome || user?.username || user?.email?.split('@')[0] || "Usuário";

    return (
        <div>
            <nav className="navbar" id="navbar">
                <div className="navbar-container">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo" id="logo-link">
                        <span className="logo-text desktop-only">CiNEPLANNER</span>
                        <img src="/favicon.svg" alt="CiNEPLANNER" className="logo-favicon mobile-only" />
                    </Link>

                    {/* Links Desktop */}
                    <ul className="navbar-links desktop-only">
                        <li>
                            <Link to="/#hero" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                Início
                            </Link>
                        </li>
                        <li>
                            <Link to="/#filmes" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                Filmes
                            </Link>
                        </li>
                        <li>
                            <Link to="/listas" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                Listas
                            </Link>
                        </li>
                    </ul>

                    {/* Barra de pesquisa no centro */}
                    <div className="search-wrapper">
                        <div className={`search-container ${searchTerm ? 'has-text' : ''}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="25"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#dc2626"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="search-icon"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearchKeyDown}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                                className="search-input"
                            />

                            {showSuggestions && (
                                <ul className="search-suggestions">
                                    {suggestions.map((filme) => (
                                        <li key={filme.id} className="suggestion-item">
                                            <Link
                                                to={`/resenhas/${filme.id}`}
                                                className="suggestion-link"
                                                onClick={() => {
                                                    setShowSuggestions(false);
                                                    setSearchTerm('');
                                                }}
                                            >
                                                {filme.title} {filme.release_date ? `(${filme.release_date.substring(0, 4)})` : ''}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Ações Desktop (Perfil/Entrar) */}
                    <div className="navbar-actions desktop-only">
                        {user ? (
                            <Link to="/usuario" className="navbar-user-link">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Avatar" className="navbar-user-avatar" />
                                ) : (
                                    <div className="navbar-user-avatar-placeholder">
                                        {userName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <span className="navbar-user-name">{userName}</span>
                            </Link>
                        ) : (
                            <Link to="/login" className="btn-login">
                                Entrar
                            </Link>
                        )}
                    </div>

                    {/* Botão Menu Mobile */}
                    <button className={`mobile-menu-btn mobile-only ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Overlay com Blur */}
                <div className={`menu-overlay mobile-only ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>

                {/* Dropdown Mobile */}
                <div className={`navbar-dropdown mobile-only ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul className="navbar-links-dropdown">
                        <li>
                            <Link to="/#hero" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                Início
                            </Link>
                        </li>
                        <li>
                            <Link to="/#filmes" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                Filmes
                            </Link>
                        </li>
                        <li>
                            <Link to="/listas" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                Listas
                            </Link>
                        </li>
                        <li className="navbar-actions-dropdown">
                            {user ? (
                                <Link to="/usuario" className="navbar-user-link" onClick={() => setIsMobileMenuOpen(false)}>
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt="Avatar" className="navbar-user-avatar" />
                                    ) : (
                                        <div className="navbar-user-avatar-placeholder">
                                            {userName.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <span className="navbar-user-name">{userName}</span>
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="btn-login"
                                    id="btn-entrar"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Entrar
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Menu;