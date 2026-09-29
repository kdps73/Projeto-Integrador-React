import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from "./components/Menu";
import { supabase } from "./supabase";
import playlistIcon from "./assets/playlist_icon.svg";
import "./css/index.css";
import "./css/usuario.css";

// =========================================================
// PADRÃO DE REQUISIÇÃO DA API TMDB (Mesmo de Inicio.jsx e Filmes.jsx)
// =========================================================
const API_KEY = '168817e9845280fe6d28f3a939f4bc67';
const BASE_URL = 'https://api.themoviedb.org/3';

// Função utilitária para buscar detalhes no mesmo formato do Filmes.jsx
async function buscarDetalhesFilme(id) {
    try {
        const urlDetalhes = `${BASE_URL}/movie/${id}?language=pt-BR&api_key=${API_KEY}`;
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
    } catch (erro) {
        console.error(`Erro ao buscar detalhes do filme ID ${id}:`, erro);
        return null;
    }
}

function Usuario() {
    // =========================================================
    // 1. ESTADOS DO USUÁRIO (Perfil, XP, Bio e Acessórios)
    // =========================================================
    const [usuario, setUsuario] = useState({
        id: 11,
        nome: "They Pro Filmes",
        username: "THEY_PRO_FILMES",
        email: "usuario@cineplanner.com",
        bio: "Amante de ficção científica, cinema clássico e maratonas de fim de semana.",
        xpTotal: 25400,
        nivel: 50,
        chapeuUrl: "./img/hat-red-dead.png",
        maoUrl: "./img/acessorio-red-dead.png",
        mascoteUrl: "./img/pet-red-dead.png",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"
    });

    const [inputBio, setInputBio] = useState(usuario.bio);
    const [statusBio, setStatusBio] = useState("");
    const [isEditingBio, setIsEditingBio] = useState(false);

    // Sistema de XP e Nível
    const xpPorNivel = 600;
    const xpAtualNoNivel = usuario.xpTotal % xpPorNivel;
    const porcentagemXp = Math.min(Math.round((xpAtualNoNivel / xpPorNivel) * 100), 100);

    // =========================================================
    // 2. ESTADOS DE FILMES E PLAYLISTS PERSONALIZADAS
    // =========================================================
    const [favoritos, setFavoritos] = useState([]);
    const [assistirMaisTarde, setAssistirMaisTarde] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [carregandoFilmes, setCarregandoFilmes] = useState(true);

    // Estados para criação de playlist e modal
    const [isCriandoPlaylist, setIsCriandoPlaylist] = useState(false);
    const [novaPlaylistNome, setNovaPlaylistNome] = useState("");
    const [filmeParaModal, setFilmeParaModal] = useState(null);

    // Controladores dos Carrosséis
    const favoritosRef = useRef(null);
    const assistirMaisTardeRef = useRef(null);

    const rolarCarrossel = (ref, direcao) => {
        if (ref.current) {
            const distancia = 440;
            ref.current.scrollBy({
                left: direcao === "esquerda" ? -distancia : distancia,
                behavior: "smooth"
            });
        }
    };

    const rolarCarrosselPorId = (elementId, direcao) => {
        const el = document.getElementById(elementId);
        if (el) {
            const distancia = 440;
            el.scrollBy({
                left: direcao === "esquerda" ? -distancia : distancia,
                behavior: "smooth"
            });
        }
    };

    // =========================================================
    // 3. PERSISTÊNCIA DAS LISTAS E FUNÇÕES TOGGLE
    // =========================================================
    const salvarFavoritos = (novaLista) => {
        setFavoritos(novaLista);
        localStorage.setItem("cineplanner_favoritos", JSON.stringify(novaLista));
    };

    const salvarWatchlist = (novaLista) => {
        setAssistirMaisTarde(novaLista);
        localStorage.setItem("cineplanner_watchlist", JSON.stringify(novaLista));
    };

    const salvarPlaylists = (novasPlaylists) => {
        setPlaylists(novasPlaylists);
        localStorage.setItem("cineplanner_custom_playlists", JSON.stringify(novasPlaylists));
    };

    // Verificadores de estado
    const eFavorito = (id) => favoritos.some(f => f.id === id);
    const naWatchlist = (id) => assistirMaisTarde.some(f => f.id === id);

    // Verificador se o filme está em alguma playlist (Assistir Mais Tarde ou qualquer Playlist Personalizada)
    const estaEmAlgumaPlaylist = (id) => {
        if (naWatchlist(id)) return true;
        return playlists.some(p => p.filmes && p.filmes.some(f => f.id === id));
    };

    // Toggle para o Botão Coração (Favoritos)
    const toggleFavorito = (filme) => {
        if (eFavorito(filme.id)) {
            const novaLista = favoritos.filter(f => f.id !== filme.id);
            salvarFavoritos(novaLista);
        } else {
            salvarFavoritos([filme, ...favoritos]);
        }
    };

    // Toggle para o Botão Playlist (Assistir Mais Tarde)
    const toggleAssistirMaisTarde = (filme) => {
        if (naWatchlist(filme.id)) {
            const novaLista = assistirMaisTarde.filter(f => f.id !== filme.id);
            salvarWatchlist(novaLista);
        } else {
            salvarWatchlist([filme, ...assistirMaisTarde]);
        }
    };

    // Criar uma nova playlist personalizada no Supabase
    const handleCriarPlaylist = async (e) => {
        e.preventDefault();
        if (!novaPlaylistNome.trim()) return;

        const novaPlaylist = {
            id: Date.now(),
            id_usuario: usuario.id,
            nome: novaPlaylistNome.trim(),
            filmes: []
        };

        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('playlists')
                    .insert([{ id_usuario: usuario.id, nome: novaPlaylistNome.trim(), filmes: [] }])
                    .select()
                    .single();

                if (!error && data) {
                    novaPlaylist.id = data.id;
                }
            } catch (err) {
                console.warn("Erro ao salvar playlist no Supabase:", err);
            }
        }

        salvarPlaylists([...playlists, novaPlaylist]);
        setNovaPlaylistNome("");
        setIsCriandoPlaylist(false);
    };

    // Excluir playlist criada do Supabase
    const handleDeletarPlaylist = async (playlistId) => {
        if (window.confirm("Deseja realmente excluir esta playlist personalizada?")) {
            if (supabase) {
                try {
                    await supabase.from('playlists').delete().eq('id', playlistId);
                } catch (err) {
                    console.warn("Erro ao deletar playlist no Supabase:", err);
                }
            }
            salvarPlaylists(playlists.filter(p => p.id !== playlistId));
        }
    };

    // Adicionar/remover filme de uma playlist personalizada no Supabase
    const toggleFilmeEmPlaylist = async (playlistId, filme) => {
        const novasPlaylists = playlists.map(p => {
            if (p.id === playlistId) {
                const jaExiste = p.filmes && p.filmes.some(f => f.id === filme.id);
                const novosFilmes = jaExiste
                    ? p.filmes.filter(f => f.id !== filme.id)
                    : [filme, ...(p.filmes || [])];

                if (supabase) {
                    supabase.from('playlists').update({ filmes: novosFilmes }).eq('id', playlistId).then().catch(err => console.warn(err));
                }

                return { ...p, filmes: novosFilmes };
            }
            return p;
        });

        salvarPlaylists(novasPlaylists);
    };

    // =========================================================
    // 4. CARREGAMENTO COM O MESMO PADRÃO DE Filmes.jsx / Inicio.jsx
    // =========================================================
    useEffect(() => {
        async function carregarFilmesUsuario() {
            setCarregandoFilmes(true);
            try {
                // A) Buscar Perfil no Supabase se disponível
                if (supabase) {
                    const { data: dadosUsuario } = await supabase
                        .from('usuario')
                        .select('*, id_item_chapeu(*), id_item_mao(*), id_item_mascote(*)')
                        .eq('id', usuario.id)
                        .maybeSingle();

                    if (dadosUsuario) {
                        setUsuario(prev => ({
                            ...prev,
                            id: dadosUsuario.id,
                            nome: dadosUsuario.nome || prev.nome,
                            username: dadosUsuario.username || prev.username,
                            email: dadosUsuario.email || prev.email,
                            bio: dadosUsuario.bio || prev.bio,
                            xpTotal: dadosUsuario.xp_total ?? prev.xpTotal,
                            nivel: dadosUsuario.nivel ?? prev.nivel,
                            avatarUrl: dadosUsuario.url_img || dadosUsuario.avatar_url || prev.avatarUrl,
                            chapeuUrl: dadosUsuario.id_item_chapeu?.url_imagem || prev.chapeuUrl,
                            maoUrl: dadosUsuario.id_item_mao?.url_imagem || prev.maoUrl,
                            mascoteUrl: dadosUsuario.id_item_mascote?.url_imagem || prev.mascoteUrl
                        }));
                        setInputBio(dadosUsuario.bio || "");
                    }
                }

                // B) Buscar Playlists no Supabase usando id_usuario
                if (supabase) {
                    try {
                        const { data: dadosPlaylists, error: errPlaylists } = await supabase
                            .from('playlists')
                            .select('*')
                            .eq('id_usuario', usuario.id);

                        if (!errPlaylists && dadosPlaylists && dadosPlaylists.length > 0) {
                            setPlaylists(dadosPlaylists);
                            localStorage.setItem("cineplanner_custom_playlists", JSON.stringify(dadosPlaylists));
                        } else {
                            const localPlaylists = localStorage.getItem("cineplanner_custom_playlists");
                            if (localPlaylists) setPlaylists(JSON.parse(localPlaylists));
                        }
                    } catch (e) {
                        const localPlaylists = localStorage.getItem("cineplanner_custom_playlists");
                        if (localPlaylists) setPlaylists(JSON.parse(localPlaylists));
                    }
                } else {
                    const localPlaylists = localStorage.getItem("cineplanner_custom_playlists");
                    if (localPlaylists) setPlaylists(JSON.parse(localPlaylists));
                }

                // C) Verificar LocalStorage de favoritos e watchlist
                const localFavs = localStorage.getItem("cineplanner_favoritos");
                const localWatch = localStorage.getItem("cineplanner_watchlist");

                let listFavs = localFavs ? JSON.parse(localFavs) : [];
                let listWatch = localWatch ? JSON.parse(localWatch) : [];

                // C) Se vazio, carregar filmes reais do TMDB usando a mesma estrutura de Inicio.jsx
                if (listFavs.length === 0 || listWatch.length === 0) {
                    const [resPopular, resTop] = await Promise.all([
                        fetch(`${BASE_URL}/movie/popular?language=pt-BR&api_key=${API_KEY}`),
                        fetch(`${BASE_URL}/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
                    ]);

                    const dataPopular = await resPopular.json();
                    const dataTop = await resTop.json();

                    if (listFavs.length === 0 && dataTop.results) {
                        const idsTop = dataTop.results.slice(0, 6).map(f => f.id);
                        const detalhesTop = await Promise.all(idsTop.map(id => buscarDetalhesFilme(id)));
                        listFavs = detalhesTop.filter(Boolean);
                        salvarFavoritos(listFavs);
                    }

                    if (listWatch.length === 0 && dataPopular.results) {
                        const idsPop = dataPopular.results.slice(6, 12).map(f => f.id);
                        const detalhesPop = await Promise.all(idsPop.map(id => buscarDetalhesFilme(id)));
                        listWatch = detalhesPop.filter(Boolean);
                        salvarWatchlist(listWatch);
                    }
                } else {
                    setFavoritos(listFavs);
                    setAssistirMaisTarde(listWatch);
                }

            } catch (err) {
                console.error("Erro ao carregar filmes no formato TMDB:", err);
            } finally {
                setCarregandoFilmes(false);
            }
        }

        carregarFilmesUsuario();
    }, []);

    // =========================================================
    // 5. ATUALIZAÇÃO DA BIO
    // =========================================================
    const handleSalvarBio = async () => {
        setUsuario(prev => ({ ...prev, bio: inputBio }));
        setIsEditingBio(false);
        setStatusBio("Bio atualizada com sucesso!");
        setTimeout(() => setStatusBio(""), 3000);

        if (supabase) {
            try {
                await supabase.from('usuario').update({ bio: inputBio }).eq('id', usuario.id);
            } catch (err) {
                console.warn("Erro ao salvar bio no Supabase:", err);
            }
        }
    };

    // =========================================================
    // 6. RENDERIZAÇÃO DA PÁGINA
    // =========================================================
    return (
        <div id="pagina-usuario">
            {/* Componente Navbar principal do CiNEPLANNER */}
            <Menu />

            <main className="usuario-main container">

                {/* SEÇÃO DE PROGRESSO E XP */}
                <section className="xp-section" aria-label="Progresso do Usuário">
                    <div className="xp-header">
                        <div className="xp-title">
                            <span>PROGRESSO DO PERFIL</span>
                            <span className="xp-badge">LEVEL {usuario.nivel}</span>
                        </div>
                        <div className="xp-stats">
                            <span className="xp-current">{usuario.xpTotal.toLocaleString()} XP</span>
                            <span className="xp-target">/ {porcentagemXp}% para o próximo nível</span>
                        </div>
                    </div>

                    <div className="xp-bar-container" title={`${porcentagemXp}% concluído`}>
                        <div
                            className="xp-fill"
                            style={{ width: `${porcentagemXp}%` }}
                        ></div>
                    </div>
                </section>

                {/* CARD DE PERFIL DO USUÁRIO */}
                <section className="profile-card" aria-label="Card de Perfil">
                    <div className="avatar-container">
                        {usuario.chapeuUrl && (
                            <img
                                className="hat-accessory"
                                src={usuario.chapeuUrl}
                                alt="Chapéu do Avatar"
                            />
                        )}

                        <div className="avatar-circle">
                            <img
                                src={usuario.avatarUrl}
                                alt={`Avatar de ${usuario.username}`}
                                className="avatar-img"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80";
                                }}
                            />
                        </div>

                        {usuario.maoUrl && (
                            <img
                                className="accessory"
                                src={usuario.maoUrl}
                                alt="Acessório do Avatar"
                            />
                        )}
                    </div>

                    <div className="user-info">
                        <div className="username-header">
                            <span className="username-label">USUÁRIO</span>
                            <span className="user-email">{usuario.email}</span>
                        </div>

                        <h1 className="username">{usuario.username}</h1>

                        {isEditingBio ? (
                            <div className="bio-box editing">
                                <div className="bio-input-wrapper">
                                    <textarea
                                        className="bio-text"
                                        placeholder="Escreva sua bio aqui..."
                                        value={inputBio}
                                        onChange={(e) => setInputBio(e.target.value)}
                                        rows={3}
                                    />
                                    {statusBio && <span className="bio-status-msg">{statusBio}</span>}
                                </div>
                                <div className="bio-actions">
                                    <button
                                        className="btn-salvar-bio"
                                        onClick={handleSalvarBio}
                                        type="button"
                                    >
                                        Salvar Bio
                                    </button>
                                    <button
                                        className="btn-cancelar-bio"
                                        onClick={() => {
                                            setInputBio(usuario.bio);
                                            setIsEditingBio(false);
                                        }}
                                        type="button"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bio-box display">
                                <p className="bio-text-display">
                                    {usuario.bio ? usuario.bio : "Nenhuma bio informada."}
                                </p>
                                <button
                                    className="btn-editar-bio"
                                    onClick={() => setIsEditingBio(true)}
                                    type="button"
                                >
                                    Editar Bio
                                </button>
                                {statusBio && <span className="bio-status-msg">{statusBio}</span>}
                            </div>
                        )}
                    </div>

                    {usuario.mascoteUrl && (
                        <img
                            className="pet-accessory"
                            src={usuario.mascoteUrl}
                            alt="Mascote de Companhia"
                        />
                    )}
                </section>

                {/* SEÇÃO 1: FILMES FAVORITOS */}
                <section className="movies-section" aria-label="Filmes Favoritos">
                    <div className="section-header">
                        <div className="section-header-left">
                            <h2>FILMES FAVORITOS</h2>
                            <span className="movie-count">
                                {favoritos.length.toString().padStart(2, '0')} FILMES
                            </span>
                        </div>

                        {/* NAVEGAÇÃO: BOTÃO DE ADICIONAR FILME (Leva para a página de filmes/catálogo) */}
                        <Link
                            to="/"
                            className="btn-adicionar-filme"
                            title="Navegar para catálogo para adicionar filmes"
                        >
                            + Adicionar Filme
                        </Link>
                    </div>

                    {carregandoFilmes ? (
                        <div className="empty-list">Carregando filmes favoritos...</div>
                    ) : favoritos.length === 0 ? (
                        <div className="empty-list">
                            <span>Você ainda não possui filmes favoritos na sua lista.</span>
                            <Link to="/" className="btn-explorar-catalogo">
                                Explorar Catálogo de Filmes
                            </Link>
                        </div>
                    ) : (
                        <div className="carousel-wrapper">
                            <button
                                className="carousel-btn carousel-btn-prev"
                                onClick={() => rolarCarrossel(favoritosRef, "esquerda")}
                                aria-label="Rolar favoritos para a esquerda"
                                type="button"
                            >
                                &#8249;
                            </button>

                            <div className="movies-carousel" ref={favoritosRef}>
                                {favoritos.map((filme) => (
                                    <article className="filme-card" id={`card-filme-${filme.id}`} key={filme.id}>
                                        {/* PADRÃO DE LINK E CARD IGUAL AO Filmes.jsx / Inicio.jsx */}
                                        <Link to={`/resenhas/${filme.id}`} className="card-link">
                                            <div className="card-poster">
                                                <img
                                                    src={filme.poster_url || "https://placehold.co/300x450/1a1a1a/e50914?text=Sem+Poster"}
                                                    alt={`Poster do Filme ${filme.titulo}`}
                                                    className="poster-img"
                                                    loading="lazy"
                                                />
                                                <div className="card-overlay">
                                                    <span className="card-overlay-text">Ver Detalhes</span>
                                                </div>
                                            </div>
                                            <div className="card-info">
                                                <h3 className="card-titulo">{filme.titulo}</h3>
                                                <span className="card-genero">{filme.generos || "Filme"}</span>
                                                <div className="card-nota">
                                                    <span className="estrela" title="Avaliação">★</span>
                                                    <span className="nota-valor">
                                                        {filme.avaliacao ? (typeof filme.avaliacao === 'number' ? filme.avaliacao.toFixed(1) : filme.avaliacao) : "N/A"}
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

                                        {/* BOTÕES LADO A LADO: CORAÇÃO (FAVORITOS) E PLAYLIST */}
                                        <div className="card-actions">
                                            {/* BOTÃO CORAÇÃO (FAVORITOS) */}
                                            <button
                                                onClick={() => toggleFavorito(filme)}
                                                type="button"
                                                title={eFavorito(filme.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                                                className={`btn-card-action favorito ${eFavorito(filme.id) ? 'ativo' : ''}`}
                                            >
                                                <span className="btn-card-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill={eFavorito(filme.id) ? "#e50914" : "currentColor"}>
                                                        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" />
                                                    </svg>
                                                </span>
                                            </button>

                                            {/* BOTÃO PLAYLIST (ABRE O MODAL COM ASSISTIR MAIS TARDE E OUTRAS PLAYLISTS) */}
                                            <button
                                                onClick={() => setFilmeParaModal(filme)}
                                                type="button"
                                                title="Adicionar ou remover de playlists"
                                                className={`btn-card-action playlist ${estaEmAlgumaPlaylist(filme.id) ? 'ativo' : ''}`}
                                            >
                                                <span className="btn-card-icon">
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
                                    </article>
                                ))}
                            </div>

                            <button
                                className="carousel-btn carousel-btn-next"
                                onClick={() => rolarCarrossel(favoritosRef, "direita")}
                                aria-label="Rolar favoritos para a direita"
                                type="button"
                            >
                                &#8250;
                            </button>
                        </div>
                    )}
                </section>

                {/* SEÇÃO 2: ASSISTIR MAIS TARDE */}
                <section className="movies-section" aria-label="Assistir Mais Tarde">
                    <div className="section-header">
                        <div className="section-header-left">
                            <h2>ASSISTIR MAIS TARDE</h2>
                            <span className="movie-count">
                                {assistirMaisTarde.length.toString().padStart(2, '0')} FILMES
                            </span>
                        </div>

                        {/* NAVEGAÇÃO: BOTÃO DE ADICIONAR FILME */}
                        <Link
                            to="/"
                            className="btn-adicionar-filme"
                            title="Navegar para catálogo para adicionar filmes"
                        >
                            + Adicionar Filme
                        </Link>
                    </div>

                    {carregandoFilmes ? (
                        <div className="empty-list">Carregando lista de assistir mais tarde...</div>
                    ) : assistirMaisTarde.length === 0 ? (
                        <div className="empty-list">
                            <span>Sua lista de assistir mais tarde está vazia.</span>
                            <Link to="/" className="btn-explorar-catalogo">
                                Explorar Catálogo de Filmes
                            </Link>
                        </div>
                    ) : (
                        <div className="carousel-wrapper">
                            <button
                                className="carousel-btn carousel-btn-prev"
                                onClick={() => rolarCarrossel(assistirMaisTardeRef, "esquerda")}
                                aria-label="Rolar watchlist para a esquerda"
                                type="button"
                            >
                                &#8249;
                            </button>

                            <div className="movies-carousel" ref={assistirMaisTardeRef}>
                                {assistirMaisTarde.map((filme) => (
                                    <article className="filme-card" id={`card-filme-${filme.id}`} key={filme.id}>
                                        {/* PADRÃO DE LINK E CARD IGUAL AO Filmes.jsx / Inicio.jsx */}
                                        <Link to={`/resenhas/${filme.id}`} className="card-link">
                                            <div className="card-poster">
                                                <img
                                                    src={filme.poster_url || "https://placehold.co/300x450/1a1a1a/e50914?text=Sem+Poster"}
                                                    alt={`Poster do Filme ${filme.titulo}`}
                                                    className="poster-img"
                                                    loading="lazy"
                                                />
                                                <div className="card-overlay">
                                                    <span className="card-overlay-text">Ver Detalhes</span>
                                                </div>
                                            </div>
                                            <div className="card-info">
                                                <h3 className="card-titulo">{filme.titulo}</h3>
                                                <span className="card-genero">{filme.generos || "Filme"}</span>
                                                <div className="card-nota">
                                                    <span className="estrela" title="Avaliação">★</span>
                                                    <span className="nota-valor">
                                                        {filme.avaliacao ? (typeof filme.avaliacao === 'number' ? filme.avaliacao.toFixed(1) : filme.avaliacao) : "N/A"}
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

                                        {/* BOTÕES LADO A LADO: CORAÇÃO (FAVORITOS) E PLAYLIST */}
                                        <div className="card-actions">
                                            {/* BOTÃO CORAÇÃO (FAVORITOS) */}
                                            <button
                                                onClick={() => toggleFavorito(filme)}
                                                type="button"
                                                title={eFavorito(filme.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                                                className={`btn-card-action favorito ${eFavorito(filme.id) ? 'ativo' : ''}`}
                                            >
                                                <span className="btn-card-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill={eFavorito(filme.id) ? "#e50914" : "currentColor"}>
                                                        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" />
                                                    </svg>
                                                </span>
                                            </button>

                                            {/* BOTÃO PLAYLIST (ABRE O MODAL) */}
                                            <button
                                                onClick={() => setFilmeParaModal(filme)}
                                                type="button"
                                                title="Adicionar ou remover de playlists"
                                                className={`btn-card-action playlist ${estaEmAlgumaPlaylist(filme.id) ? 'ativo' : ''}`}
                                            >
                                                <span className="btn-card-icon">
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
                                    </article>
                                ))}
                            </div>

                            <button
                                className="carousel-btn carousel-btn-next"
                                onClick={() => rolarCarrossel(assistirMaisTardeRef, "direita")}
                                aria-label="Rolar watchlist para a direita"
                                type="button"
                            >
                                &#8250;
                            </button>
                        </div>
                    )}
                </section>

                {/* SEÇÃO 3: SUAS PLAYLISTS PERSONALIZADAS (ABAIXO DE ASSISTIR MAIS TARDE) */}
                <section className="movies-section custom-playlists-wrapper" aria-label="Minhas Playlists Personalizadas">
                    <div className="section-header">
                        <div className="section-header-left">
                            <h2>PLAYLISTS PERSONALIZADAS</h2>
                            <span className="movie-count">
                                {playlists.length.toString().padStart(2, '0')} PLAYLISTS
                            </span>
                        </div>


                    </div>

                    {/* FORMULÁRIO PARA CRIAR NOVA PLAYLIST */}
                    {isCriandoPlaylist && (
                        <form onSubmit={handleCriarPlaylist} className="form-criar-playlist">
                            <input
                                type="text"
                                placeholder="Digite o nome da playlist..."
                                value={novaPlaylistNome}
                                onChange={(e) => setNovaPlaylistNome(e.target.value)}
                                autoFocus
                                className="input-nome-playlist"
                            />
                            <div className="form-criar-actions">
                                <button type="submit" className="btn-confirmar-criar">Criar Playlist</button>
                                <button type="button" className="btn-cancelar-criar" onClick={() => setIsCriandoPlaylist(false)}>Cancelar</button>
                            </div>
                        </form>
                    )}

                    {playlists.length === 0 ? (
                        <div className="empty-list">
                            <span>Você ainda não criou nenhuma playlist personalizada.</span>

                        </div>
                    ) : (
                        playlists.map((pl) => (
                            <div key={pl.id} className="custom-playlist-block">
                                <div className="custom-playlist-header">
                                    <h3>{pl.nome}</h3>
                                    <div className="canto-direito">
                                        <span className="movie-count">
                                            {(pl.filmes ? pl.filmes.length : 0).toString().padStart(2, '0')} FILMES
                                        </span>
                                        <button
                                            type="button"
                                            className="btn-deletar-playlist"
                                            onClick={() => handleDeletarPlaylist(pl.id)}
                                            title="Excluir esta playlist"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                                                <path d="m19.5,0H4.5C2.019,0,0,2.019,0,4.5v15c0,2.481,2.019,4.5,4.5,4.5h15c2.481,0,4.5-2.019,4.5-4.5V4.5c0-2.481-2.019-4.5-4.5-4.5Zm3.5,19.5c0,1.93-1.57,3.5-3.5,3.5H4.5c-1.93,0-3.5-1.57-3.5-3.5V4.5c0-1.93,1.57-3.5,3.5-3.5h15c1.93,0,3.5,1.57,3.5,3.5v15Zm-4.122-14.673l-6.216,7.173,6.216,7.173c.181.208.158.524-.051.705-.095.082-.211.122-.327.122-.14,0-.279-.059-.378-.173l-6.122-7.064-6.122,7.064c-.099.114-.238.173-.378.173-.116,0-.232-.04-.327-.122-.209-.181-.231-.497-.051-.705l6.216-7.173-6.216-7.173c-.181-.208-.158-.524.051-.705.208-.18.524-.159.705.051l6.122,7.064,6.122-7.064c.181-.21.496-.23.705-.051.209.181.231.497.051.705Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {(!pl.filmes || pl.filmes.length === 0) ? (
                                    <div className="empty-list mini-empty">
                                        <span>Nenhum filme adicionado a esta playlist ainda. Clique no botão de playlist dos filmes para adicionar!</span>

                                    </div>

                                ) : (
                                    <div className="carousel-wrapper">
                                        <button
                                            className="carousel-btn carousel-btn-prev"
                                            onClick={() => rolarCarrosselPorId(`carousel-pl-${pl.id}`, "esquerda")}
                                            aria-label="Rolar playlist para a esquerda"
                                            type="button"
                                        >
                                            &#8249;
                                        </button>

                                        <div className="movies-carousel" id={`carousel-pl-${pl.id}`}>
                                            {pl.filmes.map((filme) => (
                                                <article className="filme-card" id={`card-filme-pl-${pl.id}-${filme.id}`} key={filme.id}>
                                                    <Link to={`/resenhas/${filme.id}`} className="card-link">
                                                        <div className="card-poster">
                                                            <img
                                                                src={filme.poster_url || "https://placehold.co/300x450/1a1a1a/e50914?text=Sem+Poster"}
                                                                alt={`Poster do Filme ${filme.titulo}`}
                                                                className="poster-img"
                                                                loading="lazy"
                                                            />
                                                            <div className="card-overlay">
                                                                <span className="card-overlay-text">Ver Detalhes</span>
                                                            </div>
                                                        </div>
                                                        <div className="card-info">
                                                            <h3 className="card-titulo">{filme.titulo}</h3>
                                                            <span className="card-genero">{filme.generos || "Filme"}</span>
                                                            <div className="card-nota">
                                                                <span className="estrela" title="Avaliação">★</span>
                                                                <span className="nota-valor">
                                                                    {filme.avaliacao ? (typeof filme.avaliacao === 'number' ? filme.avaliacao.toFixed(1) : filme.avaliacao) : "N/A"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>

                                                    <div className="card-actions">
                                                        <button
                                                            onClick={() => toggleFavorito(filme)}
                                                            type="button"
                                                            title={eFavorito(filme.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                                                            className={`btn-card-action favorito ${eFavorito(filme.id) ? 'ativo' : ''}`}
                                                        >
                                                            <span className="btn-card-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill={eFavorito(filme.id) ? "#e50914" : "currentColor"}>
                                                                    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" />
                                                                </svg>
                                                            </span>
                                                        </button>

                                                        <button
                                                            onClick={() => toggleFilmeEmPlaylist(pl.id, filme)}
                                                            type="button"
                                                            title="Remover filme desta playlist"
                                                            className="btn-card-action remover-playlist"
                                                        >
                                                            <span className="btn-card-icon">✕</span>
                                                        </button>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>

                                        <button
                                            className="carousel-btn carousel-btn-next"
                                            onClick={() => rolarCarrosselPorId(`carousel-pl-${pl.id}`, "direita")}
                                            aria-label="Rolar playlist para a direita"
                                            type="button"
                                        >
                                            &#8250;
                                        </button>
                                    </div>
                                )}


                            </div>
                        ))
                    )}

                    <button
                        type="button"
                        className="btn-explorar-catalogo"
                        onClick={() => setIsCriandoPlaylist(true)}
                    >
                        + Crie Sua Playlist
                    </button>
                </section>

            </main>

            {/* MODAL PARA SELECIONAR E ADICIONAR FILME A PLAYLISTS (ASSISTIR MAIS TARDE OU PERSONALIZADAS) */}
            {filmeParaModal && (
                <div className="modal-overlay" onClick={() => setFilmeParaModal(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Adicionar às Playlists</h3>
                            <button type="button" className="btn-close-modal" onClick={() => setFilmeParaModal(null)}>✕</button>
                        </div>
                        <p className="modal-sub">Filme: <strong>{filmeParaModal.titulo}</strong></p>

                        <div className="modal-playlists-list">
                            {/* PLAYLIST PADRÃO: ASSISTIR MAIS TARDE */}
                            <button
                                type="button"
                                className={`modal-playlist-item ${naWatchlist(filmeParaModal.id) ? 'selecionada' : ''}`}
                                onClick={() => toggleAssistirMaisTarde(filmeParaModal)}
                            >
                                <span className="modal-item-nome">
                                    <img src={playlistIcon} alt="Playlist" className="modal-item-icon" /> Assistir Mais Tarde
                                </span>
                                <span className="modal-item-status">{naWatchlist(filmeParaModal.id) ? '✓ Adicionado' : '+ Adicionar'}</span>
                            </button>

                            {/* PLAYLISTS PERSONALIZADAS CRIADAS PELO USUÁRIO */}
                            {playlists.map((pl) => {
                                const jaPertence = pl.filmes && pl.filmes.some(f => f.id === filmeParaModal.id);
                                return (
                                    <button
                                        key={pl.id}
                                        type="button"
                                        className={`modal-playlist-item ${jaPertence ? 'selecionada' : ''}`}
                                        onClick={() => toggleFilmeEmPlaylist(pl.id, filmeParaModal)}
                                    >
                                        <span className="modal-item-nome">
                                            <img src={playlistIcon} alt="Playlist" className="modal-item-icon" /> {pl.nome}
                                        </span>
                                        <span className="modal-item-status">{jaPertence ? '✓ Adicionado' : '+ Adicionar'}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn-modal-criar"
                                onClick={() => {
                                    setFilmeParaModal(null);
                                    setIsCriandoPlaylist(true);
                                }}
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
                    </div>
                </div>
            )}
        </div>
    );
}

export default Usuario;
