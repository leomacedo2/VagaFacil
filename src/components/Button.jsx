import "../styles/Button.css";

/**
 * Botão reutilizável do sistema.
 * variant: "primary" | "secondary" | "ghost" | "danger"
 * size: "md" | "lg"
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  type = "button",
  disabled = false,
  onClick,
  as,
  href,
  fullWidth = false,
}) {
  const classNames = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (as === "link" && href) {
    return (
      <a href={href} className={classNames}>
        {icon && <span className="btn__icon">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
