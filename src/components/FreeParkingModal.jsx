import { useEffect } from "react";
import { FiX, FiNavigation, FiAlertCircle } from "react-icons/fi";
import NearbyParkingCard from "./NearbyParkingCard";
import Loading from "./Loading";
import useParkingSearch from "../hooks/useParkingSearch";
import "../styles/FreeParkingModal.css";

const SEARCH_RADIUS = 600;

/**
 * Modal que sugere opções gratuitas/públicas próximas a um evento,
 * consultando a Overpass API em tempo real (via useParkingSearch).
 */
function FreeParkingModal({ open, event, onClose }) {
  const { results, loading, error, search, reset } = useParkingSearch();

  useEffect(() => {
    if (open && event?.latitude && event?.longitude) {
      search(event.latitude, event.longitude, SEARCH_RADIUS);
    }
    if (!open) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, event]);

  if (!open || !event) return null;

  // Resultados podem misturar estacionamentos e vias públicas (source
  // "both"). Vias públicas são sempre consideradas sugestões gratuitas;
  // estacionamentos só entram aqui quando não são pagos.
  const freeOptions = results.filter(
    (item) => item.kind === "street" || item.fee !== "Pago"
  );

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="free-parking-modal">
        <button
          type="button"
          className="free-parking-modal__close"
          aria-label="Fechar"
          onClick={onClose}
        >
          <FiX />
        </button>

        <div className="free-parking-modal__header">
          <span className="free-parking-modal__icon">
            <FiNavigation />
          </span>
          <div>
            <h3>Estacionamento gratuito próximo</h3>
            <p>Opções públicas encontradas perto de {event.title}.</p>
          </div>
        </div>

        {loading && <Loading variant="skeleton" count={2} label="Buscando opções próximas..." />}

        {!loading && error && (
          <p className="free-parking-modal__empty">
            <FiAlertCircle /> {error}
          </p>
        )}

        {!loading && !error && freeOptions.length > 0 && (
          <div className="free-parking-modal__list">
            {freeOptions.map((option) => (
              <NearbyParkingCard key={option.id} {...option} />
            ))}
          </div>
        )}

        {!loading && !error && freeOptions.length === 0 && (
          <p className="free-parking-modal__empty">
            Nenhuma opção gratuita foi encontrada perto deste evento no momento.
          </p>
        )}

        <p className="free-parking-modal__disclaimer">
          As opções acima utilizam dados públicos do OpenStreetMap e são
          apenas sugestões. O VagaFácil não controla nem garante a
          disponibilidade dessas vagas.
        </p>
      </div>
    </div>
  );
}

export default FreeParkingModal;