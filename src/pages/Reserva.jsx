import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { FiMapPin, FiCalendar, FiTag, FiAlertTriangle } from "react-icons/fi";
import SectionTitle from "../components/SectionTitle";
import ParkingSpot from "../components/ParkingSpot";
import ParkingMap from "../components/ParkingMap";
import NearbyParkingCard from "../components/NearbyParkingCard";
import Loading from "../components/Loading";
import ReservationFormModal from "../components/ReservationFormModal";
import Toast from "../components/Toast";
import Button from "../components/Button";
import events from "../data/events";
import useParkingSearch from "../hooks/useParkingSearch";
import useReservations from "../hooks/useReservations";
import { getReservedSpotsForEvent } from "../utils/storage";
import "../styles/Reserva.css";

const TOTAL_SPOTS = 30;
const SEARCH_RADIUS = 800;

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// Gerador pseudoaleatório determinístico (mulberry32) — sempre converge,
// diferente de um LCG simples que pode entrar em ciclo curto e travar.
function mulberry32(seed) {
  let state = seed;
  return function random() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Gera um conjunto determinístico de vagas ocupadas com base no id do evento,
// para que o mapa de vagas não mude a cada renderização.
function buildOccupiedSpots(eventId) {
  const seed = String(eventId)
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 1);
  const random = mulberry32(seed);
  const occupied = new Set();
  const targetCount = Math.min(9, TOTAL_SPOTS - 1);

  while (occupied.size < targetCount) {
    const spot = Math.floor(random() * TOTAL_SPOTS) + 1;
    occupied.add(spot);
  }

  return occupied;
}

function Reserva() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((item) => item.id === id);

  const alreadyReserved = useMemo(
    () => new Set(getReservedSpotsForEvent(id)),
    [id]
  );

  const occupiedSpots = useMemo(() => {
    const base = buildOccupiedSpots(id);
    alreadyReserved.forEach((spot) => base.add(spot));
    return base;
  }, [id, alreadyReserved]);

  const [selectedSpot, setSelectedSpot] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const { addReservation } = useReservations();

  const {
    results,
    loading: searchLoading,
    error: searchError,
    search,
  } = useParkingSearch();

  useEffect(() => {
    if (event) {
      search(event.latitude, event.longitude, SEARCH_RADIUS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event?.id]);

  if (!event) {
    return <Navigate to="/404" replace />;
  }

  // Os resultados agora podem conter estacionamentos e vias públicas ao
  // mesmo tempo (source "both"), então a separação para o mapa é feita
  // pelo tipo de cada item, não pelo valor de "source".
  const parkingResults = results.filter((item) => item.kind === "parking");
  const streetResults = results.filter((item) => item.kind === "street");

  const handleSelectSpot = (spotNumber) => {
    setSelectedSpot((current) => (current === spotNumber ? null : spotNumber));
  };

  const handleConfirmClick = () => {
    if (selectedSpot) setModalOpen(true);
  };

  const handleFormSubmit = ({ name, email }) => {
    addReservation({
      eventId: event.id,
      eventTitle: event.title,
      image: event.image,
      date: event.date,
      location: event.location,
      parkingSpot: selectedSpot,
      customerName: name,
      customerEmail: email,
    });

    setModalOpen(false);
    setToastVisible(true);

    setTimeout(() => {
      navigate("/minhas-reservas");
    }, 1200);
  };

  return (
    <div className="page reserva">
      <div className="container">
        <div className="reserva__event">
          <img src={event.image} alt={event.title} className="reserva__image" />

          <div className="reserva__event-info">
            <span className="reserva__tag"><FiTag /> {event.category}</span>
            <h1 className="reserva__title">{event.title}</h1>
            <p className="reserva__description">{event.description}</p>

            <div className="reserva__meta">
              <span><FiCalendar /> {formatDate(event.date)}</span>
              <span><FiMapPin /> {event.location}</span>
            </div>

            <div className="reserva__price-box">
              <div>
                <span className="reserva__price-label">Valor da vaga</span>
                <span className="reserva__price-value">R$ {event.parkingPrice}</span>
              </div>
              <div>
                <span className="reserva__price-label">Vagas disponíveis</span>
                <span className="reserva__price-value">
                  {TOTAL_SPOTS - occupiedSpots.size}
                </span>
              </div>
            </div>
          </div>
        </div>

        <section className="reserva__parking">
          <SectionTitle
            eyebrow="Estacionamento oficial"
            title="Escolha sua vaga"
            description="Selecione uma vaga livre no mapa abaixo. Apenas uma vaga pode ser escolhida por reserva."
            align="left"
          />

          <div className="reserva__legend">
            <span><i className="reserva__dot reserva__dot--free" /> Livre</span>
            <span><i className="reserva__dot reserva__dot--occupied" /> Ocupada</span>
            <span><i className="reserva__dot reserva__dot--selected" /> Selecionada</span>
          </div>

          <div className="reserva__grid">
            {Array.from({ length: TOTAL_SPOTS }, (_, index) => index + 1).map(
              (number) => {
                const status = occupiedSpots.has(number)
                  ? "occupied"
                  : selectedSpot === number
                  ? "selected"
                  : "free";
                return (
                  <ParkingSpot
                    key={number}
                    number={number}
                    status={status}
                    onSelect={() => handleSelectSpot(number)}
                  />
                );
              }
            )}
          </div>

          <div className="reserva__confirm-bar">
            <p>
              {selectedSpot
                ? `Vaga ${selectedSpot} selecionada.`
                : "Selecione uma vaga para continuar."}
            </p>
            <Button
              variant="primary"
              size="lg"
              disabled={!selectedSpot}
              onClick={handleConfirmClick}
            >
              Reservar Vaga
            </Button>
          </div>
        </section>

        <section className="reserva__nearby">
          <SectionTitle
            eyebrow="Ao redor do evento"
            title="Onde estacionar perto deste evento"
            description="Estacionamentos cadastrados e vias públicas próximas, obtidos em tempo real via OpenStreetMap."
            align="left"
          />

          <ParkingMap
            latitude={event.latitude}
            longitude={event.longitude}
            destinationName={event.title}
            searchRadius={SEARCH_RADIUS}
            parkingResults={parkingResults}
            streetResults={streetResults}
          />

          <div className="reserva__nearby-warning">
            <FiAlertTriangle />
            <p>
              As informações apresentadas utilizam dados públicos do
              OpenStreetMap. As ruas exibidas representam vias públicas
              próximas ao destino e não garantem disponibilidade ou permissão
              para estacionamento. Sempre respeite a sinalização e a
              legislação de trânsito. Apenas o estacionamento oficial do
              evento pode ser reservado pelo sistema.
            </p>
          </div>

          {searchLoading && (
            <Loading variant="skeleton" count={3} label="Buscando opções próximas..." />
          )}

          {!searchLoading && searchError && (
            <p className="reserva__nearby-error">{searchError}</p>
          )}

          {!searchLoading && !searchError && results.length > 0 && (
            <div className="reserva__nearby-grid">
              {results.map((item) => (
                <NearbyParkingCard key={item.id} {...item} />
              ))}
            </div>
          )}

          {!searchLoading && !searchError && results.length === 0 && (
            <p className="reserva__nearby-empty">
              Nenhuma opção próxima foi encontrada para este destino.
            </p>
          )}
        </section>

        <div className="reserva__back">
          <Link to="/eventos">← Voltar para eventos</Link>
        </div>
      </div>

      <ReservationFormModal
        open={modalOpen}
        eventTitle={event.title}
        parkingSpot={selectedSpot}
        onSubmit={handleFormSubmit}
        onCancel={() => setModalOpen(false)}
      />

      <Toast message="Reserva confirmada com sucesso!" visible={toastVisible} />
    </div>
  );
}

export default Reserva;