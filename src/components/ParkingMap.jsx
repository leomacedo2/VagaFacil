import { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { FiMapPin, FiExternalLink } from "react-icons/fi";
import { openGoogleMaps, formatDistance, formatWalkingTime } from "../services/mapsService";
import "leaflet/dist/leaflet.css";
import "../styles/ParkingMap.css";

// Ícones customizados em formato de pin colorido (sem depender de imagens
// externas do Leaflet, que quebram em builds do Vite).
function createPinIcon(color) {
  const svg = `
    <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.7 23.3 0 15 0z" fill="${color}"/>
      <circle cx="15" cy="15" r="6" fill="#ffffff"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: "parking-map__pin",
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -36],
  });
}

const ICONS = {
  destination: createPinIcon("#2554e8"),
  parking: createPinIcon("#e0433f"),
  street: createPinIcon("#f5b41f"),
  user: createPinIcon("#16a34a"),
};

/** Recentraliza o mapa sempre que as coordenadas do destino mudam. */
function RecenterOnChange({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.setView([latitude, longitude], map.getZoom() || 15, { animate: true });
    }
  }, [latitude, longitude, map]);

  return null;
}

function ParkingMap({
  latitude,
  longitude,
  destinationName = "Destino",
  searchRadius = 800,
  showNearbyPlaces = true,
  parkingResults = [],
  streetResults = [],
  userLocation = null,
  height = 420,
}) {
  const hasDestination = Boolean(latitude && longitude);

  const center = useMemo(() => {
    if (hasDestination) return [latitude, longitude];
    return [-10.9472, -37.0731]; // fallback: Aracaju, SE
  }, [hasDestination, latitude, longitude]);

  return (
    <div className="parking-map">
      <div className="parking-map__canvas" style={{ height }}>
        <MapContainer
          center={center}
          zoom={hasDestination ? 15 : 12}
          scrollWheelZoom
          className="parking-map__container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <RecenterOnChange latitude={latitude} longitude={longitude} />

          {hasDestination && (
            <Marker position={[latitude, longitude]} icon={ICONS.destination}>
              <Popup>
                <strong>{destinationName}</strong>
                <br />
                Destino pesquisado
              </Popup>
            </Marker>
          )}

          {showNearbyPlaces &&
            parkingResults.map((item) => (
              <Marker
                key={item.id}
                position={[item.latitude, item.longitude]}
                icon={ICONS.parking}
              >
                <Popup>
                  <div className="parking-map__popup">
                    <strong>{item.name}</strong>
                    <span>Estacionamento · {item.fee}</span>
                    <span>{formatDistance(item.distance)} · {formatWalkingTime(item.walkingTime)}</span>
                    <button
                      type="button"
                      onClick={() => openGoogleMaps(item.latitude, item.longitude)}
                    >
                      <FiExternalLink /> Abrir rota
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}

          {showNearbyPlaces &&
            streetResults.map((item) => (
              <Marker
                key={item.id}
                position={[item.latitude, item.longitude]}
                icon={ICONS.street}
              >
                <Popup>
                  <div className="parking-map__popup">
                    <strong>{item.name}</strong>
                    <span>Via pública sugerida</span>
                    <span>{formatDistance(item.distance)} · {formatWalkingTime(item.walkingTime)}</span>
                    <em>Verifique a sinalização antes de estacionar.</em>
                    <button
                      type="button"
                      onClick={() => openGoogleMaps(item.latitude, item.longitude)}
                    >
                      <FiExternalLink /> Abrir rota
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}

          {userLocation && (
            <Marker
              position={[userLocation.latitude, userLocation.longitude]}
              icon={ICONS.user}
            >
              <Popup>Sua localização atual</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <div className="parking-map__legend">
        <span>
          <i className="parking-map__dot parking-map__dot--destination" />
          <FiMapPin /> Destino
        </span>
        <span>
          <i className="parking-map__dot parking-map__dot--parking" />
          Estacionamentos
        </span>
        <span>
          <i className="parking-map__dot parking-map__dot--street" />
          Vias públicas sugeridas
        </span>
        {userLocation && (
          <span>
            <i className="parking-map__dot parking-map__dot--user" />
            Sua localização
          </span>
        )}
      </div>

      {searchRadius && hasDestination && (
        <p className="parking-map__radius-note">
          Buscando opções em um raio de {formatDistance(searchRadius)} ao redor do destino.
        </p>
      )}
    </div>
  );
}

export default ParkingMap;
