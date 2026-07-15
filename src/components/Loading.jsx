import { FiLoader } from "react-icons/fi";
import "../styles/Loading.css";

/**
 * Componente de carregamento reutilizável.
 * variant: "inline" (spinner + texto) | "skeleton" (cards de skeleton)
 */
function Loading({ variant = "inline", label = "Carregando...", count = 3 }) {
  if (variant === "skeleton") {
    return (
      <div className="loading-skeleton" role="status" aria-label={label}>
        {Array.from({ length: count }).map((_, index) => (
          <div className="loading-skeleton__card" key={index}>
            <div className="loading-skeleton__line loading-skeleton__line--title" />
            <div className="loading-skeleton__line" />
            <div className="loading-skeleton__line loading-skeleton__line--short" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="loading-inline" role="status" aria-live="polite">
      <FiLoader className="loading-inline__icon" />
      <span>{label}</span>
    </div>
  );
}

export default Loading;
