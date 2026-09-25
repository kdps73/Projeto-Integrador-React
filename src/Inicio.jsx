import { Link } from "react-router-dom";
import "./css/index.css";
import Filmes from "./components/Filmes";

function Inicio() {
    return (
        <>
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
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
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
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
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
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
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
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
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

                    <Filmes/>
                    <Filmes/>
                    <Filmes/>
                    <Filmes/>
                    <Filmes/>
                    <Filmes/>
                    <Filmes/>
                    <Filmes/>
                    <Filmes/>
                    <Filmes/>
                    <Filmes/>
                    <Filmes/>
                    <Filmes/>
                    <Filmes/>
                    <Filmes/>
                    <Filmes/>
                    <Filmes/>

                </div>
            </section>
        </>
    );
}

export default Inicio;
