// Base local de estacionamentos e vias conhecidas, usada apenas como
// último recurso: quando TODOS os mirrors da Overpass API falham (429,
// timeout ou erro de rede) para as duas buscas (estacionamentos e vias
// públicas). Garante que uma demonstração nunca fique sem resultados por
// causa da indisponibilidade de uma API pública externa.
//
// As coordenadas são aproximadas (próximas aos locais reais dos eventos
// cadastrados em data/events.js e de pontos conhecidos de Aracaju/SE, região
// padrão usada nas demonstrações), o suficiente para um protótipo.

const offlineParkingFallback = [
  // --- Próximo ao Estádio do Morumbi (evento "Show do Coldplay") ---
  { id: "offline-1", kind: "parking", name: "Estacionamento Morumbi Shopping", latitude: -23.5985, longitude: -46.7099, fee: "Pago", address: "Av. Roque Petroni Júnior" },
  { id: "offline-2", kind: "street", name: "Rua Elvira Ferraz", latitude: -23.6021, longitude: -46.7143, highwayType: "residential" },

  // --- Próximo ao Autódromo de Interlagos (evento "Lollapalooza Brasil") ---
  { id: "offline-3", kind: "parking", name: "Estacionamento Autódromo José Carlos Pace", latitude: -23.7009, longitude: -46.6969, fee: "Pago", address: "Av. Sen. Teotônio Vilela" },
  { id: "offline-4", kind: "street", name: "Av. Sen. Teotônio Vilela", latitude: -23.7061, longitude: -46.7025, highwayType: "service" },

  // --- Próximo ao Maracanã (evento "Brasil x Argentina") ---
  { id: "offline-5", kind: "parking", name: "Estacionamento Maracanã", latitude: -22.9128, longitude: -43.2333, fee: "Pago", address: "Rua Prof. Eurico Rabelo" },
  { id: "offline-6", kind: "street", name: "Rua Professor Eurico Rabelo", latitude: -22.9145, longitude: -43.2278, highwayType: "residential" },

  // --- Próximo ao Anhembi (evento "Campus Party") ---
  { id: "offline-7", kind: "parking", name: "Estacionamento Parque Anhembi", latitude: -23.5164, longitude: -46.6266, fee: "Pago", address: "Av. Olavo Fontoura" },
  { id: "offline-8", kind: "street", name: "Av. Olavo Fontoura", latitude: -23.512, longitude: -46.6205, highwayType: "service" },

  // --- Próximo ao São Paulo Expo (evento "Comic Con Experience") ---
  { id: "offline-9", kind: "parking", name: "Estacionamento São Paulo Expo", latitude: -23.6551, longitude: -46.6698, fee: "Pago", address: "Rodovia dos Imigrantes" },
  { id: "offline-10", kind: "street", name: "Av. Interlagos", latitude: -23.6497, longitude: -46.6743, highwayType: "residential" },

  // --- Próximo ao Parque da Cidade, Campos do Jordão (evento "Festival de Inverno") ---
  { id: "offline-11", kind: "parking", name: "Estacionamento Parque da Cidade", latitude: -22.7405, longitude: -45.5931, fee: "Gratuito", address: "Av. Frei Orestes Girardi" },
  { id: "offline-12", kind: "street", name: "Av. Frei Orestes Girardi", latitude: -22.7371, longitude: -45.5888, highwayType: "residential" },

  // --- Próximo ao Allianz Parque (evento "Show Jorge & Mateus") ---
  { id: "offline-13", kind: "parking", name: "Estacionamento Allianz Parque", latitude: -23.5268, longitude: -46.6801, fee: "Pago", address: "Rua Turiassu" },
  { id: "offline-14", kind: "street", name: "Rua Turiassu", latitude: -23.5297, longitude: -46.6759, highwayType: "residential" },

  // --- Próximo ao Expo Center Norte (evento "Feira de Tecnologia") ---
  { id: "offline-15", kind: "parking", name: "Estacionamento Expo Center Norte", latitude: -23.5091, longitude: -46.6225, fee: "Pago", address: "Rua José Bernardo Pinto" },
  { id: "offline-16", kind: "street", name: "Rua Voluntários da Pátria", latitude: -23.5057, longitude: -46.6178, highwayType: "residential" },

  // --- Pontos conhecidos em Aracaju/SE, usados como demonstrações de
  //     "Onde Estacionar" para destinos livres perto da região do apresentador ---
  { id: "offline-17", kind: "parking", name: "Estacionamento Shopping Jatiúca", latitude: -10.9598, longitude: -37.0518, fee: "Pago", address: "Av. Ministro Geraldo Barreto Sobral" },
  { id: "offline-18", kind: "parking", name: "Estacionamento Aracaju Parque Shopping", latitude: -10.9147, longitude: -37.0559, fee: "Pago", address: "Av. Adélia Franco" },
  { id: "offline-19", kind: "street", name: "Av. Beira Mar", latitude: -10.9922, longitude: -37.0454, highwayType: "residential" },
  { id: "offline-20", kind: "street", name: "Rua Laranjeiras", latitude: -10.9114, longitude: -37.0704, highwayType: "residential" },
  { id: "offline-21", kind: "parking", name: "Estacionamento Universidade Federal de Sergipe", latitude: -10.9298, longitude: -37.1128, fee: "Gratuito", address: "Av. Marechal Rondon" },
  { id: "offline-22", kind: "street", name: "Av. Marechal Rondon", latitude: -10.9328, longitude: -37.1095, highwayType: "service" },
];

export default offlineParkingFallback;
