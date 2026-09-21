import "./css/index.css";
import "./css/listas.css";

function Lista() {
    return (
        <>
            <nav className="navbar" id="navbar">
                <div className="navbar-container">
                    <a href="frontend/index.html" className="navbar-logo" id="logo-link">
                        <span className="logo-text">CiNEPLANNER</span>
                    </a>
                    <ul className="navbar-links">
                        <li>
                            <a href="frontend/index.html" className="nav-link">
                                Início
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link">
                                Filmes
                            </a>
                        </li>
                        <li>
                            <a href="listas.html" className="nav-link active">
                                Listas
                            </a>
                        </li>
                        <li>
                            <a href="frontend/quiz.html" className="nav-link">
                                Quiz
                            </a>
                        </li>
                    </ul>
                    <div className="navbar-actions">
                        <a
                            href="frontend/registro.html"
                            className="btn-login"
                            id="btn-entrar"
                        >
                            Entrar
                        </a>
                    </div>
                </div>
            </nav>

            <main className="container">
                <section className="page-heading">
                    <h1>LISTAS</h1>

                    <div className="red-line"></div>
                    <p>Descubra, organize e encontre seus próximos filmes favoritos.</p>
                </section>

                <section className="movie-section">
                    <div className="section-heading">
                        <div>
                            <h2>Assistir mais tarde</h2>
                        </div>
                    </div>

                    <div className="carousel">
                        <div className="carousel-window">
                            <div className="carousel-track">
                                <article className="movie-card">
                                    <img
                                        src="./img/Deadpool_&_Wolverine_cartaz.jpg"
                                        alt="Deadpool e Wolverine"
                                    />

                                    <div className="movie-info">
                                        <h3>Deadpool & Wolverine</h3>
                                        <span>2024</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="./img/interestellar.jpg" alt="Interestelar" />

                                    <div className="movie-info">
                                        <h3>Interestelar</h3>
                                        <span>2014</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="./img/duna.jpg" alt="Duna" />

                                    <div className="movie-info">
                                        <h3>Duna - parte dois</h3>
                                        <span>2024</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="./img/batman.webp" alt="The Batman" />

                                    <div className="movie-info">
                                        <h3>The Batman</h3>
                                        <span>2022</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="./img/wonka.jpg" alt="Wonka" />

                                    <div className="movie-info">
                                        <h3>Wonka</h3>
                                        <span>2023</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="./img/avatar.jfif" alt="Avatar" />

                                    <div className="movie-info">
                                        <h3>Avatar</h3>
                                        <span>2009</span>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="movie-section">
                    <div className="section-heading">
                        <div>
                            <h2>Marvel</h2>

                            <p>Universo Cinematográfico Marvel em ordem cronológica.</p>
                        </div>
                    </div>

                    <div className="carousel">
                        <div className="carousel-window">
                            <div className="carousel-track">
                                <article className="movie-card">
                                    <img
                                        src="./img/capitao_america.webp"
                                        alt="Capitão América O Primeiro Vingador"
                                    />

                                    <div className="movie-info">
                                        <h3>Capitão América: O Primeiro Vingador</h3>
                                        <span>2011</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="./img/capita_marvel.jpeg" alt="Capitã Marvel" />

                                    <div className="movie-info">
                                        <h3>Capitã Marvel</h3>
                                        <span>2019</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="./img/homemdeferro.jpg" alt="Homem de Ferro" />

                                    <div className="movie-info">
                                        <h3>Homem de Ferro</h3>
                                        <span>2008</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img
                                        src="./img/homemdeferrodois.jfif"
                                        alt="Homem de Ferro 2"
                                    />

                                    <div className="movie-info">
                                        <h3>Homem de Ferro 2</h3>
                                        <span>2010</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="./img/incrivel_hulk.webp" alt="O Incrível Hulk" />

                                    <div className="movie-info">
                                        <h3>O Incrível Hulk</h3>
                                        <span>2008</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="./img/thor.jpg" alt="Thor" />

                                    <div className="movie-info">
                                        <h3>Thor</h3>
                                        <span>2011</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="./img/avengers.jpg" alt="Os Vingadores" />

                                    <div className="movie-info">
                                        <h3>Os Vingadores</h3>
                                        <span>2012</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img
                                        src="./img/thor_mundo_sombrio.jpg"
                                        alt="Thor Mundo Sombrio"
                                    />

                                    <div className="movie-info">
                                        <h3>Thor - Mundo Sombrio</h3>
                                        <span>2013</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img
                                        src="./img/iron-man-3-oficial-poster-sky-fall.jpg"
                                        alt="Homem de Ferro 3"
                                    />

                                    <div className="movie-info">
                                        <h3>Homem de Ferro 3</h3>
                                        <span>2013</span>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="movie-section">
                    <div className="section-heading">
                        <div>
                            <h2>Harry Potter</h2>

                            <p>A saga em ordem cronológica de lançamento.</p>
                        </div>
                    </div>

                    <div className="carousel">
                        <div className="carousel-window">
                            <div className="carousel-track">
                                <article className="movie-card">
                                    <img
                                        src="./img/Harry_Potter_and_the_Philosophers_Stone.jpg"
                                        alt="Harry Potter e a Pedra Filosofal"
                                    />

                                    <div className="movie-info">
                                        <h3>Harry Potter e a Pedra Filosofal</h3>
                                        <span>2001</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img
                                        src="./img/Harry_Potter_e_a_Camara_Secreta.webp"
                                        alt="Harry Potter e a Câmara Secreta"
                                    />

                                    <div className="movie-info">
                                        <h3>Harry Potter e a Câmara Secreta</h3>
                                        <span>2002</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img
                                        src="./img/Prisioneiro_de_askaban.webp"
                                        alt="Harry Potter e o Prisioneiro de Azkaban"
                                    />

                                    <div className="movie-info">
                                        <h3>Harry Potter e o Prisioneiro de Azkaban</h3>
                                        <span>2004</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img
                                        src="./img/goblet_of_fire.jpg"
                                        alt="Harry Potter e o Cálice de Fogo"
                                    />

                                    <div className="movie-info">
                                        <h3>Harry Potter e o Cálice de Fogo</h3>
                                        <span>2005</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img
                                        src="./img/Harry_Potter_and_the_Order_of_the_Phoenix_.jpg"
                                        alt="Harry Potter e a Ordem da Fênix"
                                    />

                                    <div className="movie-info">
                                        <h3>Harry Potter e a Ordem da Fênix</h3>
                                        <span>2007</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img
                                        src="./img/enigma-do-principe.jpg"
                                        alt="Harry Potter e o Enigma do Príncipe"
                                    />

                                    <div className="movie-info">
                                        <h3>Harry Potter e o Enigma do Príncipe</h3>
                                        <span>2009</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img
                                        src="./img/reliquias.jpg"
                                        alt="Harry Potter e as Relíquias da Morte Parte 1"
                                    />

                                    <div className="movie-info">
                                        <h3>Harry Potter e as Relíquias da Morte — Parte 1</h3>
                                        <span>2010</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img
                                        src="./img/reliquias_2.jpg"
                                        alt="Harry Potter e as Relíquias da Morte Parte 2"
                                    />

                                    <div className="movie-info">
                                        <h3>Harry Potter e as Relíquias da Morte — Parte 2</h3>
                                        <span>2011</span>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="movie-section">
                    <div className="section-heading">
                        <div>
                            <h2>Lançamentos</h2>

                            <p>Os filmes mais recentes para você conferir.</p>
                        </div>
                    </div>

                    <div className="carousel">
                        <div className="carousel-window">
                            <div className="carousel-track">
                                <article className="movie-card">
                                    <img
                                        src="./img/brand_new_day.jpg"
                                        alt="Homem-aranha um novo dia"
                                    />

                                    <div className="movie-info">
                                        <h3>Homem-aranha um Novo Dia</h3>
                                        <span>2026</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="./img/devoradores.jpg" />

                                    <div className="movie-info">
                                        <h3>Devoradores de Estrelas</h3>
                                        <span>2026</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="./img/the_devil.avif" />

                                    <div className="movie-info">
                                        <h3>O Diabo Veste Prada 2</h3>
                                        <span>2026</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="./img/cartazdiad-divulgacao.jpg" alt="Dia D" />

                                    <div className="movie-info">
                                        <h3>Dia D</h3>
                                        <span>2026</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="./img/toy_story.webp" alt="Toy Story" />

                                    <div className="movie-info">
                                        <h3>Toy Story 5</h3>
                                        <span>2026</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="img/moana.jfif" alt="Moana" />

                                    <div className="movie-info">
                                        <h3>Moana</h3>
                                        <span>2026</span>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="movie-section">
                    <div className="section-heading">
                        <div>
                            <h2>Filmes avaliados</h2>

                            <p>Filmes que receberam suas avaliações.</p>
                        </div>
                    </div>

                    <div className="carousel">
                        <div className="carousel-window">
                            <div className="carousel-track">
                                <article className="movie-card">
                                    <img src="./img/um_sonho.png" alt="Um Sonho de Liberdade" />

                                    <div className="movie-info">
                                        <h3>Um Sonho de Liberdade</h3>
                                        <span>⭐ 9.3</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img
                                        src="./img/o_poderoso_chefao.png"
                                        alt="O Poderoso Chefão"
                                    />

                                    <div className="movie-info">
                                        <h3>O Poderoso Chefão</h3>
                                        <span>⭐ 9.2</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img src="./img/forrestgump.jpg" alt="Forrest Gump" />

                                    <div className="movie-info">
                                        <h3>Forrest Gump</h3>
                                        <span>⭐ 8.8</span>
                                    </div>
                                </article>

                                <article className="movie-card">
                                    <img
                                        src="./img/o_lar.jpg"
                                        alt="O Lar das Crianças Peculiares"
                                    />

                                    <div className="movie-info">
                                        <h3>O Lar das Crianças Peculiares</h3>
                                        <span>⭐ 9.7</span>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <div className="footer-logo">
                    CiNE<span>PLANNER</span>
                </div>

                <p>© 2026 CiNEPLANNER. Todos os direitos reservados.</p>
            </footer>
        </>
    );
}

export default Lista;
