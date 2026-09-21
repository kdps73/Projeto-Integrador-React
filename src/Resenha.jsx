import "./css/App.css";
import "./css/resenha.css";

function Resenha() {
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
              <a href="#" className="nav-link active">
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

      <section className="filme-hero" id="filme-hero">
        <div className="filme-hero-inner">
          <div className="poster-col">
            <div className="poster-wrap">
              <img
                src="https://placehold.co/420x630/1a1a1a/e50914?text=Poster+do+Filme"
                alt="Poster do Filme"
                className="poster-img"
                id="poster-principal"
              />
            </div>
            <div className="poster-rating" id="poster-rating">
              <div className="stars-row">
                <input
                  type="radio"
                  name="avaliacao"
                  id="star5"
                  value="5"
                  className="star-input"
                />
                <label
                  htmlFor="star5"
                  className="star-label"
                  title="5 estrelas"
                >
                  ★
                </label>
                <input
                  type="radio"
                  name="avaliacao"
                  id="star4"
                  value="4"
                  className="star-input"
                />
                <label
                  htmlFor="star4"
                  className="star-label"
                  title="4 estrelas"
                >
                  ★
                </label>
                <input
                  type="radio"
                  name="avaliacao"
                  id="star3"
                  value="3"
                  className="star-input"
                />
                <label
                  htmlFor="star3"
                  className="star-label"
                  title="3 estrelas"
                >
                  ★
                </label>
                <input
                  type="radio"
                  name="avaliacao"
                  id="star2"
                  value="2"
                  className="star-input"
                />
                <label
                  htmlFor="star2"
                  className="star-label"
                  title="2 estrelas"
                >
                  ★
                </label>
                <input
                  type="radio"
                  name="avaliacao"
                  id="star1"
                  value="1"
                  className="star-input"
                />
                <label htmlFor="star1" className="star-label" title="1 estrela">
                  ★
                </label>
              </div>
              <div className="media-nota">
                <span className="estrela-media">★</span>
                <span className="nota-numero">9.1</span>
                <span className="nota-total">/ 10</span>
                <span className="nota-votos">(4.283 votos)</span>
              </div>
            </div>
          </div>

          <div className="info-col" id="info-col">
            <span className="filme-badge">Ficção Científica</span>
            <h1 className="filme-titulo">O Último Horizonte</h1>
            <div className="filme-meta">
              <span className="meta-item">2026</span>
              <span className="meta-sep">·</span>
              <span className="meta-item">2h 18min</span>
              <span className="meta-sep">·</span>
              <span className="meta-item">14+</span>
            </div>
            <p className="filme-sinopse">
              Em um futuro onde a humanidade atingiu os limites do cosmos
              conhecido, uma tripulação de cientistas embarca em uma missão
              suicida para atravessar um horizonte de eventos desconhecido. O
              que eles encontram do outro lado desafia toda a lógica da física e
              da percepção humana — e coloca em xeque a própria definição de
              existência. Uma odisseia épica sobre coragem, sacrifício e o peso
              das escolhas irreversíveis.
            </p>
            <div className="elenco-bloco">
              <h3 className="elenco-titulo">Elenco Principal</h3>
              <ul className="elenco-lista">
                <li className="elenco-item">
                  <img
                    src="https://placehold.co/56x56/2a2a2a/e50914?text=A"
                    alt="Ator 1"
                    className="elenco-foto"
                  />
                  <div className="elenco-nomes">
                    <span className="elenco-ator">Marcos Ferreira</span>
                    <span className="elenco-personagem">Dr. Elias Vaz</span>
                  </div>
                </li>
                <li className="elenco-item">
                  <img
                    src="https://placehold.co/56x56/2a2a2a/e50914?text=B"
                    alt="Ator 2"
                    className="elenco-foto"
                  />
                  <div className="elenco-nomes">
                    <span className="elenco-ator">Sofia Andrade</span>
                    <span className="elenco-personagem">Cmt. Lena Cruz</span>
                  </div>
                </li>
                <li className="elenco-item">
                  <img
                    src="https://placehold.co/56x56/2a2a2a/e50914?text=C"
                    alt="Ator 3"
                    className="elenco-foto"
                  />
                  <div className="elenco-nomes">
                    <span className="elenco-ator">Rafael Duarte</span>
                    <span className="elenco-personagem">Eng. Tomás Reys</span>
                  </div>
                </li>
                <li className="elenco-item">
                  <img
                    src="https://placehold.co/56x56/2a2a2a/e50914?text=D"
                    alt="Ator 4"
                    className="elenco-foto"
                  />
                  <div className="elenco-nomes">
                    <span className="elenco-ator">Isabela Nunes</span>
                    <span className="elenco-personagem">IA ARIA</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hero-fade-bottom"></div>
      </section>

      <section className="comentarios-section" id="comentarios">
        <div className="comentarios-fade-top"></div>

        <div className="comentarios-inner">
          <h2 className="comentarios-titulo">
            Comentários <span className="comentarios-count">(47)</span>
          </h2>

          <div className="comentario-wrapper" id="coment-wrapper-1">
            <input
              type="checkbox"
              id="toggle-coment-1"
              className="toggle-coment"
              aria-label="Expandir respostas"
            />

            <div className="comentario-card" id="coment-card-1">
              <div className="coment-header">
                <div className="coment-user">
                  <img
                    src="https://placehold.co/44x44/2a2a2a/e50914?text=U1"
                    alt="Foto de perfil"
                    className="user-avatar"
                  />
                  <div className="user-info">
                    <span className="user-nome">Lucas Mendes</span>
                    <span className="user-data">12 ago 2026</span>
                  </div>
                </div>
                <div className="coment-curtidas">
                  <input
                    type="checkbox"
                    id="curtir-1"
                    className="curtir-input"
                    aria-label="Curtir comentário"
                  />
                  <label
                    htmlFor="curtir-1"
                    className="curtir-btn"
                    id="curtir-btn-1"
                  >
                    <span className="icone-coracao">♡</span>
                    <span className="icone-coracao-cheio">♥</span>
                    <span className="curtidas-count">312</span>
                  </label>
                </div>
              </div>

              <p className="coment-texto">
                Simplesmente o melhor filme que assisti nos últimos anos. A
                direção de fotografia é impecável, e a trilha sonora te coloca
                dentro da nave. O final me deixou sem palavras por uns bons
                minutos. Definitivamente um dos grandes da ficção científica.
              </p>

              <div className="respostas-preview">
                <label htmlFor="toggle-coment-1" className="ver-respostas-btn">
                  <span className="preview-avatares">
                    <img
                      src="https://placehold.co/24x24/2a2a2a/e50914?text=R1"
                      alt=""
                      className="preview-avatar"
                    />
                    <img
                      src="https://placehold.co/24x24/2a2a2a/e50914?text=R2"
                      alt=""
                      className="preview-avatar"
                    />
                    <img
                      src="https://placehold.co/24x24/2a2a2a/e50914?text=R3"
                      alt=""
                      className="preview-avatar"
                    />
                  </span>
                  <span className="preview-texto">
                    3 respostas · Clique para expandir
                  </span>
                  <span className="expand-arrow">▾</span>
                </label>
              </div>

              <div className="respostas-expandidas" id="respostas-1">
                <label
                  htmlFor="toggle-coment-1"
                  className="btn-voltar-respostas"
                  title="Fechar respostas"
                >
                  <span className="collapse-arrow">▴</span>
                </label>

                <div className="resposta-item" id="resposta-1-1">
                  <div className="resposta-header">
                    <div className="coment-user">
                      <img
                        src="https://placehold.co/36x36/2a2a2a/e50914?text=R1"
                        alt="Foto"
                        className="user-avatar user-avatar--sm"
                      />
                      <span className="user-nome user-nome--sm">Ana Paula</span>
                    </div>
                    <div className="coment-curtidas">
                      <input
                        type="checkbox"
                        id="curtir-r1-1"
                        className="curtir-input"
                        aria-label="Curtir resposta"
                      />
                      <label
                        htmlFor="curtir-r1-1"
                        className="curtir-btn curtir-btn--sm"
                      >
                        <span className="icone-coracao">♡</span>
                        <span className="icone-coracao-cheio">♥</span>
                        <span className="curtidas-count">48</span>
                      </label>
                    </div>
                  </div>
                  <p className="coment-texto coment-texto--sm">
                    Concordo 100%! O terceiro ato então… me arrepiei todo!
                  </p>
                </div>

                <div className="resposta-item" id="resposta-1-2">
                  <div className="resposta-header">
                    <div className="coment-user">
                      <img
                        src="https://placehold.co/36x36/2a2a2a/e50914?text=R2"
                        alt="Foto"
                        className="user-avatar user-avatar--sm"
                      />
                      <span className="user-nome user-nome--sm">
                        Pedro Costa
                      </span>
                    </div>
                    <div className="coment-curtidas">
                      <input
                        type="checkbox"
                        id="curtir-r1-2"
                        className="curtir-input"
                        aria-label="Curtir resposta"
                      />
                      <label
                        htmlFor="curtir-r1-2"
                        className="curtir-btn curtir-btn--sm"
                      >
                        <span className="icone-coracao">♡</span>
                        <span className="icone-coracao-cheio">♥</span>
                        <span className="curtidas-count">21</span>
                      </label>
                    </div>
                  </div>
                  <p className="coment-texto coment-texto--sm">
                    A trilha sonora do Hans Schuler é absurda. Fica na cabeça
                    por dias.
                  </p>
                </div>

                <div className="resposta-item" id="resposta-1-3">
                  <div className="resposta-header">
                    <div className="coment-user">
                      <img
                        src="https://placehold.co/36x36/2a2a2a/e50914?text=R3"
                        alt="Foto"
                        className="user-avatar user-avatar--sm"
                      />
                      <span className="user-nome user-nome--sm">
                        Carla Souza
                      </span>
                    </div>
                    <div className="coment-curtidas">
                      <input
                        type="checkbox"
                        id="curtir-r1-3"
                        className="curtir-input"
                        aria-label="Curtir resposta"
                      />
                      <label
                        htmlFor="curtir-r1-3"
                        className="curtir-btn curtir-btn--sm"
                      >
                        <span className="icone-coracao">♡</span>
                        <span className="icone-coracao-cheio">♥</span>
                        <span className="curtidas-count">9</span>
                      </label>
                    </div>
                  </div>
                  <p className="coment-texto coment-texto--sm">
                    Assisti duas vezes e na segunda vez percebi detalhes que não
                    tinha visto antes. Genial!
                  </p>
                </div>

                <input
                  type="checkbox"
                  id="toggle-nova-resposta-1"
                  className="toggle-nova-resposta"
                  aria-label="Abrir campo de resposta"
                />
                <label
                  htmlFor="toggle-nova-resposta-1"
                  className="btn-nova-resposta"
                  id="btn-nova-resp-1"
                  title="Escrever uma resposta"
                >
                  ✏ Responder
                </label>
                <div className="nova-resposta-form" id="nova-resp-form-1">
                  <div className="nova-resp-inner">
                    <img
                      src="https://placehold.co/36x36/2a2a2a/e50914?text=Eu"
                      alt="Você"
                      className="user-avatar user-avatar--sm"
                    />
                    <textarea
                      className="nova-resp-textarea"
                      placeholder="Escreva sua resposta…"
                      rows="2"
                      id="textarea-resp-1"
                    ></textarea>
                    <div className="nova-resp-actions">
                      <label
                        htmlFor="toggle-nova-resposta-1"
                        className="btn-cancelar-resp"
                      >
                        Cancelar
                      </label>
                      <button
                        type="button"
                        className="btn-enviar-resp"
                        id="btn-enviar-resp-1"
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="comentario-wrapper" id="coment-wrapper-2">
            <input
              type="checkbox"
              id="toggle-coment-2"
              className="toggle-coment"
              aria-label="Expandir respostas"
            />
            <div className="comentario-card" id="coment-card-2">
              <div className="coment-header">
                <div className="coment-user">
                  <img
                    src="https://placehold.co/44x44/2a2a2a/e50914?text=U2"
                    alt="Foto de perfil"
                    className="user-avatar"
                  />
                  <div className="user-info">
                    <span className="user-nome">Fernanda Lima</span>
                    <span className="user-data">11 ago 2026</span>
                  </div>
                </div>
                <div className="coment-curtidas">
                  <input
                    type="checkbox"
                    id="curtir-2"
                    className="curtir-input"
                    aria-label="Curtir comentário"
                  />
                  <label htmlFor="curtir-2" className="curtir-btn">
                    <span className="icone-coracao">♡</span>
                    <span className="icone-coracao-cheio">♥</span>
                    <span className="curtidas-count">187</span>
                  </label>
                </div>
              </div>
              <p className="coment-texto">
                A atuação do Marcos Ferreira como Dr. Vaz é de longe a melhor da
                carreira dele. Tem uma cena específica perto do final que me fez
                chorar feio. Cinema de verdade.
              </p>
              <div className="respostas-preview">
                <label htmlFor="toggle-coment-2" className="ver-respostas-btn">
                  <span className="preview-avatares">
                    <img
                      src="https://placehold.co/24x24/2a2a2a/e50914?text=R1"
                      alt=""
                      className="preview-avatar"
                    />
                    <img
                      src="https://placehold.co/24x24/2a2a2a/e50914?text=R2"
                      alt=""
                      className="preview-avatar"
                    />
                  </span>
                  <span className="preview-texto">
                    2 respostas · Clique para expandir
                  </span>
                  <span className="expand-arrow">▾</span>
                </label>
              </div>
              <div className="respostas-expandidas" id="respostas-2">
                <label
                  htmlFor="toggle-coment-2"
                  className="btn-voltar-respostas"
                  title="Fechar respostas"
                >
                  <span className="collapse-arrow">▴</span>
                </label>
                <div className="resposta-item">
                  <div className="resposta-header">
                    <div className="coment-user">
                      <img
                        src="https://placehold.co/36x36/2a2a2a/e50914?text=R1"
                        alt="Foto"
                        className="user-avatar user-avatar--sm"
                      />
                      <span className="user-nome user-nome--sm">
                        Guilherme N.
                      </span>
                    </div>
                    <div className="coment-curtidas">
                      <input
                        type="checkbox"
                        id="curtir-r2-1"
                        className="curtir-input"
                        aria-label="Curtir resposta"
                      />
                      <label
                        htmlFor="curtir-r2-1"
                        className="curtir-btn curtir-btn--sm"
                      >
                        <span className="icone-coracao">♡</span>
                        <span className="icone-coracao-cheio">♥</span>
                        <span className="curtidas-count">33</span>
                      </label>
                    </div>
                  </div>
                  <p className="coment-texto coment-texto--sm">
                    Sim!! Aquela cena no módulo de hibernação… o silêncio que
                    ela deixa é devastador.
                  </p>
                </div>
                <div className="resposta-item">
                  <div className="resposta-header">
                    <div className="coment-user">
                      <img
                        src="https://placehold.co/36x36/2a2a2a/e50914?text=R2"
                        alt="Foto"
                        className="user-avatar user-avatar--sm"
                      />
                      <span className="user-nome user-nome--sm">
                        Mariana V.
                      </span>
                    </div>
                    <div className="coment-curtidas">
                      <input
                        type="checkbox"
                        id="curtir-r2-2"
                        className="curtir-input"
                        aria-label="Curtir resposta"
                      />
                      <label
                        htmlFor="curtir-r2-2"
                        className="curtir-btn curtir-btn--sm"
                      >
                        <span className="icone-coracao">♡</span>
                        <span className="icone-coracao-cheio">♥</span>
                        <span className="curtidas-count">17</span>
                      </label>
                    </div>
                  </div>
                  <p className="coment-texto coment-texto--sm">
                    Sofia Andrade também arrasa demais como comandante. Que
                    elenco!
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="toggle-nova-resposta-2"
                  className="toggle-nova-resposta"
                  aria-label="Abrir campo de resposta"
                />
                <label
                  htmlFor="toggle-nova-resposta-2"
                  className="btn-nova-resposta"
                  title="Escrever uma resposta"
                >
                  ✏ Responder
                </label>
                <div className="nova-resposta-form">
                  <div className="nova-resp-inner">
                    <img
                      src="https://placehold.co/36x36/2a2a2a/e50914?text=Eu"
                      alt="Você"
                      className="user-avatar user-avatar--sm"
                    />
                    <textarea
                      className="nova-resp-textarea"
                      placeholder="Escreva sua resposta…"
                      rows="2"
                    ></textarea>
                    <div className="nova-resp-actions">
                      <label
                        htmlFor="toggle-nova-resposta-2"
                        className="btn-cancelar-resp"
                      >
                        Cancelar
                      </label>
                      <button type="button" className="btn-enviar-resp">
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="comentario-wrapper" id="coment-wrapper-3">
            <input
              type="checkbox"
              id="toggle-coment-3"
              className="toggle-coment"
              aria-label="Expandir respostas"
            />
            <div className="comentario-card" id="coment-card-3">
              <div className="coment-header">
                <div className="coment-user">
                  <img
                    src="https://placehold.co/44x44/2a2a2a/e50914?text=U3"
                    alt="Foto de perfil"
                    className="user-avatar"
                  />
                  <div className="user-info">
                    <span className="user-nome">Roberto Alves</span>
                    <span className="user-data">10 ago 2026</span>
                  </div>
                </div>
                <div className="coment-curtidas">
                  <input
                    type="checkbox"
                    id="curtir-3"
                    className="curtir-input"
                    aria-label="Curtir comentário"
                  />
                  <label htmlFor="curtir-3" className="curtir-btn">
                    <span className="icone-coracao">♡</span>
                    <span className="icone-coracao-cheio">♥</span>
                    <span className="curtidas-count">94</span>
                  </label>
                </div>
              </div>
              <p className="coment-texto">
                Os efeitos visuais são de tirar o fôlego, mas o que me
                surpreendeu foi a profundidade do roteiro. Cada personagem tem
                um arco bem construído. Raramente vejo isso num blockbuster de
                FC.
              </p>
              <div className="respostas-preview">
                <label htmlFor="toggle-coment-3" className="ver-respostas-btn">
                  <span className="preview-avatares">
                    <img
                      src="https://placehold.co/24x24/2a2a2a/e50914?text=R1"
                      alt=""
                      className="preview-avatar"
                    />
                  </span>
                  <span className="preview-texto">
                    1 resposta · Clique para expandir
                  </span>
                  <span className="expand-arrow">▾</span>
                </label>
              </div>
              <div className="respostas-expandidas" id="respostas-3">
                <label
                  htmlFor="toggle-coment-3"
                  className="btn-voltar-respostas"
                  title="Fechar respostas"
                >
                  <span className="collapse-arrow">▴</span>
                </label>
                <div className="resposta-item">
                  <div className="resposta-header">
                    <div className="coment-user">
                      <img
                        src="https://placehold.co/36x36/2a2a2a/e50914?text=R1"
                        alt="Foto"
                        className="user-avatar user-avatar--sm"
                      />
                      <span className="user-nome user-nome--sm">Tiago M.</span>
                    </div>
                    <div className="coment-curtidas">
                      <input
                        type="checkbox"
                        id="curtir-r3-1"
                        className="curtir-input"
                        aria-label="Curtir resposta"
                      />
                      <label
                        htmlFor="curtir-r3-1"
                        className="curtir-btn curtir-btn--sm"
                      >
                        <span className="icone-coracao">♡</span>
                        <span className="icone-coracao-cheio">♥</span>
                        <span className="curtidas-count">12</span>
                      </label>
                    </div>
                  </div>
                  <p className="coment-texto coment-texto--sm">
                    Exatamente. Dá para usar em aula de roteiro como exemplo de
                    estrutura.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="toggle-nova-resposta-3"
                  className="toggle-nova-resposta"
                  aria-label="Abrir campo de resposta"
                />
                <label
                  htmlFor="toggle-nova-resposta-3"
                  className="btn-nova-resposta"
                  title="Escrever uma resposta"
                >
                  ✏ Responder
                </label>
                <div className="nova-resposta-form">
                  <div className="nova-resp-inner">
                    <img
                      src="https://placehold.co/36x36/2a2a2a/e50914?text=Eu"
                      alt="Você"
                      className="user-avatar user-avatar--sm"
                    />
                    <textarea
                      className="nova-resp-textarea"
                      placeholder="Escreva sua resposta…"
                      rows="2"
                    ></textarea>
                    <div className="nova-resp-actions">
                      <label
                        htmlFor="toggle-nova-resposta-3"
                        className="btn-cancelar-resp"
                      >
                        Cancelar
                      </label>
                      <button type="button" className="btn-enviar-resp">
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="novo-comentario" id="novo-comentario">
            <h3 className="novo-coment-titulo">Deixe seu comentário</h3>
            <div className="novo-coment-form">
              <img
                src="https://placehold.co/48x48/2a2a2a/e50914?text=Eu"
                alt="Você"
                className="user-avatar"
              />
              <div className="novo-coment-campo">
                <textarea
                  className="novo-coment-textarea"
                  id="novo-coment-textarea"
                  placeholder="O que você achou do filme? Compartilhe sua opinião…"
                  rows="4"
                ></textarea>
                <div className="novo-coment-actions">
                  <span className="coment-dica">
                    Seja respeitoso com outros cinéfilos.
                  </span>
                  <button
                    type="button"
                    className="btn-publicar"
                    id="btn-publicar"
                  >
                    Publicar
                  </button>
                </div>
              </div>
            </div>
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

export default Resenha;
