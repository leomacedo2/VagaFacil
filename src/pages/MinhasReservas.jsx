import { useState } from "react";
import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import SectionTitle from "../components/SectionTitle";
import ReservationCard from "../components/ReservationCard";
import ConfirmModal from "../components/ConfirmModal";
import Button from "../components/Button";
import Toast from "../components/Toast";
import useReservations from "../hooks/useReservations";
import "../styles/MinhasReservas.css";

function MinhasReservas() {
  const { reservations, cancelReservation } = useReservations();
  const [targetId, setTargetId] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);

  const handleCancelClick = (reservationId) => {
    setTargetId(reservationId);
  };

  const handleConfirmCancel = () => {
    cancelReservation(targetId);
    setTargetId(null);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  return (
    <div className="page minhas-reservas">
      <div className="container">
        <SectionTitle
          eyebrow="Suas vagas"
          title="Minhas Reservas"
          description="Acompanhe aqui as vagas que você já reservou para os próximos eventos."
          align="left"
        />

        {reservations.length > 0 ? (
          <div className="minhas-reservas__list">
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.reservationId}
                {...reservation}
                onCancel={() => handleCancelClick(reservation.reservationId)}
              />
            ))}
          </div>
        ) : (
          <div className="minhas-reservas__empty">
            <FiCalendar className="minhas-reservas__empty-icon" />
            <p>Você ainda não possui reservas.</p>
            <Link to="/eventos">
              <Button variant="primary">Ver Eventos</Button>
            </Link>
          </div>
        )}
      </div>

      <ConfirmModal
        open={Boolean(targetId)}
        title="Cancelar reserva"
        description="Tem certeza de que deseja cancelar esta reserva? Essa ação não pode ser desfeita."
        confirmLabel="Sim, cancelar"
        cancelLabel="Manter reserva"
        onConfirm={handleConfirmCancel}
        onCancel={() => setTargetId(null)}
      />

      <Toast message="Reserva cancelada." visible={toastVisible} />
    </div>
  );
}

export default MinhasReservas;
