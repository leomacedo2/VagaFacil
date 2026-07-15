import { useState } from "react";
import { FiCrosshair, FiAlertTriangle, FiAlertCircle } from "react-icons/fi";
import SectionTitle from "../components/SectionTitle";
import SearchBar from "../components/SearchBar";
import ParkingMap from "../components/ParkingMap";
import NearbyParkingCard from "../components/NearbyParkingCard";
import Loading from "../components/Loading";
import useParkingSearch from "../hooks/useParkingSearch";
import useGeolocation from "../hooks/useGeolocation";
import "../styles/OndeEstacionar.css";

const SEARCH_RADIUS = 800;

function OndeEstacionar() {
  const [destination, setDestination] = useState(null);
  const { results, loading, error, search } = useParkingSearch();
  const {
    location: userLocation,
    loading: locating,
    error: locationError,
    requestLocation,
  } = useGeolocation();

  const handleSelectPlace = (place) => {
    setDestination({
      name: place.name,
      displayName: place.displayName,
      latitude: place.latitude,
      longitude: place.longitude,
    });
    search(place.latitude, place.longitude, SEARCH_RADIUS);
  };

  const handleUseMyLocation = () => {
    requestLocation();
  };

  // Os resultados agora podem conter estacionamentos e vias públicas ao
  // mesmo tempo (source "both"), então a separação para o mapa é feita
  // pelo tipo de cada item, não pelo valor de "source".
  const parkingResults = results.filter((item) => item.kind === "parking");
  const streetResults = results.filter((item) => item.kind === "street");

  return (
    <div className="page onde-estacionar">
      <div className="container">
        <SectionTitle
          eyebrow="Onde Estacionar"
          title="Encontre onde estacionar perto de qualquer destino"
          description="Digite um endereço, shopping, hospital, universidade ou qualquer destino. O VagaFácil busca estacionamentos e vias públicas próximas em tempo real."
          align="left"
        />

        <div className="onde-estacionar__search">
          <SearchBar
            placeholder="Digite um endereço, shopping, hospital, universidade ou qualquer destino."
            onSelectPlace={handleSelectPlace}
            autoFocus
          />
          <button
            type="button"
            className="onde-estacionar__location-btn"
            onClick={handleUseMyLocation}
            disabled={locating}
          >
            <FiCrosshair /> {locating ? "Localizando..." : "Minha localização"}
          </button>
        </div>

        {locationError && (
          <p className="onde-estacionar__location-error">
            <FiAlertCircle /> {locationError}
          </p>
        )}

        <div className="onde-estacionar__map">
          <ParkingMap
            latitude={destination?.latitude}
            longitude={destination?.longitude}
            destinationName={destination?.name}
            searchRadius={SEARCH_RADIUS}
            parkingResults={parkingResults}
            streetResults={streetResults}
            userLocation={userLocation}
            height={460}
          />
        </div>

        {!destination && (
          <p className="onde-estacionar__hint">
            Pesquise um destino acima para visualizar estacionamentos e vias
            públicas próximas no mapa.
          </p>
        )}

        {destination && (
          <section className="onde-estacionar__results">
            <SectionTitle
              eyebrow="Resultados"
              title={`Opções próximas a ${destination.name}`}
              align="left"
            />

            {loading && (
              <Loading variant="skeleton" count={3} label="Buscando opções para estacionar..." />
            )}

            {!loading && error && (
              <p className="onde-estacionar__error">
                <FiAlertCircle /> {error}
              </p>
            )}

            {!loading && !error && results.length > 0 && (
              <div className="onde-estacionar__grid">
                {results.map((item) => (
                  <NearbyParkingCard key={item.id} {...item} />
                ))}
              </div>
            )}

            {!loading && !error && results.length === 0 && (
              <div className="onde-estacionar__empty">
                <p>Nenhuma opção próxima foi encontrada para este destino.</p>
                <p>Tente pesquisar outro endereço.</p>
              </div>
            )}

            <div className="onde-estacionar__disclaimer">
              <FiAlertTriangle />
              <p>
                As informações apresentadas utilizam dados públicos do
                OpenStreetMap. As ruas exibidas representam vias públicas
                próximas ao destino e não garantem disponibilidade ou
                permissão para estacionamento. Sempre respeite a sinalização
                e a legislação de trânsito.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default OndeEstacionar;