import "./css/login.css";

function Login() {
  return (
    <>
      <div className="carousel-bg">
        <img
          src="img/filme.1.jpg"
          className="carousel-slide slide-1"
          alt="Filme 1"
        />
        <img
          src="img/filme2.jpg"
          className="carousel-slide slide-2"
          alt="Filme 2"
        />
        <img
          src="img/filme3.jpg"
          className="carousel-slide slide-3"
          alt="Filme 3"
        />
        <img
          src="img/filme4.jpg"
          className="carousel-slide slide-4"
          alt="Filme 4"
        />
        <img
          src="img/filme.5.jpg"
          className="carousel-slide slide-5"
          alt="Filme 5"
        />
      </div>

      <div className="carousel-overlay"></div>

      <div className="login-container">
        <div className="icon-container">
          <svg
            className="cinema-icon"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="8" y="16" width="48" height="36" rx="4" fill="#e50914" />
            <rect x="12" y="20" width="8" height="6" rx="1" fill="#1a0000" />
            <rect x="24" y="20" width="8" height="6" rx="1" fill="#1a0000" />
            <rect x="36" y="20" width="8" height="6" rx="1" fill="#1a0000" />
            <rect x="12" y="42" width="8" height="6" rx="1" fill="#1a0000" />
            <rect x="24" y="42" width="8" height="6" rx="1" fill="#1a0000" />
            <rect x="36" y="42" width="8" height="6" rx="1" fill="#1a0000" />
            <rect x="16" y="30" width="24" height="10" rx="2" fill="#1a0000" />
            <circle cx="28" cy="35" r="3" fill="#e50914" />
            <polygon points="27,33 30,35 27,37" fill="#1a0000" />
            <circle cx="22" cy="10" r="3" fill="#e50914" />
            <circle cx="42" cy="10" r="3" fill="#e50914" />
            <circle cx="22" cy="10" r="1.5" fill="#1a0000" />
            <circle cx="42" cy="10" r="1.5" fill="#1a0000" />
          </svg>
        </div>

        <h2>Entrar</h2>
        <p className="subtitle">Faça login para acessar sua conta</p>

        <form id="loginForm">
          <div className="input-group">
            <svg
              className="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="5"
                width="20"
                height="14"
                rx="2"
                stroke="#888"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M2 7L12 13L22 7"
                stroke="#888"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <input type="email" id="email" placeholder="E-mail" required />
          </div>

          <div className="input-group">
            <svg
              className="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="5"
                y="11"
                width="14"
                height="10"
                rx="2"
                stroke="#888"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M8 11V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V11"
                stroke="#888"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <input type="password" id="password" placeholder="Senha" required />
          </div>

          <button type="submit">Entrar</button>
        </form>

        <p className="divider">ou</p>
        <p className="register-link">
          Não tem uma conta? <a href="registro.html">Cadastrar</a>
        </p>
      </div>
    </>
  );
}

export default Login;
