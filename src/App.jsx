import "./css/App.css";

function App() {
  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="navbar-container">
          <a href="index.html" className="navbar-logo" id="logo-link">
            <span className="logo-text">CiNEPLANNER</span>
          </a>
          <ul className="navbar-links">
            <li>
              <a href="index.html" className="nav-link active">
                Início
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Filmes
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Listas
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Quiz
              </a>
            </li>
          </ul>
          <div className="navbar-actions">
            <a href="registro.html" className="btn-login" id="btn-entrar">
              Entrar
            </a>
          </div>
        </div>
      </nav>

      <header className="hero" id="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">CiNEPLANNER</h1>
          <h2 className="hero-subtitle">
            Sua experiência cinematográfica começa aqui.
          </h2>
          <p className="hero-description">
            Descubra os melhores filmes, leia resenhas e compartilhe sua opinião
            com outros cinéfilos.
          </p>
          <a href="#filmes" className="hero-btn" id="btn-explorar">
            Explorar Filmes
          </a>
        </div>
        <div className="hero-scroll-indicator">
          <span></span>
        </div>
      </header>

      <section className="filmes-section" id="filmes">
        <nav className="filtros-navbar" id="filtros-navbar">
          <div className="filtros-container">
            <div className="filtro-dropdown" id="filtro-genero">
              <button className="filtro-btn" id="btn-genero">
                Gênero
                <svg
                  className="dropdown-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <ul className="dropdown-menu" id="menu-genero">
                <li>
                  <a href="#" className="dropdown-item">
                    Ação
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Aventura
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Comédia
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Drama
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Ficção Científica
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Horror
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Romance
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Suspense
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Animação
                  </a>
                </li>
              </ul>
            </div>

            <div className="filtro-dropdown" id="filtro-popular">
              <button className="filtro-btn" id="btn-popular">
                Mais Popular
                <svg
                  className="dropdown-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <ul className="dropdown-menu" id="menu-popular">
                <li>
                  <a href="#" className="dropdown-item">
                    Esta semana
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Este mês
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Este ano
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Todos os tempos
                  </a>
                </li>
              </ul>
            </div>

            <div className="filtro-dropdown" id="filtro-lancamentos">
              <button className="filtro-btn" id="btn-lancamentos">
                Lançamentos
                <svg
                  className="dropdown-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <ul className="dropdown-menu" id="menu-lancamentos">
                <li>
                  <a href="#" className="dropdown-item">
                    2026
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    2025
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    2024
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    2023
                  </a>
                </li>
              </ul>
            </div>

            <div className="filtro-dropdown" id="filtro-cartaz">
              <button className="filtro-btn" id="btn-cartaz">
                Em Cartaz
                <svg
                  className="dropdown-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <ul className="dropdown-menu" id="menu-cartaz">
                <li>
                  <a href="#" className="dropdown-item">
                    Cinemas perto de mim
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Pré-venda
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Estreias da semana
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="section-header">
          <h2 className="section-title">Melhores Avaliados</h2>
          <span className="section-subtitle">
            Ordenados por nota · do maior para o menor
          </span>
        </div>

        <div className="filmes-grid" id="filmes-grid">
          <article className="filme-card" id="card-filme-1">
            <a href="resenha.html" className="card-link">
              <div className="card-poster">
                <img
                  src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+1"
                  alt="Poster do Filme 1"
                  className="poster-img"
                />
                <div className="card-overlay">
                  <span className="card-overlay-text">Ver Detalhes</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="card-titulo">O Último Horizonte</h3>
                <span className="card-genero">Ficção Científica</span>
                <div className="card-nota">
                  <span className="estrela">★</span>
                  <span className="nota-valor">9.8</span>
                </div>
              </div>
            </a>
          </article>

          <article className="filme-card" id="card-filme-2">
            <a href="resenha.html" className="card-link">
              <div className="card-poster">
                <img
                  src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+2"
                  alt="Poster do Filme 2"
                  className="poster-img"
                />
                <div className="card-overlay">
                  <span className="card-overlay-text">Ver Detalhes</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="card-titulo">Sombras do Passado</h3>
                <span className="card-genero">Drama</span>
                <div className="card-nota">
                  <span className="estrela">★</span>
                  <span className="nota-valor">9.5</span>
                </div>
              </div>
            </a>
          </article>

          <article className="filme-card" id="card-filme-3">
            <a href="resenha.html" className="card-link">
              <div className="card-poster">
                <img
                  src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+3"
                  alt="Poster do Filme 3"
                  className="poster-img"
                />
                <div className="card-overlay">
                  <span className="card-overlay-text">Ver Detalhes</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="card-titulo">Era Uma Vez no Caos</h3>
                <span className="card-genero">Ação</span>
                <div className="card-nota">
                  <span className="estrela">★</span>
                  <span className="nota-valor">9.3</span>
                </div>
              </div>
            </a>
          </article>

          <article className="filme-card" id="card-filme-4">
            <a href="resenha.html" className="card-link">
              <div className="card-poster">
                <img
                  src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+4"
                  alt="Poster do Filme 4"
                  className="poster-img"
                />
                <div className="card-overlay">
                  <span className="card-overlay-text">Ver Detalhes</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="card-titulo">A Queda dos Deuses</h3>
                <span className="card-genero">Suspense</span>
                <div className="card-nota">
                  <span className="estrela">★</span>
                  <span className="nota-valor">9.1</span>
                </div>
              </div>
            </a>
          </article>

          <article className="filme-card" id="card-filme-5">
            <a href="resenha.html" className="card-link">
              <div className="card-poster">
                <img
                  src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+5"
                  alt="Poster do Filme 5"
                  className="poster-img"
                />
                <div className="card-overlay">
                  <span className="card-overlay-text">Ver Detalhes</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="card-titulo">Nebulosa</h3>
                <span className="card-genero">Aventura</span>
                <div className="card-nota">
                  <span className="estrela">★</span>
                  <span className="nota-valor">8.9</span>
                </div>
              </div>
            </a>
          </article>

          <article className="filme-card" id="card-filme-6">
            <a href="resenha.html" className="card-link">
              <div className="card-poster">
                <img
                  src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+6"
                  alt="Poster do Filme 6"
                  className="poster-img"
                />
                <div className="card-overlay">
                  <span className="card-overlay-text">Ver Detalhes</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="card-titulo">Amor em Câmera Lenta</h3>
                <span className="card-genero">Romance</span>
                <div className="card-nota">
                  <span className="estrela">★</span>
                  <span className="nota-valor">8.7</span>
                </div>
              </div>
            </a>
          </article>

          <article className="filme-card" id="card-filme-7">
            <a href="resenha.html" className="card-link">
              <div className="card-poster">
                <img
                  src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+7"
                  alt="Poster do Filme 7"
                  className="poster-img"
                />
                <div className="card-overlay">
                  <span className="card-overlay-text">Ver Detalhes</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="card-titulo">Risadas no Fim do Mundo</h3>
                <span className="card-genero">Comédia</span>
                <div className="card-nota">
                  <span className="estrela">★</span>
                  <span className="nota-valor">8.5</span>
                </div>
              </div>
            </a>
          </article>

          <article className="filme-card" id="card-filme-8">
            <a href="resenha.html" className="card-link">
              <div className="card-poster">
                <img
                  src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+8"
                  alt="Poster do Filme 8"
                  className="poster-img"
                />
                <div className="card-overlay">
                  <span className="card-overlay-text">Ver Detalhes</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="card-titulo">Gritos na Escuridão</h3>
                <span className="card-genero">Horror</span>
                <div className="card-nota">
                  <span className="estrela">★</span>
                  <span className="nota-valor">8.2</span>
                </div>
              </div>
            </a>
          </article>

          <article className="filme-card" id="card-filme-9">
            <a href="resenha.html" className="card-link">
              <div className="card-poster">
                <img
                  src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+9"
                  alt="Poster do Filme 9"
                  className="poster-img"
                />
                <div className="card-overlay">
                  <span className="card-overlay-text">Ver Detalhes</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="card-titulo">Mundo Paralelo</h3>
                <span className="card-genero">Animação</span>
                <div className="card-nota">
                  <span className="estrela">★</span>
                  <span className="nota-valor">8.0</span>
                </div>
              </div>
            </a>
          </article>

          <article className="filme-card" id="card-filme-10">
            <a href="resenha.html" className="card-link">
              <div className="card-poster">
                <img
                  src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+10"
                  alt="Poster do Filme 10"
                  className="poster-img"
                />
                <div className="card-overlay">
                  <span className="card-overlay-text">Ver Detalhes</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="card-titulo">O Preço da Glória</h3>
                <span className="card-genero">Drama</span>
                <div className="card-nota">
                  <span className="estrela">★</span>
                  <span className="nota-valor">7.8</span>
                </div>
              </div>
            </a>
          </article>

          <article className="filme-card" id="card-filme-11">
            <a href="resenha.html" className="card-link">
              <div className="card-poster">
                <img
                  src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+11"
                  alt="Poster do Filme 11"
                  className="poster-img"
                />
                <div className="card-overlay">
                  <span className="card-overlay-text">Ver Detalhes</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="card-titulo">Velocidade Máxima</h3>
                <span className="card-genero">Ação</span>
                <div className="card-nota">
                  <span className="estrela">★</span>
                  <span className="nota-valor">7.6</span>
                </div>
              </div>
            </a>
          </article>

          <article className="filme-card" id="card-filme-12">
            <a href="resenha.html" className="card-link">
              <div className="card-poster">
                <img
                  src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+12"
                  alt="Poster do Filme 12"
                  className="poster-img"
                />
                <div className="card-overlay">
                  <span className="card-overlay-text">Ver Detalhes</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="card-titulo">Destinos Cruzados</h3>
                <span className="card-genero">Suspense</span>
                <div className="card-nota">
                  <span className="estrela">★</span>
                  <span className="nota-valor">7.4</span>
                </div>
              </div>
            </a>
          </article>
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

export default App;
