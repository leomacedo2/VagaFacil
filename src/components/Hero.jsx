import { Link } from "react-router-dom";
import { FiArrowRight, FiNavigation } from "react-icons/fi";
import Button from "./Button";
import "../styles/Hero.css";

function Hero({ title, subtitle, primaryAction, secondaryAction }) {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow">Encontre. Estacione. Aproveite.</span>
          <h1 className="hero__title">{title}</h1>
          <p className="hero__subtitle">{subtitle}</p>
          <div className="hero__actions">
            {primaryAction && (
              <Link to={primaryAction.to}>
                <Button variant="primary" size="lg" icon={<FiNavigation />}>
                  {primaryAction.label}
                </Button>
              </Link>
            )}
            {secondaryAction && (
              <Link to={secondaryAction.to}>
                <Button variant="ghost" size="lg" icon={<FiArrowRight />}>
                  {secondaryAction.label}
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__ticket">
            <div className="hero__ticket-row">
              <span className="hero__ticket-label">Evento</span>
              <span className="hero__ticket-value">Show do Coldplay</span>
            </div>
            <div className="hero__ticket-row">
              <span className="hero__ticket-label">Vaga</span>
              <span className="hero__ticket-value">B-14</span>
            </div>
            <div className="hero__ticket-status">Reservada</div>
          </div>

          <div className="hero__grid">
            {Array.from({ length: 12 }).map((_, index) => (
              <span
                key={index}
                className={`hero__cell ${index === 5 ? "hero__cell--active" : ""}`}
                style={{ animationDelay: `${index * 90}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
