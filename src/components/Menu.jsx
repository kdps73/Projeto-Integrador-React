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
                <div className="navbar-container" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Link to="/" className="navbar-logo" id="logo-link">
                        <span className="logo-text">CiNEPLANNER</span>
                    </Link>

                    <ul className="navbar-links" style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                        <li>
                            <Link to="/#hero" className="nav-link">
                                Início
                            </Link>
                        </li>
                        <li>
                            <Link to="/#filmes" className="nav-link">
                                Filmes
                            </Link>
                        </li>
                        <li>
                            <Link to="/listas" className="nav-link active">
                                Listas
                            </Link>
                        </li>
                        {!user && (
                            <li>
                                <Link to="/usuario" className="nav-link">
                                    Usuário
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* Barra de pesquisa */}
                    <div style={{ flex: 0, display: 'flex', justifyContent: 'right', padding: '0px', position: 'relative' }}>
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
                                style={{ marginRight: '8px', minWidth: '16px' }}
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input
                                type="text"
                                placeholder="Pesquisar filmes..."
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

                    <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        {user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <Link to="/usuario" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#fff', gap: '10px' }}>
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #dc2626' }} />
                                    ) : (
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '1rem' }}>
                                            {userName.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{userName}</span>
                                </Link>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="btn-login"
                                id="btn-entrar"
                                style={{ marginLeft: '10px' }}
                            >
                                Entrar
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Menu;