import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "./supabase";
import "./css/registro.css";

// Importações corretas das imagens da pasta assets
import filme1 from "./assets/filme.1.jpg";
import filme2 from "./assets/filme2.jpg";
import filme3 from "./assets/filme3.jpg";
import filme4 from "./assets/filme.4.jpg";
import filme5 from "./assets/filme.5.jpg";

function Registro() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("usuario")
        .insert([{ username, email, senha_hash: password }]);

      if (error) {
        throw error;
      }

      navigate("/login");
    } catch (error) {
      setErrorMsg("Erro ao cadastrar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="carousel-bg">
        <img
          src={filme1}
          className="carousel-slide slide-1"
          alt="Filme 1"
        />
        <img
          src={filme2}
          className="carousel-slide slide-2"
          alt="Filme 2"
        />
        <img
          src={filme3}
          className="carousel-slide slide-3"
          alt="Filme 3"
        />
        <img
          src={filme4}
          className="carousel-slide slide-4"
          alt="Filme 4"
        />
        <img
          src={filme5}
          className="carousel-slide slide-5"
          alt="Filme 5"
        />
      </div>

      <div className="carousel-overlay"></div>

      <div className="register-container">
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

        <h2>Criar conta</h2>
        <p className="subtitle">Preencha os campos para se registrar</p>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <form id="registerForm" onSubmit={handleRegister}>
          <div className="input-group">
            <svg
              className="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="8"
                r="4"
                stroke="#888"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M5 20C5 16.686 8.134 14 12 14C15.866 14 19 16.686 19 20"
                stroke="#888"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <input
              type="text"
              id="username"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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
            <input 
              type="email" 
              id="email" 
              placeholder="E-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
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
            <input 
              type="password" 
              id="password" 
              placeholder="Senha" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
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
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className="divider">ou</p>
        <p className="login-link">
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </>
  );
}

export default Registro;