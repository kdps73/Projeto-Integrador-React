import "./css/index.css";
import "./css/quiz.css";

function Quiz() {
    return (
        <>
            <nav className="navbar" id="navbar">
                <div className="navbar-container">
                    <a href="index.html" className="navbar-logo" id="logo-link">
                        <span className="logo-text">CiNEPLANNER</span>
                    </a>
                    <ul className="navbar-links">
                        <li>
                            <a href="index.html" className="nav-link">
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
                            <a href="quiz.html" className="nav-link active">
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

            <header className="quiz-hero" id="quiz-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="quiz-title">Quiz de Cinema</h1>
                    <p className="quiz-subtitle">
                        Teste seus conhecimentos sobre o mundo do cinema e ganhe XP!
                    </p>
                    <div className="xp-badge">
                        <span className="xp-icon">⭐</span>
                        <span className="xp-text">
                            Ganhe até <strong>150 XP</strong> por dia
                        </span>
                    </div>
                </div>
            </header>

            <section className="genre-selection" id="generos-quiz">
                <div className="section-container">
                    <div className="section-header-quiz">
                        <h2 className="section-title-quiz">Escolha o Gênero</h2>
                        <span className="section-subtitle-quiz">
                            Selecione um gênero de filme para começar o quiz
                        </span>
                    </div>

                    <div className="genre-grid">
                        <a href="#quiz-acao" className="genre-card" id="genre-acao">
                            <div className="genre-card-image">
                                <img
                                    src="../img/heroisacao.jpg"
                                    style={{ width: "100%", height: "140%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="genre-card-info">
                                <h3>Ação</h3>
                                <span className="genre-questions">5 perguntas</span>
                            </div>
                        </a>

                        <a href="#quiz-terror" className="genre-card" id="genre-terror">
                            <div className="genre-card-image">
                                <img
                                    src="../img/terror.jpg"
                                    alt="Terror"
                                    style={{ width: "100%", height: "120%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="genre-card-info">
                                <h3>Terror</h3>
                                <span className="genre-questions">5 perguntas</span>
                            </div>
                        </a>

                        <a href="#quiz-comedia" className="genre-card" id="genre-comedia">
                            <div className="genre-card-image">
                                <img
                                    src="../img/images.jpg"
                                    alt="Comédia"
                                    style={{ width: "100%", height: "120%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="genre-card-info">
                                <h3>Comédia</h3>
                                <span className="genre-questions">5 perguntas</span>
                            </div>
                        </a>

                        <a href="#quiz-ficcao" className="genre-card" id="genre-ficcao">
                            <div className="genre-card-image">
                                <img
                                    src="../img/ficcaoo.jpg"
                                    alt="Ficção Científica"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="genre-card-info">
                                <h3>Ficção Científica</h3>
                                <span className="genre-questions">5 perguntas</span>
                            </div>
                        </a>

                        <a href="#quiz-romance" className="genre-card" id="genre-romance">
                            <div className="genre-card-image">
                                <img
                                    src="../img/ddac761e00aff300ff0083f1e50d8505e11897aea8f74b2f1acdcfd303bfb1fb.-ri-.webp"
                                    alt="Romance"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="genre-card-info">
                                <h3>Romance</h3>
                                <span className="genre-questions">5 perguntas</span>
                            </div>
                        </a>

                        <a href="#quiz-aventura" className="genre-card" id="genre-aventura">
                            <div className="genre-card-image">
                                <img
                                    src="../img/aventura.jpg"
                                    alt="Aventura"
                                    style={{ width: "100%", height: "140%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="genre-card-info">
                                <h3>Aventura</h3>
                                <span className="genre-questions">5 perguntas</span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <section className="quiz-section" id="quiz-acao">
                <div className="section-container">
                    <div className="quiz-header">
                        <h2 className="quiz-genre-title">🎬 Quiz de Ação</h2>
                        <div className="quiz-xp-counter">
                            <span className="xp-icon-small">⭐</span>
                            <span>+10 XP por acerto</span>
                        </div>
                    </div>
                    <div className="quiz-carousel-wrapper">
                        <div className="quiz-card" id="acao-q1">
                            <div className="card-progress">Pergunta 1 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/spider-man.webp"
                                    alt="Homem-Aranha"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Quem interpreta o Homem-Aranha na trilogia mais recente da
                                    Marvel?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="acao-q1" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Andrew Garfield</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="acao-q1" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Tobey Maguire</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="acao-q1" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Tom Holland</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="acao-q1" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Jake Gyllenhaal</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <span className="btn-prev btn-disabled">‹ Anterior</span>
                                <a href="#acao-q2" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="acao-q2">
                            <div className="card-progress">Pergunta 2 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/os-vingadores.webp"
                                    alt="Vingadores"
                                    style={{ width: "100%", height: "170%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Qual é o nome real do Homem de Ferro?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="acao-q2" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Bruce Wayne</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="acao-q2" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Tony Stark</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="acao-q2" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Steve Rogers</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="acao-q2" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Peter Parker</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#acao-q1" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#acao-q3" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="acao-q3">
                            <div className="card-progress">Pergunta 3 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/batman_cavaleiro_das_trevas_capa.jpg"
                                    alt="Batman"
                                    style={{ width: "100%", height: "140%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Quem dirigiu "O Cavaleiro das Trevas" (2008)?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="acao-q3" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Zack Snyder</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="acao-q3" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Christopher Nolan</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="acao-q3" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Tim Burton</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="acao-q3" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Matt Reeves</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#acao-q2" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#acao-q4" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="acao-q4">
                            <div className="card-progress">Pergunta 4 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/matri.jpg"
                                    alt="Matrix"
                                    style={{ width: "100%", height: "160%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Qual a cor da pílula que Neo escolhe em Matrix?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="acao-q4" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Azul</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="acao-q4" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Verde</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="acao-q4" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Vermelha</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="acao-q4" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Amarela</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#acao-q3" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#acao-q5" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="acao-q5">
                            <div className="card-progress">Pergunta 5 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/velozes-e-furiosos-recap-todos-filmes-da-franquia-f1847cd502e05a.jpg"
                                    alt="Velozes e Furiosos"
                                    style={{ width: "100%", height: "130%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Qual ator interpreta Dominic Toretto em "Velozes e Furiosos"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="acao-q5" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Dwayne Johnson</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="acao-q5" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Vin Diesel</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="acao-q5" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Jason Statham</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="acao-q5" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Paul Walker</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#acao-q4" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#resultado" className="btn-finish">
                                    Finalizar Quiz ✓
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="quiz-section" id="quiz-terror">
                <div className="section-container">
                    <div className="quiz-header">
                        <h2 className="quiz-genre-title">👻 Quiz de Terror</h2>
                        <div className="quiz-xp-counter">
                            <span className="xp-icon-small">⭐</span>
                            <span>+10 XP por acerto</span>
                        </div>
                    </div>
                    <div className="quiz-carousel-wrapper">
                        <div className="quiz-card" id="terror-q1">
                            <div className="card-progress">Pergunta 1 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/twins-burns.webp"
                                    alt="O Iluminado"
                                    style={{ width: "100%", height: "170%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Quem dirigiu o clássico "O Iluminado"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="terror-q1" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Steven Spielberg</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="terror-q1" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Stanley Kubrick</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="terror-q1" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Alfred Hitchcock</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="terror-q1" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">John Carpenter</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <span className="btn-prev btn-disabled">‹ Anterior</span>
                                <a href="#terror-q2" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="terror-q2">
                            <div className="card-progress">Pergunta 2 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/panico.jpg"
                                    alt="Pânico"
                                    style={{ width: "100%", height: "130%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Qual o nome do assassino mascarado na franquia "Pânico"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="terror-q2" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Jason Voorhees</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="terror-q2" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Michael Myers</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="terror-q2" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Ghostface</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="terror-q2" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Freddy Krueger</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#terror-q1" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#terror-q3" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="terror-q3">
                            <div className="card-progress">Pergunta 3 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/it.jpg"
                                    alt="It"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Qual é a forma favorita da criatura em "It - A Coisa"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="terror-q3" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Lobisomem</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="terror-q3" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Palhaço Pennywise</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="terror-q3" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Vampiro</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="terror-q3" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Fantasma</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#terror-q2" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#terror-q4" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="terror-q4">
                            <div className="card-progress">Pergunta 4 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/exorcista.jpg"
                                    alt="O Exorcista"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Qual é o nome da menina possuída em "O Exorcista"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="terror-q4" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Regan MacNeil</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="terror-q4" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Carol Anne</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="terror-q4" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Carrie White</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="terror-q4" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Rosemary</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#terror-q3" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#terror-q5" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="terror-q5">
                            <div className="card-progress">Pergunta 5 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/invocaco.jpg"
                                    alt="Invocação do Mal"
                                    style={{ width: "100%", height: "140%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Quais são os nomes dos investigadores paranormais reais de
                                    "Invocação do Mal"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="terror-q5" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Mulder e Scully</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="terror-q5" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Ed e Lorraine Warren</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="terror-q5" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Sam e Dean Winchester</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="terror-q5" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Peter e Ray</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#terror-q4" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#resultado" className="btn-finish">
                                    Finalizar Quiz ✓
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="quiz-section" id="quiz-comedia">
                <div className="section-container">
                    <div className="quiz-header">
                        <h2 className="quiz-genre-title">😂 Quiz de Comédia</h2>
                        <div className="quiz-xp-counter">
                            <span className="xp-icon-small">⭐</span>
                            <span>+10 XP por acerto</span>
                        </div>
                    </div>
                    <div className="quiz-carousel-wrapper">
                        <div className="quiz-card" id="comedia-q1">
                            <div className="card-progress">Pergunta 1 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/sebeberncase.jpg"
                                    alt="Se Beber Nao Case"
                                    style={{ width: "100%", height: "140%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Para onde os amigos viajam em "Se Beber, Não Case!"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q1" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Miami</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q1" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Nova York</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q1" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Las Vegas</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q1" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Los Angeles</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <span className="btn-prev btn-disabled">‹ Anterior</span>
                                <a href="#comedia-q2" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="comedia-q2">
                            <div className="card-progress">Pergunta 2 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/meninas-malvadas_7350.jpeg"
                                    alt="Meninas Malvadas"
                                    style={{ width: "100%", height: "140%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Qual cor as Plásticas usam às quartas-feiras em "Meninas
                                    Malvadas"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q2" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Azul</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q2" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Preto</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q2" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Branco</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q2" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Rosa</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#comedia-q1" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#comedia-q3" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="comedia-q3">
                            <div className="card-progress">Pergunta 3 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/asbranquelasjpg.jpg"
                                    alt="As Branquelas"
                                    style={{ width: "100%", height: "130%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Quais irmãos interpretam as protagonistas de "As Branquelas"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q3" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Irmãos Coen</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q3" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Irmãos Wayans</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q3" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Irmãos Russo</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q3" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Irmãos Marx</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#comedia-q2" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#comedia-q4" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="comedia-q4">
                            <div className="card-progress">Pergunta 4 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/superbad,jpg.jpg"
                                    alt="Superbad"
                                    style={{ width: "100%", height: "120%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Qual o nome falso na identidade de Fogell em "Superbad"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q4" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">McLovin</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q4" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">McDreamy</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q4" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">McFly</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q4" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">McGregor</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#comedia-q3" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#comedia-q5" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="comedia-q5">
                            <div className="card-progress">Pergunta 5 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/schoolrockjpg.jpg"
                                    alt="Escola de Rock"
                                    style={{ width: "100%", height: "130%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Quem é o ator principal de "Escola de Rock"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q5" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Adam Sandler</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q5" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Jim Carrey</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q5" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Jack Black</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="comedia-q5" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Will Ferrell</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#comedia-q4" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#resultado" className="btn-finish">
                                    Finalizar Quiz ✓
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="quiz-section" id="quiz-ficcao">
                <div className="section-container">
                    <div className="quiz-header">
                        <h2 className="quiz-genre-title">🚀 Quiz de Ficção Científica</h2>
                        <div className="quiz-xp-counter">
                            <span className="xp-icon-small">⭐</span>
                            <span>+10 XP por acerto</span>
                        </div>
                    </div>
                    <div className="quiz-carousel-wrapper">
                        <div className="quiz-card" id="ficcao-q1">
                            <div className="card-progress">Pergunta 1 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/devoltaparaofuturo.jpg"
                                    alt="De Volta Para o Futuro"
                                    style={{ width: "100%", height: "150%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Qual carro é usado como máquina do tempo em "De Volta para o
                                    Futuro"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q1" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Ferrari</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q1" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">DeLorean</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q1" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Mustang</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q1" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Camaro</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <span className="btn-prev btn-disabled">‹ Anterior</span>
                                <a href="#ficcao-q2" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="ficcao-q2">
                            <div className="card-progress">Pergunta 2 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/interestelarjpg.jpg"
                                    alt="Interestelar"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">Quem dirigiu "Interestelar"?</h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q2" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Christopher Nolan</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q2" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Ridley Scott</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q2" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">James Cameron</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q2" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Steven Spielberg</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#ficcao-q1" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#ficcao-q3" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="ficcao-q3">
                            <div className="card-progress">Pergunta 3 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/bladerunner.jpg"
                                    alt="Blade Runner"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Como são chamados os androides em "Blade Runner"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q3" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Cylons</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q3" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Replicantes</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q3" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Sintéticos</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q3" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Terminators</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#ficcao-q2" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#ficcao-q4" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="ficcao-q4">
                            <div className="card-progress">Pergunta 4 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/avatar.webp"
                                    alt="Avatar"
                                    style={{ width: "100%", height: "130%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Qual o nome do planeta (ou lua) habitado pelos Na'vi em
                                    "Avatar"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q4" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Tatooine</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q4" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Pandora</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q4" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Krypton</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q4" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Arrakis</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#ficcao-q3" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#ficcao-q5" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="ficcao-q5">
                            <div className="card-progress">Pergunta 5 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/imagem-destacada-duna-2-zendaya.jpg"
                                    alt="Duna"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Qual é o recurso mais valioso do universo em "Duna"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q5" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Água</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q5" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Ouro</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q5" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">A Especiaria (Melange)</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="ficcao-q5" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Vibranium</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#ficcao-q4" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#resultado" className="btn-finish">
                                    Finalizar Quiz ✓
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="quiz-section" id="quiz-romance">
                <div className="section-container">
                    <div className="quiz-header">
                        <h2 className="quiz-genre-title">❤️ Quiz de Romance</h2>
                        <div className="quiz-xp-counter">
                            <span className="xp-icon-small">⭐</span>
                            <span>+10 XP por acerto</span>
                        </div>
                    </div>
                    <div className="quiz-carousel-wrapper">
                        <div className="quiz-card" id="romance-q1">
                            <div className="card-progress">Pergunta 1 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/titanic-43.jpg"
                                    alt="Titanic"
                                    style={{ width: "100%", height: "170%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Quais são os nomes dos protagonistas de "Titanic"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="romance-q1" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Romeo e Julieta</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="romance-q1" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Jack e Rose</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="romance-q1" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Noah e Allie</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="romance-q1" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Tony e Maria</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <span className="btn-prev btn-disabled">‹ Anterior</span>
                                <a href="#romance-q2" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="romance-q2">
                            <div className="card-progress">Pergunta 2 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/diario_de-uma-paixao.webp"
                                    alt="Diario de Uma Paixao"
                                    style={{ width: "100%", height: "180%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Quem escreveu o livro no qual "Diário de uma Paixão" se
                                    baseia?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="romance-q2" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Stephen King</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="romance-q2" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Nicholas Sparks</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="romance-q2" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">John Green</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="romance-q2" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Jojo Moyes</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#romance-q1" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#romance-q3" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="romance-q3">
                            <div className="card-progress">Pergunta 3 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/ddac761e00aff300ff0083f1e50d8505e11897aea8f74b2f1acdcfd303bfb1fb.-ri-.webp"
                                    alt="Orgulho e Preconceito"
                                    style={{ width: "100%", height: "150%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Quem interpreta Elizabeth Bennet no filme de 2005?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="romance-q3" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Emma Watson</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="romance-q3" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Anne Hathaway</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="romance-q3" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Keira Knightley</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="romance-q3" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Natalie Portman</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#romance-q2" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#romance-q4" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="romance-q4">
                            <div className="card-progress">Pergunta 4 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/lalaland.jpg"
                                    alt="La La Land"
                                    style={{ width: "100%", height: "170%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Quais atores protagonizam o musical "La La Land"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="romance-q4" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">
                                            Ryan Reynolds e Blake Lively
                                        </span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="romance-q4" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Ryan Gosling e Emma Stone</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="romance-q4" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Bradley Cooper e Lady Gaga</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="romance-q4" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Zac Efron e Zendaya</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#romance-q3" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#romance-q5" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="romance-q5">
                            <div className="card-progress">Pergunta 5 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/comoeueraantesdevc.jpg"
                                    alt="Como Eu Era Antes de Voce"
                                    style={{ width: "100%", height: "190%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Qual atriz de Game of Thrones protagoniza "Como Eu Era Antes
                                    de Você"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="romance-q5" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Sophie Turner</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="romance-q5" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Emilia Clarke</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="romance-q5" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Maisie Williams</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="romance-q5" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Lena Headey</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#romance-q4" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#resultado" className="btn-finish">
                                    Finalizar Quiz ✓
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="quiz-section" id="quiz-aventura">
                <div className="section-container">
                    <div className="quiz-header">
                        <h2 className="quiz-genre-title">🗺️ Quiz de Aventura</h2>
                        <div className="quiz-xp-counter">
                            <span className="xp-icon-small">⭐</span>
                            <span>+10 XP por acerto</span>
                        </div>
                    </div>
                    <div className="quiz-carousel-wrapper">
                        <div className="quiz-card" id="aventura-q1">
                            <div className="card-progress">Pergunta 1 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/senhordosaneis.jpg"
                                    alt="Senhor dos Aneis"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Quem é o portador do Um Anel em "O Senhor dos Anéis"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q1" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Sam</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q1" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Aragorn</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q1" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Gandalf</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q1" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Frodo</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <span className="btn-prev btn-disabled">‹ Anterior</span>
                                <a href="#aventura-q2" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="aventura-q2">
                            <div className="card-progress">Pergunta 2 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/indiana.jpg"
                                    alt="Indiana Jones"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Qual é a profissão de Indiana Jones?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q2" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Paleontólogo</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q2" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Arqueólogo</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q2" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Historiador</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q2" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Biólogo</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#aventura-q1" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#aventura-q3" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="aventura-q3">
                            <div className="card-progress">Pergunta 3 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/jurassicpark.jpg"
                                    alt="Jurassic Park"
                                    style={{ width: "100%", height: "190%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Onde fica localizado o "Jurassic Park"?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q3" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Isla Nublar</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q3" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Havaí</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q3" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Madagascar</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q3" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Galápagos</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#aventura-q2" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#aventura-q4" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="aventura-q4">
                            <div className="card-progress">Pergunta 4 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/piratasdocaribe.jpg"
                                    alt="Piratas do Caribe"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Qual o nome do navio do Capitão Jack Sparrow?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q4" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Holandês Voador</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q4" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Vingança da Rainha Ana</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q4" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Pérola Negra</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q4" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Interceptor</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#aventura-q3" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#aventura-q5" className="btn-next">
                                    Próxima ›
                                </a>
                            </div>
                        </div>

                        <div className="quiz-card" id="aventura-q5">
                            <div className="card-progress">Pergunta 5 de 5</div>
                            <div className="card-image">
                                <img
                                    src="../img/harrypotter.jpg"
                                    alt="Harry Potter"
                                    style={{ width: "100%", height: "190%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-question">
                                    Qual a casa de Harry Potter em Hogwarts?
                                </h3>
                                <div className="card-alternatives">
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q5" value="a" />
                                        <span className="alt-marker">A</span>
                                        <span className="alt-text">Sonserina</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q5" value="b" />
                                        <span className="alt-marker">B</span>
                                        <span className="alt-text">Corvinal</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q5" value="c" />
                                        <span className="alt-marker">C</span>
                                        <span className="alt-text">Lufa-Lufa</span>
                                    </label>
                                    <label className="alternative">
                                        <input type="radio" name="aventura-q5" value="d" />
                                        <span className="alt-marker">D</span>
                                        <span className="alt-text">Grifinória</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-nav">
                                <a href="#aventura-q4" className="btn-prev">
                                    ‹ Anterior
                                </a>
                                <a href="#resultado" className="btn-finish">
                                    Finalizar Quiz ✓
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="quiz-result" id="resultado">
                <div className="section-container">
                    <div className="result-card">
                        <div className="result-icon">🏆</div>
                        <h2 className="result-title">Quiz Finalizado!</h2>
                        <p className="result-description">Parabéns por completar o quiz!</p>
                        <div className="xp-result">
                            <div className="xp-bar-container">
                                <div className="xp-bar-fill"></div>
                            </div>
                            <div className="xp-earned">
                                <span className="xp-icon">⭐</span>
                                <span className="xp-amount">+50 XP</span>
                            </div>
                        </div>
                        <div className="result-stats">
                            <div className="stat">
                                <span className="stat-number">5</span>
                                <span className="stat-label">Perguntas</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">10 XP</span>
                                <span className="stat-label">Por acerto</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">15</span>
                                <span className="stat-label">Diárias</span>
                            </div>
                        </div>
                        <a href="#generos-quiz" className="btn-replay">
                            Jogar Novamente
                        </a>
                    </div>
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

export default Quiz;
