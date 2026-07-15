import axios from "axios";
import { calculateDistance, estimateWalkingTime } from "./mapsService";

// Serviço responsável por buscar estacionamentos e vias públicas próximas
// utilizando a Overpass API (dados do OpenStreetMap). Segue a prioridade:
// 1) estacionamentos cadastrados (amenity=parking)
// 2) quando não existirem, vias públicas próximas (ruas onde normalmente
//    existe possibilidade de estacionamento).
//
// A Overpass API pública é compartilhada por todo o mundo e frequentemente
// responde 429 (Too Many Requests). Por isso, este serviço nunca lança
// exceções para fora: cada etapa é tratada internamente, com fallback
// automático entre múltiplos mirrors públicos e entre estacionamentos/vias.

// Mirrors públicos da Overpass API, tentados em sequência. Se um mirror
// falhar (429, timeout, erro de rede ou servidor fora do ar), o próximo é
// tentado automaticamente antes de considerar a busca como falha.
const OVERPASS_MIRRORS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.openstreetmap.fr/api/interpreter",
  "https://overpass.osm.ch/api/interpreter",
];

const REQUEST_TIMEOUT_MS = 12000;

// Tipos de via considerados adequados para sugestão de estacionamento.
const ALLOWED_HIGHWAYS = ["residential", "service", "living_street"];

function buildParkingQuery(lat, lon, radius) {
  return `
    [out:json][timeout:15];
    (
      node["amenity"="parking"](around:${radius},${lat},${lon});
      way["amenity"="parking"](around:${radius},${lat},${lon});
    );
    out center tags;
  `;
}

function buildStreetsQuery(lat, lon, radius) {
  return `
    [out:json][timeout:15];
    (
      way["highway"~"^(${ALLOWED_HIGHWAYS.join("|")})$"]["access"!="private"](around:${radius},${lat},${lon});
    );
    out center tags;
  `;
}

/**
 * Executa uma query Overpass QL tentando cada mirror público em sequência.
 * NUNCA lança exceção: sempre resolve com um objeto indicando sucesso ou
 * falha, para que o restante da busca possa decidir o que fazer a seguir
 * (ex.: tentar vias públicas) sem que o fluxo da aplicação seja quebrado.
 */
async function queryOverpass(query) {
  let lastReason = "unknown";

  for (const mirrorUrl of OVERPASS_MIRRORS) {
    try {
      const response = await axios.post(mirrorUrl, query, {
        headers: { "Content-Type": "text/plain" },
        timeout: REQUEST_TIMEOUT_MS,
      });

      return { ok: true, elements: response.data?.elements || [] };
    } catch (error) {
      const status = error?.response?.status;

      if (status === 429) {
        lastReason = "rate-limited";
        console.warn(`Overpass mirror ocupado (429): ${mirrorUrl}. Tentando próximo mirror...`);
      } else if (error?.code === "ECONNABORTED") {
        lastReason = "timeout";
        console.warn(`Overpass mirror expirou (timeout): ${mirrorUrl}. Tentando próximo mirror...`);
      } else {
        lastReason = "network";
        console.warn(`Overpass mirror indisponível: ${mirrorUrl}.`, error?.message);
      }
      // Continua automaticamente para o próximo mirror da lista.
    }
  }

  // Todos os mirrors falharam — retorna falha controlada, sem lançar exceção.
  return { ok: false, reason: lastReason };
}

function extractCoordinates(element) {
  if (element.type === "node") {
    return { lat: element.lat, lon: element.lon };
  }
  // Ways retornam um "center" quando usamos "out center"
  if (element.center) {
    return { lat: element.center.lat, lon: element.center.lon };
  }
  return null;
}

function normalizeParkingElement(element, originLat, originLon) {
  const coords = extractCoordinates(element);
  if (!coords) return null;

  const distance = calculateDistance(originLat, originLon, coords.lat, coords.lon);
  const tags = element.tags || {};

  return {
    id: `parking-${element.type}-${element.id}`,
    kind: "parking",
    name: tags.name || "Estacionamento",
    latitude: coords.lat,
    longitude: coords.lon,
    distance,
    walkingTime: estimateWalkingTime(distance),
    fee: tags.fee === "yes" ? "Pago" : tags.fee === "no" ? "Gratuito" : "Não informado",
    address: tags["addr:street"]
      ? `${tags["addr:street"]}${tags["addr:housenumber"] ? `, ${tags["addr:housenumber"]}` : ""}`
      : null,
  };
}

function normalizeStreetElement(element, originLat, originLon) {
  const coords = extractCoordinates(element);
  if (!coords) return null;

  const tags = element.tags || {};
  if (!tags.name) return null; // ignora vias sem nome, pouco úteis para o usuário

  const distance = calculateDistance(originLat, originLon, coords.lat, coords.lon);

  return {
    id: `street-${element.type}-${element.id}`,
    kind: "street",
    name: tags.name,
    latitude: coords.lat,
    longitude: coords.lon,
    distance,
    walkingTime: estimateWalkingTime(distance),
    highwayType: tags.highway,
  };
}

function dedupeAndSort(items) {
  const seen = new Set();
  const unique = items.filter((item) => {
    if (!item || seen.has(item.name + item.kind)) return false;
    seen.add(item.name + item.kind);
    return true;
  });
  return unique.sort((a, b) => a.distance - b.distance);
}

/**
 * Busca estacionamentos cadastrados próximos às coordenadas informadas.
 * Nunca lança exceção: em caso de falha (429, timeout, rede), retorna
 * `{ results: [], failed: true }` para que o chamador possa decidir o
 * próximo passo (ex.: tentar vias públicas) normalmente.
 */
export async function searchParkingSpots(latitude, longitude, radius = 800) {
  const response = await queryOverpass(buildParkingQuery(latitude, longitude, radius));

  if (!response.ok) {
    return { results: [], failed: true, reason: response.reason };
  }

  const results = response.elements
    .map((element) => normalizeParkingElement(element, latitude, longitude))
    .filter(Boolean);

  return { results: dedupeAndSort(results).slice(0, 12), failed: false };
}

/**
 * Busca vias públicas próximas, utilizadas como sugestão quando não há
 * estacionamentos cadastrados (ou quando a busca por estacionamentos
 * falhou). Segue o mesmo contrato "nunca lança exceção" de searchParkingSpots.
 */
export async function searchNearbyStreets(latitude, longitude, radius = 800) {
  const response = await queryOverpass(buildStreetsQuery(latitude, longitude, radius));

  if (!response.ok) {
    return { results: [], failed: true, reason: response.reason };
  }

  const results = response.elements
    .map((element) => normalizeStreetElement(element, latitude, longitude))
    .filter(Boolean);

  return { results: dedupeAndSort(results).slice(0, 12), failed: false };
}

/**
 * Busca combinada: agora executa SEMPRE as duas buscas (estacionamentos
 * cadastrados e vias públicas próximas), em vez de só buscar vias públicas
 * quando não há estacionamentos. Os resultados de ambos os tipos são
 * combinados e ordenados por distância, para que o mapa e a lista exibam
 * estacionamentos (vermelho) e vias públicas (amarelo) simultaneamente.
 *
 * As buscas continuam sendo feitas em sequência (não em paralelo) para não
 * dobrar a carga simultânea sobre um mesmo mirror da Overpass — cada uma
 * mantém seu próprio fallback entre mirrors e tratamento de erro, sem
 * lançar exceção em nenhum momento.
 *
 * source pode ser:
 *  - "both":    estacionamentos cadastrados E vias públicas encontrados
 *  - "parking": apenas estacionamentos cadastrados encontrados
 *  - "street":  apenas vias públicas encontradas
 *  - "none":    busca concluída, mas sem resultados na região
 *  - "error":   nenhum mirror respondeu para nenhuma das buscas
 */
export async function searchNearbyParkingOptions(latitude, longitude, radius = 800) {
  const parking = await searchParkingSpots(latitude, longitude, radius);
  const streets = await searchNearbyStreets(latitude, longitude, radius);

  const hasParking = parking.results.length > 0;
  const hasStreets = streets.results.length > 0;

  if (!hasParking && !hasStreets) {
    // Nenhum dos dois tipos retornou resultado. Se as duas buscas falharam
    // por problema técnico (não por ausência real de dados), avisa o
    // usuário de forma amigável em vez de mostrar apenas "nenhum resultado".
    if (parking.failed && streets.failed) {
      return {
        source: "error",
        results: [],
        message:
          "Não foi possível buscar opções para estacionar nesta região no momento. Tente novamente em instantes.",
      };
    }

    return { source: "none", results: [] };
  }

  const source = hasParking && hasStreets ? "both" : hasParking ? "parking" : "street";
  const combinedResults = dedupeAndSort([...parking.results, ...streets.results]);

  return { source, results: combinedResults };
}

export default {
  searchParkingSpots,
  searchNearbyStreets,
  searchNearbyParkingOptions,
};