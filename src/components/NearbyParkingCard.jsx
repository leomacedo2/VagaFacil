import { FiNavigation, FiClock, FiMapPin, FiAlertTriangle, FiExternalLink } from "react-icons/fi";
import { formatDistance, formatWalkingTime, openGoogleMaps } from "../services/mapsService";
import "../styles/NearbyParkingCard.css";

/**
 * Exibe um resultado de busca (estacionamento cadastrado ou via pública
 * sugerida) vindo do parkingService, já normalizado com distância e tempo.
 */
function NearbyParkingCard({ kind, name, distance, walkingTime, fee, address, latitude, longitude }) {
  const isStreet = kind === "street";

  return (
    <div className="nearby-card">
      <div className="nearby-card__top">
        <h4 className="nearby-card__name">{name}</h4>
        <span
          className={`nearby-card__badge ${
            isStreet ? "nearby-card__badge--street" : "nearby-card__badge--parking"
          }`}
        >
          {isStreet ? "Via Pública" : "Estacionamento"}
        </span>
      </div>

      <div className="nearby-card__info">
        <span><FiNavigation /> {formatDistance(distance)}</span>
        <span><FiClock /> {formatWalkingTime(walkingTime)} a pé</span>
      </div>

      {!isStreet && (
        <div className="nearby-card__price">{fee || "Não informado"}</div>
      )}

      {address && (
        <p className="nearby-card__address"><FiMapPin /> {address}</p>
      )}

      {isStreet && (
        <div className="nearby-card__warning">
          <FiAlertTriangle /> Verifique a sinalização antes de estacionar.
        </div>
      )}

      <button
        type="button"
        className="nearby-card__route"
        onClick={() => openGoogleMaps(latitude, longitude)}
      >
        <FiExternalLink /> Abrir rota
      </button>
    </div>
  );
}

export default NearbyParkingCard;
