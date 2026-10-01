import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/index.css"; // Ensure styles are applied

function Carousel3D() {
    const [carouselFilmes, setCarouselFilmes] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    
    const API_KEY = '168817e9845280fe6d28f3a939f4bc67';
    const BASE_URL = 'https://api.themoviedb.org/3';

    useEffect(() => {
        async function fetchTrending() {
            try {
                const res = await fetch(`${BASE_URL}/trending/movie/week?language=pt-BR&api_key=${API_KEY}`);
                const data = await res.json();
                if (data.results) {
                    setCarouselFilmes(data.results.slice(0, 9));
                }
            } catch (err) {
                console.error("Erro ao carregar filmes para o carrossel 3D:", err);
            }
        }
        fetchTrending();
    }, []);

    useEffect(() => {
        if (carouselFilmes.length === 0 || isHovered) return;
        
        let animationFrameId;
        const speed = 0.0020; 

        const render = () => {
            setProgress(p => p + speed);
            animationFrameId = requestAnimationFrame(render);
        };
        animationFrameId = requestAnimationFrame(render);

        return () => cancelAnimationFrame(animationFrameId);
    }, [carouselFilmes, isHovered]);

    return (
        <div className="carousel-3d-wrapper">
            <div className="carousel-3d-track">
                {carouselFilmes.map((filme, index) => {
                    const N = carouselFilmes.length;
                    let offset = ((index - progress) % N + N * 1.5) % N - N / 2;
                    const absOffset = Math.abs(offset);
                    
                    const translateZ = 120 - absOffset * 130;
                    const translateX = offset * 210;
                    const rotateY = offset * -20; 
                    const scale = Math.max(1.15 - absOffset * 0.1, 0.5);
                    
                    const opacity = Math.max(1 - absOffset * 0.28, 0);

                    return (
                        <Link 
                            to={`/resenhas/${filme.id}`} 
                            key={filme.id}
                            className={`carousel-3d-card ${absOffset < 0.5 ? 'is-active' : ''}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{
                                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                                opacity: opacity,
                                zIndex: Math.round(10 - absOffset),
                                pointerEvents: opacity <= 0 ? 'none' : 'auto'
                            }}
                        >
                            <div className="card-image-wrapper">
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} 
                                    alt={filme.title} 
                                    className="poster-img"
                                />
                                <div className="card-glow"></div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Carousel3D;
