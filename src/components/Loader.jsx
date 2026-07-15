import { PiCarProfileFill } from "react-icons/pi";
import "../styles/Loader.css";

function Loader() {
  return (
    <div className="loader">
      <span className="loader__icon">
        <PiCarProfileFill />
      </span>
      <span className="loader__bar">
        <span className="loader__bar-fill" />
      </span>
    </div>
  );
}

export default Loader;
