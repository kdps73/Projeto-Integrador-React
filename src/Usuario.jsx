import { useState, useRef, useEffect } from "react";
import Menu from "./components/Menu";
import Rodape from "./components/Rodape";
import { supabase } from "./supabase";
import "./css/index.css";
import "./css/usuario.css";

function Usuario() {
    // =========================================================
    // 1. ESTADOS DO USUÁRIO (Baseados na tabela 'usuario')
    // =========================================================
    const [usuario, setUsuario] = useState({
        id: 15,
        nome: "They Pro Filmes",
        username: "THEY_PRO_FILMES",
        email: "usuario@cineplanner.com",
        bio: "Amante de ficção científica, cinema clássico e maratonas de fim de semana.",
        xpTotal: 25400,
        nivel: 50,
        // URLs e dados dos itens cosméticos (tabela 'itens')
        chapeuUrl: "./img/hat-red-dead.png",
        maoUrl: "./img/acessorio-red-dead.png",
        mascoteUrl: "./img/pet-red-dead.png",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"
    });

    // Estado para o input de edição de bio
    const [inputBio, setInputBio] = useState(usuario.bio);
    const [statusBio, setStatusBio] = useState("");
    const [isEditingBio, setIsEditingBio] = useState(false);

    // =========================================================
    // 2. SISTEMA DE XP E NÍVEL
    // =========================================================
    // XP necessário para o próximo nível (exemplo de regra de negócio: cada nível são 600 XP)
    const xpPorNivel = 600;
    const xpAtualNoNivel = usuario.xpTotal % xpPorNivel;
    const porcentagemXp = Math.min(Math.round((xpAtualNoNivel / xpPorNivel) * 100), 100);

    // =========================================================
    // 3. ESTADOS DE FILMES (Baseados na tabela 'filmes')
    // =========================================================
    const [favoritos, setFavoritos] = useState([
        {
            id: 1,
            titulo: "O Último Horizonte",
            genero: "Ficção Científica",
            nota: 9.8,
            poster_url: "https://placehold.co/300x450/1a1a1a/e50914?text=O+Ultimo+Horizonte"
        },
        {
            id: 2,
            titulo: "Sombras do Passado",
            genero: "Drama",
            nota: 9.5,
            poster_url: "https://placehold.co/300x450/1a1a1a/e50914?text=Sombras+do+Passado"
        },
        {
            id: 3,
            titulo: "Era Uma Vez no Caos",
            genero: "Ação",
            nota: 9.3,
            poster_url: "https://placehold.co/300x450/1a1a1a/e50914?text=Era+Uma+Vez+no+Caos"
        },
        {
            id: 4,
            titulo: "A Queda dos Deuses",
            genero: "Suspense",
            nota: 9.1,
            poster_url: "https://placehold.co/300x450/1a1a1a/e50914?text=A+Queda+dos+Deuses"
        },
        {
            id: 5,
            titulo: "Nebulosa",
            genero: "Aventura",
            nota: 8.9,
            poster_url: "https://placehold.co/300x450/1a1a1a/e50914?text=Nebulosa"
        },
        {
            id: 6,
            titulo: "Interestelar Cósmico",
            genero: "Sci-Fi",
            nota: 9.7,
            poster_url: "https://placehold.co/300x450/1a1a1a/e50914?text=Interestelar"
        },
        {
            id: 7,
            titulo: "Matrix Reborn",
            genero: "Cyberpunk",
            nota: 9.4,
            poster_url: "https://placehold.co/300x450/1a1a1a/e50914?text=Matrix+Reborn"
        }
    ]);

    const [assistirMaisTarde, setAssistirMaisTarde] = useState([
        {
            id: 8,
            titulo: "Amor em Câmera Lenta",
            genero: "Romance",
            nota: 8.7,
            poster_url: "https://placehold.co/300x450/1a1a1a/e50914?text=Amor+em+Camera+Lenta"
        },
        {
            id: 9,
            titulo: "Risadas no Fim do Mundo",
            genero: "Comédia",
            nota: 8.5,
            poster_url: "https://placehold.co/300x450/1a1a1a/e50914?text=Risadas+no+Fim"
        },
        {
            id: 10,
            titulo: "Gritos na Escuridão",
            genero: "Horror",
            nota: 8.2,
            poster_url: "https://placehold.co/300x450/1a1a1a/e50914?text=Gritos+na+Escuridao"
        },
        {
            id: 11,
            titulo: "Mundo Paralelo",
            genero: "Animação",
            nota: 8.0,
            poster_url: "https://placehold.co/300x450/1a1a1a/e50914?text=Mundo+Paralelo"
        },
        {
            id: 12,
            titulo: "O Preço da Glória",
            genero: "Drama",
            nota: 7.8,
            poster_url: "https://placehold.co/300x450/1a1a1a/e50914?text=O+Preco+da+Gloria"
        },
        {
            id: 13,
            titulo: "O Código Perdido",
            genero: "Mistério",
            nota: 8.6,
            poster_url: "https://placehold.co/300x450/1a1a1a/e50914?text=O+Codigo+Perdido"
        }
    ]);

    // =========================================================
    // 4. CONTROLE DOS CARROSSÉIS (Refs e Funções de Rolagem)
    // =========================================================
    const favoritosRef = useRef(null);
    const assistirMaisTardeRef = useRef(null);

    const rolarCarrossel = (ref, direcao) => {
        if (ref.current) {
            const distancia = 440; // Distância de rolagem em pixels (~2 cards)
            ref.current.scrollBy({
                left: direcao === "esquerda" ? -distancia : distancia,
                behavior: "smooth"
            });
        }
    };

    // =========================================================
    // 5. ATUALIZAÇÃO DA BIO (Local + Ponto para Supabase)
    // =========================================================
    const handleSalvarBio = async () => {
        setUsuario(prev => ({ ...prev, bio: inputBio }));
        setIsEditingBio(false);
        setStatusBio("Bio atualizada com sucesso!");

        setTimeout(() => setStatusBio(""), 3000);

        // =====================================================
        // SUPABASE: SALVAR BIO NO BANCO
        // =====================================================
        if (supabase) {
            try {
                const { error } = await supabase
                    .from('usuario')
                    .update({ bio: inputBio })
                    .eq('id', usuario.id);

                if (error) {
                    console.error("Erro ao atualizar bio no Supabase:", error);
                }
            } catch (err) {
                console.warn("Erro ao comunicar com Supabase ao salvar bio:", err);
            }
        }
    };

    // =========================================================
    // 6. INTEGRAÇÃO COM O BANCO DE DADOS (SUPABASE)
    // =========================================================
    useEffect(() => {
        async function carregarDadosDoBanco() {
            try {
                if (!supabase) return;

                // A) Buscar dados do Usuário (ID atual) e seus itens cosméticos
                const { data: dadosUsuario, error: erroUsuario } = await supabase
                    .from('usuario')
                    .select('*, id_item_chapeu(*), id_item_mao(*), id_item_mascote(*)')
                    .eq('id', usuario.id)
                    .maybeSingle();

                if (dadosUsuario && !erroUsuario) {
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

                // B) Buscar Filmes do Usuários (se existir tabela de vinculo usuario_filmes)
                const { data: dadosRelacao } = await supabase
                    .from('usuario_filmes')
                    .select('*, filmes(*)')
                    .eq('id_usuario', usuario.id);

                if (dadosRelacao && dadosRelacao.length > 0) {
                    const favs = dadosRelacao
                        .filter(item => item.tipo === 'favorito')
                        .map(item => item.filmes);
                    const watchLater = dadosRelacao
                        .filter(item => item.tipo === 'assistir_mais_tarde')
                        .map(item => item.filmes);

                    if (favs.length > 0) setFavoritos(favs);
                    if (watchLater.length > 0) setAssistirMaisTarde(watchLater);
                } else {
                    // Fallback: Busca geral de filmes caso a tabela usuario_filmes ainda não esteja populada
                    const { data: dadosFilmes, error: erroFilmes } = await supabase
                        .from('filmes')
                        .select('*');

                    if (dadosFilmes && dadosFilmes.length > 0 && !erroFilmes) {
                        const metade = Math.ceil(dadosFilmes.length / 2);
                        setFavoritos(dadosFilmes.slice(0, metade));
                        setAssistirMaisTarde(dadosFilmes.slice(metade));
                    }
                }

            } catch (err) {
                console.warn("Supabase offline ou aguardando dados:", err);
            }
        }

        carregarDadosDoBanco();
    }, []);

    // =========================================================
    // 7. RENDERIZAÇÃO DA PÁGINA
    // =========================================================
    return (
        <div id="pagina-usuario">
            {/* Componente Navbar / Menu do CiNEPLANNER */}
            <Menu />

            {/* Conteúdo Principal */}
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

                {/* CARD DE PERFIL COM AVATAR, ACESSÓRIOS E BIO */}
                <section className="profile-card" aria-label="Card de Perfil">
                    <div className="avatar-container">
                        {/* Acessório de Chapéu (Tabela 'itens') */}
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

                        {/* Acessório de Mão/Item (Tabela 'itens') */}
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

                    {/* Mascote (Tabela 'itens') */}
                    {usuario.mascoteUrl && (
                        <img
                            className="pet-accessory"
                            src={usuario.mascoteUrl}
                            alt="Mascote de Companhia"
                        />
                    )}
                </section>

                {/* SEÇÃO 1: FILMES FAVORITOS (COM CARROSSEL) */}
                <section className="movies-section" aria-label="Filmes Favoritos">
                    <div className="section-header">
                        <div className="section-header-left">
                            <h2>FILMES FAVORITOS</h2>
                            <span className="movie-count">
                                {favoritos.length.toString().padStart(2, '0')} FILMES
                            </span>
                        </div>
                    </div>

                    <div className="carousel-wrapper">
                        {/* Botão Anterior */}
                        <button
                            className="carousel-btn carousel-btn-prev"
                            onClick={() => rolarCarrossel(favoritosRef, "esquerda")}
                            aria-label="Rolar filmes favoritos para a esquerda"
                            type="button"
                        >
                            &#8249;
                        </button>

                        {/* Pista do Carrossel de Favoritos */}
                        <div className="movies-carousel" ref={favoritosRef}>
                            {favoritos.map((filme) => (
                                <article key={filme.id} className="filme-card">
                                    <a href={`/resenhas?id=${filme.id}`} className="card-link">
                                        <div className="card-poster">
                                            <img
                                                src={filme.poster_url}
                                                alt={`Poster de ${filme.titulo}`}
                                                className="poster-img"
                                                loading="lazy"
                                            />
                                            <div className="card-overlay">
                                                <span className="card-overlay-text">Ver Detalhes</span>
                                            </div>
                                        </div>
                                        <div className="card-info">
                                            <h3 className="card-titulo">{filme.titulo}</h3>
                                            <div className="card-meta">
                                                <span className="card-genero">{filme.genero || filme.classificacao || "Filme"}</span>
                                                <div className="card-nota">
                                                    <span className="estrela">★</span>
                                                    <span className="nota-valor">{filme.nota || "—"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </article>
                            ))}
                        </div>

                        {/* Botão Próximo */}
                        <button
                            className="carousel-btn carousel-btn-next"
                            onClick={() => rolarCarrossel(favoritosRef, "direita")}
                            aria-label="Rolar filmes favoritos para a direita"
                            type="button"
                        >
                            &#8250;
                        </button>
                    </div>
                </section>

                {/* SEÇÃO 2: ASSISTIR MAIS TARDE (COM CARROSSEL) */}
                <section className="movies-section" aria-label="Assistir Mais Tarde">
                    <div className="section-header">
                        <div className="section-header-left">
                            <h2>ASSISTIR MAIS TARDE</h2>
                            <span className="movie-count">
                                {assistirMaisTarde.length.toString().padStart(2, '0')} FILMES
                            </span>
                        </div>
                    </div>

                    <div className="carousel-wrapper">
                        {/* Botão Anterior */}
                        <button
                            className="carousel-btn carousel-btn-prev"
                            onClick={() => rolarCarrossel(assistirMaisTardeRef, "esquerda")}
                            aria-label="Rolar lista assistir mais tarde para a esquerda"
                            type="button"
                        >
                            &#8249;
                        </button>

                        {/* Pista do Carrossel de Assistir Mais Tarde */}
                        <div className="movies-carousel" ref={assistirMaisTardeRef}>
                            {assistirMaisTarde.map((filme) => (
                                <article key={filme.id} className="filme-card">
                                    <a href={`/resenhas?id=${filme.id}`} className="card-link">
                                        <div className="card-poster">
                                            <img
                                                src={filme.poster_url}
                                                alt={`Poster de ${filme.titulo}`}
                                                className="poster-img"
                                                loading="lazy"
                                            />
                                            <div className="card-overlay">
                                                <span className="card-overlay-text">Ver Detalhes</span>
                                            </div>
                                        </div>
                                        <div className="card-info">
                                            <h3 className="card-titulo">{filme.titulo}</h3>
                                            <div className="card-meta">
                                                <span className="card-genero">{filme.genero || filme.classificacao || "Filme"}</span>
                                                <div className="card-nota">
                                                    <span className="estrela">★</span>
                                                    <span className="nota-valor">{filme.nota || "—"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </article>
                            ))}
                        </div>

                        {/* Botão Próximo */}
                        <button
                            className="carousel-btn carousel-btn-next"
                            onClick={() => rolarCarrossel(assistirMaisTardeRef, "direita")}
                            aria-label="Rolar lista assistir mais tarde para a direita"
                            type="button"
                        >
                            &#8250;
                        </button>
                    </div>
                </section>

            </main>

            {/* Componente de Rodapé do CiNEPLANNER */}
            <Rodape />
        </div>
    );
}

export default Usuario;