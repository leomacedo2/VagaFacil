import emailjs from "@emailjs/browser";

// Serviço responsável pelo envio do e-mail de confirmação de reserva,
// utilizando o EmailJS (solução gratuita que funciona 100% no front-end,
// sem necessidade de backend próprio). Nenhum componente chama o SDK do
// EmailJS diretamente — apenas este service.

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Envia o e-mail de confirmação de reserva para o usuário.
 * Nunca lança exceção para fora: se o EmailJS não estiver configurado ou
 * o envio falhar, registra um aviso no console e resolve normalmente,
 * para que uma falha no e-mail nunca quebre o fluxo de reserva (a reserva
 * já foi salva antes deste envio ser disparado).
 */
export async function sendReservationConfirmationEmail({
  toName,
  toEmail,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  parkingSpot,
}) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn(
      "EmailJS não configurado (variáveis VITE_EMAILJS_* ausentes). " +
        "O e-mail de confirmação não foi enviado, mas a reserva foi salva normalmente."
    );
    return { sent: false, reason: "not-configured" };
  }

  const templateParams = {
    to_name: toName,
    to_email: toEmail,
    event_title: eventTitle,
    event_date: eventDate,
    event_time: eventTime,
    event_location: eventLocation,
    parking_spot: parkingSpot,
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY,
    });
    return { sent: true };
  } catch (error) {
    console.error("Falha ao enviar e-mail de confirmação via EmailJS:", error);
    return { sent: false, reason: "send-failed" };
  }
}

export default { sendReservationConfirmationEmail };
