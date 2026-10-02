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
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
            >
                {nome}
                <svg
                    className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
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
            <div className={`dropdown-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}></div>

            <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                <li className="dropdown-mobile-header">
                    <span>{nome}</span>
                    <button className="dropdown-close-btn" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </li>
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