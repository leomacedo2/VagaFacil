// Toda manipulação do LocalStorage do VagaFácil acontece neste arquivo.
// Nenhum componente ou página deve acessar o LocalStorage diretamente.

const STORAGE_KEY = "vagafacil:reservations";

function readRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Não foi possível ler as reservas salvas:", error);
    return [];
  }
}

function writeRaw(reservations) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
    return true;
  } catch (error) {
    console.error("Não foi possível salvar as reservas:", error);
    return false;
  }
}

/** Retorna todas as reservas salvas, mais recentes primeiro. */
export function getReservations() {
  return readRaw().sort(
    (a, b) => new Date(b.reservationDate) - new Date(a.reservationDate)
  );
}

/**
 * Salva uma nova reserva e retorna o objeto criado.
 * `reservation` pode incluir customerName e customerEmail, usados apenas
 * para simular o envio do QR Code de acesso (nada é enviado de verdade).
 */
export function saveReservation(reservation) {
  const reservations = readRaw();
  const newReservation = {
    reservationId: `res-${Date.now()}`,
    reservationDate: new Date().toISOString(),
    ...reservation,
  };
  reservations.push(newReservation);
  writeRaw(reservations);
  return newReservation;
}

/** Remove uma reserva pelo id e retorna a lista atualizada. */
export function removeReservation(reservationId) {
  const reservations = readRaw().filter(
    (item) => item.reservationId !== reservationId
  );
  writeRaw(reservations);
  return reservations;
}

/** Remove todas as reservas salvas. */
export function clearReservations() {
  writeRaw([]);
}

/** Retorna os números de vaga já reservados para um evento específico. */
export function getReservedSpotsForEvent(eventId) {
  return readRaw()
    .filter((item) => item.eventId === eventId)
    .map((item) => item.parkingSpot);
}
