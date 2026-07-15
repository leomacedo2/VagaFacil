import axios from "axios";

// Serviço responsável por toda comunicação com a API pública Nominatim
// (OpenStreetMap) para geocodificação de endereços e locais.
// Nenhum componente deve chamar a API diretamente — apenas este service.

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";

const nominatimClient = axios.create({
  baseURL: NOMINATIM_BASE_URL,
  timeout: 10000,
});

/**
 * Pesquisa locais (endereços, shoppings, hospitais, universidades etc.)
 * a partir de um texto livre digitado pelo usuário.
 * Retorna uma lista normalizada de resultados.
 */
export async function searchPlaces(query) {
  if (!query || query.trim().length < 3) return [];

  try {
    const response = await nominatimClient.get("/search", {
      params: {
        q: query,
        format: "jsonv2",
        addressdetails: 1,
        limit: 6,
        countrycodes: "br",
        "accept-language": "pt-BR",
      },
    });

    return response.data.map((place) => ({
      placeId: place.place_id,
      name: place.display_name.split(",")[0],
      displayName: place.display_name,
      latitude: parseFloat(place.lat),
      longitude: parseFloat(place.lon),
      type: place.type,
    }));
  } catch (error) {
    console.error("Erro ao pesquisar destino via Nominatim:", error);
    throw new Error("Não foi possível localizar este destino.");
  }
}

/**
 * Converte coordenadas em um endereço legível (geocodificação reversa).
 * Utilizado como apoio para exibir o endereço de um resultado encontrado.
 */
export async function reverseGeocode(latitude, longitude) {
  try {
    const response = await nominatimClient.get("/reverse", {
      params: {
        lat: latitude,
        lon: longitude,
        format: "jsonv2",
        "accept-language": "pt-BR",
      },
    });

    return response.data?.display_name ?? null;
  } catch (error) {
    console.error("Erro ao reverter geocodificação:", error);
    return null;
  }
}

export default {
  searchPlaces,
  reverseGeocode,
};
