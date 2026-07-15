// Sugestões de estacionamentos públicos e privados próximos a cada evento.
// Dados meramente ilustrativos para o protótipo — não refletem locais reais.

const nearbyParking = [
  // Show do Coldplay (id: 1)
  {
    id: "np-1-1",
    eventId: "1",
    name: "Rua das Palmeiras",
    type: "Público",
    distance: "450 metros",
    walkingTime: "6 minutos",
    price: null,
    observation: "Vagas públicas, sujeitas a disponibilidade e rodízio.",
  },
  {
    id: "np-1-2",
    eventId: "1",
    name: "Estacionamento Central Morumbi",
    type: "Privado",
    distance: "300 metros",
    walkingTime: "4 minutos",
    price: 20,
    observation: "Pagamento realizado no local, aceita cartão e Pix.",
  },
  {
    id: "np-1-3",
    eventId: "1",
    name: "Shopping Morumbi Parking",
    type: "Privado",
    distance: "700 metros",
    walkingTime: "9 minutos",
    price: 30,
    observation: "Estacionamento coberto, indicado em dias de chuva.",
  },

  // Lollapalooza (id: 2)
  {
    id: "np-2-1",
    eventId: "2",
    name: "Avenida Interlagos",
    type: "Público",
    distance: "600 metros",
    walkingTime: "8 minutos",
    price: null,
    observation: "Alta procura durante o festival, chegar com antecedência.",
  },
  {
    id: "np-2-2",
    eventId: "2",
    name: "Pátio Autódromo Privado",
    type: "Privado",
    distance: "250 metros",
    walkingTime: "3 minutos",
    price: 50,
    observation: "Vagas limitadas, recomenda-se reservar horário de chegada.",
  },

  // Brasil x Argentina (id: 3)
  {
    id: "np-3-1",
    eventId: "3",
    name: "Rua Professor Eurico Rabelo",
    type: "Público",
    distance: "500 metros",
    walkingTime: "7 minutos",
    price: null,
    observation: "Trânsito intenso em dias de jogo, evite carro se possível.",
  },
  {
    id: "np-3-2",
    eventId: "3",
    name: "Estacionamento Maracanã Oficial Anexo",
    type: "Privado",
    distance: "350 metros",
    walkingTime: "5 minutos",
    price: 35,
    observation: "Segurança 24h e acesso facilitado para o setor Norte.",
  },

  // Campus Party (id: 4)
  {
    id: "np-4-1",
    eventId: "4",
    name: "Rua Professor Milton Rodrigues",
    type: "Público",
    distance: "400 metros",
    walkingTime: "5 minutos",
    price: null,
    observation: "Fluxo moderado, boa opção nos dias de semana.",
  },
  {
    id: "np-4-2",
    eventId: "4",
    name: "Anhembi Parking Privado",
    type: "Privado",
    distance: "150 metros",
    walkingTime: "2 minutos",
    price: 25,
    observation: "Estacionamento oficial do complexo, portão 5.",
  },

  // Comic Con (id: 5)
  {
    id: "np-5-1",
    eventId: "5",
    name: "Rua Dr. Alberto Seabra",
    type: "Público",
    distance: "550 metros",
    walkingTime: "7 minutos",
    price: null,
    observation: "Poucas vagas aos finais de semana, chegar cedo.",
  },
  {
    id: "np-5-2",
    eventId: "5",
    name: "Estacionamento São Paulo Expo",
    type: "Privado",
    distance: "200 metros",
    walkingTime: "3 minutos",
    price: 40,
    observation: "Maior procura no sábado, valores podem variar por hora.",
  },

  // Festival de Inverno (id: 6)
  {
    id: "np-6-1",
    eventId: "6",
    name: "Rua Djalma Forjaz",
    type: "Público",
    distance: "300 metros",
    walkingTime: "4 minutos",
    price: null,
    observation: "Vagas em subida, atenção ao estacionar em dias de chuva.",
  },
  {
    id: "np-6-2",
    eventId: "6",
    name: "Pátio Parque da Cidade",
    type: "Privado",
    distance: "100 metros",
    walkingTime: "1 minuto",
    price: 15,
    observation: "Acesso direto à entrada principal do evento.",
  },

  // Show Jorge & Mateus (id: 7)
  {
    id: "np-7-1",
    eventId: "7",
    name: "Rua Turiassu",
    type: "Público",
    distance: "500 metros",
    walkingTime: "6 minutos",
    price: null,
    observation: "Vagas concorridas, considere caronas ou apps.",
  },
  {
    id: "np-7-2",
    eventId: "7",
    name: "Allianz Parque Estacionamento Oficial",
    type: "Privado",
    distance: "180 metros",
    walkingTime: "2 minutos",
    price: 45,
    observation: "Acesso rápido pelo portão A, aceita reserva antecipada.",
  },

  // Feira de Tecnologia (id: 8)
  {
    id: "np-8-1",
    eventId: "8",
    name: "Rua Voluntários da Pátria",
    type: "Público",
    distance: "420 metros",
    walkingTime: "5 minutos",
    price: null,
    observation: "Boa disponibilidade em dias úteis pela manhã.",
  },
  {
    id: "np-8-2",
    eventId: "8",
    name: "Expo Center Norte Parking",
    type: "Privado",
    distance: "120 metros",
    walkingTime: "2 minutos",
    price: 22,
    observation: "Estacionamento oficial do centro de eventos.",
  },
];

export default nearbyParking;
