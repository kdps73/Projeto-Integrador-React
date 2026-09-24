import React, { useState, useEffect } from "react";
import "./css/index.css";
import "./css/resenha.css";
import { supabase } from "./supabse";

function Resenha() {
    const [filme, setFilme] = useState(null);
    const [elenco, setElenco] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [novoComentario, setNovoComentario] = useState("");
    const [minhaAvaliacao, setMinhaAvaliacao] = useState(null);

    // Obtém usuário do localStorage ou implementacao existente
    const [usuarioLogado, setUsuarioLogado] = useState(null);

    useEffect(() => {
        // Tenta obter o usuario pela implementacao atual (ex: localStorage)
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                // se usar supabase auth
                setUsuarioLogado(session.user);
            } else {
                // fallback para localStorage (caso use custom auth)
                const userString = localStorage.getItem("usuario");
                const userIdStr = localStorage.getItem("userId");
                if (userString) {
                    try { setUsuarioLogado(JSON.parse(userString)); } catch (e) { console.error(e); }
                } else if (userIdStr) {
                    setUsuarioLogado({ id: Number(userIdStr) });
                }
            }
        };
        checkUser();
    }, []);

    const urlParams = new URLSearchParams(window.location.search);
    const idFilmeParam = urlParams.get("id") || urlParams.get("id_filme") || 1; // Fallback para 1 para teste se nao houver

    const fetchData = async () => {
        setLoading(true);
        setErro(null);
        try {
            // Buscar Filme
            const { data: filmeData, error: filmeError } = await supabase
                .from("filmes")
                .select("*")
                .eq("id", idFilmeParam)
                .single();

            if (filmeError || !filmeData) {
                setErro("Filme não encontrado.");
                setLoading(false);
                return;
            }
            setFilme(filmeData);

            // Buscar Elenco
            const { data: elencoData, error: elencoError } = await supabase
                .from("elenco")
                .select("*")
                .eq("id_filme", idFilmeParam);
            if (!elencoError && elencoData) setElenco(elencoData);

            // Buscar Avaliações
            const { data: avaliacoesData, error: avaliacoesError } = await supabase
                .from("avaliacoes")
                .select("*")
                .eq("id_filme", idFilmeParam);
            if (!avaliacoesError && avaliacoesData) {
                setAvaliacoes(avaliacoesData);
                if (usuarioLogado) {
                    const minha = avaliacoesData.find(a => Number(a.id_usuario) === Number(usuarioLogado.id));
                    if (minha) setMinhaAvaliacao(minha.nota);
                }
            }

            carregarComentarios();

        } catch (error) {
            setErro("Erro ao carregar dados.");
        } finally {
            setLoading(false);
        }
    };

    const carregarComentarios = async () => {
        // Buscar Comentarios com Usuario e Curtidas
        const { data: comentariosData, error: comentariosError } = await supabase
            .from("comentarios")
            .select(`
                *,
                usuario (*),
                curtidas (id_usuario)
            `)
            .eq("id_filme", idFilmeParam)
            .order("criado", { ascending: false });
        if (!comentariosError && comentariosData) {
            setComentarios(comentariosData);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idFilmeParam, usuarioLogado]);

    const handleAvaliar = async (nota) => {
        if (!usuarioLogado) {
            alert("Você precisa estar logado para avaliar.");
            return;
        }
        try {
            const { data: existente } = await supabase
                .from("avaliacoes")
                .select("*")
                .eq("id_filme", idFilmeParam)
                .eq("id_usuario", usuarioLogado.id)
                .single();

            if (existente) {
                await supabase
                    .from("avaliacoes")
                    .update({ nota })
                    .eq("id", existente.id);
            } else {
                await supabase
                    .from("avaliacoes")
                    .insert([{ id_filme: idFilmeParam, id_usuario: usuarioLogado.id, nota }]);
            }
            setMinhaAvaliacao(nota);
            fetchData(); // Recarrega para atualizar a media
        } catch (error) {
            console.error("Erro ao avaliar:", error);
            alert("Erro ao salvar avaliação.");
        }
    };

    const handlePublicarComentario = async () => {
        if (!usuarioLogado) {
            alert("Você precisa estar logado para comentar.");
            return;
        }
        if (!novoComentario.trim()) return;

        try {
            const { error } = await supabase
                .from("comentarios")
                .insert([{ id_filme: idFilmeParam, id_usuario: usuarioLogado.id, conteudo: novoComentario }]);
            
            if (error) throw error;
            setNovoComentario("");
            carregarComentarios();
        } catch (error) {
            console.error("Erro ao publicar comentário:", error);
            alert("Erro ao publicar comentário.");
        }
    };

    const handleCurtir = async (id_comentario, jaCurtiu) => {
        if (!usuarioLogado) {
            alert("Você precisa estar logado para curtir.");
            return;
        }
        try {
            if (jaCurtiu) {
                await supabase
                    .from("curtidas")
                    .delete()
                    .eq("id_comentario", id_comentario)
                    .eq("id_usuario", usuarioLogado.id);
            } else {
                await supabase
                    .from("curtidas")
                    .insert([{ id_comentario, id_usuario: usuarioLogado.id }]);
            }
            carregarComentarios();
        } catch (error) {
            console.error("Erro ao curtir:", error);
        }
    };

    if (loading) return <div style={{ color: 'white', padding: '50px', textAlign: 'center' }}>Carregando dados...</div>;
    if (erro) return <div style={{ color: 'white', padding: '50px', textAlign: 'center' }}>{erro}</div>;
    if (!filme) return <div style={{ color: 'white', padding: '50px', textAlign: 'center' }}>Filme não encontrado.</div>;

    const mediaNota = avaliacoes.length > 0 
        ? (avaliacoes.reduce((acc, av) => acc + av.nota, 0) / avaliacoes.length).toFixed(1) 
        : 0;

    return (
        <>
            <nav className="navbar" id="navbar">
                <div className="navbar-container">
                    <a href="index.html" className="navbar-logo" id="logo-link">
                        <span className="logo-text">CiNEPLANNER</span>
                    </a>
                    <ul className="navbar-links">
                        <li><a href="index.html" className="nav-link">Início</a></li>
                        <li><a href="#" className="nav-link active">Filmes</a></li>
                        <li><a href="#" className="nav-link">Listas</a></li>
                        <li><a href="#" className="nav-link">Quiz</a></li>
                    </ul>
                    <div className="navbar-actions">
                        {usuarioLogado ? (
                             <span style={{color: 'white', marginRight: '15px'}}>{usuarioLogado.nome || usuarioLogado.username || "Logado"}</span>
                        ) : (
                            <a href="login.html" className="btn-login" id="btn-entrar">
                                Entrar
                            </a>
                        )}
                    </div>
                </div>
            </nav>

            <section className="filme-hero" id="filme-hero">
                <div className="filme-hero-inner">
                    <div className="poster-col">
                        <div className="poster-wrap">
                            <img
                                src={filme.poster_url || "https://placehold.co/420x630/1a1a1a/e50914?text=Poster"}
                                alt={`Poster de ${filme.titulo}`}
                                className="poster-img"
                                id="poster-principal"
                            />
                        </div>
                        <div className="poster-rating" id="poster-rating">
                            <div className="stars-row">
                                {[5, 4, 3, 2, 1].map((nota) => (
                                    <React.Fragment key={nota}>
                                        <input
                                            type="radio"
                                            name="avaliacao"
                                            id={`star${nota}`}
                                            value={nota}
                                            className="star-input"
                                            checked={minhaAvaliacao === nota}
                                            onChange={() => handleAvaliar(nota)}
                                        />
                                        <label
                                            htmlFor={`star${nota}`}
                                            className="star-label"
                                            title={`${nota} estrelas`}
                                        >
                                            ★
                                        </label>
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="media-nota">
                                <span className="estrela-media">★</span>
                                <span className="nota-numero">{mediaNota > 0 ? mediaNota : "-"}</span>
                                <span className="nota-total">/ 5</span>
                                <span className="nota-votos">({avaliacoes.length} votos)</span>
                            </div>
                        </div>
                    </div>

                    <div className="info-col" id="info-col">
                        <span className="filme-badge">{filme.franquia || "Independente"}</span>
                        <h1 className="filme-titulo">{filme.titulo}</h1>
                        <div className="filme-meta">
                            <span className="meta-item">{filme.ano_lancamento ? new Date(filme.ano_lancamento).getFullYear() : ""}</span>
                            <span className="meta-sep">·</span>
                            <span className="meta-item">{filme.duracao ? `${Math.floor(filme.duracao / 60)}h ${filme.duracao % 60}min` : ""}</span>
                            <span className="meta-sep">·</span>
                            <span className="meta-item">{filme.classificacao}</span>
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

export default Resenha;
