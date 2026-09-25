import { Link } from "react-router-dom";
import "../css/index.css";
import { useEffect, useState } from "react";
import supabase from "../services/supabase";

function Filmes(props) {
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
    )
}

export default Filmes;