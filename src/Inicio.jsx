import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./css/index.css";
import Filmes from "./components/Filmes";
import Filtro from "./components/Filtro";
import Carousel3D from "./components/Carousel3D";

function Inicio() {

    const API_KEY = '168817e9845280fe6d28f3a939f4bc67';
    const BASE_URL = 'https://api.themoviedb.org/3';
    
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search");
    const { hash } = useLocation();

    const [fetchUrl, setFetchUrl] = useState(`${BASE_URL}/movie/popular?language=pt-BR&api_key=${API_KEY}`);
    const [page, setPage] = useState(1);
    const [tituloSecao, setTituloSecao] = useState("Mais Populares");
    const [subtituloSecao, setSubtituloSecao] = useState("Ordenados por popularidade");
    const [activeFilters, setActiveFilters] = useState([]);

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    const handleAddFilter = (filter) => {
        setActiveFilters(prev => {
            const exists = prev.find(f => f.id === filter.id);
            if (exists) return prev;

            if (filter.type === 'year') {
                return [...prev.filter(f => f.type !== 'year'), filter];
            }
            if (filter.type === 'special') {
                return [...prev.filter(f => f.type !== 'special'), filter];
            }
            return [...prev, filter];
        });
    };

    const handleRemoveFilter = (filterId) => {
        setActiveFilters(prev => prev.filter(f => f.id !== filterId));
    };

    useEffect(() => {
        if (searchQuery) {
            setFetchUrl(`${BASE_URL}/search/movie?query=${encodeURIComponent(searchQuery)}&language=pt-BR&api_key=${API_KEY}`);
            setTituloSecao(`Resultados para "${searchQuery}"`);
            setSubtituloSecao("Filmes encontrados");
            setPage(1);
            return;
        }

        if (activeFilters.length === 0) {
            setFetchUrl(`${BASE_URL}/movie/popular?language=pt-BR&api_key=${API_KEY}`);
            setTituloSecao("Mais Populares");
            setSubtituloSecao("Ordenados por popularidade");
            setPage(1);
            return;
        }

        const specialFilter = activeFilters.find(f => f.type === 'special');
        const hasOtherFilters = activeFilters.some(f => f.type !== 'special');

        if (specialFilter && !hasOtherFilters) {
            if (specialFilter.id === 'special-upcoming') {
                const today = new Date();
                const url = `${BASE_URL}/discover/movie?language=pt-BR&api_key=${API_KEY}&primary_release_date.gte=${today.toISOString().split('T')[0]}&with_release_type=2|3|4|5|6&region=BR&sort_by=popularity.desc`;
                setFetchUrl(url);
            } else {
                setFetchUrl(`${specialFilter.url}&api_key=${API_KEY}`);
            }
            setTituloSecao(specialFilter.titulo);
            setSubtituloSecao(specialFilter.subtitulo);
            setPage(1);
            return;
        }

        let url = `${BASE_URL}/discover/movie?language=pt-BR&api_key=${API_KEY}`;
        
        const genres = activeFilters.filter(f => f.type === 'genre').map(f => f.value).join('|');
        if (genres) {
            url += `&with_genres=${genres}`;
        }

        const year = activeFilters.find(f => f.type === 'year');
        if (year) {
            url += `&primary_release_year=${year.value}`;
        }

        if (specialFilter) {
            if (specialFilter.id === 'special-top') {
                url += `&sort_by=vote_average.desc&vote_count.gte=200`;
            } else if (specialFilter.id === 'special-week') {
                const lastWeek = new Date();
                lastWeek.setDate(lastWeek.getDate() - 7);
                url += `&primary_release_date.gte=${lastWeek.toISOString().split('T')[0]}&sort_by=popularity.desc`;
            } else if (specialFilter.id === 'special-month') {
                url += `&sort_by=popularity.desc`;
            } else if (specialFilter.id === 'special-now') {
                url += `&with_release_type=2|3&region=BR`;
            } else if (specialFilter.id === 'special-upcoming') {
                const today = new Date();
                url += `&primary_release_date.gte=${today.toISOString().split('T')[0]}&with_release_type=2|3&region=BR`;
            }
        }

        setFetchUrl(url);
        
        const labels = activeFilters.map(f => f.label).join(", ");
        setTituloSecao(`Filtros: ${labels}`);
        setSubtituloSecao("Resultados personalizados");
        setPage(1);
    }, [searchQuery, activeFilters]);

    return (
        <>
            <header className="hero" id="hero">
                <Carousel3D />
                <div className="hero-overlay"></div>
                <div className="hero-content hero-title-container" style={{ pointerEvents: 'none' }}>
                    <h1 className="hero-title" style={{ pointerEvents: 'auto' }}>CiNEPLANNER</h1>
                    
                </div>
                <div className="hero-content hero-desc-container" style={{ pointerEvents: 'none' }}>
                    <h2 className="hero-subtitle" style={{ pointerEvents: 'auto' }}>
                        Sua experiência cinematográfica começa aqui.
                    </h2>
                    <p className="hero-description" style={{ pointerEvents: 'auto' }}>
                        Descubra os melhores filmes, leia resenhas e compartilhe sua opinião
                        com outros cinéfilos.
                    </p>
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
                                { label: "Ação", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'genre-28', type: 'genre', value: '28', label: 'Ação' }); } },
                                { label: "Aventura", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'genre-12', type: 'genre', value: '12', label: 'Aventura' }); } },
                                { label: "Comédia", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'genre-35', type: 'genre', value: '35', label: 'Comédia' }); } },
                                { label: "Drama", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'genre-18', type: 'genre', value: '18', label: 'Drama' }); } },
                                { label: "Ficção Científica", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'genre-878', type: 'genre', value: '878', label: 'Ficção Científica' }); } },
                                { label: "Horror", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'genre-27', type: 'genre', value: '27', label: 'Horror' }); } },
                                { label: "Romance", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'genre-10749', type: 'genre', value: '10749', label: 'Romance' }); } },
                                { label: "Suspense", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'genre-53', type: 'genre', value: '53', label: 'Suspense' }); } },
                                { label: "Animação", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'genre-16', type: 'genre', value: '16', label: 'Animação' }); } },
                            ]}
                        />
                        
                        <Filtro 
                            nome="Mais Popular" 
                            opcoes={[
                                { label: "Esta semana", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'special-week', type: 'special', url: `${BASE_URL}/trending/movie/week?language=pt-BR`, titulo: "Em Alta Esta Semana", subtitulo: "O que a galera está assistindo", label: "Esta semana" }); } },
                                { label: "Este mês", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'special-month', type: 'special', url: `${BASE_URL}/movie/popular?language=pt-BR`, titulo: "Populares do Mês", subtitulo: "Os queridinhos do momento", label: "Este mês" }); } },
                                { label: "Todos os tempos", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'special-top', type: 'special', url: `${BASE_URL}/movie/top_rated?language=pt-BR`, titulo: "Mais Bem Avaliados", subtitulo: "Clássicos aclamados", label: "Todos os tempos" }); } },
                            ]}
                        />

                        <Filtro 
                            nome="Lançamentos" 
                            opcoes={[
                                { label: "2026", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'year-2026', type: 'year', value: '2026', label: "2026" }); } },
                                { label: "2025", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'year-2025', type: 'year', value: '2025', label: "2025" }); } },
                                { label: "2024", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'year-2024', type: 'year', value: '2024', label: "2024" }); } },
                                { label: "2023", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'year-2023', type: 'year', value: '2023', label: "2023" }); } },
                            ]}
                        />

                        <Filtro 
                            nome="Em Cartaz" 
                            opcoes={[
                                { label: "Cinemas perto de mim", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'special-now', type: 'special', url: `${BASE_URL}/movie/now_playing?region=BR&language=pt-BR`, titulo: "Em Cartaz", subtitulo: "Veja o que está rolando nos cinemas", label: "Em Cartaz" }); } },
                                { label: "Pré-venda / Em Breve", onClick: (e) => { e.preventDefault(); handleAddFilter({ id: 'special-upcoming', type: 'special', url: `${BASE_URL}/movie/upcoming?region=BR&language=pt-BR`, titulo: "Em Breve", subtitulo: "Próximos lançamentos", label: "Em Breve" }); } },
                            ]}
                        />
                    </div>
                    {activeFilters.length > 0 && (
                        <div className="active-filters-container">
                            {activeFilters.map(filter => (
                                <div key={filter.id} className="filter-pill">
                                    <span>{filter.label}</span>
                                    <button className="remove-filter-btn" onClick={() => handleRemoveFilter(filter.id)} aria-label="Remover filtro">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            <button className="clear-all-filters-btn" onClick={() => setActiveFilters([])}>Limpar tudo</button>
                        </div>
                    )}
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

                <div className="pagination-container">
                    <button className="hero-btn" onClick={() => setPage(p => p + 1)}>
                        Ver Mais
                    </button>
                </div>
            </section>
        </>
    );
}

export default Inicio;
