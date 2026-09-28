# Documentação Técnica Completa — TMDB API (v3)

> **Escopo deste documento:** Referência técnica enxuta, completa e orientada à implementação de toda a especificação da versão 3 da API do **The Movie Database (TMDB)**. Todo conteúdo promocional ou de interface foi removido para manter apenas o que é essencial ao funcionamento da API.

---

## Sumário Rápido

1. [Configurações Globais e Padrões da API](#1-configurações-globais-e-padrões-da-api)
2. [Autenticação e Sessões](#2-autenticação-e-sessões)
3. [Servidor de Imagens (CDN) e Tamanhos](#3-servidor-de-imagens-cdn-e-tamanhos)
4. [Otimização de Requisições (`append_to_response`)](#4-otimização-de-requisições-append_to_response)
5. [Mapeamento Completo de Endpoints (28 Módulos)](#5-mapeamento-completo-de-endpoints-28-módulos)
   - [5.1 Account (Conta do Usuário)](#51-account-conta-do-usuário)
   - [5.2 Authentication (Autenticação)](#52-authentication-autenticação)
   - [5.3 Certifications (Classificações Indicativas)](#53-certifications-classificações-indicativas)
   - [5.4 Changes (Histórico de Alterações)](#54-changes-histórico-de-alterações)
   - [5.5 Collections (Coleções / Franquias)](#55-collections-coleções--franquias)
   - [5.6 Companies (Produtoras)](#56-companies-produtoras)
   - [5.7 Configuration (Configurações do Sistema)](#57-configuration-configurações-do-sistema)
   - [5.8 Credits (Créditos Específicos)](#58-credits-créditos-específicos)
   - [5.9 Discover (Busca Avançada e Filtros)](#59-discover-busca-avançada-e-filtros)
   - [5.10 Find (Busca por ID Externo: IMDb, TVDB, etc.)](#510-find-busca-por-id-externo-imdb-tvdb-etc)
   - [5.11 Genres (Gêneros)](#511-genres-gêneros)
   - [5.12 Guest Sessions (Sessões de Convidado)](#512-guest-sessions-sessões-de-convidado)
   - [5.13 Keywords (Palavras-chave)](#513-keywords-palavras-chave)
   - [5.14 Lists (Listas Personalizadas)](#514-lists-listas-personalizadas)
   - [5.15 Movie Lists (Listas Prontas de Filmes)](#515-movie-lists-listas-prontas-de-filmes)
   - [5.16 Movies (Filmes — Detalhes e Sub-rotas)](#516-movies-filmes--detalhes-e-sub-rotas)
   - [5.17 Networks (Emissoras e Canais de TV)](#517-networks-emissoras-e-canais-de-tv)
   - [5.18 People Lists (Listas de Pessoas)](#518-people-lists-listas-de-pessoas)
   - [5.19 People (Atores, Diretores e Equipe)](#519-people-atores-diretores-e-equipe)
   - [5.20 Reviews (Avaliações / Críticas)](#520-reviews-avaliações--críticas)
   - [5.21 Search (Busca Textual Direta)](#521-search-busca-textual-direta)
   - [5.22 Trending (Em Alta)](#522-trending-em-alta)
   - [5.23 TV Series Lists (Listas Prontas de Séries)](#523-tv-series-lists-listas-prontas-de-séries)
   - [5.24 TV Series (Séries de TV — Detalhes e Sub-rotas)](#524-tv-series-séries-de-tv--detalhes-e-sub-rotas)
   - [5.25 TV Seasons (Temporadas de TV)](#525-tv-seasons-temporadas-de-tv)
   - [5.26 TV Episodes (Episódios de TV)](#526-tv-episodes-episódios-de-tv)
   - [5.27 TV Episode Groups (Grupos de Episódios)](#527-tv-episode-groups-grupos-de-episódios)
   - [5.28 Watch Providers (Onde Assistir / Streaming)](#528-watch-providers-onde-assistir--streaming)
6. [Estruturas de Resposta Principais (JSON Schemas)](#6-estruturas-de-resposta-principais-json-schemas)
7. [Códigos de Status HTTP e Erros Internos do TMDB](#7-códigos-de-status-http-e-erros-internos-do-tmdb)

---

## 1. Configurações Globais e Padrões da API

| Propriedade | Valor / Especificação |
| :--- | :--- |
| **URL Base da API (v3)** | `https://api.themoviedb.org/3` |
| **URL Base de Imagens (CDN)** | `https://image.tmdb.org/t/p/` |
| **Formato de Dados** | `application/json;charset=utf-8` |
| **Protocolo Obrigatório** | `HTTPS` |
| **Rate Limit (Limite de Taxa)** | Aproximadamente **40 a 50 requisições por segundo** por IP. Exceder retorna HTTP `429 Too Many Requests`. |

### Parâmetros de Query Universais
A maioria absoluta dos endpoints `GET` aceita os seguintes parâmetros na Query String:

| Parâmetro | Tipo | Padrão | Descrição Técnica |
| :--- | :--- | :--- | :--- |
| `language` | `string` | `en-US` | Código `ISO 639-1` combinado com `ISO 3166-1` (ex: `pt-BR`, `en-US`, `es-ES`). Traduz títulos, sinopses (`overview`) e nomes de gêneros quando disponíveis. |
| `page` | `integer` | `1` | Página de resultados (mínimo `1`, máximo `500`). Cada página retorna **20 itens**. |
| `region` | `string` | — | Código de país `ISO 3166-1` em maiúsculas (ex: `BR`, `US`). Filtra datas de estreia, filmes em cartaz e provedores de streaming locais. |
| `include_adult` | `boolean` | `false` | Define se conteúdos adultos (+18/eróticos) devem ser incluídos em buscas e listagens. |

---

## 2. Autenticação e Sessões

### 2.1 Autenticação de Aplicação (Leitura de Dados Públicos)
Para consumir qualquer rota de busca, detalhes, listas públicas, imagens e tendências, existem dois métodos (o **Método A via Header** é o padrão recomendado):

#### Método A: Bearer Token no Header (Recomendado)
Utiliza o **API Read Access Token** nas requisições:
```http
GET https://api.themoviedb.org/3/movie/popular?language=pt-BR HTTP/1.1
Accept: application/json
Authorization: Bearer SEU_API_READ_ACCESS_TOKEN
```

#### Método B: API Key via Query String
Utiliza a **API Key (v3 auth)** diretamente na URL:
```http
GET https://api.themoviedb.org/3/movie/popular?api_key=SUA_API_KEY&language=pt-BR HTTP/1.1
Accept: application/json
```

---

### 2.2 Autenticação de Usuário (`session_id`)
Necessária **apenas** quando sua aplicação precisa modificar ou ler dados privados de uma conta TMDB (favoritar, adicionar à *watchlist*, avaliar filmes/séries ou criar listas personalizadas).

**Fluxo em 3 passos para gerar um `session_id`:**
1. **Gerar um Request Token temporário:** Chame `GET /authentication/token/new`. O token expira em 60 minutos se não for validado.
2. **Autorizar o Request Token:**
   - **Via Redirecionamento Web (OAuth-like):** Envie o usuário para:
     `https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}?redirect_to=https://seuapp.com/callback`
   - **Via Login Direto na API:** Chame `POST /authentication/token/validate_with_login` enviando `username`, `password` e `request_token` no body.
3. **Converter em Session ID permanente:** Chame `POST /authentication/session/new` enviando o `request_token` autorizado no body. A resposta conterá o `session_id`, que deve ser enviado como query param (`?session_id=...`) nas rotas de **Account** e escrita.

---

## 3. Servidor de Imagens (CDN) e Tamanhos

Os endpoints da API retornam apenas o **caminho relativo** da imagem (ex: `"/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"`). Para renderizar a imagem completa, concatene:

```text
https://image.tmdb.org/t/p/{TAMANHO}{CAMINHO_DA_IMAGEM}
```
*Exemplo:* `https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg`

### Tabela Oficial de Tamanhos Suportados (`{TAMANHO}`)

| Tipo de Imagem | Campo na API | Tamanhos Disponíveis |
| :--- | :--- | :--- |
| **Pôster (Capa Vertical)** | `poster_path` | `w92`, `w154`, `w185`, `w342`, `w500`, `w780`, `original` |
| **Backdrop (Fundo Horizontal)** | `backdrop_path` | `w300`, `w780`, `w1280`, `original` |
| **Logo (Logotipo Transparente)** | `logo_path` | `w45`, `w92`, `w154`, `w185`, `w300`, `w500`, `original` |
| **Profile (Foto de Ator/Diretor)** | `profile_path` | `w45`, `w185`, `h632`, `original` |
| **Still (Frame de Episódio de TV)** | `still_path` | `w92`, `w185`, `w300`, `original` |

> **Dica de Performance:** Evite usar `original` em listagens ou grades de cards, pois as imagens originais podem ultrapassar 4000px e vários megabytes. Prefira `w342` ou `w500` para pôsteres e `w780` ou `w1280` para backdrops.

---

## 4. Otimização de Requisições (`append_to_response`)

Os endpoints de **Detalhes** (`/movie/{id}`, `/tv/{id}`, `/person/{id}`, `/tv/{id}/season/{n}`, `/tv/{id}/season/{n}/episode/{e}`) suportam o parâmetro `append_to_response`.

Ele permite anexar até **20 sub-rotas** do mesmo recurso em uma **única chamada HTTP**, economizando latência e requisições no limite de taxa.

### Como usar:
Passe os nomes das sub-rotas separados por vírgula (sem espaços):
```http
GET https://api.themoviedb.org/3/movie/550?language=pt-BR&append_to_response=credits,videos,images,recommendations,similar,watch/providers,release_dates
```
O JSON retornado trará os dados do filme na raiz, acrescidos das chaves `"credits": {...}`, `"videos": {...}`, `"images": {...}`, etc.

> **Nota sobre Imagens no `append_to_response`:** Quando você filtra por `language=pt-BR`, o endpoint de imagens pode retornar vazio se não houver pôsteres especificamente marcados como `pt`. Para garantir que imagens sem texto (`null`) e em inglês (`en`) também venham junto, adicione o parâmetro:
> `&include_image_language=pt,en,null`

---

## 5. Mapeamento Completo de Endpoints (28 Módulos)

Abaixo estão listados **todos os módulos e rotas** presentes na barra lateral da referência oficial v3.

---

### 5.1 ACCOUNT (Conta do Usuário)
*Requer `session_id` como Query Parameter em todas as chamadas.*

| Método | Endpoint | Função | Parâmetros Principais (Query / Body) |
| :--- | :--- | :--- | :--- |
| `GET` | `/account` | Detalhes da conta logada | Query: `session_id` |
| `GET` | `/account/{account_id}` | Detalhes da conta por ID | Path: `account_id` \| Query: `session_id` |
| `POST` | `/account/{account_id}/favorite` | Marcar/desmarcar favorito | Body: `{"media_type": "movie"\|"tv", "media_id": 550, "favorite": true}` |
| `POST` | `/account/{account_id}/watchlist` | Adicionar/remover da Watchlist | Body: `{"media_type": "movie"\|"tv", "media_id": 550, "watchlist": true}` |
| `GET` | `/account/{account_id}/favorite/movies` | Listar filmes favoritos | Query: `language`, `page`, `sort_by` (`created_at.asc` \| `created_at.desc`) |
| `GET` | `/account/{account_id}/favorite/tv` | Listar séries favoritas | Query: `language`, `page`, `sort_by` |
| `GET` | `/account/{account_id}/lists` | Listas personalizadas criadas pelo usuário | Query: `page`, `session_id` |
| `GET` | `/account/{account_id}/rated/movies` | Filmes avaliados pelo usuário | Query: `language`, `page`, `sort_by` |
| `GET` | `/account/{account_id}/rated/tv` | Séries avaliadas pelo usuário | Query: `language`, `page`, `sort_by` |
| `GET` | `/account/{account_id}/rated/tv/episodes` | Episódios avaliados pelo usuário | Query: `language`, `page`, `sort_by` |
| `GET` | `/account/{account_id}/watchlist/movies` | Filmes na Watchlist do usuário | Query: `language`, `page`, `sort_by` |
| `GET` | `/account/{account_id}/watchlist/tv` | Séries na Watchlist do usuário | Query: `language`, `page`, `sort_by` |

---

### 5.2 AUTHENTICATION (Autenticação)

| Método | Endpoint | Função | Parâmetros Principais (Query / Body) |
| :--- | :--- | :--- | :--- |
| `GET` | `/authentication` | **Validate Key:** Testa se sua API Key / Bearer Token é válida | Nenhum (apenas credencial no Header/Query) |
| `GET` | `/authentication/guest_session/new` | Cria uma sessão de convidado (`guest_session_id`) | Nenhum |
| `GET` | `/authentication/token/new` | Cria um `request_token` temporário | Nenhum |
| `POST` | `/authentication/token/validate_with_login` | Autoriza um `request_token` usando usuário e senha | Body: `{"username": "...", "password": "...", "request_token": "..."}` |
| `POST` | `/authentication/session/new` | Cria um `session_id` a partir de um `request_token` aprovado | Body: `{"request_token": "..."}` |
| `POST` | `/authentication/session/convert/4` | Converte um `access_token` da API v4 em um `session_id` da v3 | Body: `{"access_token": "..."}` |
| `DELETE`| `/authentication/session` | Invalida/apaga um `session_id` (Logout) | Body: `{"session_id": "..."}` |

---

### 5.3 CERTIFICATIONS (Classificações Indicativas)
Retorna as siglas de classificação etária por país (ex: no `BR`: `L`, `10`, `12`, `14`, `16`, `18`; nos `US`: `G`, `PG`, `PG-13`, `R`, `NC-17`) e seus significados.

| Método | Endpoint | Função |
| :--- | :--- | :--- |
| `GET` | `/certification/movie/list` | Lista todas as classificações indicativas de filmes por país |
| `GET` | `/certification/tv/list` | Lista todas as classificações indicativas de TV por país |

---

### 5.4 CHANGES (Histórico de Alterações)
Útil para sincronização de bancos de dados locais: retorna os IDs de registros que sofreram alterações nas últimas 24 horas (ou no intervalo de até 14 dias entre `start_date` e `end_date` no formato `YYYY-MM-DD`).

| Método | Endpoint | Função | Parâmetros (Query) |
| :--- | :--- | :--- | :--- |
| `GET` | `/movie/changes` | IDs de filmes modificados recentemente | `start_date`, `end_date`, `page` |
| `GET` | `/tv/changes` | IDs de séries modificadas recentemente | `start_date`, `end_date`, `page` |
| `GET` | `/person/changes` | IDs de pessoas modificadas recentemente | `start_date`, `end_date`, `page` |

---

### 5.5 COLLECTIONS (Coleções / Franquias)
Agrupamentos de sequências de filmes (ex: *The Lord of the Rings Collection*, *The Avengers Collection*).

| Método | Endpoint | Função | Parâmetros |
| :--- | :--- | :--- | :--- |
| `GET` | `/collection/{collection_id}` | Detalhes da coleção e lista de filmes que fazem parte dela (`parts`) | Path: `collection_id` \| Query: `language` |
| `GET` | `/collection/{collection_id}/images` | Pôsteres e backdrops da coleção | Path: `collection_id` \| Query: `language`, `include_image_language` |
| `GET` | `/collection/{collection_id}/translations` | Traduções disponíveis para a coleção | Path: `collection_id` |

---

### 5.6 COMPANIES (Produtoras)
Dados sobre estúdios cinematográficos (ex: *Warner Bros.*, *A24*, *Marvel Studios*).

| Método | Endpoint | Função | Parâmetros |
| :--- | :--- | :--- | :--- |
| `GET` | `/company/{company_id}` | Detalhes da produtora (nome, sede, site, empresa-mãe) | Path: `company_id` |
| `GET` | `/company/{company_id}/alternative_names` | Nomes alternativos da produtora | Path: `company_id` |
| `GET` | `/company/{company_id}/images` | Logotipos oficiais (`logos`) da produtora | Path: `company_id` |

---

### 5.7 CONFIGURATION (Configurações do Sistema)
Metadados estruturais e tabelas auxiliares padronizadas do TMDB.

| Método | Endpoint | Função |
| :--- | :--- | :--- |
| `GET` | `/configuration` | Retorna a URL base de imagens (`secure_base_url`), tamanhos de imagem suportados e chaves de mudança |
| `GET` | `/configuration/countries` | Lista todos os países (`ISO 3166-1`) usados no TMDB (`english_name`, `native_name`) |
| `GET` | `/configuration/jobs` | Lista todos os cargos e departamentos técnicos (`Directing`, `Writing`, `Production`, etc.) |
| `GET` | `/configuration/languages` | Lista todos os idiomas (`ISO 639-1`) suportados no TMDB |
| `GET` | `/configuration/primary_translations` | Lista os códigos de idioma/país oficialmente traduzidos (ex: `pt-BR`, `en-US`) |
| `GET` | `/configuration/timezones` | Lista os fusos horários por código de país |

---

### 5.8 CREDITS (Créditos Específicos)

| Método | Endpoint | Função | Parâmetros |
| :--- | :--- | :--- | :--- |
| `GET` | `/credit/{credit_id}` | Retorna detalhes completos de uma participação específica (ator ou equipe) em um filme ou série a partir da string `credit_id` | Path: `credit_id` (string alfanumérica retornada nas listas de elenco) |

---

### 5.9 DISCOVER (Busca Avançada e Filtros)
O módulo mais poderoso para construir catálogos filtrados (ex: *"Filmes de terror lançados entre 2020 e 2026 disponíveis na Netflix Brasil com nota maior que 7"*).

| Método | Endpoint | Função |
| :--- | :--- | :--- |
| `GET` | `/discover/movie` | Busca filmes combinando dezenas de filtros e ordenações |
| `GET` | `/discover/tv` | Busca séries de TV combinando dezenas de filtros e ordenações |

#### Principais Parâmetros de Filtro do `/discover/movie` e `/discover/tv`
> **Regra de Operadores Lógicos:** Nos filtros que aceitam múltiplos IDs (`with_genres`, `with_cast`, `with_companies`, `with_watch_providers`, `with_keywords`), separar por **vírgula (`,`)** aplica lógica **E (`AND`)**, enquanto separar por **pipe (`|`)** aplica lógica **OU (`OR`)**.

| Parâmetro (Query) | Aplicável a | Descrição e Exemplos |
| :--- | :--- | :--- |
| `sort_by` | Ambos | Ordenação. Padrão: `popularity.desc`. Outras opções: `popularity.asc`, `revenue.desc`, `primary_release_date.desc`, `first_air_date.desc`, `vote_average.desc`, `vote_count.desc`, `original_title.asc`. |
| `with_genres` | Ambos | IDs de gênero. Ex: `28,12` (Ação E Aventura) ou `28\|12` (Ação OU Aventura). |
| `without_genres` | Ambos | Exclui os gêneros informados por ID. |
| `primary_release_year` | Movie | Filtra pelo ano exato de lançamento principal (ex: `2025`). |
| `primary_release_date.gte` / `.lte` | Movie | Intervalo de data de lançamento (`YYYY-MM-DD`). `.gte` = maior/igual (de), `.lte` = menor/igual (até). |
| `first_air_date_year` | TV | Ano de estreia da série (`YYYY`). |
| `first_air_date.gte` / `.lte` | TV | Intervalo de data da primeira exibição (`YYYY-MM-DD`). |
| `vote_average.gte` / `.lte` | Ambos | Filtra pela nota média (de `0` a `10`). Ex: `vote_average.gte=7.5`. |
| `vote_count.gte` / `.lte` | Ambos | Quantidade mínima/máxima de votos (essencial usar `vote_count.gte=200` ao ordenar por `vote_average.desc` para evitar filmes obscuros com apenas 1 voto nota 10). |
| `with_watch_providers` | Ambos | IDs dos serviços de streaming (ex: `8` para Netflix, `119` para Amazon Prime Video, `337` para Disney+). **Exige o uso conjunto de `watch_region`**. |
| `watch_region` | Ambos | País do catálogo de streaming em formato `ISO 3166-1` (ex: `BR`). |
| `with_watch_monetization_types` | Ambos | Tipo de oferta no streaming: `flatrate` (assinatura), `free`, `ads`, `rent` (aluguel), `buy` (compra). |
| `with_cast` / `with_crew` / `with_people` | Movie | Filtra filmes que contêm determinados `person_id` no elenco, direção ou ambos. |
| `with_companies` | Ambos | Filtra por ID da produtora (`company_id`). |
| `with_networks` | TV | Filtra por ID da emissora/plataforma original (`network_id`, ex: `213` para Netflix, `49` para HBO). |
| `with_original_language` | Ambos | Filtra pelo idioma original da obra (`ISO 639-1`, ex: `ko` para coreano, `pt` para português, `ja` para japonês). |
| `with_runtime.gte` / `.lte` | Ambos | Duração em minutos (ex: `with_runtime.lte=100` para filmes de até 1h40). |
| `certification_country` & `certification` / `certification.lte` | Movie | Filtra por classificação indicativa em determinado país (ex: `certification_country=BR&certification.lte=14`). |
| `with_keywords` / `without_keywords` | Ambos | Filtra ou exclui obras associadas a determinados `keyword_id`. |
| `with_release_type` | Movie | Tipo de lançamento (`1`=Premiere, `2`=Teatral Limitado, `3`=Teatral, `4`=Digital, `5`=Físico, `6`=TV). |

---

### 5.10 FIND (Busca por ID Externo: IMDb, TVDB, etc.)
Permite encontrar o registro correspondente no TMDB caso você possua o ID do **IMDb** (`tt...` ou `nm...`), **TVDB**, **Facebook**, **Instagram**, **X (Twitter)**, **TikTok**, **Wikidata** ou **YouTube**.

| Método | Endpoint | Parâmetros Obrigatórios |
| :--- | :--- | :--- |
| `GET` | `/find/{external_id}` | **Path:** `external_id` (ex: `tt0137523`) <br> **Query Obrigatória:** `external_source` (Valores aceitos: `imdb_id`, `tvdb_id`, `freebase_mid`, `freebase_id`, `tvrage_id`, `facebook_id`, `instagram_id`, `tiktok_id`, `twitter_id`, `wikidata_id`, `youtube_id`) <br> **Query Opcional:** `language` |

---

### 5.11 GENRES (Gêneros)
Retorna a lista oficial de IDs e nomes de gêneros de filmes e séries.

| Método | Endpoint | Função | Parâmetros (Query) |
| :--- | :--- | :--- | :--- |
| `GET` | `/genre/movie/list` | Lista oficial de gêneros de Filmes (`id` e `name`) | `language` (ex: `pt-BR`) |
| `GET` | `/genre/tv/list` | Lista oficial de gêneros de Séries de TV (`id` e `name`) | `language` (ex: `pt-BR`) |

---

### 5.12 GUEST SESSIONS (Sessões de Convidado)
Permite consultar o que uma sessão de convidado (`guest_session_id`) avaliou.

| Método | Endpoint | Função | Parâmetros |
| :--- | :--- | :--- | :--- |
| `GET` | `/guest_session/{guest_session_id}/rated/movies` | Filmes avaliados pelo convidado | Query: `language`, `page`, `sort_by` |
| `GET` | `/guest_session/{guest_session_id}/rated/tv` | Séries avaliadas pelo convidado | Query: `language`, `page`, `sort_by` |
| `GET` | `/guest_session/{guest_session_id}/rated/tv/episodes` | Episódios avaliados pelo convidado | Query: `language`, `page`, `sort_by` |

---

### 5.13 KEYWORDS (Palavras-chave)
Tags temáticas associadas a filmes e séries (ex: *"time travel"*, *"cyberpunk"*, *"based on novel or book"*).

| Método | Endpoint | Função | Parâmetros |
| :--- | :--- | :--- | :--- |
| `GET` | `/keyword/{keyword_id}` | Retorna o nome da palavra-chave pelo ID | Path: `keyword_id` |
| `GET` | `/keyword/{keyword_id}/movies` | Lista filmes que possuem a palavra-chave *(Nota: Prefira usar `/discover/movie?with_keywords={id}`)* | Path: `keyword_id` \| Query: `include_adult`, `language`, `page` |

---

### 5.14 LISTS (Listas Personalizadas — v3)
Gerenciamento de listas criadas por usuários (ex: *"Meus 50 filmes favoritos de Ficção Científica"*). Requer `session_id` para operações `POST` e `DELETE`.

| Método | Endpoint | Função | Parâmetros (Query / Body) |
| :--- | :--- | :--- | :--- |
| `GET` | `/list/{list_id}` | Detalhes e itens de uma lista | Path: `list_id` \| Query: `language`, `page` |
| `GET` | `/list/{list_id}/item_status` | Verifica se um filme (`movie_id`) já está na lista | Path: `list_id` \| Query: `movie_id`, `language` |
| `POST` | `/list` | Cria uma nova lista personalizada | Query: `session_id` \| Body: `{"name": "...", "description": "...", "language": "pt"}` |
| `POST` | `/list/{list_id}/add_item` | Adiciona um filme à lista | Path: `list_id` \| Query: `session_id` \| Body: `{"media_id": 550}` |
| `POST` | `/list/{list_id}/remove_item` | Remove um filme da lista | Path: `list_id` \| Query: `session_id` \| Body: `{"media_id": 550}` |
| `POST` | `/list/{list_id}/clear` | Remove todos os itens da lista de uma vez | Path: `list_id` \| Query: `session_id`, `confirm=true` |
| `DELETE`| `/list/{list_id}` | Exclui a lista inteira | Path: `list_id` \| Query: `session_id` |

---

### 5.15 MOVIE LISTS (Listas Prontas de Filmes)
Listagens dinâmicas essenciais para a tela inicial (*Home*) de qualquer aplicativo de filmes. Todas aceitam `language`, `page` e `region` (ex: `region=BR`).

| Método | Endpoint | Função | Observação Técnica |
| :--- | :--- | :--- | :--- |
| `GET` | `/movie/now_playing` | **Em Cartaz:** Filmes atualmente nos cinemas | Inclui objeto `dates` (`minimum` e `maximum`) na resposta. Use `region=BR` para ver o circuito nacional. |
| `GET` | `/movie/popular` | **Populares:** Filmes mais populares do momento | Atualizado diariamente com base em acessos, buscas e interações. |
| `GET` | `/movie/top_rated` | **Mais Bem Avaliados:** Filmes com a maior nota histórica | Ordenado pela média ponderada de avaliações no TMDB. |
| `GET` | `/movie/upcoming` | **Em Breve:** Próximos lançamentos nos cinemas | Use `region=BR` para datas de estreia locais precisas. |

---

### 5.16 MOVIES (Filmes — Detalhes e Sub-rotas)
Todas as rotas abaixo (exceto `/movie/latest`) utilizam o parâmetro de Path `{movie_id}` (inteiro).

| Método | Endpoint | Função | Parâmetros Extras Relevantes |
| :--- | :--- | :--- | :--- |
| `GET` | `/movie/{movie_id}` | **Detalhes Principais:** Sinopse, orçamento, bilheteria, duração (`runtime`), gêneros, produtoras, status, idioma, nota, pôster e backdrop | Query: `language`, `append_to_response` |
| `GET` | `/movie/{movie_id}/account_states` | Estado do filme na conta logada (se é favorito, se está na watchlist e qual nota o usuário deu) | Query: `session_id` ou `guest_session_id` |
| `GET` | `/movie/{movie_id}/alternative_titles`| Títulos alternativos que o filme recebeu em diferentes países | Query: `country` (`ISO 3166-1`) |
| `GET` | `/movie/{movie_id}/changes` | Histórico de edições recentes nos dados deste filme | Query: `start_date`, `end_date`, `page` |
| `GET` | `/movie/{movie_id}/credits` | **Elenco (`cast`) e Equipe Técnica (`crew`)** completa (diretor, roteirista, compositor, etc.) | Query: `language` |
| `GET` | `/movie/{movie_id}/external_ids` | IDs do filme no IMDb (`imdb_id`), Wikidata, Facebook, Instagram e X/Twitter | Nenhum |
| `GET` | `/movie/{movie_id}/images` | Todos os `backdrops`, `logos` e `posters` com suas dimensões, proporções e idiomas | Query: `language`, `include_image_language` (ex: `pt,en,null`) |
| `GET` | `/movie/{movie_id}/keywords` | Lista de palavras-chave temáticas associadas ao filme | Nenhum |
| `GET` | `/movie/latest` | Retorna o último filme recém-cadastrado no banco de dados do TMDB | Nenhum |
| `GET` | `/movie/{movie_id}/lists` | Listas públicas de usuários onde este filme foi incluído | Query: `language`, `page` |
| `GET` | `/movie/{movie_id}/recommendations` | **Recomendações:** Filmes recomendados com base em algoritmo de engajamento dos usuários que gostaram deste filme (superior ao `/similar`) | Query: `language`, `page` |
| `GET` | `/movie/{movie_id}/release_dates` | Datas de lançamento e **Classificação Indicativa (`certification`)** por país | Nenhum (filtre o array `results` pelo `iso_3166_1 == "BR"`) |
| `GET` | `/movie/{movie_id}/reviews` | Críticas e resenhas escritas por usuários no TMDB | Query: `language`, `page` |
| `GET` | `/movie/{movie_id}/similar` | Filmes similares baseados em combinação de gêneros e palavras-chave | Query: `language`, `page` |
| `GET` | `/movie/{movie_id}/translations` | Todas as traduções de título, sinopse e *tagline* cadastradas para este filme | Nenhum |
| `GET` | `/movie/{movie_id}/videos` | **Trailers, Teasers, Clips e Featurettes** (retorna a chave `key` do YouTube/Vimeo) | Query: `language` (ex: `pt-BR`) |
| `GET` | `/movie/{movie_id}/watch/providers` | **Onde Assistir:** Lista serviços de streaming (`flatrate`), aluguel (`rent`) e compra (`buy`) agrupados por país (`BR`, `US`, etc.) | Nenhum (atribuição JustWatch recomendada) |
| `POST` | `/movie/{movie_id}/rating` | Envia uma nota (de `0.5` a `10.0`, em múltiplos de `0.5`) para o filme | Query: `session_id` ou `guest_session_id` \| Body: `{"value": 8.5}` |
| `DELETE`| `/movie/{movie_id}/rating` | Remove a avaliação dada pelo usuário ao filme | Query: `session_id` ou `guest_session_id` |

---

### 5.17 NETWORKS (Emissoras e Canais de TV)
Dados sobre canais de TV e plataformas exibidoras de séries (ex: *HBO*, *Netflix*, *AMC*, *TV Globo*).

| Método | Endpoint | Função | Parâmetros |
| :--- | :--- | :--- | :--- |
| `GET` | `/network/{network_id}` | Detalhes da emissora (nome, país de origem, sede, site oficial) | Path: `network_id` |
| `GET` | `/network/{network_id}/alternative_names` | Nomes alternativos da emissora | Path: `network_id` |
| `GET` | `/network/{network_id}/images` | Logotipos (`logos`) em PNG/SVG da emissora | Path: `network_id` |

---

### 5.18 PEOPLE LISTS (Listas de Pessoas)

| Método | Endpoint | Função | Parâmetros (Query) |
| :--- | :--- | :--- | :--- |
| `GET` | `/person/popular` | Lista paginada dos atores, atrizes e diretores mais populares do momento | `language`, `page` |

---

### 5.19 PEOPLE (Atores, Diretores e Equipe)
Todas as rotas abaixo (exceto `/person/latest`) utilizam `{person_id}` (inteiro) no Path.

| Método | Endpoint | Função | Parâmetros Relevantes |
| :--- | :--- | :--- | :--- |
| `GET` | `/person/{person_id}` | **Detalhes e Biografia:** Nome, biografia (`biography`), data e local de nascimento, data de falecimento, departamento conhecido (`known_for_department`) e foto (`profile_path`) | Query: `language`, `append_to_response` |
| `GET` | `/person/{person_id}/changes` | Alterações recentes no cadastro da pessoa | Query: `start_date`, `end_date`, `page` |
| `GET` | `/person/{person_id}/combined_credits`| **Filmografia Completa (Filmes + TV juntos):** Retorna arrays `cast` e `crew` com o campo `media_type` (`"movie"` ou `"tv"`) | Query: `language` |
| `GET` | `/person/{person_id}/movie_credits` | Filmografia apenas em **Filmes** (`cast` e `crew`) | Query: `language` |
| `GET` | `/person/{person_id}/tv_credits` | Filmografia apenas em **Séries de TV** (`cast` e `crew`) | Query: `language` |
| `GET` | `/person/{person_id}/external_ids` | IDs das redes sociais (Instagram, X/Twitter, TikTok, Facebook, YouTube) e IMDb (`nm...`) | Nenhum |
| `GET` | `/person/{person_id}/images` | Galeria de fotos de perfil (`profiles`) da pessoa | Nenhum |
| `GET` | `/person/latest` | Última pessoa cadastrada no banco do TMDB | Nenhum |
| `GET` | `/person/{person_id}/tagged_images` | Imagens de filmes/séries em que esta pessoa foi marcada (*Depreciado/Legado*) | Query: `page` |
| `GET` | `/person/{person_id}/translations` | Traduções da biografia da pessoa em vários idiomas | Nenhum |

---

### 5.20 REVIEWS (Avaliações / Críticas)

| Método | Endpoint | Função | Parâmetros |
| :--- | :--- | :--- | :--- |
| `GET` | `/review/{review_id}` | Detalhes completos de uma crítica específica escrita por um usuário | Path: `review_id` (string alfanumérica) |

---

### 5.21 SEARCH (Busca Textual Direta)
Endpoints para barras de pesquisa (*Search Bars*) onde o usuário digita um termo. Em todos eles, o parâmetro `query` (string codificada para URL) é **obrigatório**.

| Método | Endpoint | O que busca | Parâmetros Adicionais (Query) |
| :--- | :--- | :--- | :--- |
| `GET` | `/search/multi` | **Busca Unificada:** Retorna Filmes (`media_type: "movie"`), Séries (`"tv"`) e Pessoas (`"person"`) misturados por relevância em uma única chamada | `query` (obrigatório), `include_adult`, `language`, `page` |
| `GET` | `/search/movie` | Busca exclusivamente **Filmes** | `query` (obrigatório), `include_adult`, `language`, `primary_release_year`, `page`, `region`, `year` |
| `GET` | `/search/tv` | Busca exclusivamente **Séries de TV** | `query` (obrigatório), `first_air_date_year`, `include_adult`, `language`, `page`, `year` |
| `GET` | `/search/person` | Busca exclusivamente **Pessoas** (Atores/Diretores) e traz o array `known_for` com seus principais trabalhos | `query` (obrigatório), `include_adult`, `language`, `page` |
| `GET` | `/search/collection` | Busca **Coleções / Franquias** de filmes | `query` (obrigatório), `include_adult`, `language`, `page`, `region` |
| `GET` | `/search/company` | Busca **Produtoras** | `query` (obrigatório), `page` |
| `GET` | `/search/keyword` | Busca **Palavras-chave** (para descobrir o `keyword_id` e usar no Discover) | `query` (obrigatório), `page` |

---

### 5.22 TRENDING (Em Alta)
Lista os conteúdos que mais cresceram em acessos e buscas nas últimas **24 horas (`day`)** ou nos últimos **7 dias (`week`)**.

*Parâmetro de Path obrigatório em todas as 4 rotas:* `{time_window}` = `day` ou `week`.

| Método | Endpoint | Função | Parâmetros (Query) |
| :--- | :--- | :--- | :--- |
| `GET` | `/trending/all/{time_window}` | Tudo o que está em alta (Filmes, Séries e Pessoas juntos) | `language`, `page` |
| `GET` | `/trending/movie/{time_window}` | Filmes em alta hoje (`day`) ou na semana (`week`) | `language`, `page` |
| `GET` | `/trending/tv/{time_window}` | Séries de TV em alta hoje (`day`) ou na semana (`week`) | `language`, `page` |
| `GET` | `/trending/person/{time_window}` | Atores e personalidades em alta hoje (`day`) ou na semana (`week`) | `language`, `page` |

---

### 5.23 TV SERIES LISTS (Listas Prontas de Séries)
Todas aceitam `language` e `page` (e `timezone` nas rotas de exibição).

| Método | Endpoint | Função |
| :--- | :--- | :--- |
| `GET` | `/tv/airing_today` | **Exibidas Hoje:** Séries que possuem episódios indo ao ar na data de hoje |
| `GET` | `/tv/on_the_air` | **No Ar:** Séries que terão novos episódios lançados nos próximos 7 dias |
| `GET` | `/tv/popular` | **Populares:** Séries mais populares do momento |
| `GET` | `/tv/top_rated` | **Mais Bem Avaliadas:** Séries com maior nota média histórica no TMDB |

---

### 5.24 TV SERIES (Séries de TV — Detalhes e Sub-rotas)
Todas as rotas abaixo (exceto `/tv/latest`) utilizam `{series_id}` (inteiro) no Path.

| Método | Endpoint | Função | Diferença / Destaque Técnico |
| :--- | :--- | :--- | :--- |
| `GET` | `/tv/{series_id}` | **Detalhes Principais da Série:** Nome (`name`), sinopse, criadores (`created_by`), número de temporadas (`number_of_seasons`), número de episódios (`number_of_episodes`), lista resumida de temporadas (`seasons`), emissoras (`networks`), status, último e próximo episódio a ir ao ar | Suporta `append_to_response` |
| `GET` | `/tv/{series_id}/account_states` | Estado da série na conta do usuário (favorito, watchlist, nota) | Query: `session_id` ou `guest_session_id` |
| `GET` | `/tv/{series_id}/aggregate_credits` | **Elenco Agregado de Toda a Série (Recomendado para TV):** Diferente de `/credits` (que mostra apenas o elenco fixo da última temporada), esta rota retorna **todos os atores que já passaram pela série**, incluindo um array `roles` com cada personagem e o `total_episode_count` de cada ator | Query: `language` |
| `GET` | `/tv/{series_id}/alternative_titles` | Títulos alternativos da série ao redor do mundo | Nenhum |
| `GET` | `/tv/{series_id}/changes` | Histórico de alterações recentes na série | Query: `start_date`, `end_date`, `page` |
| `GET` | `/tv/{series_id}/content_ratings` | **Classificação Indicativa de TV por país** (ex: `BR` -> `16`, `US` -> `TV-MA`) | Nenhum |
| `GET` | `/tv/{series_id}/credits` | Elenco regular e equipe técnica da temporada mais recente | Query: `language` |
| `GET` | `/tv/{series_id}/episode_groups` | Ordem alternativa de episódios (ex: ordem cronológica, ordem de lançamento em DVD, arcos de anime) | Nenhum |
| `GET` | `/tv/{series_id}/external_ids` | IDs externos da série (`imdb_id`, `tvdb_id`, redes sociais, Wikidata) | Nenhum |
| `GET` | `/tv/{series_id}/images` | Todos os `backdrops`, `logos` e `posters` da série | Query: `language`, `include_image_language` |
| `GET` | `/tv/{series_id}/keywords` | Palavras-chave temáticas da série (retornadas na chave `"results"`) | Nenhum |
| `GET` | `/tv/latest` | Última série recém-cadastrada no TMDB | Nenhum |
| `GET` | `/tv/{series_id}/lists` | Listas públicas onde esta série foi adicionada | Query: `language`, `page` |
| `GET` | `/tv/{series_id}/recommendations` | **Recomendações:** Séries recomendadas com base nos fãs desta série | Query: `language`, `page` |
| `GET` | `/tv/{series_id}/reviews` | Críticas escritas por usuários para a série | Query: `language`, `page` |
| `GET` | `/tv/{series_id}/screened_theatrically`| Episódios da série que tiveram exibição especial em cinemas | Nenhum |
| `GET` | `/tv/{series_id}/similar` | Séries similares baseadas em gêneros e tags | Query: `language`, `page` |
| `GET` | `/tv/{series_id}/translations` | Traduções disponíveis para a série | Nenhum |
| `GET` | `/tv/{series_id}/videos` | Trailers, teasers e aberturas da série | Query: `language` |
| `GET` | `/tv/{series_id}/watch/providers` | **Onde Assistir:** Plataformas de streaming que disponibilizam a série por país | Nenhum |
| `POST` | `/tv/{series_id}/rating` | Avalia a série (nota de `0.5` a `10.0`) | Query: `session_id` \| Body: `{"value": 9.0}` |
| `DELETE`| `/tv/{series_id}/rating` | Remove a avaliação da série | Query: `session_id` |

---

### 5.25 TV SEASONS (Temporadas de TV)
Utilizam `{series_id}` e `{season_number}` no Path (onde `season_number = 0` geralmente representa "Especiais" / Extras, e `1`, `2`, `3`... representam as temporadas numeradas).

| Método | Endpoint | Função |
| :--- | :--- | :--- |
| `GET` | `/tv/{series_id}/season/{season_number}` | **Detalhes da Temporada + Lista Completa de Episódios (`episodes`):** Retorna nome, sinopse, pôster da temporada e um array com todos os episódios (contendo título, sinopse, duração, `still_path`, data de exibição e `guest_stars`). Suporta `append_to_response`. |
| `GET` | `/tv/{series_id}/season/{season_number}/account_states` | Retorna a avaliação que o usuário logado deu para cada episódio da temporada |
| `GET` | `/tv/{series_id}/season/{season_number}/aggregate_credits`| Elenco e equipe agregados de todos os episódios daquela temporada específica |
| `GET` | `/tv/{series_id}/season/{season_number}/changes` | Alterações na temporada (usa `season_id` na rota `/tv/season/{season_id}/changes`) |
| `GET` | `/tv/{series_id}/season/{season_number}/credits` | Créditos fixos da temporada |
| `GET` | `/tv/{series_id}/season/{season_number}/external_ids` | IDs externos da temporada (TVDB, Wikidata, etc.) |
| `GET` | `/tv/{series_id}/season/{season_number}/images` | Pôsteres exclusivos daquela temporada |
| `GET` | `/tv/{series_id}/season/{season_number}/translations` | Traduções da temporada |
| `GET` | `/tv/{series_id}/season/{season_number}/videos` | Trailers e vídeos exclusivos daquela temporada |
| `GET` | `/tv/{series_id}/season/{season_number}/watch/providers` | Provedores de streaming para aquela temporada específica por país |

---

### 5.26 TV EPISODES (Episódios de TV)
Utilizam `{series_id}`, `{season_number}` e `{episode_number}` no Path.

| Método | Endpoint | Função |
| :--- | :--- | :--- |
| `GET` | `/tv/{series_id}/season/{season_number}/episode/{episode_number}` | **Detalhes do Episódio:** Nome, sinopse, duração (`runtime`), data de exibição (`air_date`), imagem (`still_path`), elenco convidado (`guest_stars`) e equipe (`crew`). Suporta `append_to_response`. |
| `GET` | `/tv/{series_id}/season/{season_number}/episode/{episode_number}/account_states` | Verifica se o usuário avaliou o episódio |
| `GET` | `/tv/episode/{episode_id}/changes` | Histórico de alterações do episódio pelo `episode_id` |
| `GET` | `/tv/{series_id}/season/{season_number}/episode/{episode_number}/credits` | Elenco regular (`cast`), participações especiais (`guest_stars`) e equipe (`crew`) do episódio |
| `GET` | `/tv/{series_id}/season/{season_number}/episode/{episode_number}/external_ids` | ID do episódio no IMDb (`imdb_id`), TVDB, Wikidata |
| `GET` | `/tv/{series_id}/season/{season_number}/episode/{episode_number}/images` | Fotos de cena (`stills`) do episódio |
| `GET` | `/tv/{series_id}/season/{season_number}/episode/{episode_number}/translations` | Traduções do título e sinopse do episódio |
| `GET` | `/tv/{series_id}/season/{season_number}/episode/{episode_number}/videos` | Clipes, cenas e prévias em vídeo do episódio |
| `POST` | `/tv/{series_id}/season/{season_number}/episode/{episode_number}/rating` | Avalia o episódio (`{"value": 9.5}`) |
| `DELETE`| `/tv/{series_id}/season/{season_number}/episode/{episode_number}/rating` | Remove a avaliação do episódio |

---

### 5.27 TV EPISODE GROUPS (Grupos de Episódios)

| Método | Endpoint | Função | Parâmetros |
| :--- | :--- | :--- | :--- |
| `GET` | `/tv/episode_group/{tv_episode_group_id}` | Retorna a estrutura completa de arcos/grupos e a ordem customizada dos episódios a partir do ID obtido em `/tv/{series_id}/episode_groups` | Path: `tv_episode_group_id` (string) |

---

### 5.28 WATCH PROVIDERS (Onde Assistir / Streaming)
Retorna a lista mestre de serviços de streaming cadastrados no TMDB (útil para montar filtros de "Escolha seus serviços de streaming" na interface do usuário).

| Método | Endpoint | Função | Parâmetros (Query) |
| :--- | :--- | :--- | :--- |
| `GET` | `/watch/providers/regions` | Lista todos os países onde o TMDB possui dados de streaming (`iso_3166_1`, `english_name`, `native_name`) | `language` |
| `GET` | `/watch/providers/movie` | Lista todas as plataformas de streaming de Filmes (`provider_id`, `provider_name`, `logo_path`) | `language`, `watch_region` (ex: `BR`) |
| `GET` | `/watch/providers/tv` | Lista todas as plataformas de streaming de Séries (`provider_id`, `provider_name`, `logo_path`) | `language`, `watch_region` (ex: `BR`) |

---

## 6. Estruturas de Resposta Principais (JSON Schemas)

### 6.1 Padrão de Resposta Paginada (Listas, Search, Discover, Trending)
Toda rota que retorna múltiplos itens utiliza este envelope padrão:
```json
{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
      "genre_ids": [18, 53, 35],
      "id": 550,
      "original_language": "en",
      "original_title": "Fight Club",
      "overview": "Um homem deprimido que sofre de insônia conhece um estranho vendedor...",
      "popularity": 94.382,
      "poster_path": "/r3pPehX4ik8NLYPpbDRAh0YRtMb.jpg",
      "release_date": "1999-10-15",
      "title": "Clube da Luta",
      "video": false,
      "vote_average": 8.438,
      "vote_count": 29120
    }
  ],
  "total_pages": 482,
  "total_results": 9635
}
```
> **Atenção às diferenças de nomenclatura entre Filmes (`movie`) e Séries (`tv`):**
> - **Título:** Filmes usam `title` e `original_title`. Séries usam `name` e `original_name`.
> - **Data de Estreia:** Filmes usam `release_date`. Séries usam `first_air_date`.

---

### 6.2 Estrutura de Vídeos (`/movie/{id}/videos` ou `/tv/{id}/videos`)
Para embutir um trailer no seu site ou app, filtre o array `results` procurando por `site === "YouTube"` e `type === "Trailer"` (dando preferência a `official === true`):
```json
{
  "id": 550,
  "results": [
    {
      "iso_639_1": "pt",
      "iso_3166_1": "BR",
      "name": "Trailer Oficial Legendado",
      "key": "SUXWAEX2jlg",
      "site": "YouTube",
      "size": 1080,
      "type": "Trailer",
      "official": true,
      "published_at": "2019-05-14T18:20:00.000Z",
      "id": "5c9294240e0a267cd516835f"
    }
  ]
}
```
- **URL do YouTube (Watch):** `https://www.youtube.com/watch?v={key}`
- **URL do YouTube (Iframe Embed):** `https://www.youtube.com/embed/{key}`

---

### 6.3 Estrutura de Watch Providers (`/movie/{id}/watch/providers`)
```json
{
  "id": 550,
  "results": {
    "BR": {
      "link": "https://www.themoviedb.org/movie/550-fight-club/watch?locale=BR",
      "flatrate": [
        {
          "logo_path": "/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg",
          "provider_id": 8,
          "provider_name": "Netflix",
          "display_priority": 2
        }
      ],
      "rent": [],
      "buy": []
    }
  }
}
```

---

## 7. Códigos de Status HTTP e Erros Internos do TMDB

Quando ocorre um erro ou uma operação de escrita é concluída, a API retorna um JSON padronizado com `status_code` (código interno do TMDB) e `status_message`:

```json
{
  "success": false,
  "status_code": 7,
  "status_message": "Invalid API key: You must be granted a valid key."
}
```

### Tabela dos Principais Códigos de Status

| HTTP Status | `status_code` (TMDB) | Significado e Ação Recomendada |
| :---: | :---: | :--- |
| `200` | `1` | **Success:** Requisição processada com sucesso. |
| `201` | `12` | **The item/record was updated successfully:** Item atualizado (ex: nota ou favorito alterado). |
| `200` | `13` | **The item/record was deleted successfully:** Item removido com sucesso. |
| `401` | `7` | **Invalid API key:** Sua API Key ou Bearer Token está incorreta ou ausente no Header. |
| `401` | `3` | **Authentication failed:** Você tentou acessar uma rota privada sem permissão ou sem `session_id` válido. |
| `401` | `30` | **Invalid username and/or password:** Credenciais incorretas no login via API. |
| `401` | `33` | **Invalid request token:** O `request_token` expirou ou nunca existiu. |
| `404` | `34` | **The resource you requested could not be found:** O ID do filme, série ou pessoa não existe no banco de dados. |
| `422` | `22` | **Invalid page:** Você solicitou uma página menor que `1` ou maior que `500`. |
| `429` | `25` | **Your request count (#) is over the allowed limit:** Rate Limit excedido. Aplique *exponential backoff* ou cache. |
| `500` / `503` | `11` / `9` | **Internal error / Service offline:** Falha temporária nos servidores do TMDB. Tente novamente após alguns segundos. |