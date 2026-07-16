import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiLogIn, FiUserPlus } from "react-icons/fi";
import { PiCarProfileFill } from "react-icons/pi";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import "../styles/Login.css";

function Login() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/minhas-reservas";
  const isSignup = mode === "signup";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (isSignup) {
        if (!name.trim()) {
          throw new Error("Informe seu nome completo.");
        }
        await signUp(name.trim(), email.trim(), password);
      } else {
        await signIn(email.trim(), password);
      }
      navigate(redirectTo, { replace: true });
    } catch (submitError) {
      setError(submitError.message || "Não foi possível concluir a operação.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page login">
      <div className="login__card">
        <Link to="/" className="login__brand">
          <PiCarProfileFill /> VagaFácil
        </Link>

        <div className="login__tabs">
          <button
            type="button"
            className={`login__tab ${!isSignup ? "login__tab--active" : ""}`}
            onClick={() => {
              setMode("login");
              setError(null);
            }}
          >
            Entrar
          </button>
          <button
            type="button"
            className={`login__tab ${isSignup ? "login__tab--active" : ""}`}
            onClick={() => {
              setMode("signup");
              setError(null);
            }}
          >
            Criar conta
          </button>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          {isSignup && (
            <label className="login__field">
              <span><FiUser /> Nome completo</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Digite seu nome"
                autoComplete="name"
              />
            </label>
          )}

          <label className="login__field">
            <span><FiMail /> E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Digite seu e-mail"
              autoComplete="email"
              required
            />
          </label>

          <label className="login__field">
            <span><FiLock /> Senha</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Digite sua senha"
              autoComplete={isSignup ? "new-password" : "current-password"}
              minLength={6}
              required
            />
          </label>

          {error && <p className="login__error">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={submitting}
            icon={isSignup ? <FiUserPlus /> : <FiLogIn />}
          >
            {submitting ? "Aguarde..." : isSignup ? "Criar conta" : "Entrar"}
          </Button>
        </form>

        <p className="login__switch">
          {isSignup ? "Já tem uma conta?" : "Ainda não tem conta?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(isSignup ? "login" : "signup");
              setError(null);
            }}
          >
            {isSignup ? "Entrar" : "Criar conta"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
