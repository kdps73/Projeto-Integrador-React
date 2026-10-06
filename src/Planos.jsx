import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./components/Menu";
import "./css/index.css";
import "./css/resenha.css";
import "./css/planos.css";

function Planos() {
    const navigate = useNavigate();
    const [planoAtual, setPlanoAtual] = useState(() => {
        return localStorage.getItem("plano_usuario") || "Gratuito";
    });
    const [modalSucesso, setModalSucesso] = useState(null);

    useEffect(() => {
        const handlePlanoChange = () => {
            const planoSalvo = localStorage.getItem("plano_usuario") || "Gratuito";
            setPlanoAtual(planoSalvo);
        };
        window.addEventListener("planoChanged", handlePlanoChange);
        return () => window.removeEventListener("planoChanged", handlePlanoChange);
    }, []);

    const selecionarPlano = (nomePlano) => {
        if (planoAtual === nomePlano) return;

        localStorage.setItem("plano_usuario", nomePlano);
        setPlanoAtual(nomePlano);
        window.dispatchEvent(new Event("planoChanged"));
        setModalSucesso(nomePlano);
    };

    return (
        <div id="pagina-planos">
            <Menu />

            {/* BOTÃO VOLTAR REUTILIZADO DA RESENHA */}
            <button
                onClick={() => navigate(-1)}
                className="back-btn"
                aria-label="Voltar"
                title="Voltar"
            >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
            </button>

            <main className="planos-main container">
                <header className="planos-header">
                    <span className="planos-badge-topo">CINEPLANNER SUBSCRIPTIONS</span>
                    <h1 className="planos-titulo">Escolha o Plano Ideal para Você</h1>
                    <p className="planos-subtitulo">
                        Eleve sua experiência cinematográfica. Crie playlists ilimitadas, ganhe bônus de XP e destaque-se na comunidade!
                    </p>
                </header>

                <div className="planos-grid">
                    {/* CARD 1: PLANO GRATUITO */}
                    <div className={`plano-card ${planoAtual === "Gratuito" ? "ativo" : ""}`}>
                        {planoAtual === "Gratuito" && (
                            <div className="badge-plano-ativo">PLANO ATUAL</div>
                        )}
                        <div className="plano-card-header">
                            <div className="plano-icone icone-gratuito">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 12h8" />
                                </svg>
                            </div>
                            <h2 className="plano-nome">Plano Gratuito</h2>
                            <p className="plano-desc">O ponto de partida para todo apaixonado por cinema.</p>
                            <div className="plano-preco">
                                <span className="valor">R$ 0</span>
                                <span className="periodo">/ mês</span>
                            </div>
                        </div>

                        <ul className="plano-recursos">
                            <li>
                                <svg className="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Acesso para comentar em todos os filmes.</span>
                            </li>
                            <li>
                                <svg className="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Sistema de gamificação.</span>
                            </li>
                            <li>
                                <svg className="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Opção para criar até 3 playlists de filmes para serem apresentadas ao público.</span>
                            </li>
                        </ul>

                        <div className="plano-card-footer">
                            <button
                                className={`btn-plano ${planoAtual === "Gratuito" ? "btn-plano-atual" : "btn-plano-secundario"}`}
                                onClick={() => selecionarPlano("Gratuito")}
                                disabled={planoAtual === "Gratuito"}
                            >
                                {planoAtual === "Gratuito" ? "Plano Atual" : "Selecionar Gratuito"}
                            </button>
                        </div>
                    </div>

                    {/* CARD 2: PLANO INTERMEDIÁRIO */}
                    <div className={`plano-card destaque ${planoAtual === "Intermediário" ? "ativo" : ""}`}>
                        <div className="badge-destaque">MAIS POPULAR ⭐</div>
                        {planoAtual === "Intermediário" && (
                            <div className="badge-plano-ativo">PLANO ATUAL</div>
                        )}
                        <div className="plano-card-header">
                            <div className="plano-icone icone-intermediario">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            </div>
                            <h2 className="plano-nome">Plano Intermediário</h2>
                            <p className="plano-desc">Para quem quer mais playlists, velocidade de evolução e zero anúncios.</p>
                            <div className="plano-preco">
                                <span className="valor">R$ 14,90</span>
                                <span className="periodo">/ mês</span>
                            </div>
                        </div>

                        <ul className="plano-recursos">
                            <li>
                                <svg className="check-icon destaque-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Tudo o que tem no plano Gratuito</span>
                            </li>
                            <li>
                                <svg className="check-icon destaque-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Criar até 15 playlists</span>
                            </li>
                            <li>
                                <svg className="check-icon destaque-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Bônus de XP</span>
                            </li>
                            <li>
                                <svg className="check-icon destaque-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Sem anúncios</span>
                            </li>
                            <li>
                                <svg className="check-icon destaque-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Vantagem nos comentários</span>
                            </li>
                        </ul>

                        <div className="plano-card-footer">
                            <button
                                className={`btn-plano ${planoAtual === "Intermediário" ? "btn-plano-atual" : "btn-plano-primario"}`}
                                onClick={() => selecionarPlano("Intermediário")}
                                disabled={planoAtual === "Intermediário"}
                            >
                                {planoAtual === "Intermediário" ? "Plano Atual" : "Fazer Upgrade para Intermediário"}
                            </button>
                        </div>
                    </div>

                    {/* CARD 3: PLANO PRO */}
                    <div className={`plano-card pro ${planoAtual === "PRO" ? "ativo" : ""}`}>
                        <div className="badge-pro">VIP & RECOMPENSAS 👑</div>
                        {planoAtual === "PRO" && (
                            <div className="badge-plano-ativo">PLANO ATUAL</div>
                        )}
                        <div className="plano-card-header">
                            <div className="plano-icone icone-pro">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 3h12l4 6-10 12L2 9z" />
                                    <path d="M12 22V9" />
                                    <path d="M2 9h20" />
                                </svg>
                            </div>
                            <h2 className="plano-nome">Plano PRO</h2>
                            <p className="plano-desc">A experiência definitiva sem limites e cheia de itens exclusivos.</p>
                            <div className="plano-preco">
                                <span className="valor">R$ 29,90</span>
                                <span className="periodo">/ mês</span>
                            </div>
                        </div>

                        <ul className="plano-recursos">
                            <li>
                                <svg className="check-icon pro-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Itens exclusivos</span>
                            </li>
                            <li>
                                <svg className="check-icon pro-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Criação de playlists ilimitadas</span>
                            </li>
                            <li>
                                <svg className="check-icon pro-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Bônus XP</span>
                            </li>
                            <li>
                                <svg className="check-icon pro-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Sem anúncios</span>
                            </li>
                            <li>
                                <svg className="check-icon pro-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Vantagem nos comentários</span>
                            </li>
                            <li>
                                <svg className="check-icon pro-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Conquistas exclusivas</span>
                            </li>
                        </ul>

                        <div className="plano-card-footer">
                            <button
                                className={`btn-plano ${planoAtual === "PRO" ? "btn-plano-atual" : "btn-plano-pro"}`}
                                onClick={() => selecionarPlano("PRO")}
                                disabled={planoAtual === "PRO"}
                            >
                                {planoAtual === "PRO" ? "Plano Atual" : "Seja PRO Agora"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* MODAL DE CONFIRMAÇÃO DE ASSINATURA */}
            {modalSucesso && (
                <div className="modal-overlay-planos" onClick={() => setModalSucesso(null)}>
                    <div className="modal-content-planos" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-icone-sucesso">🎉</div>
                        <h2>Plano Alterado com Sucesso!</h2>
                        <p>Você agora possui o <strong>Plano {modalSucesso}</strong> ativado no CinePlanner.</p>
                        <div className="modal-acoes-planos">
                            <button className="btn-modal-concluir" onClick={() => setModalSucesso(null)}>
                                Continuar
                            </button>
                            <button className="btn-modal-perfil" onClick={() => navigate("/usuario")}>
                                Ir para Meu Perfil
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Planos;
