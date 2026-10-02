import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

// Função utilitária para obter a URL pública de itens do Supabase Storage
function obterUrlItem(caminhoOuUrl) {
    if (!caminhoOuUrl) return "";
    // Se já for uma URL completa externa ou caminho relativo local
    if (
        caminhoOuUrl.startsWith("http://") ||
        caminhoOuUrl.startsWith("https://") ||
        caminhoOuUrl.startsWith("./") ||
        caminhoOuUrl.startsWith("/")
    ) {
        return caminhoOuUrl;
    }
    // Se for o nome do arquivo ou caminho salvo no bucket do Supabase Storage ('itens')
    if (supabase) {
        // Remove prefixo "itens/" se existir para evitar duplicação caso o bucket já seja 'itens'
        const nomeArquivo = caminhoOuUrl.startsWith("itens/")
            ? caminhoOuUrl.replace(/^itens\//, "")
            : caminhoOuUrl;

        const { data } = supabase.storage.from("itens").getPublicUrl(nomeArquivo);
        return data?.publicUrl || caminhoOuUrl;
    }
    return caminhoOuUrl;
}

function Usuario() {
    const navigate = useNavigate();
    // =========================================================
    // 1. ESTADOS DO USUÁRIO (Perfil, XP, Bio e Acessórios)
    // =========================================================
    const [usuario, setUsuario] = useState({
        id: 1,
        nome: "They Pro Filmes",
        username: "THEY_PRO_FILMES",
        email: "usuario@cineplanner.com",
        bio: "Amante de ficção científica, cinema clássico e maratonas de fim de semana.",
        xpTotal: 25400,
        nivel: 50,
        chapeuUrl: "./img/hat-red-dead.png",
        maoUrl: "./img/acessorio-red-dead.png",
        mascoteUrl: "./img/pet-red-dead.png",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
        idItemChapeu: null,
        idItemMao: null,
        idItemMascote: null
    });

    const [itens, setItens] = useState([]);
    const [modalItensAberto, setModalItensAberto] = useState(false);

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
    // Extrai apenas os IDs dos filmes para salvar no banco (Supabase recebe [id1, id2, ...])
    const extrairIds = (lista) => lista.map(f => (typeof f === 'object' && f !== null) ? Number(f.id) : Number(f));

    const salvarFavoritos = async (novaLista) => {
        setFavoritos(novaLista);

        if (supabase && usuario?.id) {
            try {
                const apenasIds = extrairIds(novaLista);
                const { data: listFav } = await supabase
                    .from('playlists')
                    .select('id')
                    .eq('id_usuario', usuario.id)
                    .eq('nome', 'Favoritos');

                if (listFav && listFav.length > 0) {
                    await supabase
                        .from('playlists')
                        .update({ filmes: apenasIds })
                        .eq('id', listFav[0].id);

                    if (listFav.length > 1) {
                        const dupIds = listFav.slice(1).map(p => p.id);
                        await supabase.from('playlists').delete().in('id', dupIds);
                    }
                } else {
                    await supabase
                        .from('playlists')
                        .insert([{ id_usuario: usuario.id, nome: 'Favoritos', filmes: apenasIds }]);
                }
            } catch (err) {
                console.warn("Erro ao salvar favoritos no Supabase:", err);
            }
        }
    };

    const salvarWatchlist = async (novaLista) => {
        setAssistirMaisTarde(novaLista);

        if (supabase && usuario?.id) {
            try {
                const apenasIds = extrairIds(novaLista);
                const { data: listWatch } = await supabase
                    .from('playlists')
                    .select('id')
                    .eq('id_usuario', usuario.id)
                    .eq('nome', 'Assistir Mais Tarde');

                if (listWatch && listWatch.length > 0) {
                    await supabase
                        .from('playlists')
                        .update({ filmes: apenasIds })
                        .eq('id', listWatch[0].id);

                    if (listWatch.length > 1) {
                        const dupIds = listWatch.slice(1).map(p => p.id);
                        await supabase.from('playlists').delete().in('id', dupIds);
                    }
                } else {
                    await supabase
                        .from('playlists')
                        .insert([{ id_usuario: usuario.id, nome: 'Assistir Mais Tarde', filmes: apenasIds }]);
                }
            } catch (err) {
                console.warn("Erro ao salvar watchlist no Supabase:", err);
            }
        }
    };

    const salvarPlaylists = (novasPlaylists) => {
        setPlaylists(novasPlaylists);
    };

    // Verificadores de estado
    const eFavorito = (id) => favoritos.some(f => Number(f.id) === Number(id));
    const naWatchlist = (id) => assistirMaisTarde.some(f => Number(f.id) === Number(id));

    // Verificador se o filme está em alguma playlist (Assistir Mais Tarde ou qualquer Playlist Personalizada)
    const estaEmAlgumaPlaylist = (id) => {
        if (naWatchlist(id)) return true;
        return playlists.some(p => p.filmes && p.filmes.some(f => Number(f.id) === Number(id)));
    };

    // Toggle para o Botão Coração (Favoritos)
    const toggleFavorito = (filme) => {
        const fId = Number(filme.id);
        const fObj = {
            id: fId,
            titulo: filme.titulo || filme.title || "",
            poster_url: filme.poster_url || (filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : null),
            avaliacao: filme.avaliacao || filme.vote_average || 0,
            duracao: filme.duracao || filme.runtime || 0,
            sinopse: filme.sinopse || filme.overview || "",
            ano_lancamento: filme.ano_lancamento || filme.release_date || "",
            generos: filme.generos || ""
        };

        if (eFavorito(fId)) {
            const novaLista = favoritos.filter(f => Number(f.id) !== fId);
            salvarFavoritos(novaLista);
        } else {
            salvarFavoritos([fObj, ...favoritos.filter(f => Number(f.id) !== fId)]);
        }
    };

    // Toggle para o Botão Playlist (Assistir Mais Tarde)
    const toggleAssistirMaisTarde = (filme) => {
        const fId = Number(filme.id);
        const fObj = {
            id: fId,
            titulo: filme.titulo || filme.title || "",
            poster_url: filme.poster_url || (filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : null),
            avaliacao: filme.avaliacao || filme.vote_average || 0,
            duracao: filme.duracao || filme.runtime || 0,
            sinopse: filme.sinopse || filme.overview || "",
            ano_lancamento: filme.ano_lancamento || filme.release_date || "",
            generos: filme.generos || ""
        };

        if (naWatchlist(fId)) {
            const novaLista = assistirMaisTarde.filter(f => Number(f.id) !== fId);
            salvarWatchlist(novaLista);
        } else {
            salvarWatchlist([fObj, ...assistirMaisTarde.filter(f => Number(f.id) !== fId)]);
        }
    };

    // Criar uma nova playlist personalizada no Supabase
    const handleCriarPlaylist = async (e) => {
        e.preventDefault();
        if (!novaPlaylistNome.trim() || !usuario?.id) return;

        const currentUserId = Number(usuario.id);
        const fObj = filmeParaModal ? {
            id: Number(filmeParaModal.id),
            titulo: filmeParaModal.titulo || filmeParaModal.title || "",
            poster_url: filmeParaModal.poster_url || (filmeParaModal.poster_path ? `https://image.tmdb.org/t/p/w500${filmeParaModal.poster_path}` : null),
            avaliacao: filmeParaModal.avaliacao || filmeParaModal.vote_average || 0,
            duracao: filmeParaModal.duracao || filmeParaModal.runtime || 0,
            sinopse: filmeParaModal.sinopse || filmeParaModal.overview || "",
            ano_lancamento: filmeParaModal.ano_lancamento || filmeParaModal.release_date || "",
            generos: filmeParaModal.generos || ""
        } : null;

        const filmesIniciais = fObj ? [fObj] : [];
        // Banco recebe apenas IDs
        const idsIniciais = fObj ? [Number(fObj.id)] : [];

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
                    .insert([{ id_usuario: currentUserId, nome: novaPlaylistNome.trim(), filmes: idsIniciais }])
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

    // Alternar visibilidade pública/privada da playlist
    const togglePublicaPlaylist = async (playlistId) => {
        const novasPlaylists = playlists.map(p => {
            if (p.id === playlistId) {
                return { ...p, publica: !(p.publica ?? true) };
            }
            return p;
        });
        salvarPlaylists(novasPlaylists);

        // Persiste no Supabase
        if (supabase) {
            const playlistAtualizada = novasPlaylists.find(p => p.id === playlistId);
            try {
                await supabase
                    .from('playlists')
                    .update({ publica: playlistAtualizada?.publica ?? false })
                    .eq('id', playlistId);
            } catch (err) {
                console.warn("Erro ao atualizar visibilidade da playlist no Supabase:", err);
            }
        }
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
        const fId = Number(filme.id);
        const fObj = {
            id: fId,
            titulo: filme.titulo || filme.title || "",
            poster_url: filme.poster_url || (filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : null),
            avaliacao: filme.avaliacao || filme.vote_average || 0,
            duracao: filme.duracao || filme.runtime || 0,
            sinopse: filme.sinopse || filme.overview || "",
            ano_lancamento: filme.ano_lancamento || filme.release_date || "",
            generos: filme.generos || ""
        };

        const novasPlaylists = playlists.map(p => {
            if (p.id === playlistId) {
                const jaExiste = p.filmes && p.filmes.some(f => Number(f.id) === fId);
                const novosFilmes = jaExiste
                    ? p.filmes.filter(f => Number(f.id) !== fId)
                    : [fObj, ...(p.filmes || []).filter(f => Number(f.id) !== fId)];

                // Banco recebe apenas IDs
                if (supabase) {
                    const apenasIds = extrairIds(novosFilmes);
                    supabase.from('playlists').update({ filmes: apenasIds }).eq('id', playlistId).then().catch(err => console.warn(err));
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
                // Obter usuário salvo localmente caso exista
                let currentUserId = usuario.id;
                const userSalvoStr = localStorage.getItem("user");
                if (userSalvoStr) {
                    try {
                        const userSalvo = JSON.parse(userSalvoStr);
                        if (userSalvo?.id) {
                            currentUserId = userSalvo.id;
                            setUsuario(prev => ({
                                ...prev,
                                id: userSalvo.id,
                                nome: userSalvo.nome || prev.nome,
                                username: userSalvo.username || prev.username,
                                email: userSalvo.email || prev.email,
                                bio: userSalvo.bio || prev.bio,
                                xpTotal: userSalvo.xp_total ?? prev.xpTotal,
                                nivel: userSalvo.nivel ?? prev.nivel,
                                avatarUrl: userSalvo.url_img ? obterUrlItem(userSalvo.url_img) : (userSalvo.avatar_url || prev.avatarUrl)
                            }));
                            setInputBio(userSalvo.bio || "");
                        }
                    } catch (e) {
                        console.warn("Erro ao ler usuário do localStorage", e);
                    }
                }

                // A) Buscar Perfil no Supabase se disponível
                if (supabase && currentUserId) {
                    const { data: dadosUsuario } = await supabase
                        .from('usuario')
                        .select('*, id_item_chapeu(*), id_item_mao(*), id_item_mascote(*)')
                        .eq('id', currentUserId)
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
                            avatarUrl: dadosUsuario.url_img ? obterUrlItem(dadosUsuario.url_img) : (dadosUsuario.avatar_url || prev.avatarUrl),
                            chapeuUrl: dadosUsuario.id_item_chapeu?.url_item ? obterUrlItem(dadosUsuario.id_item_chapeu.url_item) : prev.chapeuUrl,
                            maoUrl: dadosUsuario.id_item_mao?.url_item ? obterUrlItem(dadosUsuario.id_item_mao.url_item) : prev.maoUrl,
                            mascoteUrl: dadosUsuario.id_item_mascote?.url_item ? obterUrlItem(dadosUsuario.id_item_mascote.url_item) : prev.mascoteUrl,
                            idItemChapeu: dadosUsuario.id_item_chapeu?.id || null,
                            idItemMao: dadosUsuario.id_item_mao?.id || null,
                            idItemMascote: dadosUsuario.id_item_mascote?.id || null
                        }));
                        setInputBio(dadosUsuario.bio || "");
                    }

                    // Buscar os itens
                    const { data: dadosItens } = await supabase.from('itens').select('*');
                    if (dadosItens) setItens(dadosItens);
                }

                // B) Sincronizar Playlists (Favoritos, Assistir Mais Tarde e Personalizadas) direto do Supabase
                if (supabase && currentUserId) {
                    try {
                        const { data: dadosPlaylists, error: errPlaylists } = await supabase
                            .from('playlists')
                            .select('*')
                            .eq('id_usuario', currentUserId);

                        if (!errPlaylists && dadosPlaylists) {
                            const favPlaylists = dadosPlaylists.filter(p => p.nome === "Favoritos");
                            let favPlaylist = favPlaylists.find(p => p.filmes && Array.isArray(p.filmes) && p.filmes.length > 0) || favPlaylists[0];

                            const watchPlaylists = dadosPlaylists.filter(p => p.nome === "Assistir Mais Tarde");
                            let watchPlaylist = watchPlaylists.find(p => p.filmes && Array.isArray(p.filmes) && p.filmes.length > 0) || watchPlaylists[0];

                            // Se não existir playlist "Favoritos" para o usuário, cria no banco
                            if (!favPlaylist) {
                                const { data: novaFav } = await supabase
                                    .from('playlists')
                                    .insert([{ id_usuario: currentUserId, nome: "Favoritos", filmes: [] }])
                                    .select()
                                    .single();
                                if (novaFav) favPlaylist = novaFav;
                            } 

                            // Se não existir playlist "Assistir Mais Tarde" para o usuário, cria no banco
                            if (!watchPlaylist) {
                                const { data: novaWatch } = await supabase
                                    .from('playlists')
                                    .insert([{ id_usuario: currentUserId, nome: "Assistir Mais Tarde", filmes: [] }])
                                    .select()
                                    .single();
                                if (novaWatch) watchPlaylist = novaWatch;
                            }

                            // Função auxiliar para resolver IDs/objetos do banco em objetos completos via API TMDB
                            const resolverFilmes = async (lista) => {
                                if (!lista || !Array.isArray(lista) || lista.length === 0) return [];
                                const promises = lista.map(async (item) => {
                                    // Se for apenas um número (ID), busca na API
                                    if (typeof item === 'number' || typeof item === 'string') {
                                        return await buscarDetalhesFilme(Number(item));
                                    }
                                    // Se for objeto com ID mas sem título, busca na API
                                    if (typeof item === 'object' && item !== null) {
                                        if (item.id && !item.titulo && !item.title) {
                                            return await buscarDetalhesFilme(Number(item.id));
                                        }
                                        // Objeto completo (retrocompatibilidade)
                                        return item;
                                    }
                                    return null;
                                });
                                return (await Promise.all(promises)).filter(Boolean);
                            };

                            // Carrega os filmes do Supabase resolvendo IDs via API TMDB
                            const favFilmes = await resolverFilmes(favPlaylist?.filmes);
                            const watchFilmes = await resolverFilmes(watchPlaylist?.filmes);
                            setFavoritos(favFilmes);
                            setAssistirMaisTarde(watchFilmes);

                            // Playlists personalizadas são aquelas diferentes das 2 fixas
                            const personalizadas = dadosPlaylists.filter(
                                p => p.nome !== "Favoritos" && p.nome !== "Assistir Mais Tarde"
                            );

                            // Resolve os filmes de cada playlist personalizada
                            const playlistsResolvidas = await Promise.all(
                                personalizadas.map(async (pl) => ({
                                    ...pl,
                                    filmes: await resolverFilmes(pl.filmes)
                                }))
                            );
                            setPlaylists(playlistsResolvidas);
                        }
                    } catch (e) {
                        console.warn("Erro ao carregar playlists do Supabase:", e);
                    }
                }
            } catch (err) {
                console.error("Erro ao carregar dados do usuário:", err);
            } finally {
                setCarregandoFilmes(false);
            }
        }

        carregarFilmesUsuario();
    }, []);

    // =========================================================
    // 5. ATUALIZAÇÃO DA BIO E LOGOUT
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

    const handleLogout = async () => {
        try {
            if (supabase?.auth) {
                await supabase.auth.signOut();
            }
        } catch (err) {
            console.warn("Erro ao deslogar do Supabase:", err);
        }

        // Limpa a sessão local
        localStorage.removeItem("user");
        localStorage.removeItem("supabase_token");
        window.dispatchEvent(new Event("authChanged"));

        // Redireciona para o login ou tela inicial
        navigate("/login");
    };
    const handleEquiparItem = async (item) => {
        const xpAtual = Number(usuario.xpTotal || 0);
        const valorItem = Number(item.valor || 0);

        if (xpAtual < valorItem) return; // Item bloqueado

        const atualizacoes = {};
        if (item.tipo === 1) atualizacoes.id_item_chapeu = item.id;
        else if (item.tipo === 2) atualizacoes.id_item_mao = item.id;
        else if (item.tipo === 3) atualizacoes.id_item_mascote = item.id;

        const urlFormatada = obterUrlItem(item.url_item);

        // Atualiza a UI imediatamente para sensação de tempo real
        setUsuario(prev => ({
            ...prev,
            chapeuUrl: item.tipo === 1 ? urlFormatada : prev.chapeuUrl,
            maoUrl: item.tipo === 2 ? urlFormatada : prev.maoUrl,
            mascoteUrl: item.tipo === 3 ? urlFormatada : prev.mascoteUrl,
            idItemChapeu: item.tipo === 1 ? item.id : prev.idItemChapeu,
            idItemMao: item.tipo === 2 ? item.id : prev.idItemMao,
            idItemMascote: item.tipo === 3 ? item.id : prev.idItemMascote,
        }));

        if (supabase) {
            try {
                await supabase.from('usuario').update(atualizacoes).eq('id', usuario.id);
            } catch (err) {
                console.warn("Erro ao equipar item", err);
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
                            style={{ '--progress-width': `${porcentagemXp}%` }}
                        ></div>
                    </div>
                </section>

                {/* CARD DE PERFIL DO USUÁRIO */}
                <section className="profile-card" aria-label="Card de Perfil">
                    <div className="avatar-wrapper">
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

                        <button onClick={handleLogout} className="logout-btn" title="Sair da conta">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Sair
                        </button>
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
                                <div className="bio-botoes-acoes">
                                    <button
                                        className="btn-editar-bio"
                                        onClick={() => setIsEditingBio(true)}
                                        type="button"
                                    >
                                        Editar Bio
                                    </button>
                                    <button
                                        className="btn-inventario"
                                        onClick={() => setModalItensAberto(true)}
                                        type="button"
                                        title="Abrir Itens"
                                    >
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="9" cy="21" r="1"></circle>
                                            <circle cx="20" cy="21" r="1"></circle>
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                        </svg>
                                        Itens
                                    </button>
                                </div>
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
                                    <div className="custom-playlist-title-container">
                                        {/* BOTÃO TOGGLE PÚBLICA / PRIVADA À ESQUERDA DO TÍTULO */}
                                        <button
                                            type="button"
                                            onClick={() => togglePublicaPlaylist(pl.id)}
                                            className={`btn-playlist-visibilidade ${(pl.publica ?? true) ? 'publica' : 'privada'}`}
                                            title={(pl.publica ?? true) ? "Playlist Pública (Clique para tornar Privada)" : "Playlist Privada (Clique para tornar Pública)"}
                                            aria-label={(pl.publica ?? true) ? "Playlist Pública" : "Playlist Privada"}
                                        >
                                            {(pl.publica ?? true) ? (
                                                /* SVG DE GLOBO (PÚBLICA) */
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="2" y1="12" x2="22" y2="12" />
                                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                                </svg>
                                            ) : (
                                                /* SVG DE CADEADO (PRIVADA) */
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                            )}
                                        </button>
                                        <h3>{pl.nome}</h3>
                                    </div>
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
                                const jaPertence = pl.filmes && pl.filmes.some(f => Number(f.id) === Number(filmeParaModal.id));
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

                        {isCriandoPlaylist ? (
                            <form onSubmit={handleCriarPlaylist} className="form-criar-playlist-inline" style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
                                <input
                                    type="text"
                                    placeholder="Nome da nova playlist..."
                                    value={novaPlaylistNome}
                                    onChange={(e) => setNovaPlaylistNome(e.target.value)}
                                    className="input-nome-playlist"
                                    autoFocus
                                    style={{ padding: "10px", borderRadius: "6px", background: "#111", border: "1px solid #333", color: "#fff" }}
                                />
                                <div className="form-criar-actions" style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                                    <button type="submit" className="btn-confirmar-criar" style={{ padding: "8px 16px", borderRadius: "6px", background: "#e50914", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold" }}>Criar</button>
                                    <button type="button" className="btn-cancelar-criar" onClick={() => setIsCriandoPlaylist(false)} style={{ padding: "8px 14px", borderRadius: "6px", background: "#333", color: "#aaa", border: "none", cursor: "pointer" }}>Cancelar</button>
                                </div>
                            </form>
                        ) : (
                            <div className="modal-footer">
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
                                    onClick={() => { setFilmeParaModal(null); setIsCriandoPlaylist(false); }}
                                >
                                    Concluído
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* MODAL DE ITENS */}
            {modalItensAberto && (
                <div className="modal-overlay" style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0, 0, 0, 0.7)" }} onClick={() => setModalItensAberto(false)}>
                    <div className="modal-content itens-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "800px", width: "90%", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
                        <div className="modal-header">
                            <h3>ITENS</h3>
                            <button type="button" className="btn-close-modal" onClick={() => setModalItensAberto(false)}>✕</button>
                        </div>

                        <div className="itens-container" style={{ padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "30px" }}>

                            {/* SEÇÃO 1: CHAPÉUS */}
                            <div className="itens-secao">
                                <h4 style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "10px", marginBottom: "15px", color: "#fff" }}>CHAPÉUS</h4>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "15px" }}>
                                    {itens.filter(i => i.tipo === 1).map(item => renderizarItem(item))}
                                    {itens.filter(i => i.tipo === 1).length === 0 && <span style={{ color: "#888" }}>Nenhum item...</span>}
                                </div>
                            </div>

                            {/* SEÇÃO 2: MÃOS */}
                            <div className="itens-secao">
                                <h4 style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "10px", marginBottom: "15px", color: "#fff" }}>MÃOS</h4>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "15px" }}>
                                    {itens.filter(i => i.tipo === 2).map(item => renderizarItem(item))}
                                    {itens.filter(i => i.tipo === 2).length === 0 && <span style={{ color: "#888" }}>Nenhum item...</span>}
                                </div>
                            </div>

                            {/* SEÇÃO 3: MASCOTES */}
                            <div className="itens-secao">
                                <h4 style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "10px", marginBottom: "15px", color: "#fff" }}>MASCOTES</h4>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "15px" }}>
                                    {itens.filter(i => i.tipo === 3).map(item => renderizarItem(item))}
                                    {itens.filter(i => i.tipo === 3).length === 0 && <span style={{ color: "#888" }}>Nenhum item...</span>}
                                </div>
                            </div>

                        </div>

                        <div className="modal-footer" style={{ justifyContent: "center" }}>
                            <button type="button" className="btn-modal-fechar" onClick={() => setModalItensAberto(false)} style={{ width: "100%", padding: "12px", background: "#333", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>FECHAR</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    function renderizarItem(item) {
        const xpAtual = Number(usuario.xpTotal || 0);
        const valorItem = Number(item.valor || 0);
        const desbloqueado = xpAtual >= valorItem;

        const equipado = (item.tipo === 1 && usuario.idItemChapeu === item.id) ||
            (item.tipo === 2 && usuario.idItemMao === item.id) ||
            (item.tipo === 3 && usuario.idItemMascote === item.id);

        return (
            <div
                key={item.id}
                onClick={() => desbloqueado && !equipado && handleEquiparItem(item)}
                style={{
                    border: equipado ? "2px solid #e50914" : "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "10px",
                    padding: "10px",
                    background: "rgba(255,255,255,0.05)",
                    textAlign: "center",
                    cursor: desbloqueado && !equipado ? "pointer" : (equipado ? "default" : "not-allowed"),
                    opacity: desbloqueado ? 1 : 0.5,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                {!desbloqueado && (
                    <div style={{ position: "absolute", top: "5px", right: "5px", background: "rgba(0,0,0,0.8)", borderRadius: "50%", padding: "4px", fontSize: "0.7rem" }}>
                        🔒
                    </div>
                )}
                <img src={obterUrlItem(item.url_item)} alt={`Item ${item.id}`} style={{ width: "60px", height: "60px", objectFit: "contain", marginBottom: "10px" }} />

                <div style={{ marginTop: "auto", width: "100%" }}>
                    {!desbloqueado ? (
                        <span style={{ display: "block", fontSize: "0.75rem", color: "#ff9800", fontWeight: "bold" }}>🔒 {valorItem} XP</span>
                    ) : equipado ? (
                        <span style={{ display: "block", fontSize: "0.8rem", color: "#e50914", fontWeight: "bold" }}>✓ Equipado</span>
                    ) : (
                        <span style={{ display: "block", fontSize: "0.8rem", color: "#4caf50", fontWeight: "bold" }}>Equipar</span>
                    )}
                </div>
            </div>
        );
    }
}

export default Usuario;
