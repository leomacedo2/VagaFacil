// Serviço com utilidades relacionadas a mapas: cálculo de distância,
// estimativa de tempo de caminhada e abertura de rotas no Google Maps.

const EARTH_RADIUS_METERS = 6371000;
const AVERAGE_WALKING_SPEED_M_PER_MIN = 80; // ~4.8 km/h

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

/** Calcula a distância aproximada em metros entre duas coordenadas (Haversine). */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(EARTH_RADIUS_METERS * c);
}

/** Estima o tempo de caminhada em minutos a partir de uma distância em metros. */
export function estimateWalkingTime(distanceMeters) {
  return Math.max(1, Math.round(distanceMeters / AVERAGE_WALKING_SPEED_M_PER_MIN));
}

/** Formata uma distância em metros para exibição (ex: "320 metros" ou "1.2 km"). */
export function formatDistance(distanceMeters) {
  if (distanceMeters >= 1000) {
    return `${(distanceMeters / 1000).toFixed(1)} km`;
  }
  return `${distanceMeters} metros`;
}

/** Formata um tempo em minutos para exibição (ex: "≈ 5 minutos"). */
export function formatWalkingTime(minutes) {
  return `≈ ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
}

/** Abre a rota até o destino informado utilizando o Google Maps. */
export function openGoogleMaps(latitude, longitude) {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export default {
  calculateDistance,
  estimateWalkingTime,
  formatDistance,
  formatWalkingTime,
  openGoogleMaps,
};
