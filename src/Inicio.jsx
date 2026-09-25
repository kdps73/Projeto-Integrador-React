import { useState, useEffect } from "react";
import { supabase } from "./supabse";
import "./css/index.css";

function Inicio() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        async function fetchFilmes() {
            const { data, error } = await supabase
                .from("filmes")
                .select("*")
                .order("id", { ascending: true });
            
            if (error) {
                console.error("Erro ao buscar filmes:", error);
            } else {
                setFilmes(data);
            }
        }
        
        fetchFilmes();
    }, []);
    return (
        <>
            <nav className="navbar" id="navbar">
                <div className="navbar-container">
                    <a href="Inicio.jsx" className="navbar-logo" id="logo-link">
                        <span className="logo-text">CiNEPLANNER</span>
                    </a>
                    <ul className="navbar-links">
                        <li>
                            <a href="Inicio.jsx" className="nav-link active">
                                Início
                            </a>
                        </li>
                        <li>
                            <a href="#filmesID" className="nav-link">
                                Filmes
                            </a>
                        </li>
                        <li>
                            <a href="Listas.jsx" className="nav-link">
                                Listas
                            </a>
                        </li>
                        <li>
                            <a href="Usuario.jsx" className="nav-link">
                                Usuario
                            </a>
                        </li>
                    </ul>
                    <div className="navbar-actions">
                        <a href="Login.jsx" className="btn-login" id="btn-entrar">
                            Entrar
                        </a>
                    </div>
                </div>
            </nav>

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
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Ação
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Aventura
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Comédia
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Drama
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Ficção Científica
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Horror
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Romance
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Suspense
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Animação
                                    </a>
                                </li>
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
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Esta semana
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Este mês
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Este ano
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Todos os tempos
                                    </a>
                                </li>
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
                                <li>
                                    <a href="#" className="dropdown-item">
                                        2026
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        2025
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        2024
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        2023
                                    </a>
                                </li>
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
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Cinemas perto de mim
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Pré-venda
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Estreias da semana
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="section-header">
                    <h2 className="section-title">Melhores Avaliados</h2>
                    <span className="section-subtitle">
                        Ordenados por nota · do maior para o menor
                    </span>
                </div>

                <div className="filmes-grid" id="filmesID">
                    {filmes.length > 0 ? (
                        filmes.map((filme) => (
                            <article className="filme-card" id={`card-filme-${filme.id}`} key={filme.id}>
                                <a href="resenha.html" className="card-link">
                                    <div className="card-poster">
                                        <img
                                            src={filme.poster_url || "https://placehold.co/300x450/1a1a1a/e50914?text=Sem+Poster"}
                                            alt={`Poster do Filme ${filme.titulo}`}
                                            className="poster-img"
                                        />
                                        <div className="card-overlay">
                                            <span className="card-overlay-text">Ver Detalhes</span>
                                        </div>
                                    </div>
                                    <div className="card-info">
                                        <h3 className="card-titulo">{filme.titulo}</h3>
                                        <span className="card-genero">
                                            {filme.classificacao} {filme.franquia ? ` | ${filme.franquia}` : ""}
                                        </span>
                                        <div className="card-nota">
                                            <span className="estrela" title="Duração">★</span>
                                            <span className="nota-valor">
                                                {filme.duracao} min {filme.ano_lancamento ? ` | ${new Date(filme.ano_lancamento).getFullYear()}` : ""}
                                            </span>
                                        </div>
                                        {filme.sinopse && (
                                            <p className="card-sinopse" style={{ fontSize: '0.8rem', marginTop: '8px', color: '#bbb', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {filme.sinopse}
                                            </p>
                                        )}
                                    </div>
                                </a>
                            </article>
                        ))
                    ) : (
                        <p style={{ color: "white", gridColumn: "1 / -1", textAlign: "center" }}>Carregando filmes...</p>
                    )}
                </div>
            </section>

            <footer className="footer" id="footer">
                <div className="footer-container">
                    <span className="footer-logo">CiNEPLANNER</span>
                    <p className="footer-copy">
                        &copy; 2026 CiNEPLANNER – Grupo Vermelho · Senac
                    </p>
                </div>
            </footer>
        </>
    );
}

export default Inicio;
