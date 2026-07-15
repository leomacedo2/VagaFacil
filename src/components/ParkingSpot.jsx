import { FiCheck, FiX } from "react-icons/fi";
import "../styles/ParkingSpot.css";

/**
 * Representa uma vaga individual do estacionamento.
 * status: "free" | "occupied" | "selected"
 */
function ParkingSpot({ number, status, onSelect }) {
  const isFree = status === "free";
  const isOccupied = status === "occupied";
  const isSelected = status === "selected";

  return (
    <button
      type="button"
      className={`parking-spot parking-spot--${status}`}
      onClick={isFree ? onSelect : undefined}
      disabled={isOccupied}
      aria-pressed={isSelected}
      aria-label={
        isOccupied
          ? `Vaga ${number}, ocupada`
          : isSelected
          ? `Vaga ${number}, selecionada`
          : `Vaga ${number}, livre`
      }
      title={
        isOccupied ? "Ocupada" : isSelected ? "Selecionada" : "Livre"
      }
    >
      {isOccupied && <FiX className="parking-spot__icon" />}
      {isSelected && <FiCheck className="parking-spot__icon" />}
      <span className="parking-spot__number">{number}</span>
    </button>
  );
}

export default ParkingSpot;
