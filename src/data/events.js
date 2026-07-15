// Dados fictícios de eventos para demonstração do protótipo.
// Em uma versão futura, esses dados viriam de uma API.

const events = [
  {
    id: "1",
    title: "Show do Coldplay",
    category: "Show",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200&auto=format&fit=crop",
    location: "Estádio do Morumbi, São Paulo - SP",
    latitude: -23.6,
    longitude: -46.7167,
    date: "2026-09-12T20:00:00",
    description:
      "A turnê Music of the Spheres chega ao Brasil com um espetáculo de luzes, efeitos visuais e os maiores sucessos da banda britânica.",
    parkingPrice: 45,
    availableSpots: 18,
  },
  {
    id: "2",
    title: "Lollapalooza Brasil",
    category: "Festival",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop",
    location: "Autódromo de Interlagos, São Paulo - SP",
    latitude: -23.7036,
    longitude: -46.6997,
    date: "2026-03-21T12:00:00",
    description:
      "Três dias de música com atrações nacionais e internacionais em múltiplos palcos simultâneos.",
    parkingPrice: 60,
    availableSpots: 4,
  },
  {
    id: "3",
    title: "Brasil x Argentina",
    category: "Esporte",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200&auto=format&fit=crop",
    location: "Maracanã, Rio de Janeiro - RJ",
    latitude: -22.9121,
    longitude: -43.2302,
    date: "2026-10-05T21:30:00",
    description:
      "Clássico das Eliminatórias da Copa entre as duas maiores seleções da América do Sul.",
    parkingPrice: 80,
    availableSpots: 0,
  },
  {
    id: "4",
    title: "Campus Party",
    category: "Tecnologia",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    location: "Anhembi, São Paulo - SP",
    latitude: -23.5145,
    longitude: -46.6237,
    date: "2026-07-30T09:00:00",
    description:
      "O maior evento de inovação, tecnologia e cultura digital da América Latina, com palestras e hackathons.",
    parkingPrice: 25,
    availableSpots: 32,
  },
  {
    id: "5",
    title: "Comic Con Experience",
    category: "Cultura Pop",
    image:
      "https://images.unsplash.com/photo-1608889175638-9322300c46e6?q=80&w=1200&auto=format&fit=crop",
    location: "São Paulo Expo, São Paulo - SP",
    latitude: -23.6529,
    longitude: -46.6717,
    date: "2026-12-04T10:00:00",
    description:
      "O maior evento de cultura pop do Brasil, reunindo cinema, games, quadrinhos e séries em um só lugar.",
    parkingPrice: 35,
    availableSpots: 12,
  },
  {
    id: "6",
    title: "Festival de Inverno",
    category: "Festival",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop",
    location: "Parque da Cidade, Campos do Jordão - SP",
    latitude: -22.7392,
    longitude: -45.591,
    date: "2026-07-18T15:00:00",
    description:
      "Apresentações musicais e culturais em meio à serra, celebrando o inverno na cidade mais charmosa de São Paulo.",
    parkingPrice: 20,
    availableSpots: 27,
  },
  {
    id: "7",
    title: "Show Jorge & Mateus",
    category: "Show",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1200&auto=format&fit=crop",
    location: "Allianz Parque, São Paulo - SP",
    latitude: -23.5275,
    longitude: -46.6788,
    date: "2026-08-22T21:00:00",
    description:
      "A dupla sertaneja de maior sucesso do país retorna aos palcos com uma turnê especial.",
    parkingPrice: 40,
    availableSpots: 9,
  },
  {
    id: "8",
    title: "Feira de Tecnologia",
    category: "Tecnologia",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    location: "Expo Center Norte, São Paulo - SP",
    latitude: -23.5083,
    longitude: -46.6203,
    date: "2026-11-10T09:00:00",
    description:
      "Exposição de startups, produtos e tendências que vão moldar o futuro da tecnologia no Brasil.",
    parkingPrice: 15,
    availableSpots: 40,
  },
];

export default events;
