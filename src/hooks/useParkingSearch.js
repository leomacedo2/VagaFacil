import { useCallback, useState } from "react";
import { searchNearbyParkingOptions } from "../services/parkingService";

/**
 * Hook que encapsula a busca inteligente de estacionamentos/vias públicas
 * próximas a uma coordenada, reutilizado nas páginas "Onde Estacionar" e
 * "Reserva de Evento".
 *
 * O parkingService nunca lança exceção — mesmo em caso de falha (429,
 * timeout, rede), ele resolve com `source: "error"` e uma mensagem
 * amigável. O try/catch abaixo é apenas uma rede de segurança extra,
 * garantindo que a interface nunca quebre independentemente do que
 * aconteça na camada de serviço.
 */
function useParkingSearch() {
  const [results, setResults] = useState([]);
  const [source, setSource] = useState(null); // "parking" | "street" | "none" | "error"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (latitude, longitude, radius = 800) => {
    setLoading(true);
    setError(null);

    try {
      const response = await searchNearbyParkingOptions(latitude, longitude, radius);

      setResults(response.results);
      setSource(response.source);
      setError(response.source === "error" ? response.message : null);
    } catch (unexpectedError) {
      // Não deveria acontecer (o service já trata seus próprios erros),
      // mas garante que a busca nunca derrube a aplicação.
      console.error("Erro inesperado na busca de estacionamento:", unexpectedError);
      setResults([]);
      setSource("error");
      setError("Não foi possível buscar opções para estacionar nesta região.");
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResults([]);
    setSource(null);
    setError(null);
  }, []);

  return { results, source, loading, error, search, reset };
}

export default useParkingSearch;
