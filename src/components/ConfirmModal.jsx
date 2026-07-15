import { FiAlertCircle } from "react-icons/fi";
import Button from "./Button";
import "../styles/ConfirmModal.css";

function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal__icon">
          <FiAlertCircle />
        </div>
        <h3 className="modal__title">{title}</h3>
        <p className="modal__description">{description}</p>
        <div className="modal__actions">
          <Button variant="ghost" onClick={onCancel} fullWidth>
            {cancelLabel}
          </Button>
          <Button variant="primary" onClick={onConfirm} fullWidth>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
