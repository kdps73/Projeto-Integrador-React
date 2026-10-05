import { Link } from "react-router-dom";
import "../css/index.css";
import { useEffect, useState } from "react";

function Filmes({ fetchUrl, page = 1 }) {
    const [filmes, setFilmes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const API_KEY = '168817e9845280fe6d28f3a939f4bc67';

    useEffect(() => {
        async function buscarListaDeFilmes() {
            if (page === 1 || filmes.length === 0) setCarregando(true);
            try {
                let listaBasica = [];
                
                if (filmes.length === 0 && page > 1) {
                    // Restoring state from URL, need to fetch all pages up to current
                    const promessas = [];
                    for (let p = 1; p <= page; p++) {
                        const finalUrl = fetchUrl.includes('?') ? `${fetchUrl}&page=${p}` : `${fetchUrl}?page=${p}`;
                        promessas.push(fetch(finalUrl).then(r => r.json()));
                    }
                    const resultados = await Promise.all(promessas);
                    resultados.forEach(dados => {
                        listaBasica = listaBasica.concat(dados.results || []);
                    });
                } else {
                    // Normal fetch (page 1 or loading next page)
                    const finalUrl = fetchUrl.includes('?') ? `${fetchUrl}&page=${page}` : `${fetchUrl}?page=${page}`;
                    const resp = await fetch(finalUrl);
                    const dados = await resp.json();
                    listaBasica = dados.results || [];
                }

                const promessasDeDetalhes = listaBasica.map(async (filme) => {
                    const urlDetalhes = `https://api.themoviedb.org/3/movie/${filme.id}?language=pt-BR&api_key=${API_KEY}`;
                    const resDetalhes = await fetch(urlDetalhes);
                    const detalhes = await resDetalhes.json();
                    
                    return {
                        id: detalhes.id,
                        titulo: detalhes.title,
                        avaliacao: detalhes.vote_average,
                        duracao: detalhes.runtime,
                        sinopse: detalhes.overview,
                        poster_url: detalhes.poster_path ? `https://image.tmdb.org/t/p/w500${detalhes.poster_path}` : null,
                        ano_lancamento: detalhes.release_date,
                        generos: detalhes.genres ? detalhes.genres.map(g => g.name).join(', ') : ''
                    };
                });

                const listaCompleta = await Promise.all(promessasDeDetalhes);
                
                if (page === 1 || filmes.length === 0) {
                    setFilmes(listaCompleta);
                } else {
                    setFilmes(prev => {
                        const prevIds = new Set(prev.map(f => f.id));
                        const novosFilmes = listaCompleta.filter(f => !prevIds.has(f.id));
                        return [...prev, ...novosFilmes];
                    });
                }
            } catch (erro) {
                console.error("Erro ao buscar a lista de filmes:", erro);
            } finally {
                setCarregando(false);
            }
        }

        if (fetchUrl) {
            buscarListaDeFilmes();
        }
    }, [fetchUrl, page]);

    useEffect(() => {
        if (filmes.length > 0 && !carregando) {
            const savedScroll = sessionStorage.getItem('cineplanner_scroll');
            if (savedScroll) {
                // Pequeno delay para garantir que a DOM renderizou os cards (imagens fixas ajudam)
                setTimeout(() => {
                    window.scrollTo({ top: parseInt(savedScroll), behavior: 'smooth' });
                    sessionStorage.removeItem('cineplanner_scroll');
                }, 100);
            }
        }
    }, [filmes, carregando]);

    return (
        <>
            {carregando ? (
                <p className="filmes-mensagem">Carregando filmes...</p>
            ) : filmes.length > 0 ? (
                filmes.map((filme) => (
                    <article className="filme-card" id={`card-filme-${filme.id}`} key={filme.id}>
                        <Link 
                            to={`/resenhas/${filme.id}`} 
                            className="card-link"
                            onClick={() => sessionStorage.setItem('cineplanner_scroll', window.scrollY)}
                        >
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
                                    {filme.generos}
                                </span>
                                <div className="card-nota">
                                    <span className="estrela" title="Avaliação">★</span>
                                    <span className="nota-valor">
                                        {filme.avaliacao ? filme.avaliacao.toFixed(1) : "N/A"}
                                        {filme.duracao ? ` | ${filme.duracao} min` : ""}
                                        {filme.ano_lancamento ? ` | ${new Date(filme.ano_lancamento).getFullYear()}` : ""}
                                    </span>
                                </div>
                                {filme.sinopse && (
                                    <p className="card-sinopse">
                                        {filme.sinopse}
                                    </p>
                                )}
                            </div>
                        </Link>
                    </article>
                ))
            ) : (
                <p className="filmes-mensagem">Nenhum filme encontrado.</p>
            )}
        </>
    )
}

export default Filmes;