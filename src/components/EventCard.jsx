import { Link } from "react-router-dom";
import { FiMapPin, FiCalendar, FiTag, FiNavigation } from "react-icons/fi";
import Button from "./Button";
import "../styles/EventCard.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function EventCard({
  id,
  title,
  category,
  image,
  location,
  date,
  latitude,
  longitude,
  parkingPrice,
  availableSpots,
  onShowFreeParking,
}) {
  const isSoldOut = availableSpots === 0;
  const isLowStock = availableSpots > 0 && availableSpots <= 5;

  return (
    <article className="event-card">
      <div className="event-card__image-wrap">
        <img src={image} alt={title} className="event-card__image" loading="lazy" />
        <span className="event-card__category">
          <FiTag /> {category}
        </span>
      </div>

      <div className="event-card__body">
        <h3 className="event-card__title">{title}</h3>

        <div className="event-card__meta">
          <span><FiMapPin /> {location}</span>
          <span><FiCalendar /> {formatDate(date)}</span>
        </div>

        <div className="event-card__footer">
          <div className="event-card__price">
            <span className="event-card__price-value">R$ {parkingPrice}</span>
            <span
              className={`event-card__spots ${
                isSoldOut ? "event-card__spots--sold" : isLowStock ? "event-card__spots--low" : ""
              }`}
            >
              {isSoldOut ? "Esgotado" : `${availableSpots} vagas disponíveis`}
            </span>
          </div>

          {isSoldOut ? (
            <Button variant="secondary" disabled>
              Esgotado
            </Button>
          ) : (
            <Link to={`/reserva/${id}`}>
              <Button variant="primary">Reservar</Button>
            </Link>
          )}
        </div>

        <button
          type="button"
          className="event-card__free-parking"
          onClick={() => onShowFreeParking?.({ id, title, latitude, longitude })}
        >
          <FiNavigation /> Estacionamento gratuito próximo
        </button>
      </div>
    </article>
  );
}

export default EventCard;
