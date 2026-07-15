import { FiMapPin, FiCalendar, FiHash, FiClock, FiTrash2, FiMail } from "react-icons/fi";
import Button from "./Button";
import QRCodeTag from "./QRCodeTag";
import "../styles/ReservationCard.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ReservationCard({
  reservationId,
  image,
  eventTitle,
  location,
  date,
  parkingSpot,
  reservationDate,
  customerName,
  customerEmail,
  onCancel,
}) {
  const qrValue = `VAGAFACIL|${reservationId}|${eventTitle}|VAGA-${parkingSpot}`;

  return (
    <article className="reservation-card">
      <img src={image} alt={eventTitle} className="reservation-card__image" />

      <div className="reservation-card__body">
        <h3 className="reservation-card__title">{eventTitle}</h3>

        <div className="reservation-card__meta">
          <span><FiMapPin /> {location}</span>
          <span><FiCalendar /> {formatDate(date)}</span>
          <span><FiHash /> Vaga {parkingSpot}</span>
          <span><FiClock /> Reservado em {formatDateTime(reservationDate)}</span>
          {customerEmail && (
            <span><FiMail /> QR Code enviado (simulado) para {customerEmail}</span>
          )}
        </div>

        {customerName && (
          <p className="reservation-card__customer">Reserva de {customerName}</p>
        )}

        <Button variant="danger" icon={<FiTrash2 />} onClick={onCancel}>
          Cancelar Reserva
        </Button>
      </div>

      <div className="reservation-card__qr">
        <QRCodeTag value={qrValue} size={104} />
        <span>QR Code de acesso</span>
      </div>
    </article>
  );
}

export default ReservationCard;
