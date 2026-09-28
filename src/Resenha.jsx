import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/index.css";
import "./css/resenha.css";
import { supabase } from "./supabase";

function Resenha() {
    
    const { id } = useParams();
    const [filme, setFilme] = useState(null);
    const API_KEY = '168817e9845280fe6d28f3a939f4bc67';

    useEffect(() => {
        async function fetchDetalhes() {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR&append_to_response=credits,release_dates&api_key=${API_KEY}`);
                const data = await res.json();
                setFilme(data);
            } catch (err) {
                console.error(err);
            }
        }
        if (id) fetchDetalhes();
    }, [id]);

    if (!filme) return <p style={{color: 'white', textAlign: 'center', marginTop: '100px'}}>Carregando...</p>;

    const certificacaoBR = filme.release_dates?.results?.find(r => r.iso_3166_1 === 'BR')?.release_dates[0]?.certification || '14+';
    const elenco = filme.credits?.cast?.slice(0, 4) || [];
    const backdropUrl = filme.backdrop_path ? `https://image.tmdb.org/t/p/original${filme.backdrop_path}` : '';
    const posterUrl = filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : 'https://placehold.co/420x630/1a1a1a/e50914?text=Sem+Poster';
    const duracaoH = Math.floor((filme.runtime || 0) / 60);
    const duracaoM = (filme.runtime || 0) % 60;

    return (
        <>
            <section className="filme-hero" id="filme-hero" style={{ backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="filme-hero-inner">
                    <div className="poster-col">
                        <div className="poster-wrap">
                            <img
                                src={posterUrl}
                                alt={`Poster do Filme ${filme.title}`}
                                className="poster-img"
                                id="poster-principal"
                            />
                        </div>
                        <div className="poster-rating" id="poster-rating">
                            <div className="stars-row">
                                {[5,4,3,2,1].map(num => (
                                    <span key={num} style={{display:'inline-flex', flexDirection:'row-reverse'}}>
                                        <input type="radio" name="avaliacao" id={`star${num}`} value={num} className="star-input" />
                                        <label htmlFor={`star${num}`} className="star-label" title={`${num} estrelas`}>★</label>
                                    </span>
                                ))}
                            </div>
                            <div className="media-nota">
                                <span className="estrela-media">★</span>
                                <span className="nota-numero">{filme.vote_average ? filme.vote_average.toFixed(1) : 'N/A'}</span>
                                <span className="nota-total">/ 10</span>
                                <span className="nota-votos">({filme.vote_count} votos)</span>
                            </div>
                        </div>
                    </div>

                    <div className="info-col" id="info-col">
                        <span className="filme-badge">{filme.genres && filme.genres.length > 0 ? filme.genres[0].name : 'Gênero'}</span>
                        <h1 className="filme-titulo">{filme.title}</h1>
                        <div className="filme-meta">
                            <span className="meta-item">{filme.release_date ? new Date(filme.release_date).getFullYear() : ''}</span>
                            <span className="meta-sep">·</span>
                            <span className="meta-item">{duracaoH}h {duracaoM}min</span>
                            <span className="meta-sep">·</span>
                            <span className="meta-item">{certificacaoBR}</span>
                        </div>
                        <p className="filme-sinopse">
                            {filme.overview || 'Sem sinopse disponível.'}
                        </p>
                        <div className="elenco-bloco">
                            <h3 className="elenco-titulo">Elenco Principal</h3>
                            <ul className="elenco-lista">
                                {elenco.map(ator => (
                                    <li className="elenco-item" key={ator.id}>
                                        <img
                                            src={ator.profile_path ? `https://image.tmdb.org/t/p/w185${ator.profile_path}` : 'https://placehold.co/56x56/2a2a2a/e50914?text=' + ator.name.charAt(0)}
                                            alt={ator.name}
                                            className="elenco-foto"
                                        />
                                        <div className="elenco-nomes">
                                            <span className="elenco-ator">{ator.name}</span>
                                            <span className="elenco-personagem">{ator.character}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p className="filme-sinopse">{filme.sinopse}</p>
                        
                        {elenco && elenco.length > 0 && (
                            <div className="elenco-bloco">
                                <h3 className="elenco-titulo">Elenco Principal</h3>
                                <ul className="elenco-lista">
                                    {elenco.map((ator, index) => (
                                        <li className="elenco-item" key={index}>
                                            <img
                                                src={ator.url_img || "https://placehold.co/56x56/2a2a2a/e50914?text=" + ator.ator.charAt(0)}
                                                alt={ator.ator}
                                                className="elenco-foto"
                                            />
                                            <div className="elenco-nomes">
                                                <span className="elenco-ator">{ator.ator}</span>
                                                <span className="elenco-personagem">
                                                    {Array.isArray(ator.personagens) ? ator.personagens.join(", ") : ator.personagens}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="hero-fade-bottom"></div>
            </section>


            <section className="comentarios-section" id="comentarios">
                <div className="comentarios-fade-top"></div>

                <div className="comentarios-inner">
                    <h2 className="comentarios-titulo">
                        Comentários <span className="comentarios-count">({comentarios.length})</span>
                    </h2>

                    {comentarios.length === 0 ? (
                        <p style={{color: '#888', marginBottom: '30px'}}>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
                    ) : (
                        comentarios.map((coment, index) => {
                            const jaCurtiu = usuarioLogado && coment.curtidas?.some(c => Number(c.id_usuario) === Number(usuarioLogado.id));
                            const qtyCurtidas = coment.curtidas?.length || 0;
                            const dataFormatada = new Date(coment.criado).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

                            return (
                                <div className="comentario-wrapper" id={`coment-wrapper-${coment.id}`} key={coment.id}>
                                    <div className="comentario-card" id={`coment-card-${coment.id}`}>
                                        <div className="coment-header">
                                            <div className="coment-user">
                                                <img
                                                    src={coment.usuario?.url_img || "https://placehold.co/44x44/2a2a2a/e50914?text=" + (coment.usuario?.nome || "U").charAt(0)}
                                                    alt="Foto de perfil"
                                                    className="user-avatar"
                                                />
                                                <div className="user-info">
                                                    <span className="user-nome">{coment.usuario?.nome || coment.usuario?.username || "Usuário"}</span>
                                                    <span className="user-data">{dataFormatada}</span>
                                                </div>
                                            </div>
                                            <div className="coment-curtidas">
                                                <input
                                                    type="checkbox"
                                                    id={`curtir-${coment.id}`}
                                                    className="curtir-input"
                                                    aria-label="Curtir comentário"
                                                    checked={jaCurtiu}
                                                    onChange={() => handleCurtir(coment.id, jaCurtiu)}
                                                />
                                                <label
                                                    htmlFor={`curtir-${coment.id}`}
                                                    className="curtir-btn"
                                                    id={`curtir-btn-${coment.id}`}
                                                >
                                                    <span className="icone-coracao">♡</span>
                                                    <span className="icone-coracao-cheio">♥</span>
                                                    <span className="curtidas-count">{qtyCurtidas}</span>
                                                </label>
                                            </div>
                                        </div>

                                        <p className="coment-texto">
                                            {coment.conteudo}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}

                    <div className="novo-comentario" id="novo-comentario">
                        <h3 className="novo-coment-titulo">Deixe seu comentário</h3>
                        {usuarioLogado ? (
                            <div className="novo-coment-form">
                                <img
                                    src={usuarioLogado.url_img || "https://placehold.co/48x48/2a2a2a/e50914?text=" + (usuarioLogado.nome || "E").charAt(0)}
                                    alt="Você"
                                    className="user-avatar"
                                />
                                <div className="novo-coment-campo">
                                    <textarea
                                        className="novo-coment-textarea"
                                        id="novo-coment-textarea"
                                        placeholder="O que você achou do filme? Compartilhe sua opinião…"
                                        rows="4"
                                        value={novoComentario}
                                        onChange={(e) => setNovoComentario(e.target.value)}
                                    ></textarea>
                                    <div className="novo-coment-actions">
                                        <span className="coment-dica">
                                            Seja respeitoso com outros cinéfilos.
                                        </span>
                                        <button
                                            type="button"
                                            className="btn-publicar"
                                            id="btn-publicar"
                                            onClick={handlePublicarComentario}
                                        >
                                            Publicar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p style={{color: '#888'}}>Você precisa estar logado para comentar. <a href="login.html" style={{color: '#e50914'}}>Entrar</a></p>
                        )}
                    </div>
                </div>
            </section>


        </>
    );
}

export default Resenha;
