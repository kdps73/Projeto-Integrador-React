import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabase";
import "./css/index.css";
import "./css/listas.css";

// =========================================================
// 4 LISTAS GENÉRICAS / OFICIAIS (FALLBACK E CURADORIA)
// =========================================================
const LISTAS_GENERICAS = [
    {
        id: "curadoria-marvel",
        nome: "Universo Cinematográfico Marvel",
        descricao: "A saga completa dos maiores heróis da Terra em ordem de lançamento e impacto.",
        isOficial: true,
        autor: {
            nome: "CinePlanner Curadoria",
            username: "MarvelUniverse",
            avatarUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=300&q=80",
            nivel: 99,
            cargo: "Curador Oficial"
        },
        filmes: [
            {
                id: 299536,
                titulo: "Vingadores: Guerra Infinita",
                poster_url: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
                avaliacao: 8.3,
                ano_lancamento: "2018-04-25",
                duracao: 149,
                generos: "Ação, Ficção Científica, Aventura",
                sinopse: "Homem de Ferro, Capitão América, Thor e os Vingadores se unem para enfrentar Thanos."
            },
            {
                id: 299534,
                titulo: "Vingadores: Ultimato",
                poster_url: "https://image.tmdb.org/t/p/w500/q6725aR8Zs4IwGMXzZT8aC8lh41.jpg",
                avaliacao: 8.3,
                ano_lancamento: "2019-04-24",
                duracao: 181,
                generos: "Aventura, Ficção Científica, Ação",
                sinopse: "Após os eventos devastadores de Guerra Infinita, o universo está em ruínas."
            },
            {
                id: 533535,
                titulo: "Deadpool & Wolverine",
                poster_url: "https://image.tmdb.org/t/p/w500/9bXnN0c4w7RzP3bL2fR6A1W2Z2.jpg",
                avaliacao: 7.7,
                ano_lancamento: "2024-07-24",
                duracao: 128,
                generos: "Ação, Comédia, Ficção Científica",
                sinopse: "Wolverine se recupera de ferimentos quando cruza com o tagarela Deadpool."
            },
            {
                id: 1726,
                titulo: "Homem de Ferro",
                poster_url: "https://image.tmdb.org/t/p/w500/7Ahvsr09kUSJ7rWnO3xT1iA3w7G.jpg",
                avaliacao: 7.6,
                ano_lancamento: "2008-04-30",
                duracao: 126,
                generos: "Ação, Ficção Científica, Aventura",
                sinopse: "Tony Stark constrói uma armadura de alta tecnologia e jura proteger o mundo."
            },
            {
                id: 284054,
                titulo: "Pantera Negra",
                poster_url: "https://image.tmdb.org/t/p/w500/2yQUnpc1HG899990A45yCgP7K6A.jpg",
                avaliacao: 7.4,
                ano_lancamento: "2018-02-13",
                duracao: 134,
                generos: "Ação, Aventura, Ficção Científica",
                sinopse: "T'Challa retorna para assumir seu lugar de direito como rei da nação de Wakanda."
            },
            {
                id: 634649,
                titulo: "Homem-Aranha: Sem Volta Para Casa",
                poster_url: "https://image.tmdb.org/t/p/w500/8c4HGVN1LN1g2422fd3uvhTeQ4K.jpg",
                avaliacao: 8.0,
                ano_lancamento: "2021-12-15",
                duracao: 148,
                generos: "Ação, Aventura, Ficção Científica",
                sinopse: "Peter Parker pede ajuda ao Doutor Estranho para reverter a revelação de sua identidade."
            },
            {
                id: 284053,
                titulo: "Thor: Ragnarok",
                poster_url: "https://image.tmdb.org/t/p/w500/kaIfm5ryEOwYg8vrqOk793epIH.jpg",
                avaliacao: 7.6,
                ano_lancamento: "2017-10-25",
                duracao: 130,
                generos: "Ação, Aventura, Comédia",
                sinopse: "Thor é aprisionado do outro lado do universo e luta contra o tempo para salvar Asgard."
            }
        ]
    },
    {
        id: "curadoria-dc",
        nome: "Universo DC & Liga da Justiça",
        descricao: "Do Cavaleiro das Trevas de Gotham aos heróis mais poderosos da DC Comics.",
        isOficial: true,
        autor: {
            nome: "CinePlanner Curadoria",
            username: "DC_Comics_Fan",
            avatarUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=300&q=80",
            nivel: 95,
            cargo: "Curador Oficial"
        },
        filmes: [
            {
                id: 155,
                titulo: "Batman: O Cavaleiro das Trevas",
                poster_url: "https://image.tmdb.org/t/p/w500/iG5aq164dQknyv0JUPk6T1m2Tsh.jpg",
                avaliacao: 8.5,
                ano_lancamento: "2008-07-16",
                duracao: 152,
                generos: "Drama, Ação, Crime, Thriller",
                sinopse: "Batman enfrenta o Coringa em uma batalha psicológica e física pela alma de Gotham."
            },
            {
                id: 414906,
                titulo: "The Batman",
                poster_url: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
                avaliacao: 7.7,
                ano_lancamento: "2022-03-01",
                duracao: 176,
                generos: "Crime, Mistério, Thriller",
                sinopse: "Em seu segundo ano na luta contra o crime, Batman investiga a corrupção em Gotham."
            },
            {
                id: 475557,
                titulo: "Coringa",
                poster_url: "https://image.tmdb.org/t/p/w500/xLxgVXgp0Whss1A7SpEwWIX40oZ.jpg",
                avaliacao: 8.2,
                ano_lancamento: "2019-10-02",
                duracao: 122,
                generos: "Crime, Thriller, Drama",
                sinopse: "Isolado e maltratado pela sociedade, Arthur Fleck inicia uma lenta descida à loucura."
            },
            {
                id: 791373,
                titulo: "Liga da Justiça de Zack Snyder",
                poster_url: "https://image.tmdb.org/t/p/w500/ArWn549AhwQm2t9QcqE44zZgBs0.jpg",
                avaliacao: 8.1,
                ano_lancamento: "2021-03-18",
                duracao: 242,
                generos: "Ação, Aventura, Fantasia",
                sinopse: "Determinado a garantir que o sacrifício final do Superman não fosse em vão, Bruce Wayne recruta heróis."
            },
            {
                id: 49521,
                titulo: "O Homem de Aço",
                poster_url: "https://image.tmdb.org/t/p/w500/xW10c2Z4lS12k3nC6e4jZgB0c9P.jpg",
                avaliacao: 6.6,
                ano_lancamento: "2013-06-12",
                duracao: 143,
                generos: "Ação, Aventura, Ficção Científica",
                sinopse: "Clark Kent descobre seus superpoderes e sua verdadeira herança alienígena."
            },
            {
                id: 297762,
                titulo: "Mulher-Maravilha",
                poster_url: "https://image.tmdb.org/t/p/w500/gfJGlJ0Ce22vyvL7bF19pT0x7Pz.jpg",
                avaliacao: 7.2,
                ano_lancamento: "2017-05-30",
                duracao: 141,
                generos: "Ação, Aventura, Fantasia",
                sinopse: "Treinada desde cedo para ser uma guerreira imbatível, Diana descobre seu destino no mundo dos homens."
            }
        ]
    },
    {
        id: "curadoria-romance",
        nome: "Romances & Conexões Inesquecíveis",
        descricao: "Histórias emocionantes que marcaram época e tocaram corações no mundo todo.",
        isOficial: true,
        autor: {
            nome: "CinePlanner Curadoria",
            username: "CinemaRomantico",
            avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
            nivel: 88,
            cargo: "Curador Oficial"
        },
        filmes: [
            {
                id: 313369,
                titulo: "La La Land: Cantando Estações",
                poster_url: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkVJt0Rf0.jpg",
                avaliacao: 7.9,
                ano_lancamento: "2016-11-29",
                duracao: 128,
                generos: "Comédia, Drama, Romance, Música",
                sinopse: "Um pianista de jazz e uma aspirante a atriz se apaixonam enquanto buscam seus sonhos em Los Angeles."
            },
            {
                id: 597,
                titulo: "Titanic",
                poster_url: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
                avaliacao: 7.9,
                ano_lancamento: "1997-11-18",
                duracao: 194,
                generos: "Drama, Romance",
                sinopse: "Uma jovem aristocrata se apaixona por um artista humilde a bordo do luxuoso e trágico navio Titanic."
            },
            {
                id: 11036,
                titulo: "Diário de uma Paixão",
                poster_url: "https://image.tmdb.org/t/p/w500/qom1SZLi09sFiEdsp2ATJJ9VoUN.jpg",
                avaliacao: 7.9,
                ano_lancamento: "2004-06-25",
                duracao: 123,
                generos: "Drama, Romance",
                sinopse: "Numa clínica de repouso, um senhor lê uma história de amor gravada em um caderno para uma senhora."
            },
            {
                id: 296096,
                titulo: "Como Eu Era Antes de Você",
                poster_url: "https://image.tmdb.org/t/p/w500/teBczB2jA5yD1b0V5k90Lg8W2K2.jpg",
                avaliacao: 7.9,
                ano_lancamento: "2016-03-03",
                duracao: 110,
                generos: "Drama, Romance",
                sinopse: "Louisa Clark é contratada para cuidar de Will Traynor, um jovem milionário tetraplégico e cínico."
            },
            {
                id: 122906,
                titulo: "Questão de Tempo",
                poster_url: "https://image.tmdb.org/t/p/w500/i9n4Qz7JbQ2fD21K4L5lX3T9V9.jpg",
                avaliacao: 7.8,
                ano_lancamento: "2013-09-04",
                duracao: 123,
                generos: "Drama, Romance, Fantasia",
                sinopse: "Aos 21 anos, Tim descobre que os homens de sua família têm a capacidade de viajar no tempo."
            },
            {
                id: 398818,
                titulo: "Me Chame Pelo Seu Nome",
                poster_url: "https://image.tmdb.org/t/p/w500/tcM5mN40R29v628sP9P5Lw8lO9.jpg",
                avaliacao: 8.1,
                ano_lancamento: "2017-09-01",
                duracao: 132,
                generos: "Romance, Drama",
                sinopse: "Na Itália dos anos 80, um jovem de 17 anos inicia um romance transformador com o assistente de seu pai."
            }
        ]
    },
    {
        id: "curadoria-populares",
        nome: "Mais Populares & Aclamados da Crítica",
        descricao: "Obras-primas cinematográficas com as maiores avaliações e prêmios da história.",
        isOficial: true,
        autor: {
            nome: "CinePlanner Curadoria",
            username: "TopFilmesGlobal",
            avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80",
            nivel: 100,
            cargo: "Curador Oficial"
        },
        filmes: [
            {
                id: 157336,
                titulo: "Interestelar",
                poster_url: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
                avaliacao: 8.4,
                ano_lancamento: "2014-11-05",
                duracao: 169,
                generos: "Aventura, Drama, Ficção Científica",
                sinopse: "Um grupo de exploradores viaja através de um buraco de minhoca em busca da sobrevivência humana."
            },
            {
                id: 693134,
                titulo: "Duna: Parte 2",
                poster_url: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
                avaliacao: 8.2,
                ano_lancamento: "2024-02-27",
                duracao: 166,
                generos: "Ficção Científica, Aventura",
                sinopse: "Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores."
            },
            {
                id: 872585,
                titulo: "Oppenheimer",
                poster_url: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
                avaliacao: 8.1,
                ano_lancamento: "2023-07-19",
                duracao: 181,
                generos: "Drama, História",
                sinopse: "A história do físico J. Robert Oppenheimer e o Projeto Manhattan durante a Segunda Guerra Mundial."
            },
            {
                id: 278,
                titulo: "Um Sonho de Liberdade",
                poster_url: "https://image.tmdb.org/t/p/w500/umXLM3k6s4w14m9T2B07V2T5T0k.jpg",
                avaliacao: 8.7,
                ano_lancamento: "1994-09-23",
                duracao: 142,
                generos: "Drama, Crime",
                sinopse: "Dois homens presos criam um forte laço ao longo dos anos, encontrando consolo e redenção."
            },
            {
                id: 238,
                titulo: "O Poderoso Chefão",
                poster_url: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
                avaliacao: 8.7,
                ano_lancamento: "1972-03-14",
                duracao: 175,
                generos: "Drama, Crime",
                sinopse: "O patriarca idoso de uma dinastia do crime transfere o controle do seu império clandestino ao filho."
            },
            {
                id: 496243,
                titulo: "Parasita",
                poster_url: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
                avaliacao: 8.5,
                ano_lancamento: "2019-05-30",
                duracao: 132,
                generos: "Comédia, Thriller, Drama",
                sinopse: "Uma família desempregada se infiltra na rotina de uma família rica, com desdobramentos imprevisíveis."
            }
        ]
    }
];

function Lista() {
    // =========================================================
    // 1. ESTADOS PRINCIPAIS
    // =========================================================
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [listasExibicao, setListasExibicao] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [termoBusca, setTermoBusca] = useState("");
    const [filtroAtivo, setFiltroAtivo] = useState("todas"); // 'todas', 'minhas', 'comunidade', 'oficiais'

    // =========================================================
    // 2. RECUPERAR USUÁRIO LOGADO
    // =========================================================
    useEffect(() => {
        const carregarUsuario = () => {
            const userStr = localStorage.getItem("user");
            if (userStr) {
                try {
                    const parsed = JSON.parse(userStr);
                    setUsuarioLogado(parsed);
                } catch (e) {
                    setUsuarioLogado(null);
                }
            } else {
                setUsuarioLogado(null);
            }
        };

        carregarUsuario();
        window.addEventListener("authChanged", carregarUsuario);
        return () => window.removeEventListener("authChanged", carregarUsuario);
    }, []);

    // =========================================================
    // 3. BUSCAR PLAYLISTS E USUÁRIOS NO SUPABASE
    // =========================================================
    useEffect(() => {
        async function carregarTodasAsListas() {
            setCarregando(true);
            try {
                let listasDoBanco = [];
                let usuariosMap = {};

                if (supabase) {
                    // A) Buscar todos os perfis de usuários para montar as publicações
                    try {
                        const { data: usuariosData, error: userErr } = await supabase
                            .from("usuario")
                            .select("*, id_item_chapeu(*), id_item_mao(*), id_item_mascote(*)");

                        if (!userErr && usuariosData) {
                            usuariosData.forEach(u => {
                                usuariosMap[u.id] = {
                                    id: u.id,
                                    nome: u.nome || u.username || "Usuário",
                                    username: u.username || `user_${u.id}`,
                                    avatarUrl: u.url_img || u.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
                                    bio: u.bio || "Cinéfilo apaixonado por boas histórias.",
                                    xpTotal: u.xp_total || 0,
                                    nivel: u.nivel || Math.max(1, Math.floor((u.xp_total || 0) / 600)),
                                    chapeuUrl: u.id_item_chapeu?.url_imagem || null,
                                    maoUrl: u.id_item_mao?.url_imagem || null,
                                    mascoteUrl: u.id_item_mascote?.url_imagem || null
                                };
                            });
                        }
                    } catch (errUser) {
                        console.warn("Erro ao buscar usuários do Supabase:", errUser);
                    }

                    // B) Buscar Playlists Públicas e Playlists do Usuário Logado
                    try {
                        const { data: playlistsData, error: plErr } = await supabase
                            .from("playlists")
                            .select("*");

                        if (!plErr && playlistsData && playlistsData.length > 0) {
                            // Filtra apenas as que são públicas OU pertencem ao usuário logado
                            const usuarioIdAtual = usuarioLogado?.id || (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))?.id : 11);

                            const listasValidas = playlistsData.filter(pl => {
                                const ehDono = pl.id_usuario === usuarioIdAtual;
                                const ehPublica = pl.publica === true || pl.publica === undefined || pl.publica === null;
                                return (ehDono || ehPublica) && pl.filmes && Array.isArray(pl.filmes) && pl.filmes.length > 0;
                            });

                            listasDoBanco = listasValidas.map(pl => {
                                const criador = usuariosMap[pl.id_usuario] || {
                                    id: pl.id_usuario,
                                    nome: `Usuário #${pl.id_usuario || ""}`,
                                    username: `cinefilo_${pl.id_usuario || "membro"}`,
                                    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
                                    bio: "Colecionador de filmes e fã de cinema.",
                                    xpTotal: 2500,
                                    nivel: 5,
                                    chapeuUrl: null,
                                    maoUrl: null,
                                    mascoteUrl: null
                                };

                                return {
                                    id: `pl-${pl.id}`,
                                    bancoId: pl.id,
                                    nome: pl.nome,
                                    descricao: pl.descricao || `Lista personalizada criada por @${criador.username}.`,
                                    isOficial: false,
                                    id_usuario: pl.id_usuario,
                                    publica: pl.publica ?? true,
                                    autor: criador,
                                    filmes: pl.filmes || []
                                };
                            });
                        }
                    } catch (errPl) {
                        console.warn("Erro ao buscar playlists do Supabase:", errPl);
                    }
                }

                // =========================================================
                // ORDENAÇÃO POR PRIORIDADE:
                // 1º Listas do Usuário Logado
                // 2º Listas de outros Usuários da Comunidade
                // 3º 4 Listas Genéricas / Oficiais
                // =========================================================
                const idLogado = usuarioLogado?.id || (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))?.id : 11);

                const minhasListas = listasDoBanco.filter(pl => pl.id_usuario === idLogado);
                const listasOutrosUsuarios = listasDoBanco.filter(pl => pl.id_usuario !== idLogado);

                // Monta a coleção final de exibição
                const colecaoFinal = [
                    ...minhasListas,
                    ...listasOutrosUsuarios,
                    ...LISTAS_GENERICAS
                ];

                setListasExibicao(colecaoFinal);
            } catch (erroGeral) {
                console.error("Erro no carregamento das listas:", erroGeral);
                setListasExibicao(LISTAS_GENERICAS);
            } finally {
                setCarregando(false);
            }
        }

        carregarTodasAsListas();
    }, [usuarioLogado]);

    // =========================================================
    // 4. CONTROLADOR DE ROLAGEM DOS CARROSSÉIS
    // =========================================================
    const rolarCarrosselPorId = (elementId, direcao) => {
        const el = document.getElementById(elementId);
        if (el) {
            const distancia = 460;
            el.scrollBy({
                left: direcao === "esquerda" ? -distancia : distancia,
                behavior: "smooth"
            });
        }
    };

    // =========================================================
    // 5. FILTRAGEM E BUSCA DE LISTAS
    // =========================================================
    const idAtual = usuarioLogado?.id || (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))?.id : 11);

    const listasFiltradas = listasExibicao.filter((lista) => {
        // Filtro por Abas
        if (filtroAtivo === "minhas" && lista.id_usuario !== idAtual) return false;
        if (filtroAtivo === "comunidade" && (lista.isOficial || lista.id_usuario === idAtual)) return false;
        if (filtroAtivo === "oficiais" && !lista.isOficial) return false;

        // Filtro por Texto de Busca
        if (termoBusca.trim() !== "") {
            const busca = termoBusca.toLowerCase();
            const matchNome = lista.nome?.toLowerCase().includes(busca);
            const matchAutor = lista.autor?.nome?.toLowerCase().includes(busca) || lista.autor?.username?.toLowerCase().includes(busca);
            const matchDesc = lista.descricao?.toLowerCase().includes(busca);
            const matchFilme = lista.filmes?.some(f => f.titulo?.toLowerCase().includes(busca));
            return matchNome || matchAutor || matchDesc || matchFilme;
        }

        return true;
    });

    return (
        <main className="pagina-listas" id="pagina-listas">
            <div className="listas-container">
                {/* CABEÇALHO DA PÁGINA */}
                <header className="listas-page-header">
                    <div className="header-badge-tag">
                        <span className="pulse-dot"></span>
                        EXPLORADOR DE PLAYLISTS
                    </div>
                    <h1 className="listas-page-title">
                        LISTAS & <span>PLAYLISTS</span>
                    </h1>
                    <div className="red-line-glow"></div>
                    <p className="listas-page-subtitle">
                        Descubra coleções criadas pela comunidade, compartilhe suas seleções favoritas e explore as melhores maratonas do cinema.
                    </p>

                    {/* BARRA DE CONTROLE: BUSCA E FILTROS */}
                    <div className="listas-toolbar">
                        <div className="listas-search-box">
                            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Buscar por playlist, filme ou cinéfilo..."
                                value={termoBusca}
                                onChange={(e) => setTermoBusca(e.target.value)}
                                className="search-input"
                            />
                            {termoBusca && (
                                <button
                                    type="button"
                                    onClick={() => setTermoBusca("")}
                                    className="btn-clear-search"
                                    title="Limpar busca"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* ABAS DE FILTRO RÁPIDO */}
                        <div className="listas-filter-tabs">
                            <button
                                type="button"
                                className={`filter-tab ${filtroAtivo === 'todas' ? 'ativo' : ''}`}
                                onClick={() => setFiltroAtivo('todas')}
                            >
                                Todas ({listasExibicao.length})
                            </button>
                            {usuarioLogado && (
                                <button
                                    type="button"
                                    className={`filter-tab ${filtroAtivo === 'minhas' ? 'ativo' : ''}`}
                                    onClick={() => setFiltroAtivo('minhas')}
                                >
                                    Minhas Listas
                                </button>
                            )}
                            <button
                                type="button"
                                className={`filter-tab ${filtroAtivo === 'comunidade' ? 'ativo' : ''}`}
                                onClick={() => setFiltroAtivo('comunidade')}
                            >
                                Comunidade
                            </button>
                            <button
                                type="button"
                                className={`filter-tab ${filtroAtivo === 'oficiais' ? 'ativo' : ''}`}
                                onClick={() => setFiltroAtivo('oficiais')}
                            >
                                Curadoria CinePlanner
                            </button>
                        </div>
                    </div>
                </header>

                {/* CONTEÚDO PRINCIPAL: FEED DE PUBLICAÇÕES DE PLAYLISTS */}
                {carregando ? (
                    <div className="listas-loading-state">
                        <div className="loading-spinner"></div>
                        <p>Carregando playlists da comunidade e curadorias...</p>
                    </div>
                ) : listasFiltradas.length === 0 ? (
                    <div className="listas-empty-state">
                        <div className="empty-icon-box">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e50914" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                        </div>
                        <h3>Nenhuma playlist encontrada</h3>
                        <p>Não encontramos nenhuma lista correspondente aos filtros ou busca informada.</p>
                        <button
                            type="button"
                            className="btn-reset-filters"
                            onClick={() => { setTermoBusca(""); setFiltroAtivo("todas"); }}
                        >
                            Ver Todas as Playlists
                        </button>
                    </div>
                ) : (
                    <section className="listas-feed">
                        {listasFiltradas.map((playlist, index) => {
                            const ehMinhaLista = playlist.id_usuario === idAtual;
                            const carouselId = `feed-carousel-${playlist.id || index}`;

                            return (
                                <article
                                    key={playlist.id || index}
                                    className={`playlist-post-card ${ehMinhaLista ? 'minha-publicacao' : ''} ${playlist.isOficial ? 'publicacao-oficial' : ''}`}
                                    id={`post-playlist-${playlist.id}`}
                                >
                                    {/* CABEÇALHO DA PUBLICAÇÃO (CARD DE PERFIL DO USUÁRIO CRIADOR) */}
                                    <div className="post-header">
                                        <div className="post-user-info">
                                            {/* AVATAR COM SUPORTE A ACESSÓRIOS */}
                                            <div className="post-avatar-wrapper">
                                                {playlist.autor?.chapeuUrl && (
                                                    <img
                                                        src={playlist.autor.chapeuUrl}
                                                        alt="Acessório de Chapéu"
                                                        className="post-hat-accessory"
                                                    />
                                                )}
                                                <div className="post-avatar-circle">
                                                    <img
                                                        src={playlist.autor?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"}
                                                        alt={playlist.autor?.nome || "Cinéfilo"}
                                                        className="post-avatar-img"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80";
                                                        }}
                                                    />
                                                </div>
                                                {playlist.autor?.maoUrl && (
                                                    <img
                                                        src={playlist.autor.maoUrl}
                                                        alt="Acessório de Mão"
                                                        className="post-hand-accessory"
                                                    />
                                                )}
                                            </div>

                                            {/* DADOS DO AUTOR */}
                                            <div className="post-author-meta">
                                                <div className="post-author-top-row">
                                                    <span className="post-author-name">
                                                        {playlist.autor?.nome || "Cinéfilo"}
                                                    </span>
                                                    <span className="post-author-handle">
                                                        @{playlist.autor?.username || "membro"}
                                                    </span>
                                                    {playlist.autor?.nivel && (
                                                        <span className="post-author-level-badge">
                                                            NV. {playlist.autor.nivel}
                                                        </span>
                                                    )}
                                                    {ehMinhaLista && (
                                                        <span className="post-badge-minha-lista">
                                                            ★ Minha Lista
                                                        </span>
                                                    )}
                                                    {playlist.isOficial && (
                                                        <span className="post-badge-oficial">
                                                            ✓ Curadoria Oficial
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="post-author-bio">
                                                    {playlist.autor?.bio || playlist.descricao || "Playlist compartilhada na comunidade CinePlanner."}
                                                </p>
                                            </div>
                                        </div>

                                        {/* TAGS E STATUS DA LISTA NO TOPO DIREITO */}
                                        <div className="post-header-actions">
                                            <div className="post-count-badge">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
                                                </svg>
                                                <span>{(playlist.filmes?.length || 0).toString().padStart(2, '0')} FILMES</span>
                                            </div>
                                            {ehMinhaLista ? (
                                                <Link to="/usuario" className="btn-gerenciar-link" title="Gerenciar no Meu Perfil">
                                                    Gerenciar
                                                </Link>
                                            ) : null}
                                        </div>
                                    </div>

                                    {/* TÍTULO E DETALHES DA PLAYLIST */}
                                    <div className="post-playlist-info">
                                        <div className="post-title-wrapper">
                                            <div className="playlist-icon-indicator">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#e50914" strokeWidth="2">
                                                    <line x1="8" y1="6" x2="21" y2="6"></line>
                                                    <line x1="8" y1="12" x2="21" y2="12"></line>
                                                    <line x1="8" y1="18" x2="21" y2="18"></line>
                                                    <polygon points="3 6 3 18 6 12 3 6" fill="#e50914"></polygon>
                                                </svg>
                                            </div>
                                            <div className="playlist-text-group">
                                                <h2 className="post-playlist-title">{playlist.nome}</h2>
                                                {playlist.descricao && (
                                                    <p className="post-playlist-desc">{playlist.descricao}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* CORPO DA PUBLICAÇÃO: CARROSSEL DE FILMES ESTILO PLAYLIST */}
                                    <div className="post-carousel-container">
                                        <button
                                            type="button"
                                            className="carousel-nav-btn carousel-nav-prev"
                                            onClick={() => rolarCarrosselPorId(carouselId, "esquerda")}
                                            aria-label="Rolar para a esquerda"
                                        >
                                            ‹
                                        </button>

                                        <div className="post-movies-carousel" id={carouselId}>
                                            {playlist.filmes && playlist.filmes.map((filme, fIdx) => (
                                                <article
                                                    key={`${filme.id}-${fIdx}`}
                                                    className="filme-card"
                                                    id={`card-filme-${filme.id}`}
                                                >
                                                    <Link to={`/resenhas/${filme.id}`} className="card-link">
                                                        <div className="card-poster">
                                                            <img
                                                                src={filme.poster_url || "https://placehold.co/300x450/1a1a1a/e50914?text=Sem+Poster"}
                                                                alt={`Poster de ${filme.titulo}`}
                                                                className="poster-img"
                                                                loading="lazy"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = "https://placehold.co/300x450/1a1a1a/e50914?text=Sem+Poster";
                                                                }}
                                                            />
                                                            <div className="card-overlay">
                                                                <span className="card-overlay-text">Ver Detalhes</span>
                                                            </div>
                                                        </div>

                                                        <div className="card-info">
                                                            <h3 className="card-titulo">{filme.titulo}</h3>
                                                            <span className="card-genero">
                                                                {filme.generos || "Filme"}
                                                            </span>
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
                                                </article>
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            className="carousel-nav-btn carousel-nav-next"
                                            onClick={() => rolarCarrosselPorId(carouselId, "direita")}
                                            aria-label="Rolar para a direita"
                                        >
                                            ›
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                )}
            </div>
        </main>
    );
}

export default Lista;
