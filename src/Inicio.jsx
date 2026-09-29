import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./css/index.css";
import Filmes from "./components/Filmes";


function Inicio() {
    const API_KEY = '168817e9845280fe6d28f3a939f4bc67';
    const BASE_URL = 'https://api.themoviedb.org/3';
    
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search");

    const [fetchUrl, setFetchUrl] = useState(`${BASE_URL}/movie/popular?language=pt-BR&api_key=${API_KEY}`);
    const [page, setPage] = useState(1);
    const [tituloSecao, setTituloSecao] = useState("Mais Populares");
    const [subtituloSecao, setSubtituloSecao] = useState("Ordenados por popularidade");


    useEffect(() => {
        if (searchQuery) {
            setFetchUrl(`${BASE_URL}/search/movie?query=${encodeURIComponent(searchQuery)}&language=pt-BR&api_key=${API_KEY}`);
            setTituloSecao(`Resultados para "${searchQuery}"`);
            setSubtituloSecao("Filmes encontrados");
            setPage(1);
        } else {
            // Restore default if no search
            setFetchUrl(`${BASE_URL}/movie/popular?language=pt-BR&api_key=${API_KEY}`);
            setTituloSecao("Mais Populares");
            setSubtituloSecao("Ordenados por popularidade");
            setPage(1);
        }
    }, [searchQuery]);

    const handleFiltro = (e, url, titulo, subtitulo) => {
        e.preventDefault();
        setFetchUrl(url);
        setPage(1);
        setTituloSecao(titulo);
        setSubtituloSecao(subtitulo);
    };

    return (
        <>
            <header className="hero" id="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">CiNEPLANNER</h1>
                    <h2 className="hero-subtitle">
                        Sua experiência cinematográfica começa aqui.
                    </h2>
                    <p className="hero-description">
                        Descubra os melhores filmes, leia resenhas e compartilhe sua opinião
                        com outros cinéfilos.
                    </p>
                    <a href="#filmes" className="hero-btn" id="btn-explorar">
                        Explorar Filmes
                    </a>
                </div>
                <div className="hero-scroll-indicator">
                    <span></span>
                </div>
            </header>

            <section className="filmes-section" id="filmes">
                <nav className="filtros-navbar" id="filtros-navbar">
                    <div className="filtros-container">
                        <div className="filtro-dropdown" id="filtro-genero">
                            <button className="filtro-btn" id="btn-genero">
                                Gênero
                                <svg
                                    className="dropdown-arrow"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 9L12 15L18 9"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <ul className="dropdown-menu" id="menu-genero">
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`, "Ação", "Filmes cheios de adrenalina")}>Ação</a></li>
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=12&language=pt-BR&api_key=${API_KEY}`, "Aventura", "Exploração e grandes jornadas")}>Aventura</a></li>
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`, "Comédia", "Para rir sem parar")}>Comédia</a></li>
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=18&language=pt-BR&api_key=${API_KEY}`, "Drama", "Histórias envolventes")}>Drama</a></li>
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=878&language=pt-BR&api_key=${API_KEY}`, "Ficção Científica", "O futuro e além")}>Ficção Científica</a></li>
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`, "Horror", "Sustos e tensão")}>Horror</a></li>
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=1074&language=pt-BR&api_key=${API_KEY}`, "Romance", "Histórias de amor")}>Romance</a></li>
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=53&language=pt-BR&api_key=${API_KEY}`, "Suspense", "Mistério do início ao fim")}>Suspense</a></li>
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=16&language=pt-BR&api_key=${API_KEY}`, "Animação", "Para todas as idades")}>Animação</a></li>
                            </ul>
                        </div>

                        <div className="filtro-dropdown" id="filtro-popular">
                            <button className="filtro-btn" id="btn-popular">
                                Mais Popular
                                <svg
                                    className="dropdown-arrow"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 9L12 15L18 9"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <ul className="dropdown-menu" id="menu-popular">
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/trending/movie/week?language=pt-BR&api_key=${API_KEY}`, "Em Alta Esta Semana", "O que a galera está assistindo")}>Esta semana</a></li>
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/movie/popular?language=pt-BR&api_key=${API_KEY}`, "Populares do Mês", "Os queridinhos do momento")}>Este mês</a></li>
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/discover/movie?sort_by=popularity.desc&primary_release_year=2026&language=pt-BR&api_key=${API_KEY}`, "Mais Populares de 2026", "Os melhores do ano")}>Este ano</a></li>
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/movie/top_rated?language=pt-BR&api_key=${API_KEY}`, "Mais Bem Avaliados", "Clássicos aclamados")}>Todos os tempos</a></li>
                            </ul>
                        </div>

                        <div className="filtro-dropdown" id="filtro-lancamentos">
                            <button className="filtro-btn" id="btn-lancamentos">
                                Lançamentos
                                <svg
                                    className="dropdown-arrow"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 9L12 15L18 9"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <ul className="dropdown-menu" id="menu-lancamentos">
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/discover/movie?primary_release_year=2026&language=pt-BR&api_key=${API_KEY}`, "Lançamentos de 2026", "Filmes recentes deste ano")}>2026</a></li>
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/discover/movie?primary_release_year=2025&language=pt-BR&api_key=${API_KEY}`, "Lançamentos de 2025", "Filmes que marcaram o último ano")}>2025</a></li>
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/discover/movie?primary_release_year=2024&language=pt-BR&api_key=${API_KEY}`, "Lançamentos de 2024", "Os grandes filmes de 2024")}>2024</a></li>
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/discover/movie?primary_release_year=2023&language=pt-BR&api_key=${API_KEY}`, "Lançamentos de 2023", "Retrospectiva 2023")}>2023</a></li>
                            </ul>
                        </div>

                        <div className="filtro-dropdown" id="filtro-cartaz">
                            <button className="filtro-btn" id="btn-cartaz">
                                Em Cartaz
                                <svg
                                    className="dropdown-arrow"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 9L12 15L18 9"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <ul className="dropdown-menu" id="menu-cartaz">
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/movie/now_playing?region=BR&language=pt-BR&api_key=${API_KEY}`, "Em Cartaz", "Veja o que está rolando nos cinemas")}>Cinemas perto de mim</a></li>
                                <li><a href="#" className="dropdown-item" onClick={(e) => handleFiltro(e, `${BASE_URL}/movie/upcoming?region=BR&language=pt-BR&api_key=${API_KEY}`, "Em Breve", "Próximos lançamentos")}>Pré-venda / Em Breve</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="section-header">
                    <h2 className="section-title">{tituloSecao}</h2>
                    <span className="section-subtitle">
                        {subtituloSecao}
                    </span>
                </div>

                <div className="filmes-grid" id="filmes-grid">
                    <Filmes fetchUrl={fetchUrl} page={page} />
                </div>

                <div style={{ textAlign: "center", marginTop: "2rem", marginBottom: "4rem" }}>
                    <button className="hero-btn" onClick={() => setPage(p => p + 1)}>
                        Ver Mais
                    </button>
                </div>
            </section>
        </>
    );
}

export default Inicio;
