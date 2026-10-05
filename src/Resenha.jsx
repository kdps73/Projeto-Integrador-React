import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./css/index.css";
import "./css/resenha.css";
import { supabase } from "./supabase";
import playlistIcon from "./assets/playlist_icon.svg";

function obterUrlItem(caminhoOuUrl) {
    if (!caminhoOuUrl) return null;
    if (typeof caminhoOuUrl !== "string") return null;

    if (caminhoOuUrl.startsWith("http://") || caminhoOuUrl.startsWith("https://")) {
        return caminhoOuUrl;
    }

    if (caminhoOuUrl.startsWith("./") || caminhoOuUrl.startsWith("/")) {
        return caminhoOuUrl;
    }

    if (supabase) {
        if (caminhoOuUrl.startsWith("profile/") || caminhoOuUrl.startsWith("profile:")) {
            const nomeArquivo = caminhoOuUrl.replace(/^profile[\/:]/, "");
            const { data } = supabase.storage.from("profile").getPublicUrl(nomeArquivo);
            return data?.publicUrl || caminhoOuUrl;
        }

        const nomeArquivo = caminhoOuUrl.startsWith("itens/")
            ? caminhoOuUrl.replace(/^itens\//, "")
            : caminhoOuUrl;

        const { data } = supabase.storage.from("itens").getPublicUrl(nomeArquivo);
        return data?.publicUrl || caminhoOuUrl;
    }
    return caminhoOuUrl || null;
}

function Resenha() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState(null);

    // Estados adicionados para os comentários não quebrarem a página
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState("");
    const [toastXP, setToastXP] = useState(null);
    const usuarioLogado = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const [perfilUsuarioLogado, setPerfilUsuarioLogado] = useState(null);

    // Estados do sistema de avaliações
    const [estatisticasLocais, setEstatisticasLocais] = useState({ count: 0, soma: 0 });
    const [notaUsuario, setNotaUsuario] = useState(null);
    const [hoverNota, setHoverNota] = useState(null);
    const [jaAvaliou, setJaAvaliou] = useState(false);

    // Estados de Favoritos e Playlists do Usuário
    const [favoritos, setFavoritos] = useState([]);
    const [assistirMaisTarde, setAssistirMaisTarde] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [filmeParaModal, setFilmeParaModal] = useState(null);
    const [isCriandoPlaylist, setIsCriandoPlaylist] = useState(false);
    const [novaPlaylistNome, setNovaPlaylistNome] = useState("");

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

        if (errorFilme) {
            console.error("Erro ao inserir/atualizar filme:", errorFilme);
        }
    }

    async function handlePublicarComentario() {
        handleUpdateFilme();

        const comentario = {
            id_filme: Number(id),
            id_usuario: Number(usuarioLogado.id),
            conteudo: novoComentario
        }

        const { error } = await supabase.from("comentarios").insert(comentario);

        if (error == null) {
            setNovoComentario("")
            fetchComentarios()
            ganhaXP(15)
        } else {
            alert("Erro ao publicar comentário. Tente novamente.")
            console.log(error)
        }
    };

    async function ganhaXP(xp) {
        const { error } = await supabase.from("usuario").update({ xp_total: Number(usuarioLogado.xp_total) + xp }).eq("id", usuarioLogado.id);
        if (error == null) {
            console.log("XP adicionado com sucesso!");
            localStorage.setItem("user", JSON.stringify({ ...usuarioLogado, xp_total: Number(usuarioLogado.xp_total) + xp }));

            setToastXP({ xp, msg: xp > 0 ? `+${xp} XP Ganhos!` : `${xp} XP Perdidos` });
            setTimeout(() => setToastXP(null), 3100);
        } else {
            console.error(`Erro ao ganhar xp: ${error}`);
        }
    }

    async function fetchComentarios() {
        const { data, error } = await supabase.from("comentarios").select("*, usuario!comentarios_id_usuario_fkey(*, id_item_chapeu(*), id_item_mao(*), id_item_mascote(*)), curtidas(*)").eq("id_filme", id).order("id", { ascending: false });
        if (error == null) {
            setComentarios(JSON.parse(JSON.stringify(data)))
        } else {
            console.log(error)
        }
    }

    async function fetchMinhaAvaliacao() {
        if (!usuarioLogado) return;
        const { data } = await supabase.from('avaliacoes')
            .select('nota')
            .eq('id_filme', Number(id))
            .eq('id_usuario', Number(usuarioLogado.id))
            .maybeSingle();
        if (data) {
            setNotaUsuario(data.nota);
            setJaAvaliou(true);
        } else {
            setNotaUsuario(null);
            setJaAvaliou(false);
        }
    }

    async function fetchEstatisticasLocais() {
        if (!supabase || !id) return;
        try {
            const { data, error } = await supabase
                .from('avaliacoes')
                .select('nota')
                .eq('id_filme', Number(id));

            if (!error && data) {
                const count = data.length;
                const soma = data.reduce((acc, curr) => acc + (Number(curr.nota) || 0), 0);
                setEstatisticasLocais({ count, soma });
            }
        } catch (e) {
            console.warn("Erro ao buscar estatísticas locais:", e);
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
        if (id) {
            fetchDetalhes()
            fetchComentarios()
            fetchMinhaAvaliacao()
        }
    }, [id]);

    useEffect(() => {
        async function carregarPerfilLogado() {
            if (supabase && usuarioLogado?.id) {
                const { data } = await supabase
                    .from("usuario")
                    .select("*, id_item_chapeu(*), id_item_mao(*), id_item_mascote(*)")
                    .eq("id", usuarioLogado.id)
                    .maybeSingle();
                if (data) setPerfilUsuarioLogado(data);
            }
        }
        carregarPerfilLogado();
    }, [usuarioLogado?.id]);

    // =========================================================
    // LÓGICA DE FAVORITOS E PLAYLISTS DO USUÁRIO NA RESENHA
    // =========================================================
    // =========================================================
    // LÓGICA DE FAVORITOS E PLAYLISTS DO USUÁRIO NA RESENHA
    // =========================================================
    const getUsuarioLogado = () => {
        const u = localStorage.getItem("user");
        return u ? JSON.parse(u) : usuarioLogado;
    };

    useEffect(() => {
        async function carregarPlaylistsUsuario() {
            const u = getUsuarioLogado();
            if (!u || !u.id || !supabase) return;
            const currentUserId = Number(u.id);

            try {
                const { data: dadosPlaylists, error } = await supabase
                    .from('playlists')
                    .select('*')
                    .eq('id_usuario', currentUserId);

                if (!error && dadosPlaylists) {
                    const favPlaylists = dadosPlaylists.filter(p => p.nome === "Favoritos");
                    let fav = favPlaylists.find(p => p.filmes && Array.isArray(p.filmes) && p.filmes.length > 0) || favPlaylists[0];

                    if (favPlaylists.length > 1) {
                        const todosFilmesFav = favPlaylists.flatMap(p => p.filmes || []);
                        const favDeduplicado = Array.from(new Map(todosFilmesFav.map(f => [Number(f.id), f])).values());
                        if (fav) fav.filmes = favDeduplicado;
                        const dupIds = favPlaylists.filter(p => p.id !== fav?.id).map(p => p.id);
                        if (fav) await supabase.from('playlists').update({ filmes: favDeduplicado }).eq('id', fav.id);
                        if (dupIds.length > 0) await supabase.from('playlists').delete().in('id', dupIds);
                    }

                    const watchPlaylists = dadosPlaylists.filter(p => p.nome === "Assistir Mais Tarde");
                    let watch = watchPlaylists.find(p => p.filmes && Array.isArray(p.filmes) && p.filmes.length > 0) || watchPlaylists[0];

                    if (watchPlaylists.length > 1) {
                        const todosFilmesWatch = watchPlaylists.flatMap(p => p.filmes || []);
                        const watchDeduplicado = Array.from(new Map(todosFilmesWatch.map(f => [Number(f.id), f])).values());
                        if (watch) watch.filmes = watchDeduplicado;
                        const dupIds = watchPlaylists.filter(p => p.id !== watch?.id).map(p => p.id);
                        if (watch) await supabase.from('playlists').update({ filmes: watchDeduplicado }).eq('id', watch.id);
                        if (dupIds.length > 0) await supabase.from('playlists').delete().in('id', dupIds);
                    }

                    // Garante existência da playlist Favoritos no Supabase
                    if (!fav) {
                        const { data: novaFav } = await supabase
                            .from('playlists')
                            .insert([{ id_usuario: currentUserId, nome: "Favoritos", filmes: [] }])
                            .select()
                            .single();
                        if (novaFav) fav = novaFav;
                    }

                    // Garante existência da playlist Assistir Mais Tarde no Supabase
                    if (!watch) {
                        const { data: novaWatch } = await supabase
                            .from('playlists')
                            .insert([{ id_usuario: currentUserId, nome: "Assistir Mais Tarde", filmes: [] }])
                            .select()
                            .single();
                        if (novaWatch) watch = novaWatch;
                    }

                    setFavoritos(fav?.filmes || []);
                    setAssistirMaisTarde(watch?.filmes || []);
                    setPlaylists(dadosPlaylists.filter(p => p.nome !== "Favoritos" && p.nome !== "Assistir Mais Tarde"));
                }
            } catch (err) {
                console.warn("Erro ao carregar playlists do usuário:", err);
            }
        }
        if (id) {
            carregarPlaylistsUsuario();
        }
    }, [id]);

    const obterObjetoFilme = () => {
        if (!filme) return null;
        return {
            id: Number(filme.id),
            titulo: filme.title || filme.titulo || "",
            poster_url: filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : (filme.poster_url || null),
            avaliacao: filme.vote_average || filme.avaliacao || 0,
            duracao: filme.runtime || filme.duracao || 0,
            sinopse: filme.overview || filme.sinopse || "",
            ano_lancamento: filme.release_date || filme.ano_lancamento || "",
            generos: filme.genres
                ? (Array.isArray(filme.genres)
                    ? filme.genres.map(g => (typeof g === 'object' ? g.name : g)).join(', ')
                    : filme.genres)
                : (filme.generos || '')
        };
    };

    const eFavorito = (filmeId) => favoritos.some(f => Number(f.id) === Number(filmeId));
    const naWatchlist = (filmeId) => assistirMaisTarde.some(f => Number(f.id) === Number(filmeId));
    const estaEmAlgumaPlaylist = (filmeId) => {
        if (naWatchlist(filmeId)) return true;
        return playlists.some(p => p.filmes && p.filmes.some(f => Number(f.id) === Number(filmeId)));
    };

    const toggleFavorito = async () => {
        const u = getUsuarioLogado();
        if (!u || !u.id) {
            alert("Você precisa estar logado para favoritar este filme.");
            return;
        }
        const fObj = obterObjetoFilme();
        if (!fObj) return;

        const currentUserId = Number(u.id);
        const jaEFavorito = eFavorito(fObj.id);
        const novaLista = jaEFavorito
            ? favoritos.filter(f => Number(f.id) !== Number(fObj.id))
            : [fObj, ...favoritos.filter(f => Number(f.id) !== Number(fObj.id))];

        setFavoritos(novaLista);

        // Feedback toast na tela
        setToastXP({ xp: 0, msg: jaEFavorito ? "Removido dos Favoritos" : "Adicionado aos Favoritos!" });
        setTimeout(() => setToastXP(null), 2500);

        if (supabase && currentUserId) {
            try {
                const { data: listFav } = await supabase
                    .from('playlists')
                    .select('id')
                    .eq('id_usuario', currentUserId)
                    .eq('nome', 'Favoritos');

                if (listFav && listFav.length > 0) {
                    await supabase
                        .from('playlists')
                        .update({ filmes: novaLista })
                        .eq('id', listFav[0].id);

                    if (listFav.length > 1) {
                        const dupIds = listFav.slice(1).map(p => p.id);
                        await supabase.from('playlists').delete().in('id', dupIds);
                    }
                } else {
                    await supabase
                        .from('playlists')
                        .insert([{
                            id_usuario: currentUserId,
                            nome: 'Favoritos',
                            filmes: novaLista
                        }]);
                }
            } catch (err) {
                console.warn("Erro ao salvar favoritos no Supabase:", err);
            }
        }
    };

    const toggleAssistirMaisTarde = async () => {
        const u = getUsuarioLogado();
        if (!u || !u.id) {
            alert("Você precisa estar logado para adicionar este filme à playlist.");
            return;
        }
        const fObj = obterObjetoFilme();
        if (!fObj) return;

        const currentUserId = Number(u.id);
        const jaEsta = naWatchlist(fObj.id);
        const novaLista = jaEsta
            ? assistirMaisTarde.filter(f => Number(f.id) !== Number(fObj.id))
            : [fObj, ...assistirMaisTarde.filter(f => Number(f.id) !== Number(fObj.id))];

        setAssistirMaisTarde(novaLista);

        if (supabase && currentUserId) {
            try {
                const { data: listWatch } = await supabase
                    .from('playlists')
                    .select('id')
                    .eq('id_usuario', currentUserId)
                    .eq('nome', 'Assistir Mais Tarde');

                if (listWatch && listWatch.length > 0) {
                    await supabase
                        .from('playlists')
                        .update({ filmes: novaLista })
                        .eq('id', listWatch[0].id);

                    if (listWatch.length > 1) {
                        const dupIds = listWatch.slice(1).map(p => p.id);
                        await supabase.from('playlists').delete().in('id', dupIds);
                    }
                } else {
                    await supabase
                        .from('playlists')
                        .insert([{
                            id_usuario: currentUserId,
                            nome: 'Assistir Mais Tarde',
                            filmes: novaLista
                        }]);
                }
            } catch (err) {
                console.warn("Erro ao salvar assistir mais tarde no Supabase:", err);
            }
        }
    };

    const toggleFilmeEmPlaylist = async (playlistId) => {
        const u = getUsuarioLogado();
        if (!u || !u.id) return;
        const fObj = obterObjetoFilme();
        if (!fObj) return;

        const novasPlaylists = playlists.map(p => {
            if (p.id === playlistId) {
                const jaExiste = p.filmes && p.filmes.some(f => Number(f.id) === Number(fObj.id));
                const novosFilmes = jaExiste
                    ? p.filmes.filter(f => Number(f.id) !== Number(fObj.id))
                    : [fObj, ...(p.filmes || []).filter(f => Number(f.id) !== Number(fObj.id))];

                if (supabase) {
                    supabase.from('playlists').update({ filmes: novosFilmes }).eq('id', playlistId).then().catch(err => console.warn(err));
                }

                return { ...p, filmes: novosFilmes };
            }
            return p;
        });

        setPlaylists(novasPlaylists);
    };

    const handleCriarPlaylist = async (e) => {
        e.preventDefault();
        const u = getUsuarioLogado();
        if (!novaPlaylistNome.trim() || !u || !u.id) return;

        const fObj = obterObjetoFilme();
        const filmesIniciais = fObj ? [fObj] : [];
        const currentUserId = Number(u.id);

        const novaPlaylist = {
            id: Date.now(),
            id_usuario: currentUserId,
            nome: novaPlaylistNome.trim(),
            filmes: filmesIniciais
        };

        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('playlists')
                    .insert([{ id_usuario: currentUserId, nome: novaPlaylistNome.trim(), filmes: filmesIniciais }])
                    .select()
                    .single();

                if (!error && data) {
                    novaPlaylist.id = data.id;
                }
            } catch (err) {
                console.warn("Erro ao criar playlist:", err);
            }
        }

        setPlaylists([...playlists, novaPlaylist]);
        setNovaPlaylistNome("");
        setIsCriandoPlaylist(false);
    };

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
                    {/* BOTÕES DE FAVORITOS E PLAYLIST NO CANTO SUPERIOR DIREITO */}
                    <div className="resenha-top-actions">
                        <button
                            onClick={toggleFavorito}
                            type="button"
                            title={eFavorito(filme.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                            className={`btn-resenha-action favorito ${eFavorito(filme.id) ? 'ativo' : ''}`}
                        >
                            <span className="btn-resenha-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill={eFavorito(filme.id) ? "#e50914" : "currentColor"}>
                                    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" />
                                </svg>
                            </span>
                        </button>

                        <button
                            onClick={() => setFilmeParaModal(filme)}
                            type="button"
                            title="Adicionar ou remover de playlists"
                            className={`btn-resenha-action playlist ${estaEmAlgumaPlaylist(filme.id) ? 'ativo' : ''}`}
                        >
                            <span className="btn-resenha-icon">
                                {estaEmAlgumaPlaylist(filme.id) ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                                        <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                                        <path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48" fill="none">
                                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" />
                                        <line x1="24" y1="14" x2="24" y2="34" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                                        <line x1="14" y1="24" x2="34" y2="24" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                                    </svg>
                                )}
                            </span>
                        </button>
                    </div>

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
                                                {(() => {
                                                    const chapeuRaw = coment.usuario?.id_item_chapeu?.url_item || coment.usuario?.id_item_chapeu?.url_imagem;
                                                    const maoRaw = coment.usuario?.id_item_mao?.url_item || coment.usuario?.id_item_mao?.url_imagem;
                                                    const mascoteRaw = coment.usuario?.id_item_mascote?.url_item || coment.usuario?.id_item_mascote?.url_imagem;

                                                    const chapeu = chapeuRaw ? obterUrlItem(chapeuRaw) : null;
                                                    const mao = maoRaw ? obterUrlItem(maoRaw) : null;
                                                    const mascote = mascoteRaw ? obterUrlItem(mascoteRaw) : null;
                                                    const avatarUrl = coment.usuario?.url_img ? obterUrlItem(coment.usuario.url_img) : (coment.usuario?.avatar_url || null);

                                                    return (
                                                        <div className="user-avatar">
                                                            {chapeu && (
                                                                <img
                                                                    src={chapeu}
                                                                    alt="Chapéu Equipado"
                                                                    className="post-hat-accessory"
                                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                                />
                                                            )}
                                                            <div className="post-avatar-circle">
                                                                <img
                                                                    src={avatarUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231c1c1c'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%23444'/%3E%3Cellipse cx='50' cy='82' rx='30' ry='20' fill='%23444'/%3E%3C/svg%3E"}
                                                                    alt={coment.usuario?.nome || "Cinéfilo"}
                                                                    className="post-avatar-img"
                                                                    onError={(e) => {
                                                                        e.target.onerror = null;
                                                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231c1c1c'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%23444'/%3E%3Cellipse cx='50' cy='82' rx='30' ry='20' fill='%23444'/%3E%3C/svg%3E";
                                                                    }}
                                                                />
                                                            </div>
                                                            {mao && (
                                                                <img
                                                                    src={mao}
                                                                    alt="Acessório de Mão"
                                                                    className="post-hand-accessory"
                                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                                />
                                                            )}
                                                            {mascote && (
                                                                <img
                                                                    src={mascote}
                                                                    alt="Mascote de Companhia"
                                                                    className="post-pet-accessory"
                                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })()}
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
                                {(() => {
                                    const uLog = perfilUsuarioLogado || usuarioLogado;
                                    const chapeuRaw = uLog?.id_item_chapeu?.url_item || uLog?.id_item_chapeu?.url_imagem;
                                    const maoRaw = uLog?.id_item_mao?.url_item || uLog?.id_item_mao?.url_imagem;
                                    const mascoteRaw = uLog?.id_item_mascote?.url_item || uLog?.id_item_mascote?.url_imagem;

                                    const chapeu = chapeuRaw ? obterUrlItem(chapeuRaw) : null;
                                    const mao = maoRaw ? obterUrlItem(maoRaw) : null;
                                    const mascote = mascoteRaw ? obterUrlItem(mascoteRaw) : null;
                                    const avatarUrl = uLog?.url_img ? obterUrlItem(uLog.url_img) : (uLog?.avatar_url || null);

                                    return (
                                        <div className="user-avatar">
                                            {chapeu && (
                                                <img
                                                    src={chapeu}
                                                    alt="Chapéu Equipado"
                                                    className="post-hat-accessory"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            )}
                                            <div className="post-avatar-circle">
                                                <img
                                                    src={avatarUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231c1c1c'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%23444'/%3E%3Cellipse cx='50' cy='82' rx='30' ry='20' fill='%23444'/%3E%3C/svg%3E"}
                                                    alt={uLog?.nome || "Você"}
                                                    className="post-avatar-img"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231c1c1c'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%23444'/%3E%3Cellipse cx='50' cy='82' rx='30' ry='20' fill='%23444'/%3E%3C/svg%3E";
                                                    }}
                                                />
                                            </div>
                                            {mao && (
                                                <img
                                                    src={mao}
                                                    alt="Acessório de Mão"
                                                    className="post-hand-accessory"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            )}
                                            {mascote && (
                                                <img
                                                    src={mascote}
                                                    alt="Mascote de Companhia"
                                                    className="post-pet-accessory"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            )}
                                        </div>
                                    );
                                })()}
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

            {/* MODAL PARA SELECIONAR E ADICIONAR FILME A PLAYLISTS */}
            {filmeParaModal && (
                <div className="resenha-modal-overlay" onClick={() => setFilmeParaModal(null)}>
                    <div className="resenha-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="resenha-modal-header">
                            <h3>Adicionar às Playlists</h3>
                            <button type="button" className="btn-close-modal" onClick={() => setFilmeParaModal(null)}>✕</button>
                        </div>
                        <p className="resenha-modal-sub">Filme: <strong>{filme.title}</strong></p>

                        <div className="resenha-modal-playlists-list">
                            <button
                                type="button"
                                className={`modal-playlist-item ${naWatchlist(filme.id) ? 'selecionada' : ''}`}
                                onClick={toggleAssistirMaisTarde}
                            >
                                <span className="modal-item-nome">
                                    <img src={playlistIcon} alt="Playlist" className="modal-item-icon" /> Assistir Mais Tarde
                                </span>
                                <span className="modal-item-status">{naWatchlist(filme.id) ? '✓ Adicionado' : '+ Adicionar'}</span>
                            </button>

                            {playlists.map((pl) => {
                                const jaPertence = pl.filmes && pl.filmes.some(f => Number(f.id) === Number(filme.id));
                                return (
                                    <button
                                        key={pl.id}
                                        type="button"
                                        className={`modal-playlist-item ${jaPertence ? 'selecionada' : ''}`}
                                        onClick={() => toggleFilmeEmPlaylist(pl.id)}
                                    >
                                        <span className="modal-item-nome">
                                            <img src={playlistIcon} alt="Playlist" className="modal-item-icon" /> {pl.nome}
                                        </span>
                                        <span className="modal-item-status">{jaPertence ? '✓ Adicionado' : '+ Adicionar'}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {isCriandoPlaylist ? (
                            <form onSubmit={handleCriarPlaylist} className="form-criar-playlist-inline">
                                <input
                                    type="text"
                                    placeholder="Nome da nova playlist..."
                                    value={novaPlaylistNome}
                                    onChange={(e) => setNovaPlaylistNome(e.target.value)}
                                    className="input-nome-playlist"
                                    autoFocus
                                />
                                <div className="form-criar-actions">
                                    <button type="submit" className="btn-confirmar-criar">Criar</button>
                                    <button type="button" className="btn-cancelar-criar" onClick={() => setIsCriandoPlaylist(false)}>Cancelar</button>
                                </div>
                            </form>
                        ) : (
                            <div className="resenha-modal-footer">
                                <button
                                    type="button"
                                    className="btn-modal-criar"
                                    onClick={() => setIsCriandoPlaylist(true)}
                                >
                                    + Criar Nova Playlist
                                </button>
                                <button
                                    type="button"
                                    className="btn-modal-fechar"
                                    onClick={() => setFilmeParaModal(null)}
                                >
                                    Concluído
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Resenha;
