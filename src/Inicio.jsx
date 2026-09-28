import { Link } from "react-router-dom";
import { useState } from "react";
import "./css/index.css";
import Filmes from "./components/Filmes";
import Filtro from "./components/Filtro";
function Inicio() {
    const API_KEY = '168817e9845280fe6d28f3a939f4bc67';
    const BASE_URL = 'https://api.themoviedb.org/3';
    
    const [fetchUrl, setFetchUrl] = useState(`${BASE_URL}/movie/popular?language=pt-BR&api_key=${API_KEY}`);
    const [page, setPage] = useState(1);
    const [tituloSecao, setTituloSecao] = useState("Mais Populares");
    const [subtituloSecao, setSubtituloSecao] = useState("Ordenados por popularidade");

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
                        <Filtro 
                            nome="Gênero" 
                            opcoes={[
                                { label: "Ação", onClick: (e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`, "Ação", "Filmes cheios de adrenalina") },
                                { label: "Aventura", onClick: (e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=12&language=pt-BR&api_key=${API_KEY}`, "Aventura", "Exploração e grandes jornadas") },
                                { label: "Comédia", onClick: (e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`, "Comédia", "Para rir sem parar") },
                                { label: "Drama", onClick: (e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=18&language=pt-BR&api_key=${API_KEY}`, "Drama", "Histórias envolventes") },
                                { label: "Ficção Científica", onClick: (e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=878&language=pt-BR&api_key=${API_KEY}`, "Ficção Científica", "O futuro e além") },
                                { label: "Horror", onClick: (e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`, "Horror", "Sustos e tensão") },
                                { label: "Romance", onClick: (e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`, "Romance", "Histórias de amor") },
                                { label: "Suspense", onClick: (e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=53&language=pt-BR&api_key=${API_KEY}`, "Suspense", "Mistério do início ao fim") },
                                { label: "Animação", onClick: (e) => handleFiltro(e, `${BASE_URL}/discover/movie?with_genres=16&language=pt-BR&api_key=${API_KEY}`, "Animação", "Para todas as idades") },
                            ]}
                        />
                        
                        <Filtro 
                            nome="Mais Popular" 
                            opcoes={[
                                { label: "Esta semana", onClick: (e) => handleFiltro(e, `${BASE_URL}/trending/movie/week?language=pt-BR&api_key=${API_KEY}`, "Em Alta Esta Semana", "O que a galera está assistindo") },
                                { label: "Este mês", onClick: (e) => handleFiltro(e, `${BASE_URL}/movie/popular?language=pt-BR&api_key=${API_KEY}`, "Populares do Mês", "Os queridinhos do momento") },
                                { label: "Este ano", onClick: (e) => handleFiltro(e, `${BASE_URL}/discover/movie?sort_by=popularity.desc&primary_release_year=2026&language=pt-BR&api_key=${API_KEY}`, "Mais Populares de 2026", "Os melhores do ano") },
                                { label: "Todos os tempos", onClick: (e) => handleFiltro(e, `${BASE_URL}/movie/top_rated?language=pt-BR&api_key=${API_KEY}`, "Mais Bem Avaliados", "Clássicos aclamados") },
                            ]}
                        />

                        <Filtro 
                            nome="Lançamentos" 
                            opcoes={[
                                { label: "2026", onClick: (e) => handleFiltro(e, `${BASE_URL}/discover/movie?primary_release_year=2026&language=pt-BR&api_key=${API_KEY}`, "Lançamentos de 2026", "Filmes recentes deste ano") },
                                { label: "2025", onClick: (e) => handleFiltro(e, `${BASE_URL}/discover/movie?primary_release_year=2025&language=pt-BR&api_key=${API_KEY}`, "Lançamentos de 2025", "Filmes que marcaram o último ano") },
                                { label: "2024", onClick: (e) => handleFiltro(e, `${BASE_URL}/discover/movie?primary_release_year=2024&language=pt-BR&api_key=${API_KEY}`, "Lançamentos de 2024", "Os grandes filmes de 2024") },
                                { label: "2023", onClick: (e) => handleFiltro(e, `${BASE_URL}/discover/movie?primary_release_year=2023&language=pt-BR&api_key=${API_KEY}`, "Lançamentos de 2023", "Retrospectiva 2023") },
                            ]}
                        />

                        <Filtro 
                            nome="Em Cartaz" 
                            opcoes={[
                                { label: "Cinemas perto de mim", onClick: (e) => handleFiltro(e, `${BASE_URL}/movie/now_playing?region=BR&language=pt-BR&api_key=${API_KEY}`, "Em Cartaz", "Veja o que está rolando nos cinemas") },
                                { label: "Pré-venda / Em Breve", onClick: (e) => handleFiltro(e, `${BASE_URL}/movie/upcoming?region=BR&language=pt-BR&api_key=${API_KEY}`, "Em Breve", "Próximos lançamentos") },
                            ]}
                        />
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
