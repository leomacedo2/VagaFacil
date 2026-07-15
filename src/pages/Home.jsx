import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiNavigation, FiCalendar } from "react-icons/fi";
import Hero from "../components/Hero";
import InfoCard from "../components/InfoCard";
import SectionTitle from "../components/SectionTitle";
import EventCard from "../components/EventCard";
import FreeParkingModal from "../components/FreeParkingModal";
import Button from "../components/Button";
import events from "../data/events";
import "../styles/Home.css";

const benefits = [
  {
    icon: <FiMapPin />,
    title: "Escolha um destino",
    description: "Pesquise qualquer lugar utilizando nosso mapa.",
  },
  {
    icon: <FiNavigation />,
    title: "Encontre onde estacionar",
    description:
      "Visualize estacionamentos e vias públicas próximas ao seu destino.",
  },
  {
    icon: <FiCalendar />,
    title: "Reserve sua vaga",
    description:
      "Quando disponível, reserve antecipadamente em eventos parceiros.",
  },
];

const featuredEvents = events.slice(0, 4);

function Home() {
  const [freeParkingEvent, setFreeParkingEvent] = useState(null);

  return (
    <div className="page home">
      <Hero
        title="Encontre o melhor lugar para estacionar antes mesmo de sair de casa."
        subtitle="O VagaFácil pesquisa estacionamentos e vias públicas próximas ao seu destino, além de permitir reservas em eventos parceiros."
        primaryAction={{ label: "Onde Estacionar", to: "/onde-estacionar" }}
        secondaryAction={{ label: "Ver Eventos", to: "/eventos" }}
      />

      <section className="home__how container">
        <SectionTitle
          eyebrow="Como funciona"
          title="Do destino à vaga, em três passos"
        />

        <div className="home__benefits">
          {benefits.map((benefit) => (
            <InfoCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </section>

      <section className="home__events container">
        <SectionTitle
          eyebrow="Eventos parceiros"
          title="Eventos populares"
          description="Reserve sua vaga oficial com antecedência nos maiores eventos do país."
          align="left"
        />

        <div className="home__events-grid">
          {featuredEvents.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              onShowFreeParking={setFreeParkingEvent}
            />
          ))}
        </div>

        <div className="home__events-footer">
          <Link to="/eventos">
            <Button variant="secondary">Ver Todos</Button>
          </Link>
        </div>
      </section>

      <FreeParkingModal
        open={Boolean(freeParkingEvent)}
        event={freeParkingEvent}
        onClose={() => setFreeParkingEvent(null)}
      />
    </div>
  );
}

export default Home;
