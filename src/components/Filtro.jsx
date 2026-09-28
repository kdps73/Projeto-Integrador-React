import { Link } from "react-router-dom"
import "../css/index.css"

function Filtro(props) {
    return (
        <div className="filtro-dropdown" id="filtro-genero">
            <button className="filtro-btn" id="btn-genero">
                {props.nome}
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
                {props.opcoes.map(i => <li><Link to="#" className="dropdown-item">{i}</Link></li>)}
            </ul>
        </div>
    )
}

export default Filtro