import {Link} from "react-router-dom";
import "../css/index.css";

function Filmes(props) {
    return (
        <article className="filme-card" id="card-filme-8">
            <Link to="/resenha" className="card-link">
                <div className="card-poster">
                    <img
                        src={`${props.img}`}
                        alt={`Poster do Filme ${props.titulo}`}
                        className="poster-img"
                    />
                    <div className="card-overlay">
                        <span className="card-overlay-text">Ver Detalhes</span>
                    </div>
                </div>
                <div className="card-info">
                    <h3 className="card-titulo">{props.titulo}</h3>
                    <span className="card-genero">{props.genero}</span>
                    <div className="card-nota">
                        <span className="estrela">★</span>
                        <span className="nota-valor">{props.nota}</span>
                    </div>
                </div>
            </Link>
        </article>
    )
}

export default Filmes;