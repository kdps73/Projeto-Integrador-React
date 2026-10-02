import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabase";
import "./css/index.css";
import "./css/listas.css";

// Função utilitária para obter a URL pública de itens do Supabase Storage e TMDB
function obterUrlItem(caminhoOuUrl) {
    if (!caminhoOuUrl) return null;
    if (typeof caminhoOuUrl !== "string") return null;

    if (caminhoOuUrl.startsWith("http://") || caminhoOuUrl.startsWith("https://")) {
        return caminhoOuUrl;
    }

    // Caminhos relativos do TMDB (ex: "/q6725aR8Zs4IwGMXzZT8aC8lh41.jpg")
    if (caminhoOuUrl.startsWith("/") && (caminhoOuUrl.endsWith(".jpg") || caminhoOuUrl.endsWith(".png") || caminhoOuUrl.endsWith(".webp") || caminhoOuUrl.includes(".jpg?") || caminhoOuUrl.includes(".png?"))) {
        return `https://image.tmdb.org/t/p/w500${caminhoOuUrl}`;
    }

    if (caminhoOuUrl.startsWith("./") || caminhoOuUrl.startsWith("/")) {
        return caminhoOuUrl;
    }

    if (supabase) {
        // Se for avatar de perfil do bucket 'profile' (ex: 'profile/42' ou 'profile:42')
        if (caminhoOuUrl.startsWith("profile/") || caminhoOuUrl.startsWith("profile:")) {
            const nomeArquivo = caminhoOuUrl.replace(/^profile[\/:]/, "");
            const { data } = supabase.storage.from("profile").getPublicUrl(nomeArquivo);
            return data?.publicUrl || caminhoOuUrl;
        }

        // Caminho salvo no bucket 'itens' do Supabase Storage
        const nomeArquivo = caminhoOuUrl.startsWith("itens/")
            ? caminhoOuUrl.replace(/^itens\//, "")
            : caminhoOuUrl;

        const { data } = supabase.storage.from("itens").getPublicUrl(nomeArquivo);
        return data?.publicUrl || caminhoOuUrl;
    }
    return caminhoOuUrl || null;
}

// Função para pré-carregar imagens na memória antes de exibir a tela
function preCarregarImagens(urls) {
    const urlsUnicas = Array.from(new Set(urls.filter(Boolean)));
    const promises = urlsUnicas.map(url => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => resolve(url);
            img.src = url;
        });
    });
    return Promise.all(promises);
}

// =========================================================
// API TMDB
// =========================================================
const API_KEY = '168817e9845280fe6d28f3a939f4bc67';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchFilmePorId(id) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${id}?language=pt-BR&api_key=${API_KEY}`);
        if (!response.ok) return null;
        const data = await response.json();
        return {
            id: data.id,
            titulo: data.title,
            poster_url: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null,
            avaliacao: data.vote_average,
            ano_lancamento: data.release_date,
            duracao: data.runtime,
            generos: data.genres?.map(g => g.name).join(", "),
            sinopse: data.overview
        };
    } catch (e) {
        return null;
    }
}

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
            cargo: "Curador Oficial",
            chapeuUrl: "./img/hat-red-dead.png",
            maoUrl: "./img/hand-red-dead.png",
            mascoteUrl: "./img/pet-red-dead.png"
        },
        filmes: [
            {
                id: 299536,
                titulo: "Vingadores: Guerra Infinita",
                poster_url: "https://image.tmdb.org/t/p/w500/A4kvp7vY1BDLrrQIagRCffLKj1t.jpg",
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
                poster_url: "https://image.tmdb.org/t/p/w500/cJFqqiDYprqExaXatu4AaoMzDG2.jpg",
                avaliacao: 7.7,
                ano_lancamento: "2024-07-24",
                duracao: 128,
                generos: "Ação, Comédia, Ficção Científica",
                sinopse: "Wolverine se recupera de ferimentos quando cruza com o tagarela Deadpool."
            },
            {
                id: 1726,
                titulo: "Homem de Ferro",
                poster_url: "https://image.tmdb.org/t/p/w500/mqN7RxojEiPoh3FTSTwOtwg7KAu.jpg",
                avaliacao: 7.6,
                ano_lancamento: "2008-04-30",
                duracao: 126,
                generos: "Ação, Ficção Científica, Aventura",
                sinopse: "Tony Stark constrói uma armadura de alta tecnologia e jura proteger o mundo."
            },
            {
                id: 284054,
                titulo: "Pantera Negra",
                poster_url: "https://image.tmdb.org/t/p/w500/ubXNpxL2ASSzY0f8Hxv08pOsV2L.jpg",
                avaliacao: 7.4,
                ano_lancamento: "2018-02-13",
                duracao: 134,
                generos: "Ação, Aventura, Ficção Científica",
                sinopse: "T'Challa retorna para assumir seu lugar de direito como rei da nação de Wakanda."
            },
            {
                id: 634649,
                titulo: "Homem-Aranha: Sem Volta Para Casa",
                poster_url: "https://image.tmdb.org/t/p/w500/xaKydnMw6wR1MBAjS5seGPVusbs.jpg",
                avaliacao: 8.0,
                ano_lancamento: "2021-12-15",
                duracao: 148,
                generos: "Ação, Aventura, Ficção Científica",
                sinopse: "Peter Parker pede ajuda ao Doutor Estranho para reverter a revelação de sua identidade."
            },
            {
                id: 284053,
                titulo: "Thor: Ragnarok",
                poster_url: "https://image.tmdb.org/t/p/w500/2K45Fp6koAVoeeYS6aMb9BeNt4F.jpg",
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
            cargo: "Curador Oficial",
            chapeuUrl: "./img/hat-red-dead.png",
            maoUrl: "./img/hand-red-dead.png",
            mascoteUrl: "./img/pet-red-dead.png"
        },
        filmes: [
            {
                id: 155,
                titulo: "Batman: O Cavaleiro das Trevas",
                poster_url: "https://image.tmdb.org/t/p/w500/4lj1ikfsSmMZNyfdi8R8Tv5tsgb.jpg",
                avaliacao: 8.5,
                ano_lancamento: "2008-07-16",
                duracao: 152,
                generos: "Drama, Ação, Crime, Thriller",
                sinopse: "Batman enfrenta o Coringa em uma batalha psicológica e física pela alma de Gotham."
            },
            {
                id: 414906,
                titulo: "The Batman",
                poster_url: "https://image.tmdb.org/t/p/w500/wd7b4Nv9QBHDTIjc2m7sr0IUMoh.jpg",
                avaliacao: 7.7,
                ano_lancamento: "2022-03-01",
                duracao: 176,
                generos: "Crime, Mistério, Thriller",
                sinopse: "Em seu segundo ano na luta contra o crime, Batman investiga a corrupção em Gotham."
            },
            {
                id: 475557,
                titulo: "Coringa",
                poster_url: "https://image.tmdb.org/t/p/w500/xLxgVxFWvb9hhUyCDDXxRPPnFck.jpg",
                avaliacao: 8.2,
                ano_lancamento: "2019-10-02",
                duracao: 122,
                generos: "Crime, Thriller, Drama",
                sinopse: "Isolado e maltratado pela sociedade, Arthur Fleck inicia uma lenta descida à loucura."
            },
            {
                id: 791373,
                titulo: "Liga da Justiça de Zack Snyder",
                poster_url: "https://image.tmdb.org/t/p/w500/lsZ5dmMuvZVNMBrkozvJedujbgU.jpg",
                avaliacao: 8.1,
                ano_lancamento: "2021-03-18",
                duracao: 242,
                generos: "Ação, Aventura, Fantasia",
                sinopse: "Determinado a garantir que o sacrifício final do Superman não fosse em vão, Bruce Wayne recruta heróis."
            },
            {
                id: 49521,
                titulo: "O Homem de Aço",
                poster_url: "https://image.tmdb.org/t/p/w500/cheo9jDPfyW1GevfPjXtnO91KNe.jpg",
                avaliacao: 6.6,
                ano_lancamento: "2013-06-12",
                duracao: 143,
                generos: "Ação, Aventura, Ficção Científica",
                sinopse: "Clark Kent descobre seus superpoderes e sua verdadeira herança alienígena."
            },
            {
                id: 297762,
                titulo: "Mulher-Maravilha",
                poster_url: "https://image.tmdb.org/t/p/w500/ujQthWB6c0ojlARk28NSTmqidbF.jpg",
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
            cargo: "Curador Oficial",
            chapeuUrl: "./img/hat-red-dead.png",
            maoUrl: "./img/hand-red-dead.png",
            mascoteUrl: "./img/pet-red-dead.png"
        },
        filmes: [
            {
                id: 313369,
                titulo: "La La Land: Cantando Estações",
                poster_url: "https://image.tmdb.org/t/p/w500/AvMietG6xuobpSSdmVnKuTjv4bL.jpg",
                avaliacao: 7.9,
                ano_lancamento: "2016-11-29",
                duracao: 128,
                generos: "Comédia, Drama, Romance, Música",
                sinopse: "Um pianista de jazz e uma aspirante a atriz se apaixonam enquanto buscam seus sonhos em Los Angeles."
            },
            {
                id: 597,
                titulo: "Titanic",
                poster_url: "https://image.tmdb.org/t/p/w500/As0zX43h3w6kD2NS4uVHu9HKdEh.jpg",
                avaliacao: 7.9,
                ano_lancamento: "1997-11-18",
                duracao: 194,
                generos: "Drama, Romance",
                sinopse: "Uma jovem aristocrata se apaixona por um artista humilde a bordo do luxuoso e trágico navio Titanic."
            },
            {
                id: 11036,
                titulo: "Diário de uma Paixão",
                poster_url: "https://image.tmdb.org/t/p/w500/hO6k34ZNDwWzgcnzFbqYf2Rjg5W.jpg",
                avaliacao: 7.9,
                ano_lancamento: "2004-06-25",
                duracao: 123,
                generos: "Drama, Romance",
                sinopse: "Numa clínica de repouso, um senhor lê uma história de amor gravada em um caderno para uma senhora."
            },
            {
                id: 296096,
                titulo: "Como Eu Era Antes de Você",
                poster_url: "https://image.tmdb.org/t/p/w500/1a60KPNTC4JKYphNQveAB37Lyif.jpg",
                avaliacao: 7.9,
                ano_lancamento: "2016-03-03",
                duracao: 110,
                generos: "Drama, Romance",
                sinopse: "Louisa Clark é contratada para cuidar de Will Traynor, um jovem milionário tetraplégico e cínico."
            },
            {
                id: 122906,
                titulo: "Questão de Tempo",
                poster_url: "https://image.tmdb.org/t/p/w500/uqEzxvGDYNzoQE7rayv7gRXBomt.jpg",
                avaliacao: 7.8,
                ano_lancamento: "2013-09-04",
                duracao: 123,
                generos: "Drama, Romance, Fantasia",
                sinopse: "Aos 21 anos, Tim descobre que os homens de sua família têm a capacidade de viajar no tempo."
            },
            {
                id: 398818,
                titulo: "Me Chame Pelo Seu Nome",
                poster_url: "https://image.tmdb.org/t/p/w500/qnf5Onsk236CdE5Lff93IX69gHf.jpg",
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
            cargo: "Curador Oficial",
            chapeuUrl: "./img/hat-red-dead.png",
            maoUrl: "./img/hand-red-dead.png",
            mascoteUrl: "./img/pet-red-dead.png"
        },
        filmes: [
            {
                id: 157336,
                titulo: "Interestelar",
                poster_url: "https://image.tmdb.org/t/p/w500/tR1XVa5bxgdh2bRw2u0DzrgkO2l.jpg",
                avaliacao: 8.4,
                ano_lancamento: "2014-11-05",
                duracao: 169,
                generos: "Aventura, Drama, Ficção Científica",
                sinopse: "Um grupo de exploradores viaja através de um buraco de minhoca em busca da sobrevivência humana."
            },
            {
                id: 693134,
                titulo: "Duna: Parte 2",
                poster_url: "https://image.tmdb.org/t/p/w500/VMy4UGsI2u3f4fALGeCqCdsQBb.jpg",
                avaliacao: 8.2,
                ano_lancamento: "2024-02-27",
                duracao: 166,
                generos: "Ficção Científica, Aventura",
                sinopse: "Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores."
            },
            {
                id: 872585,
                titulo: "Oppenheimer",
                poster_url: "https://image.tmdb.org/t/p/w500/dUPQszWoRSE9FucJTbVp2bwEi9G.jpg",
                avaliacao: 8.1,
                ano_lancamento: "2023-07-19",
                duracao: 181,
                generos: "Drama, História",
                sinopse: "A história do físico J. Robert Oppenheimer e o Projeto Manhattan durante a Segunda Guerra Mundial."
            },
            {
                id: 278,
                titulo: "Um Sonho de Liberdade",
                poster_url: "https://image.tmdb.org/t/p/w500/umX3lBhHoTV7Lsci140Yr8VpXyN.jpg",
                avaliacao: 8.7,
                ano_lancamento: "1994-09-23",
                duracao: 142,
                generos: "Drama, Crime",
                sinopse: "Dois homens presos criam um forte laço ao longo dos anos, encontrando consolo e redenção."
            },
            {
                id: 238,
                titulo: "O Poderoso Chefão",
                poster_url: "https://image.tmdb.org/t/p/w500/wOMxE93W6KcZTuCeNUByNTSaLLt.jpg",
                avaliacao: 8.7,
                ano_lancamento: "1972-03-14",
                duracao: 175,
                generos: "Drama, Crime",
                sinopse: "O patriarca idoso de uma dinastia do crime transfere o controle do seu império clandestino ao filho."
            },
            {
                id: 496243,
                titulo: "Parasita",
                poster_url: "https://image.tmdb.org/t/p/w500/bNGW8zYA91VqTZfV3jnKHPEKKvB.jpg",
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
    const [usuarioLogado, setUsuarioLogado] = useState(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (e) {
                return null;
            }
        }
        return null;
    });
    const [listasExibicao, setListasExibicao] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [termoBusca, setTermoBusca] = useState("");
    const [filtroAtivo, setFiltroAtivo] = useState("todas"); // 'todas', 'minhas', 'comunidade', 'oficiais'
    const [curtidasMap, setCurtidasMap] = useState({});

    // =========================================================
    // 2. RECUPERAR USUÁRIO LOGADO EM MUDANÇAS DE AUTH
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
                                const chapeuRaw = u.id_item_chapeu?.url_item || u.id_item_chapeu?.url_imagem;
                                const maoRaw = u.id_item_mao?.url_item || u.id_item_mao?.url_imagem;
                                const mascoteRaw = u.id_item_mascote?.url_item || u.id_item_mascote?.url_imagem;

                                const perfData = {
                                    id: u.id,
                                    nome: u.nome || u.username || "Usuário",
                                    username: u.username || `user_${u.id}`,
                                    avatarUrl: u.url_img ? obterUrlItem(u.url_img) : (u.avatar_url || ""),
                                    bio: u.bio || "Cinéfilo apaixonado por boas histórias.",
                                    xpTotal: u.xp_total || 0,
                                    nivel: u.nivel || Math.max(1, Math.floor((u.xp_total || 0) / 600)),
                                    chapeuUrl: chapeuRaw ? obterUrlItem(chapeuRaw) : "./img/hat-red-dead.png",
                                    maoUrl: maoRaw ? obterUrlItem(maoRaw) : "./img/hand-red-dead.png",
                                    mascoteUrl: mascoteRaw ? obterUrlItem(mascoteRaw) : "./img/pet-red-dead.png"
                                };

                                usuariosMap[u.id] = perfData;
                                usuariosMap[String(u.id)] = perfData;
                            });
                        }
                    } catch (errUser) {
                        console.warn("Erro ao buscar usuários do Supabase:", errUser);
                    }

                    // B) Buscar Playlists do Supabase (excluindo 'Favoritos' e 'Assistir Mais Tarde')
                    try {
                        const { data: playlistsData, error: plErr } = await supabase
                            .from("playlists")
                            .select("*");

                        if (!plErr && playlistsData && playlistsData.length > 0) {
                            const listasValidas = playlistsData.filter(pl => {
                                const nomeNorm = pl.nome ? pl.nome.trim().toLowerCase() : "";
                                const ehListaFixa = nomeNorm === "assistir mais tarde" || nomeNorm === "favoritos";
                                if (ehListaFixa) return false;
                                if (!pl.filmes || !Array.isArray(pl.filmes) || pl.filmes.length === 0) return false;

                                // Playlists privadas (public !== true) não aparecem em Listas
                                // O banco usa `public` com default false → só exibe se explicitamente true
                                if (!pl.public) return false;

                                return true;
                            });

                            listasDoBanco = await Promise.all(listasValidas.map(async pl => {
                                const idLogado = usuarioLogado?.id || 11;
                                const isUserOwner = String(pl.id_usuario) === String(idLogado);

                                const criadorBase = usuariosMap[pl.id_usuario] || usuariosMap[String(pl.id_usuario)] || {
                                    id: pl.id_usuario,
                                    nome: isUserOwner ? (usuarioLogado?.nome || "DevNinja") : `Usuário #${pl.id_usuario || ""}`,
                                    username: isUserOwner ? (usuarioLogado?.username || "dev_ninja") : `cinefilo_${pl.id_usuario || "membro"}`,
                                    avatarUrl: isUserOwner ? (usuarioLogado?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80") : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
                                    bio: "Colecionador de filmes e fã de cinema.",
                                    xpTotal: 2500,
                                    nivel: 5,
                                    chapeuUrl: "./img/hat-red-dead.png",
                                    maoUrl: "./img/hand-red-dead.png",
                                    mascoteUrl: "./img/pet-red-dead.png"
                                };

                                // Busca dados na API se for ID, ou reaproveita o objeto (retrocompatibilidade)
                                const filmesPromises = (pl.filmes || []).map(async (f) => {
                                    if (typeof f === 'number' || typeof f === 'string') {
                                        return await fetchFilmePorId(f);
                                    }
                                    if (typeof f === 'object' && f !== null) {
                                        // Se o objeto tiver apenas ID e não tiver título, busca os dados da API
                                        if (f.id && !f.titulo && !f.title) {
                                            return await fetchFilmePorId(f.id);
                                        }
                                        return {
                                            ...f,
                                            poster_url: obterUrlItem(f.poster_url || (f.poster_path ? `https://image.tmdb.org/t/p/w500${f.poster_path}` : "")) || "https://placehold.co/300x450/1a1a1a/e50914?text=Sem+Poster"
                                        };
                                    }
                                    return null;
                                });

                                const filmesFormatados = (await Promise.all(filmesPromises)).filter(Boolean);

                                return {
                                    id: `pl-${pl.id}`,
                                    bancoId: pl.id,
                                    nome: pl.nome,
                                    descricao: pl.descricao || `Lista personalizada criada por @${criadorBase.username}.`,
                                    isOficial: false,
                                    id_usuario: pl.id_usuario,
                                    autor: criadorBase,
                                    filmes: filmesFormatados
                                };
                            }));
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

                const minhasListas = listasDoBanco.filter(pl => String(pl.id_usuario) === String(idLogado));
                const listasOutrosUsuarios = listasDoBanco.filter(pl => String(pl.id_usuario) !== String(idLogado));

                // Garante que todas as listas de curadoria oficial tenham os filmes e posters buscados diretamente da API TMDB
                const listasOficiaisFormatadas = await Promise.all(LISTAS_GENERICAS.map(async l => {
                    const filmesPromises = (l.filmes || []).map(async f => {
                        const id = typeof f === 'object' && f !== null ? f.id : f;
                        const apiFilme = await fetchFilmePorId(id);
                        if (apiFilme) return apiFilme;
                        if (typeof f === 'object') return { ...f, poster_url: obterUrlItem(f.poster_url) };
                        return null;
                    });
                    const filmesFormatados = (await Promise.all(filmesPromises)).filter(Boolean);
                    return {
                        ...l,
                        filmes: filmesFormatados
                    };
                }));

                // Monta a coleção final de exibição
                const colecaoFinal = [
                    ...minhasListas,
                    ...listasOutrosUsuarios,
                    ...listasOficiaisFormatadas
                ];

                // Coleta todas as URLs de avatares, acessórios e pôsteres para pré-carregamento
                const urlsParaPreCarregar = [];
                colecaoFinal.forEach(lista => {
                    if (lista.autor?.avatarUrl) urlsParaPreCarregar.push(obterUrlItem(lista.autor.avatarUrl));
                    if (lista.autor?.chapeuUrl) urlsParaPreCarregar.push(obterUrlItem(lista.autor.chapeuUrl));
                    if (lista.autor?.maoUrl) urlsParaPreCarregar.push(obterUrlItem(lista.autor.maoUrl));
                    if (lista.autor?.mascoteUrl) urlsParaPreCarregar.push(obterUrlItem(lista.autor.mascoteUrl));

                    if (lista.filmes && Array.isArray(lista.filmes)) {
                        lista.filmes.forEach(f => {
                            if (f.poster_url) urlsParaPreCarregar.push(obterUrlItem(f.poster_url));
                        });
                    }
                });

                // Aguarda o pré-carregamento na memória de TODAS as imagens antes de exibir a tela.
                // Aumentamos o tempo de fallback para garantir que o React espere o carregamento completo das imagens.
                await Promise.race([
                    preCarregarImagens(urlsParaPreCarregar),
                    new Promise(resolve => setTimeout(resolve, 15000))
                ]);

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

    // Alternar Curtida do Post
    const toggleCurtidaPost = (postId) => {
        setCurtidasMap(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    // =========================================================
    // 5. FILTRAGEM E BUSCA DE LISTAS
    // =========================================================
    const idAtual = usuarioLogado?.id || (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))?.id : 11);

    const listasFiltradas = listasExibicao.filter((lista) => {
        const ehMinha = String(lista.id_usuario) === String(idAtual);
        // Filtro por Abas
        if (filtroAtivo === "minhas" && !ehMinha) return false;
        if (filtroAtivo === "comunidade" && (lista.isOficial || ehMinha)) return false;
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

                        {/* FILTRO DROPDOWN MENOR */}
                        <div className="listas-filter-select-wrapper">
                            <select
                                className="listas-filter-select"
                                value={filtroAtivo}
                                onChange={(e) => setFiltroAtivo(e.target.value)}
                                aria-label="Filtrar playlists"
                            >
                                <option value="todas">Todas as Listas ({listasExibicao.length})</option>
                                {usuarioLogado && (
                                    <option value="minhas">Minhas Listas</option>
                                )}
                                <option value="comunidade">Comunidade</option>
                                <option value="oficiais">Curadoria CinePlanner</option>
                            </select>
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
                            const ehMinhaLista = String(playlist.id_usuario) === String(idAtual);
                            const carouselId = `feed-carousel-${playlist.id || index}`;
                            const postId = playlist.id || `post-${index}`;
                            const jaCurtiu = curtidasMap[postId] || false;

                            const chapeu = playlist.autor?.chapeuUrl || "./img/hat-red-dead.png";
                            const mao = playlist.autor?.maoUrl || "./img/hand-red-dead.png";
                            const mascote = playlist.autor?.mascoteUrl || "./img/pet-red-dead.png";

                            return (
                                <article
                                    key={playlist.id || index}
                                    className={`playlist-post-card minha-publicacao ${playlist.isOficial ? 'publicacao-oficial' : ''}`}
                                    id={`post-playlist-${playlist.id}`}
                                >
                                    {/* CABEÇALHO DA PUBLICAÇÃO (PADRÃO POST-HEADER COM AVATAR E ÍCONES) */}
                                    <div className="post-header">
                                        <div className="post-user-info">
                                            {/* AVATAR COM ÍCONES DE ACESSÓRIOS EQUIPADOS */}
                                            <div className="post-avatar-wrapper">
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
                                                        src={playlist.autor?.avatarUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231c1c1c'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%23444'/%3E%3Cellipse cx='50' cy='82' rx='30' ry='20' fill='%23444'/%3E%3C/svg%3E"}
                                                        alt={playlist.autor?.nome || "Cinéfilo"}
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

                                            {/* DADOS DO AUTOR E METADADOS COM ÍCONES */}
                                            <div className="post-author-meta">
                                                <div className="post-author-top-row">
                                                    <span className="post-author-name">
                                                        {playlist.autor?.nome || "Cinéfilo"}
                                                    </span>
                                                    <span className="post-author-handle">
                                                        @{playlist.autor?.username || "membro"}
                                                    </span>
                                                    {playlist.autor?.nivel && (
                                                        <span className="post-author-level-badge" title="Nível do Usuário">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="11" height="11" fill="#f1c40f" style={{ marginRight: 3 }}>
                                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                            </svg>
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

                                        {/* TAGS E ÍCONES DE AÇÃO NO TOPO DIREITO DO POST-HEADER */}
                                        <div className="post-header-actions">
                                            <div className="post-visibility-badge" title="Visibilidade da Playlist">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="2" y1="12" x2="22" y2="12" />
                                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                                </svg>
                                            </div>

                                            <div className="post-count-badge">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                                                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
                                                </svg>
                                                <span>{(playlist.filmes?.length || 0).toString().padStart(2, '0')} FILMES</span>
                                            </div>
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
                                                                loading="eager"
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
