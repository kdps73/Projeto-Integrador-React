import "./css/index.css";
import "./css/usuario.css";

function Usuario() {
    return (
        <div>
            <nav className="navbar" id="navbar">
                <div className="navbar-container">
                    <a href="index.html" className="navbar-logo" id="logo-link">
                        <span className="logo-text">CiNEPLANNER</span>
                    </a>
                    <ul className="navbar-links">
                        <li><a href="index.html" className="nav-link active">Início</a></li>
                        <li><a href="#" className="nav-link">Filmes</a></li>
                        <li><a href="#" className="nav-link">Listas</a></li>
                        <li><a href="#" className="nav-link">Quiz</a></li>
                    </ul>
                    <div className="navbar-actions">
                        <a href="registro.html" className="btn-login" id="btn-entrar">Entrar</a>
                    </div>
                </div>
            </nav>



            <main className="container">


                <section className="xp-section">

                    <div className="xp-header">
                        <span>PROGRESSO</span>
                        <strong>LEVEL 50</strong>
                    </div>

                    <div className="xp-bar-container">

                        <div className="xp-fill"></div>

                    </div>

                </section>



                <section className="profile-card">

                    <div className="avatar-container">

                        <img className="hat-accessory" src="./img/hat-red-dead.png" alt="Chapéu" />

                        <div className="avatar-circle">

                            <img src="https://adaptcommunitynetwork.org/wp-content/uploads/2023/09/person-placeholder.jpg"
                                alt="Avatar do Usuário" className="avatar-img" />

                        </div>

                        <img className="accessory" src="./img/acessorio-red-dead.png" alt="Espada" />

                    </div>


                    <div className="user-info">

                        <span className="username-label">
                            USUÁRIO
                        </span>

                        <h1 className="username">
                            THEY_PRO_FILMES
                        </h1>

                        <div className="bio-box">

                            <input type="text" className="bio-text" placeholder="Escreva sua bio aqui..." />

                        </div>

                    </div>


                    <img className="pet-accessory" src="./img/pet-red-dead.png" alt="Mascote" />

                </section>



                <div className="divider"></div>


                <section className="movies-section">

                    <div className="section-header">

                        <h2>
                            FILMES FAVORITOS
                        </h2>

                        <span>
                            05 FILMES
                        </span>

                    </div>


                    <div className="movies-grid">

                        <article className="filme-card">
                            <a href="resenha.html" className="card-link">
                                <div className="card-poster">
                                    <img src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+1" alt="Poster do Filme 1"
                                        className="poster-img" />
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

                        <article className="filme-card">
                            <a href="resenha.html" className="card-link">
                                <div className="card-poster">
                                    <img src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+2" alt="Poster do Filme 2"
                                        className="poster-img" />
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

                        <article className="filme-card">
                            <a href="resenha.html" className="card-link">
                                <div className="card-poster">
                                    <img src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+3" alt="Poster do Filme 3"
                                        className="poster-img" />
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

                        <article className="filme-card">
                            <a href="resenha.html" className="card-link">
                                <div className="card-poster">
                                    <img src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+4" alt="Poster do Filme 4"
                                        className="poster-img" />
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

                        <article className="filme-card">
                            <a href="resenha.html" className="card-link">
                                <div className="card-poster">
                                    <img src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+5" alt="Poster do Filme 5"
                                        className="poster-img" />
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

                        <button className="btn-ver-mais">
                            VER MAIS
                        </button>
                    </div>

                </section>



                <section className="movies-section">

                    <div className="section-header">

                        <h2>
                            ASSISTIR MAIS TARDE
                        </h2>

                        <span>
                            05 FILMES
                        </span>

                    </div>


                    <div className="movies-grid">

                        <article className="filme-card">
                            <a href="resenha.html" className="card-link">
                                <div className="card-poster">
                                    <img src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+6" alt="Poster do Filme 6"
                                        className="poster-img" />
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

                        <article className="filme-card">
                            <a href="resenha.html" className="card-link">
                                <div className="card-poster">
                                    <img src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+7" alt="Poster do Filme 7"
                                        className="poster-img" />
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

                        <article className="filme-card">
                            <a href="resenha.html" className="card-link">
                                <div className="card-poster">
                                    <img src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+8" alt="Poster do Filme 8"
                                        className="poster-img" />
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

                        <article className="filme-card">
                            <a href="resenha.html" className="card-link">
                                <div className="card-poster">
                                    <img src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+9" alt="Poster do Filme 9"
                                        className="poster-img" />
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

                        <article className="filme-card">
                            <a href="resenha.html" className="card-link">
                                <div className="card-poster">
                                    <img src="https://placehold.co/300x450/1a1a1a/e50914?text=Filme+10" alt="Poster do Filme 10"
                                        className="poster-img" />
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

                        <button className="btn-ver-mais">
                            VER MAIS
                        </button>
                    </div>
                </section>
            </main>


        </div>
    );
}

export default Usuario;