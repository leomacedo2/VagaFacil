import { useCallback, useEffect, useState } from "react";
import {
  getReservations,
  saveReservation,
  removeReservation,
} from "../services/reservationsService";
import useAuth from "./useAuth";

/**
 * Hook que expõe as reservas do usuário autenticado como estado React.
 * Antes lia do LocalStorage (utils/storage.js); agora busca no Firestore
 * através de reservationsService.js, sempre filtrando pelo uid do usuário
 * logado (useAuth). A interface pública do hook não mudou — apenas passou
 * a ser assíncrona internamente.
 */
function useReservations() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setReservations([]);
      return;
    }

    setLoading(true);
    try {
      const data = await getReservations(user.uid);
      setReservations(data);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addReservation = useCallback(
    async (reservation) => {
      const created = await saveReservation({ ...reservation, uid: user.uid });
      await refresh();
      return created;
    },
    [user, refresh]
  );

  const cancelReservation = useCallback(
    async (reservationId) => {
      await removeReservation(reservationId);
      await refresh();
    },
    [refresh]
  );

  return { reservations, loading, addReservation, cancelReservation, refresh };
}

export default useReservations;
