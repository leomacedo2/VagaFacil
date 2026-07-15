import { FiCheckCircle } from "react-icons/fi";
import "../styles/Toast.css";

function Toast({ message, visible }) {
  return (
    <div
      className={`toast ${visible ? "toast--visible" : ""}`}
      role="status"
      aria-live="polite"
    >
      <FiCheckCircle className="toast__icon" />
      <span>{message}</span>
    </div>
  );
}

export default Toast;
