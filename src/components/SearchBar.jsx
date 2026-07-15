import { useEffect, useRef, useState } from "react";
import { FiSearch, FiMapPin, FiLoader, FiX } from "react-icons/fi";
import { searchPlaces } from "../services/geocodingService";
import "../styles/SearchBar.css";

const DEBOUNCE_MS = 500;

/**
 * Campo de busca de destinos com debounce, consumindo exclusivamente o
 * geocodingService (nunca chama a API diretamente).
 */
function SearchBar({
  placeholder = "Pesquisar destino...",
  onSelectPlace,
  autoFocus = false,
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 3) {
      setSuggestions([]);
      setError(null);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchPlaces(query);
        setSuggestions(results);
        setError(results.length === 0 ? "Nenhum resultado encontrado." : null);
      } catch (searchError) {
        setError(searchError.message || "Não foi possível localizar este destino.");
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (place) => {
    setQuery(place.name);
    setOpen(false);
    setSuggestions([]);
    onSelectPlace?.(place);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setError(null);
    setOpen(false);
  };

  return (
    <div className="search-bar" ref={containerRef}>
      <div className="search-bar__field">
        <FiSearch className="search-bar__icon" />
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label={placeholder}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        {loading && <FiLoader className="search-bar__spinner" aria-hidden="true" />}
        {!loading && query && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={handleClear}
            aria-label="Limpar pesquisa"
          >
            <FiX />
          </button>
        )}
      </div>

      {open && (suggestions.length > 0 || error) && (
        <ul className="search-bar__suggestions">
          {suggestions.map((place) => (
            <li key={place.placeId}>
              <button type="button" onClick={() => handleSelect(place)}>
                <FiMapPin />
                <span>
                  <strong>{place.name}</strong>
                  <small>{place.displayName}</small>
                </span>
              </button>
            </li>
          ))}
          {error && suggestions.length === 0 && (
            <li className="search-bar__message">{error}</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
