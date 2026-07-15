import { useState } from "react";
import { FiUser, FiMail, FiX } from "react-icons/fi";
import Button from "./Button";
import "../styles/ReservationFormModal.css";

function ReservationFormModal({ open, eventTitle, parkingSpot, onCancel, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const validate = () => {
    const nextErrors = {};
    if (!name.trim()) {
      nextErrors.name = "Informe seu nome completo.";
    }
    if (!email.trim()) {
      nextErrors.email = "Informe seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Informe um e-mail válido.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit({ name: name.trim(), email: email.trim() });
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setErrors({});
    onCancel();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="reservation-form-modal">
        <button
          type="button"
          className="reservation-form-modal__close"
          aria-label="Fechar"
          onClick={handleCancel}
        >
          <FiX />
        </button>

        <h3 className="reservation-form-modal__title">Confirmar reserva</h3>
        <p className="reservation-form-modal__subtitle">
          Vaga <strong>{parkingSpot}</strong> para <strong>{eventTitle}</strong>.
          Informe seus dados para receber o QR Code de acesso.
        </p>

        <form className="reservation-form-modal__form" onSubmit={handleSubmit} noValidate>
          <label className="reservation-form-modal__field">
            <span><FiUser /> Nome completo</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Digite seu nome"
              autoComplete="name"
            />
            {errors.name && <em className="reservation-form-modal__error">{errors.name}</em>}
          </label>

          <label className="reservation-form-modal__field">
            <span><FiMail /> E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Digite seu e-mail"
              autoComplete="email"
            />
            {errors.email && <em className="reservation-form-modal__error">{errors.email}</em>}
          </label>

          <p className="reservation-form-modal__note">
            Este é um protótipo: nenhum e-mail é enviado de verdade. O QR
            Code será gerado apenas para fins de demonstração.
          </p>

          <div className="reservation-form-modal__actions">
            <Button variant="ghost" type="button" onClick={handleCancel} fullWidth>
              Voltar
            </Button>
            <Button variant="primary" type="submit" fullWidth>
              Confirmar Reserva
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservationFormModal;
