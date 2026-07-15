import { PiCarProfileFill } from "react-icons/pi";
import {
  FiMail,
  FiMapPin,
  FiGithub,
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiLinkedin,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const socialLinks = [
  { icon: <FiInstagram />, label: "Instagram", href: "#" },
  { icon: <FiTwitter />, label: "Twitter", href: "#" },
  { icon: <FiFacebook />, label: "Facebook", href: "#" },
  { icon: <FiLinkedin />, label: "LinkedIn", href: "#" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__brand-title">
            <PiCarProfileFill /> VagaFácil
          </span>
          <p>
            O VagaFácil ajuda motoristas a encontrar onde estacionar, sempre
            priorizando estacionamentos cadastrados e sugerindo vias públicas
            próximas quando não existirem.
          </p>
          <div className="footer__social">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                onClick={(event) => event.preventDefault()}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4>Navegação</h4>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/eventos">Eventos</Link></li>
            <li><Link to="/onde-estacionar">Onde Estacionar</Link></li>
            <li><Link to="/minhas-reservas">Minhas Reservas</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contato</h4>
          <ul>
            <li><FiMail /> contato@vagafacil.com</li>
            <li><FiMapPin /> Aracaju, Sergipe</li>
            <li><FiGithub /> 
            <a
              href="https://github.com/leomacedo2"
              target="_blank"
              rel="noopener noreferrer"
              >Leonardo Macedo</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {year} VagaFácil • Desenvolvido por Leonardo Macedo e Gustavo Levy • Projeto acadêmico em React</p>
      </div>
    </footer>
  );
}

export default Footer;
