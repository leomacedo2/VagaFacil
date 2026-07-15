import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import EventCard from "../components/EventCard";
import SectionTitle from "../components/SectionTitle";
import FreeParkingModal from "../components/FreeParkingModal";
import useGeolocation from "../hooks/useGeolocation";
import { calculateDistance } from "../services/mapsService";
import events from "../data/events";
import "../styles/Eventos.css";

const categories = ["Todos", ...new Set(events.map((event) => event.category))];

const SORT_OPTIONS = [
  { value: "recent", label: "Mais recentes" },
  { value: "spots", label: "Mais vagas" },
  { value: "cheap", label: "Mais baratos" },
  { value: "near", label: "Mais próximos" },
];

function Eventos() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("recent");
  const [freeParkingEvent, setFreeParkingEvent] = useState(null);
  const { location, requestLocation } = useGeolocation();

  // "Mais próximos" depende da localização do usuário — solicita
  // automaticamente assim que essa ordenação é escolhida.
  useEffect(() => {
    if (sortBy === "near" && !location) {
      requestLocation();
    }
  }, [sortBy, location, requestLocation]);

  const filteredEvents = useMemo(() => {
    const filtered = events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesCategory = category === "Todos" || event.category === category;
      return matchesSearch && matchesCategory;
    });

    const sorted = [...filtered];

    switch (sortBy) {
      case "spots":
        sorted.sort((a, b) => b.availableSpots - a.availableSpots);
        break;
      case "cheap":
        sorted.sort((a, b) => a.parkingPrice - b.parkingPrice);
        break;
      case "near":
        if (location) {
          sorted.sort(
            (a, b) =>
              calculateDistance(location.latitude, location.longitude, a.latitude, a.longitude) -
              calculateDistance(location.latitude, location.longitude, b.latitude, b.longitude)
          );
        }
        break;
      case "recent":
      default:
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
    }

    return sorted;
  }, [search, category, sortBy, location]);

  return (
    <div className="page eventos">
      <div className="container">
        <SectionTitle
          eyebrow="Agenda"
          title="Eventos disponíveis"
          description="Encontre o evento e reserve sua vaga oficial em poucos cliques."
          align="left"
        />

        <div className="eventos__filters">
          <div className="eventos__search">
            <FiSearch />
            <input
              type="text"
              placeholder="Pesquisar evento..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Pesquisar evento"
            />
          </div>

          <div className="eventos__sort">
            <label htmlFor="eventos-sort">Ordenar por</label>
            <select
              id="eventos-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="eventos__categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`eventos__chip ${category === cat ? "eventos__chip--active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {sortBy === "near" && !location && (
            <p className="eventos__location-hint">
              <FiMapPin /> Permita o acesso à localização para ordenar por proximidade.
            </p>
          )}
        </div>

        {filteredEvents.length > 0 ? (
          <div className="eventos__grid">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                {...event}
                onShowFreeParking={setFreeParkingEvent}
              />
            ))}
          </div>
        ) : (
          <div className="eventos__empty">
            <p>Nenhum evento encontrado para essa busca.</p>
          </div>
        )}
      </div>

      <FreeParkingModal
        open={Boolean(freeParkingEvent)}
        event={freeParkingEvent}
        onClose={() => setFreeParkingEvent(null)}
      />
    </div>
  );
}

export default Eventos;
