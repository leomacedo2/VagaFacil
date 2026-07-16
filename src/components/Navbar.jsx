import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PiCarProfileFill } from "react-icons/pi";
import { HiMenu, HiX } from "react-icons/hi";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import "../styles/Navbar.css";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/eventos", label: "Eventos" },
  { to: "/onde-estacionar", label: "Onde Estacionar" },
  { to: "/minhas-reservas", label: "Minhas Reservas" },
  { to: "/sobre", label: "Sobre" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, []);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <span className="navbar__brand-icon">
            <PiCarProfileFill />
          </span>
          VagaFácil
        </NavLink>

        <nav className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          <div className="navbar__auth">
            {user ? (
              <>
                <span className="navbar__greeting">
                  Olá, {user.displayName || user.email.split("@")[0]}
                </span>
                <button type="button" className="navbar__logout" onClick={handleLogout}>
                  <FiLogOut /> Sair
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="navbar__login"
                onClick={() => setOpen(false)}
              >
                <FiLogIn /> Entrar
              </NavLink>
            )}
          </div>
        </nav>

        <button
          className="navbar__toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
