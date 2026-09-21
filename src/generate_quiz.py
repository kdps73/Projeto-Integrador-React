html_content = '''<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Quiz de filmes do CinePlanner - Teste seus conhecimentos sobre cinema e ganhe XP!">
    <title>CinePlanner – Quiz</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/quiz.css">
</head>
<body>

    <!-- ===== NAVBAR GLOBAL ===== -->
    <nav className="navbar" id="navbar">
        <div className="navbar-container">
            <a href="index.html" className="navbar-logo" id="logo-link">
                <span className="logo-text">CinePlanner</span>
            </a>
            <ul className="navbar-links">
                <li><a href="index.html" className="nav-link">Início</a></li>
                <li><a href="#" className="nav-link">Filmes</a></li>
                <li><a href="#" className="nav-link">Favoritos</a></li>
                <li><a href="quiz.html" className="nav-link active">Quiz</a></li>
            </ul>
            <div className="navbar-actions">
                <a href="registro.html" className="btn-login" id="btn-entrar">Entrar</a>
            </div>
        </div>
    </nav>

    <!-- ===== HERO / CABEÇALHO DO QUIZ ===== -->
    <header className="quiz-hero" id="quiz-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
            <h1 className="quiz-title">Quiz de Cinema</h1>
            <p className="quiz-subtitle">Teste seus conhecimentos sobre o mundo do cinema e ganhe XP!</p>
            <div className="xp-badge">
                <span className="xp-icon">⭐</span>
                <span className="xp-text">Ganhe até <strong>150 XP</strong> por dia</span>
            </div>
        </div>
    </header>

    <!-- ===== SELEÇÃO DE GÊNERO ===== -->
    <section className="genre-selection" id="generos-quiz">
        <div className="section-container">
            <div className="section-header-quiz">
                <h2 className="section-title-quiz">Escolha o Gênero</h2>
                <span className="section-subtitle-quiz">Selecione um gênero de filme para começar o quiz</span>
            </div>

            <div className="genre-grid">
                <!-- Gênero: Ação -->
                <a href="#quiz-acao" className="genre-card" id="genre-acao">
                    <div className="genre-card-image">
                        <img src="https://placehold.co/400x200/1a1a1a/e50914?text=Acao" alt="Ação" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div className="genre-card-info">
                        <h3>Ação</h3>
                        <span className="genre-questions">15 perguntas</span>
                    </div>
                </a>

                <!-- Gênero: Terror -->
                <a href="#quiz-terror" className="genre-card" id="genre-terror">
                    <div className="genre-card-image">
                        <img src="https://placehold.co/400x200/1a1a1a/e50914?text=Terror" alt="Terror" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div className="genre-card-info">
                        <h3>Terror</h3>
                        <span className="genre-questions">5 perguntas</span>
                    </div>
                </a>

                <!-- Gênero: Comédia -->
                <a href="#quiz-comedia" className="genre-card" id="genre-comedia">
                    <div className="genre-card-image">
                        <img src="https://placehold.co/400x200/1a1a1a/e50914?text=Comedia" alt="Comédia" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div className="genre-card-info">
                        <h3>Comédia</h3>
                        <span className="genre-questions">5 perguntas</span>
                    </div>
                </a>

                <!-- Gênero: Ficção Científica -->
                <a href="#quiz-ficcao" className="genre-card" id="genre-ficcao">
                    <div className="genre-card-image">
                        <img src="https://placehold.co/400x200/1a1a1a/e50914?text=Ficcao" alt="Ficção Científica" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div className="genre-card-info">
                        <h3>Ficção Científica</h3>
                        <span className="genre-questions">5 perguntas</span>
                    </div>
                </a>

                <!-- Gênero: Romance -->
                <a href="#quiz-romance" className="genre-card" id="genre-romance">
                    <div className="genre-card-image">
                        <img src="https://placehold.co/400x200/1a1a1a/e50914?text=Romance" alt="Romance" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div className="genre-card-info">
                        <h3>Romance</h3>
                        <span className="genre-questions">5 perguntas</span>
                    </div>
                </a>

                <!-- Gênero: Aventura -->
                <a href="#quiz-aventura" className="genre-card" id="genre-aventura">
                    <div className="genre-card-image">
                        <img src="https://placehold.co/400x200/1a1a1a/e50914?text=Aventura" alt="Aventura" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div className="genre-card-info">
                        <h3>Aventura</h3>
                        <span className="genre-questions">5 perguntas</span>
                    </div>
                </a>
            </div>
        </div>
    </section>
'''

def generate_section(genre_id, genre_name, emoji, questions):
    html = f'''
    <!-- ===== QUIZ - GÊNERO {genre_name.upper()} ===== -->
    <section className="quiz-section" id="quiz-{genre_id}">
        <div className="section-container">
            <div className="quiz-header">
                <h2 className="quiz-genre-title">{emoji} Quiz de {genre_name}</h2>
                <div className="quiz-xp-counter">
                    <span className="xp-icon-small">⭐</span>
                    <span>+10 XP por acerto</span>
                </div>
            </div>
            <div className="quiz-carousel-wrapper">
'''
    
    for i, q in enumerate(questions):
        q_num = i + 1
        total = len(questions)
        q_id = f'{genre_id}-q{q_num}'
        
        prev_link = f'href="#{genre_id}-q{q_num-1}"' if q_num > 1 else 'className="btn-prev btn-disabled"'
        prev_text = '‹ Anterior' if q_num > 1 else '‹ Anterior'
        prev_tag = f'<a {prev_link} className="btn-prev">{prev_text}</a>' if q_num > 1 else f'<span className="btn-prev btn-disabled">{prev_text}</span>'
        
        if q_num < total:
            next_tag = f'<a href="#{genre_id}-q{q_num+1}" className="btn-next">Próxima ›</a>'
        else:
            next_tag = f'<a href="#resultado" className="btn-finish">Finalizar Quiz ✓</a>'
            
        alts_html = ''
        labels = ['A', 'B', 'C', 'D']
        for j, alt in enumerate(q['alts']):
            alts_html += f'''
                            <label className="alternative">
                                <input type="radio" name="{q_id}" value="{labels[j].lower()}">
                                <span className="alt-marker">{labels[j]}</span>
                                <span className="alt-text">{alt}</span>
                            </label>'''

        html += f'''
                <!-- ===== PERGUNTA {q_num} ===== -->
                <div className="quiz-card" id="{q_id}">
                    <div className="card-progress">Pergunta {q_num} de {total}</div>
                    <div className="card-image">
                        <img src="{q['img']}" alt="{q['title']}" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div className="card-content">
                        <h3 className="card-question">{q['question']}</h3>
                        <div className="card-alternatives">{alts_html}
                        </div>
                    </div>
                    <div className="card-nav">
                        {prev_tag}
                        {next_tag}
                    </div>
                </div>'''
    
    html += '''
            </div>
        </div>
    </section>'''
    return html

acao_qs = [
    {'title': 'Homem-Aranha', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Homem-Aranha', 'question': 'Quem interpreta o Homem-Aranha na trilogia mais recente da Marvel?', 'alts': ['Andrew Garfield', 'Tobey Maguire', 'Tom Holland', 'Jake Gyllenhaal']},
    {'title': 'Vingadores', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Vingadores', 'question': 'Qual é o nome real do Homem de Ferro?', 'alts': ['Bruce Wayne', 'Tony Stark', 'Steve Rogers', 'Peter Parker']},
    {'title': 'Batman', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Batman', 'question': 'Quem dirigiu "O Cavaleiro das Trevas" (2008)?', 'alts': ['Zack Snyder', 'Christopher Nolan', 'Tim Burton', 'Matt Reeves']},
    {'title': 'Matrix', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Matrix', 'question': 'Qual a cor da pílula que Neo escolhe em Matrix?', 'alts': ['Azul', 'Verde', 'Vermelha', 'Amarela']},
    {'title': 'Velozes e Furiosos', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Velozes+e+Furiosos', 'question': 'Qual ator interpreta Dominic Toretto em "Velozes e Furiosos"?', 'alts': ['Dwayne Johnson', 'Vin Diesel', 'Jason Statham', 'Paul Walker']},
    {'title': 'John Wick', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=John+Wick', 'question': 'Qual ator interpreta John Wick?', 'alts': ['Keanu Reeves', 'Liam Neeson', 'Matt Damon', 'Tom Cruise']},
    {'title': 'Gladiador', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Gladiador', 'question': 'Em que época se passa o filme "Gladiador"?', 'alts': ['Grécia Antiga', 'Império Romano', 'Idade Média', 'Egito Antigo']},
    {'title': 'Missão Impossível', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Missao+Impossivel', 'question': 'Qual é o nome do personagem de Tom Cruise em "Missão Impossível"?', 'alts': ['James Bond', 'Jason Bourne', 'Ethan Hunt', 'Jack Reacher']},
    {'title': 'Duro de Matar', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Duro+de+Matar', 'question': 'Qual é o nome do protagonista de "Duro de Matar"?', 'alts': ['Martin Riggs', 'John McClane', 'Dutch', 'Harry Callahan']},
    {'title': 'Mad Max', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Mad+Max', 'question': 'Qual atriz interpreta Furiosa em "Mad Max: Estrada da Fúria"?', 'alts': ['Scarlett Johansson', 'Charlize Theron', 'Gal Gadot', 'Brie Larson']},
    {'title': 'Thor', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Thor', 'question': 'Qual é o nome do martelo de Thor?', 'alts': ['Stormbreaker', 'Excalibur', 'Mjolnir', 'Gungnir']},
    {'title': 'O Exterminador', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Exterminador', 'question': 'Qual a famosa frase do Exterminador do Futuro?', 'alts': ['"I\'ll be back"', '"Hasta la vista, baby"', '"May the force be with you"', '"Here\'s Johnny!"']},
    {'title': 'Pantera Negra', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Pantera+Negra', 'question': 'Qual é o nome do país fictício de "Pantera Negra"?', 'alts': ['Wakanda', 'Asgard', 'Themyscira', 'Latvéria']},
    {'title': 'Rocky', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Rocky', 'question': 'Quem interpreta Rocky Balboa?', 'alts': ['Arnold Schwarzenegger', 'Sylvester Stallone', 'Bruce Willis', 'Jean-Claude Van Damme']},
    {'title': 'Star Wars', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Star+Wars', 'question': 'Qual personagem diz "Eu sou seu pai" em Star Wars?', 'alts': ['Yoda', 'Obi-Wan Kenobi', 'Darth Vader', 'Han Solo']}
]

terror_qs = [
    {'title': 'O Iluminado', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=O+Iluminado', 'question': 'Quem dirigiu o clássico "O Iluminado"?', 'alts': ['Steven Spielberg', 'Stanley Kubrick', 'Alfred Hitchcock', 'John Carpenter']},
    {'title': 'Pânico', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Panico', 'question': 'Qual o nome do assassino mascarado na franquia "Pânico"?', 'alts': ['Jason Voorhees', 'Michael Myers', 'Ghostface', 'Freddy Krueger']},
    {'title': 'It', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=It', 'question': 'Qual é a forma favorita da criatura em "It - A Coisa"?', 'alts': ['Lobisomem', 'Palhaço Pennywise', 'Vampiro', 'Fantasma']},
    {'title': 'O Exorcista', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=O+Exorcista', 'question': 'Qual é o nome da menina possuída em "O Exorcista"?', 'alts': ['Regan MacNeil', 'Carol Anne', 'Carrie White', 'Rosemary']},
    {'title': 'Invocação do Mal', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Invocacao+do+Mal', 'question': 'Quais são os nomes dos investigadores paranormais reais de "Invocação do Mal"?', 'alts': ['Mulder e Scully', 'Ed e Lorraine Warren', 'Sam e Dean Winchester', 'Peter e Ray']}
]

comedia_qs = [
    {'title': 'Se Beber Nao Case', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Se+Beber+Nao+Case', 'question': 'Para onde os amigos viajam em "Se Beber, Não Case!"?', 'alts': ['Miami', 'Nova York', 'Las Vegas', 'Los Angeles']},
    {'title': 'Meninas Malvadas', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Meninas+Malvadas', 'question': 'Qual cor as Plásticas usam às quartas-feiras em "Meninas Malvadas"?', 'alts': ['Azul', 'Preto', 'Branco', 'Rosa']},
    {'title': 'As Branquelas', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=As+Branquelas', 'question': 'Quais irmãos interpretam as protagonistas de "As Branquelas"?', 'alts': ['Irmãos Coen', 'Irmãos Wayans', 'Irmãos Russo', 'Irmãos Marx']},
    {'title': 'Superbad', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Superbad', 'question': 'Qual o nome falso na identidade de Fogell em "Superbad"?', 'alts': ['McLovin', 'McDreamy', 'McFly', 'McGregor']},
    {'title': 'Escola de Rock', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Escola+de+Rock', 'question': 'Quem é o ator principal de "Escola de Rock"?', 'alts': ['Adam Sandler', 'Jim Carrey', 'Jack Black', 'Will Ferrell']}
]

ficcao_qs = [
    {'title': 'De Volta Para o Futuro', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=De+Volta+Para+O+Futuro', 'question': 'Qual carro é usado como máquina do tempo em "De Volta para o Futuro"?', 'alts': ['Ferrari', 'DeLorean', 'Mustang', 'Camaro']},
    {'title': 'Interestelar', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Interestelar', 'question': 'Quem dirigiu "Interestelar"?', 'alts': ['Christopher Nolan', 'Ridley Scott', 'James Cameron', 'Steven Spielberg']},
    {'title': 'Blade Runner', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Blade+Runner', 'question': 'Como são chamados os androides em "Blade Runner"?', 'alts': ['Cylons', 'Replicantes', 'Sintéticos', 'Terminators']},
    {'title': 'Avatar', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Avatar', 'question': 'Qual o nome do planeta (ou lua) habitado pelos Na\'vi em "Avatar"?', 'alts': ['Tatooine', 'Pandora', 'Krypton', 'Arrakis']},
    {'title': 'Duna', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Duna', 'question': 'Qual é o recurso mais valioso do universo em "Duna"?', 'alts': ['Água', 'Ouro', 'A Especiaria (Melange)', 'Vibranium']}
]

romance_qs = [
    {'title': 'Titanic', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Titanic', 'question': 'Quais são os nomes dos protagonistas de "Titanic"?', 'alts': ['Romeo e Julieta', 'Jack e Rose', 'Noah e Allie', 'Tony e Maria']},
    {'title': 'Diario de Uma Paixao', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Diario+de+uma+Paixao', 'question': 'Quem escreveu o livro no qual "Diário de uma Paixão" se baseia?', 'alts': ['Stephen King', 'Nicholas Sparks', 'John Green', 'Jojo Moyes']},
    {'title': 'Orgulho e Preconceito', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Orgulho+e+Preconceito', 'question': 'Quem interpreta Elizabeth Bennet no filme de 2005?', 'alts': ['Emma Watson', 'Anne Hathaway', 'Keira Knightley', 'Natalie Portman']},
    {'title': 'La La Land', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=La+La+Land', 'question': 'Quais atores protagonizam o musical "La La Land"?', 'alts': ['Ryan Reynolds e Blake Lively', 'Ryan Gosling e Emma Stone', 'Bradley Cooper e Lady Gaga', 'Zac Efron e Zendaya']},
    {'title': 'Como Eu Era Antes de Voce', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Como+Eu+Era+Antes', 'question': 'Qual atriz de Game of Thrones protagoniza "Como Eu Era Antes de Você"?', 'alts': ['Sophie Turner', 'Emilia Clarke', 'Maisie Williams', 'Lena Headey']}
]

aventura_qs = [
    {'title': 'Senhor dos Aneis', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Senhor+dos+Aneis', 'question': 'Quem é o portador do Um Anel em "O Senhor dos Anéis"?', 'alts': ['Sam', 'Aragorn', 'Gandalf', 'Frodo']},
    {'title': 'Indiana Jones', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Indiana+Jones', 'question': 'Qual é a profissão de Indiana Jones?', 'alts': ['Paleontólogo', 'Arqueólogo', 'Historiador', 'Biólogo']},
    {'title': 'Jurassic Park', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Jurassic+Park', 'question': 'Onde fica localizado o "Jurassic Park"?', 'alts': ['Isla Nublar', 'Havaí', 'Madagascar', 'Galápagos']},
    {'title': 'Piratas do Caribe', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Piratas+do+Caribe', 'question': 'Qual o nome do navio do Capitão Jack Sparrow?', 'alts': ['Holandês Voador', 'Vingança da Rainha Ana', 'Pérola Negra', 'Interceptor']},
    {'title': 'Harry Potter', 'img': 'https://placehold.co/800x400/1a1a1a/e50914?text=Harry+Potter', 'question': 'Qual a casa de Harry Potter em Hogwarts?', 'alts': ['Sonserina', 'Corvinal', 'Lufa-Lufa', 'Grifinória']}
]

html_content += generate_section('acao', 'Ação', '🎬', acao_qs)
html_content += generate_section('terror', 'Terror', '👻', terror_qs)
html_content += generate_section('comedia', 'Comédia', '😂', comedia_qs)
html_content += generate_section('ficcao', 'Ficção Científica', '🚀', ficcao_qs)
html_content += generate_section('romance', 'Romance', '❤️', romance_qs)
html_content += generate_section('aventura', 'Aventura', '🗺️', aventura_qs)

html_content += '''
    <!-- ===== RESULTADO / XP ===== -->
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
                        <span className="xp-amount">+XP</span>
                    </div>
                </div>
                <div className="result-stats">
                    <div className="stat">
                        <span className="stat-number">+</span>
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
                <a href="#generos-quiz" className="btn-replay">Jogar Novamente</a>
            </div>
        </div>
    </section>

    <!-- ===== RODAPÉ ===== -->
    <footer className="footer" id="footer">
        <div className="footer-container">
            <span className="footer-logo">CinePlanner</span>
            <p className="footer-copy">&copy; 2026 CinePlanner – Grupo Vermelho · Senac</p>
        </div>
    </footer>

</body>
</html>
'''

with open('c:/Users/stephanie.espigolone.SENACEDU/Documents/GitHub/ProjetoIntegradorSenac/frontend/quiz.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
