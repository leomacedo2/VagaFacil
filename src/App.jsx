import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Eventos from "./pages/Eventos";
import Reserva from "./pages/Reserva";
import OndeEstacionar from "./pages/OndeEstacionar";
import MinhasReservas from "./pages/MinhasReservas";
import Sobre from "./pages/Sobre";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Simula um carregamento leve ao trocar de página, melhorando a percepção
  // de transição entre as rotas do protótipo.
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 350);
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      <Navbar />

      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/reserva/:id" element={<Reserva />} />
          <Route path="/onde-estacionar" element={<OndeEstacionar />} />
          <Route path="/minhas-reservas" element={<MinhasReservas />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}

      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
