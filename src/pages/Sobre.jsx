import {
  FiAlertOctagon,
  FiCheckCircle,
  FiTarget,
  FiGitBranch,
  FiPlayCircle,
} from "react-icons/fi";
import { SiReact, SiReactrouter, SiLeaflet, SiOpenstreetmap } from "react-icons/si";
import { BsDatabase } from "react-icons/bs";
import SectionTitle from "../components/SectionTitle";
import "../styles/Sobre.css";

const sections = [
  {
    icon: <FiAlertOctagon />,
    title: "O problema",
    text: "Motoristas perdem muito tempo procurando estacionamento. Grandes eventos geram filas enormes e, em muitos locais, o usuário não sabe onde pode estacionar com segurança ou quais alternativas existem próximas ao destino.",
  },
  {
    icon: <FiCheckCircle />,
    title: "A solução",
    text: "O VagaFácil centraliza essas informações: ajuda motoristas a encontrar onde estacionar perto de qualquer destino, priorizando estacionamentos cadastrados e sugerindo vias públicas próximas quando não existirem opções oficiais.",
  },
  {
    icon: <FiTarget />,
    title: "Objetivo",
    text: "Ser um protótipo funcional de plataforma inteligente de estacionamento, demonstrando busca em tempo real, mapas interativos e reserva de vagas em eventos parceiros — tudo sem depender de um backend.",
  },
  {
    icon: <FiGitBranch />,
    title: "Arquitetura",
    text: "O projeto separa responsabilidades em components, pages, hooks, services e utils. Toda comunicação com APIs externas passa por services (geocodingService, parkingService, mapsService) e toda persistência local passa por storage.js.",
  },
  {
    icon: <FiPlayCircle />,
    title: "Fluxo do protótipo",
    text: "O usuário pesquisa um destino (Nominatim), o sistema busca estacionamentos próximos via Overpass API e, quando não existem, sugere vias públicas. Em eventos parceiros, o usuário também pode reservar uma vaga oficial, salva no LocalStorage.",
  },
];

const techStack = [
  { icon: <SiReact />, label: "React" },
  { icon: <SiReactrouter />, label: "React Router" },
  { icon: <SiLeaflet />, label: "Leaflet" },
  { icon: <SiOpenstreetmap />, label: "OpenStreetMap" },
  { icon: <BsDatabase />, label: "LocalStorage" },
];

function Sobre() {
  return (
    <div className="page sobre">
      <div className="container">
        <SectionTitle
          eyebrow="Sobre o VagaFácil"
          title="Um protótipo pensado para resolver um problema real"
          description="Conheça o racional, a arquitetura e as tecnologias por trás do projeto."
          align="left"
        />

        <div className="sobre__list">
          {sections.map((section) => (
            <div className="sobre__item" key={section.title}>
              <div className="sobre__icon">{section.icon}</div>
              <div>
                <h3>{section.title}</h3>
                <p>{section.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="sobre__tech">
          <h3>Tecnologias utilizadas</h3>
          <div className="sobre__tech-grid">
            {techStack.map((tech) => (
              <div className="sobre__tech-card" key={tech.label}>
                <span>{tech.icon}</span>
                <p>{tech.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sobre;
