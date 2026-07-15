import { FiX } from "react-icons/fi";
import "../styles/Modal.css";

/**
 * Modal genérico reutilizável. Serve de base para modais de confirmação,
 * formulários ou mensagens importantes em todo o sistema.
 */
function Modal({ open, onClose, title, children, maxWidth = 420, closable = true }) {
  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="modal-base" style={{ maxWidth }}>
        {closable && (
          <button
            type="button"
            className="modal-base__close"
            aria-label="Fechar"
            onClick={onClose}
          >
            <FiX />
          </button>
        )}
        {title && <h3 className="modal-base__title">{title}</h3>}
        <div className="modal-base__content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
