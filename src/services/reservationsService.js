import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Serviço responsável por toda comunicação com o Firestore para reservas.
// Substitui as funções de reserva que antes viviam em utils/storage.js
// (localStorage). Nenhum componente deve chamar o Firestore diretamente —
// apenas este service, seguindo o mesmo padrão dos demais services.

const RESERVATIONS_COLLECTION = "reservations";

/**
 * Retorna todas as reservas do usuário informado (mais recentes primeiro).
 * A ordenação é feita no cliente para evitar a necessidade de um índice
 * composto no Firestore (where + orderBy na mesma consulta).
 */
export async function getReservations(uid) {
  if (!uid) return [];

  const reservationsQuery = query(
    collection(db, RESERVATIONS_COLLECTION),
    where("uid", "==", uid)
  );

  const snapshot = await getDocs(reservationsQuery);
  const reservations = snapshot.docs.map((docSnapshot) => ({
    reservationId: docSnapshot.id,
    ...docSnapshot.data(),
  }));

  return reservations.sort(
    (a, b) => new Date(b.reservationDate) - new Date(a.reservationDate)
  );
}

/** Salva uma nova reserva associada ao uid do usuário autenticado. */
export async function saveReservation(reservation) {
  const payload = {
    ...reservation,
    reservationDate: new Date().toISOString(),
  };

  const docRef = await addDoc(collection(db, RESERVATIONS_COLLECTION), payload);

  return { reservationId: docRef.id, ...payload };
}

/** Remove uma reserva pelo id do documento no Firestore. */
export async function removeReservation(reservationId) {
  await deleteDoc(doc(db, RESERVATIONS_COLLECTION, reservationId));
}

/**
 * Retorna os números de vaga já reservados para um evento, considerando
 * reservas de TODOS os usuários (necessário para saber quais vagas do
 * estacionamento oficial já estão ocupadas).
 */
export async function getReservedSpotsForEvent(eventId) {
  if (!eventId) return [];

  const eventQuery = query(
    collection(db, RESERVATIONS_COLLECTION),
    where("eventId", "==", eventId)
  );

  const snapshot = await getDocs(eventQuery);
  return snapshot.docs.map((docSnapshot) => docSnapshot.data().parkingSpot);
}

export default {
  getReservations,
  saveReservation,
  removeReservation,
  getReservedSpotsForEvent,
};
