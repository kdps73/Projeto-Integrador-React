import { useState } from "react";
import "../css/index.css";

function Filtro({ nome, opcoes }) {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div 
            className="filtro-dropdown"
            onMouseLeave={() => setIsOpen(false)}
        >
            <button 
                className="filtro-btn"
                onMouseEnter={() => setIsOpen(true)}
                onClick={() => setIsOpen(!isOpen)}
            >
                {nome}
                <svg
                    className="dropdown-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
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
            <ul 
                className="dropdown-menu"
                style={{ 
                    display: isOpen ? 'flex' : 'none', 
                    opacity: isOpen ? 1 : 0, 
                    visibility: isOpen ? 'visible' : 'hidden',
                    pointerEvents: isOpen ? 'auto' : 'none',
                    flexDirection: 'column'
                }}
            >
                {opcoes.map((op, idx) => (
                    <li key={idx}>
                        <a 
                            href="#" 
                            className="dropdown-item" 
                            onClick={(e) => {
                                op.onClick(e);
                                setIsOpen(false);
                            }}
                        >
                            {op.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Filtro;