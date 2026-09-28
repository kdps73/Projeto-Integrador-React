import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from "./components/Menu";
import { supabase } from "./supabase";
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
        id: 15,
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
    // 2. ESTADOS DE FILMES (Favoritos e Assistir Mais Tarde)
    // =========================================================
    const [favoritos, setFavoritos] = useState([]);
    const [assistirMaisTarde, setAssistirMaisTarde] = useState([]);
    const [carregandoFilmes, setCarregandoFilmes] = useState(true);

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

    // Verificadores de estado
    const eFavorito = (id) => favoritos.some(f => f.id === id);
    const naWatchlist = (id) => assistirMaisTarde.some(f => f.id === id);

    // Toggle para o Botão Coração (Favoritos)
    // Quando o filme já estiver nos favoritos (coração vermelho), clicar deseleciona e remove dos favoritos.
    const toggleFavorito = (filme) => {
        if (eFavorito(filme.id)) {
            const novaLista = favoritos.filter(f => f.id !== filme.id);
            salvarFavoritos(novaLista);
        } else {
            salvarFavoritos([filme, ...favoritos]);
        }
    };

    // Toggle para o Botão Playlist (Assistir Mais Tarde)
    // Quando o filme já estiver na playlist, clicar deseleciona e remove da playlist.
    const toggleAssistirMaisTarde = (filme) => {
        if (naWatchlist(filme.id)) {
            const novaLista = assistirMaisTarde.filter(f => f.id !== filme.id);
            salvarWatchlist(novaLista);
        } else {
            salvarWatchlist([filme, ...assistirMaisTarde]);
        }
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

                // B) Verificar LocalStorage
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

                                        {/* BOTÕES LADO A LADO: CORAÇÃO (FAVORITOS) À ESQUERDA E PLAYLIST À DIREITA */}
                                        <div className="card-actions">
                                            {/* BOTÃO CORAÇÃO (FAVORITOS) */}
                                            <button
                                                onClick={() => toggleFavorito(filme)}
                                                type="button"
                                                title={eFavorito(filme.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                                                className={`btn-card-action favorito ${eFavorito(filme.id) ? 'ativo' : ''}`}
                                            >
                                                <span className="btn-card-icon">
                                                    {eFavorito(filme.id) ? '♥' : '♡'}
                                                </span>
                                                <span>Favorito</span>
                                            </button>

                                            {/* BOTÃO PLAYLIST (ASSISTIR MAIS TARDE) */}
                                            <button
                                                onClick={() => toggleAssistirMaisTarde(filme)}
                                                type="button"
                                                title={naWatchlist(filme.id) ? "Remover da Playlist" : "Adicionar à Playlist"}
                                                className={`btn-card-action playlist ${naWatchlist(filme.id) ? 'ativo' : ''}`}
                                            >
                                                <span className="btn-card-icon">
                                                    {naWatchlist(filme.id) ? '🔖' : '📑'}
                                                </span>
                                                <span>Playlist</span>
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

                                        {/* BOTÕES LADO A LADO: CORAÇÃO (FAVORITOS) À ESQUERDA E PLAYLIST À DIREITA */}
                                        <div className="card-actions">
                                            {/* BOTÃO CORAÇÃO (FAVORITOS) */}
                                            <button
                                                onClick={() => toggleFavorito(filme)}
                                                type="button"
                                                title={eFavorito(filme.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                                                className={`btn-card-action favorito ${eFavorito(filme.id) ? 'ativo' : ''}`}
                                            >
                                                <span className="btn-card-icon">
                                                    {eFavorito(filme.id) ? '♥' : '♡'}
                                                </span>
                                                <span>Favorito</span>
                                            </button>

                                            {/* BOTÃO PLAYLIST (ASSISTIR MAIS TARDE) */}
                                            <button
                                                onClick={() => toggleAssistirMaisTarde(filme)}
                                                type="button"
                                                title={naWatchlist(filme.id) ? "Remover da Playlist" : "Adicionar à Playlist"}
                                                className={`btn-card-action playlist ${naWatchlist(filme.id) ? 'ativo' : ''}`}
                                            >
                                                <span className="btn-card-icon">
                                                    {naWatchlist(filme.id) ? '🔖' : '📑'}
                                                </span>
                                                <span>Playlist</span>
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

            </main>
        </div>
    );
}

export default Usuario;
