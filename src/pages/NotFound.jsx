import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import Button from "../components/Button";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <div className="page not-found">
      <div className="container not-found__content">
        <FiAlertTriangle className="not-found__icon" />
        <span className="not-found__code">404</span>
        <h1>Página não encontrada</h1>
        <p>
          O evento ou a página que você procura não existe ou foi removida.
        </p>
        <Link to="/">
          <Button variant="primary">Voltar para Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
