import { useCallback, useEffect, useState } from "react";
import {
  getReservations,
  saveReservation,
  removeReservation,
  clearReservations,
} from "../utils/storage";

/**
 * Hook que expõe as reservas salvas no LocalStorage como estado React,
 * evitando que páginas e componentes acessem storage.js diretamente
 * sem necessidade de recarregar a página para refletir mudanças.
 */
function useReservations() {
  const [reservations, setReservations] = useState([]);

  const refresh = useCallback(() => {
    setReservations(getReservations());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addReservation = useCallback(
    (reservation) => {
      const created = saveReservation(reservation);
      refresh();
      return created;
    },
    [refresh]
  );

  const cancelReservation = useCallback(
    (reservationId) => {
      removeReservation(reservationId);
      refresh();
    },
    [refresh]
  );

  const clearAll = useCallback(() => {
    clearReservations();
    refresh();
  }, [refresh]);

  return { reservations, addReservation, cancelReservation, clearAll, refresh };
}

export default useReservations;
