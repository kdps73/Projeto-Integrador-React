import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./css/index.css";
import "./css/resenha.css";
import { supabase } from "./supabase";

function Resenha() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState(null);

    // Estados adicionados para os comentários não quebrarem a página
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState("");
    const [toastXP, setToastXP] = useState(null);
    const usuarioLogado = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    // Estados do sistema de avaliações
    const [estatisticasLocais, setEstatisticasLocais] = useState({ count: 0, soma: 0 });
    const [notaUsuario, setNotaUsuario] = useState(null);
    const [hoverNota, setHoverNota] = useState(null);
    const [jaAvaliou, setJaAvaliou] = useState(false);

    const API_KEY = '168817e9845280fe6d28f3a939f4bc67';

    async function handleCurtir(comentId, jaCurtiu) {
        if (!usuarioLogado) {
            alert("Você precisa estar logado para curtir.");
            return;
        }

        const curtida = {
            id_usuario: Number(usuarioLogado.id),
            id_comentario: Number(comentId)
        };

        if (jaCurtiu) {
            const { error } = await supabase.from("curtidas").delete().match(curtida);
            if (!error) {
                fetchComentarios()
                ganhaXP(-5)
            }
            else console.error("Erro ao remover curtida:", error);
        } else {
            const { error } = await supabase.from("curtidas").insert(curtida);
            if (!error) {
                fetchComentarios()
                ganhaXP(5)
            }
            else console.error("Erro ao adicionar curtida:", error);
        }
    }

    async function handleUpdateFilme() {
        const filmeData = {
            id: Number(id),
            titulo: filme.title
        };

        const { error: errorFilme } = await supabase.from("filmes").upsert(filmeData);
        
        if(errorFilme) {
            console.error("Erro ao inserir/atualizar filme:", errorFilme);
        }
    }
    
    async function handlePublicarComentario(){
        handleUpdateFilme();

        const comentario = {
            id_filme: Number(id),
            id_usuario: Number(usuarioLogado.id),
            conteudo: novoComentario
        }

        const {error} = await supabase.from("comentarios").insert(comentario);

        if(error == null){
            setNovoComentario("")
            fetchComentarios()
            ganhaXP(15)
        }else{
            alert("Erro ao publicar comentário. Tente novamente.")
            console.log(error)
        }
    };

    async function ganhaXP(xp) {
        const { error } = await supabase.from("usuario").update({xp_total: Number(usuarioLogado.xp_total) + xp}).eq("id", usuarioLogado.id);
        if(error == null){
            console.log("XP adicionado com sucesso!");
            localStorage.setItem("user", JSON.stringify({ ...usuarioLogado, xp_total: Number(usuarioLogado.xp_total) + xp }));
            
            setToastXP({ xp, msg: xp > 0 ? `+${xp} XP Ganhos!` : `${xp} XP Perdidos` });
            setTimeout(() => setToastXP(null), 3100);
        }else{
            console.error(`Erro ao ganhar xp: ${error}`);
        }
    }

    async function fetchComentarios() {
        const {data, error} = await supabase.from("comentarios").select("*, usuario!comentarios_id_usuario_fkey(*), curtidas(*)").eq("id_filme", id).order("id", { ascending: false });
        if(error == null){
            setComentarios(JSON.parse(JSON.stringify(data)))
        }else{
            console.log(error)
        }
    }
    
    async function fetchMinhaAvaliacao() {
        if (!usuarioLogado) return;
        const { data, error } = await supabase.from('avaliacoes')
            .select('nota')
            .eq('id_filme', Number(id))
            .eq('id_usuario', Number(usuarioLogado.id))
            .single();
        if (data) {
            setNotaUsuario(data.nota);
            setJaAvaliou(true);
        } else {
            setNotaUsuario(null);
            setJaAvaliou(false);
        }
    }

    async function fetchEstatisticasLocais() {
        const { data, error } = await supabase.rpc('get_estatisticas_filme', {
            filme_id: Number(id)
        });

        if (!error && data && data.length > 0) {
            setEstatisticasLocais({
                count: Number(data[0].total_avaliacoes) || 0,
                soma: Number(data[0].soma_notas) || 0
            });
        }
    }

    async function submitRating(notaDada) {
        if (!usuarioLogado) {
            alert("Você precisa estar logado para avaliar.");
            return;
        }

        const avaliacao = {
            id_filme: Number(id),
            id_usuario: Number(usuarioLogado.id)
        };
        const notaAntiga = notaUsuario;

        if (jaAvaliou && notaDada === notaUsuario) {
            // Atualização Otimista
            setNotaUsuario(null);
            setJaAvaliou(false);
            setEstatisticasLocais(prev => ({
                count: prev.count - 1,
                soma: prev.soma - notaAntiga
            }));

            // Remover avaliação (clicou na mesma estrela)
            const { error } = await supabase.from('avaliacoes').delete().match(avaliacao);
            if (!error) {
                fetchEstatisticasLocais();
                ganhaXP(-20);
            } else {
                console.error("Erro ao remover avaliação:", error);
            }
        } else {
            const ehNova = !jaAvaliou;
            
            // Atualização Otimista
            setNotaUsuario(notaDada);
            setJaAvaliou(true);
            setEstatisticasLocais(prev => ({
                count: ehNova ? prev.count + 1 : prev.count,
                soma: prev.soma - (ehNova ? 0 : notaAntiga) + notaDada
            }));

            // Adicionar ou atualizar avaliação
            await handleUpdateFilme();

            if (!ehNova) {
                // Atualizar
                const { error } = await supabase.from('avaliacoes').update({ nota: notaDada }).match(avaliacao);
                if (!error) {
                    fetchEstatisticasLocais();
                } else {
                    console.error("Erro ao atualizar avaliação:", error);
                }
            } else {
                // Inserir nova
                const { error } = await supabase.from('avaliacoes').insert({ ...avaliacao, nota: notaDada });
                if (!error) {
                    fetchEstatisticasLocais();
                    ganhaXP(20);
                } else {
                    console.error("Erro ao adicionar avaliação:", error);
                }
            }
        }
    }

    async function fetchDetalhes() {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR&append_to_response=credits,release_dates&api_key=${API_KEY}`);
                const data = await res.json();
                setFilme(data);
                fetchEstatisticasLocais();
            } catch (err) {
                console.error(err);
            }
        }

    useEffect(() => {
        if(id) {
            fetchDetalhes()
            fetchComentarios()
            fetchMinhaAvaliacao()
        }
    }, [id]);

    if (!filme) return <p className="loading-message">Carregando...</p>;

    const tmdbVoteCount = filme.vote_count || 0;
    const tmdbVoteAverage = filme.vote_average || 0;
    const totalVotosFinal = tmdbVoteCount + estatisticasLocais.count;
    const mediaFinal = totalVotosFinal > 0 
        ? ((tmdbVoteAverage * tmdbVoteCount) + estatisticasLocais.soma) / totalVotosFinal 
        : tmdbVoteAverage;

    const certificacaoBR = filme.release_dates?.results?.find(r => r.iso_3166_1 === 'BR')?.release_dates[0]?.certification || '14+';
    const elenco = filme.credits?.cast?.slice(0, 4) || [];
    const backdropUrl = filme.backdrop_path ? `https://image.tmdb.org/t/p/original${filme.backdrop_path}` : '';
    const posterUrl = filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : 'https://placehold.co/420x630/1a1a1a/e50914?text=Sem+Poster';
    const duracaoH = Math.floor((filme.runtime || 0) / 60);
    const duracaoM = (filme.runtime || 0) % 60;

    const activeRating = hoverNota !== null ? hoverNota : (notaUsuario || 0);

    const getStarFillWidth = (starIndex) => {
        const fullValue = starIndex * 2;
        const halfValue = fullValue - 1;

        if (activeRating >= fullValue) return "100%";
        if (activeRating >= halfValue) return "50%";
        return "0%";
    };

    return (
        <>
            {toastXP && (
                <div className={`toast-xp ${toastXP.xp > 0 ? 'positivo' : 'negativo'}`}>
                    {toastXP.msg}
                </div>
            )}

            <button onClick={() => navigate(-1)} className="back-btn" aria-label="Voltar" style={{ position: 'fixed', top: '84px', left: '24px', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', padding: '8px', borderRadius: '50%', cursor: 'pointer', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)', transition: 'background 0.3s', width: 'fit-content', height: 'fit-content' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(229, 9, 20, 0.8)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
            </button>

            <section className="filme-hero" id="filme-hero" style={{ '--bg-image': backdropUrl ? `url(${backdropUrl})` : 'none' }}>
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
                            <div className="stars-row" onMouseLeave={() => setHoverNota(null)}>
                                {[1, 2, 3, 4, 5].map(starIndex => {
                                    const leftValue = starIndex * 2 - 1;
                                    const rightValue = starIndex * 2;
                                    const isActive = activeRating >= leftValue;
                                    
                                    return (
                                        <span 
                                            key={starIndex} 
                                            className={`star-rating-container ${isActive ? 'is-active' : ''}`}
                                        >
                                            <span className="star-base">★</span>
                                            <span 
                                                className="star-filled"
                                                style={{ width: getStarFillWidth(starIndex) }}
                                            >
                                                ★
                                            </span>
                                            <span 
                                                className="star-half star-half-left"
                                                onMouseEnter={() => setHoverNota(leftValue)}
                                                onClick={() => submitRating(leftValue)}
                                                title={`${leftValue / 2} estrelas`}
                                            />
                                            <span 
                                                className="star-half star-half-right"
                                                onMouseEnter={() => setHoverNota(rightValue)}
                                                onClick={() => submitRating(rightValue)}
                                                title={`${rightValue / 2} estrelas`}
                                            />
                                        </span>
                                    );
                                })}
                            </div>
                            <div className="media-nota">
                                <span className="estrela-media">★</span>
                                <span className="nota-numero">{mediaFinal !== null ? mediaFinal.toFixed(1) : (filme.vote_average ? filme.vote_average.toFixed(1) : 'N/A')}</span>
                                <span className="nota-total">/ 10</span>
                                <span className="nota-votos">({totalVotosFinal !== null ? totalVotosFinal : (filme.vote_count || 0)} votos)</span>
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

                        {elenco && elenco.length > 0 && (
                            <div className="elenco-bloco">
                                <h3 className="elenco-titulo">Elenco Principal</h3>
                                <ul className="elenco-lista">
                                    {elenco.map(ator => (
                                        <li className="elenco-item" key={ator.id}>
                                            <img
                                                src={ator.profile_path ? `https://image.tmdb.org/t/p/w185${ator.profile_path}` : 'https://placehold.co/56x56/2a2a2a/e50914?text=' + (ator.name ? ator.name.charAt(0) : '?')}
                                                alt={ator.name || 'Ator'}
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
                        <p className="no-comments-message">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
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
                            <p className="login-prompt-message">Você precisa estar logado para comentar. <Link to="/login" className="login-prompt-link">Entrar</Link></p>
                        )}
                    </div>
                </div>
            </section>


        </>
    );
}

export default Resenha;
