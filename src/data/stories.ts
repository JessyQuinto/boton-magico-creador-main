
export interface Story {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  author: string;
  date: string;
}

export const storiesData: Story[] = [
  {
    id: 1,
    title: "El Arte del Werregue",
    excerpt: "Conoce la técnica milenaria de tejido con fibras naturales que ha pasado de madres a hijas durante siglos en las comunidades afrocolombianas del Chocó.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLswbkOAcmwcFCNgL_xY92lp3tt-l8P_xdDa9NeBLMyAhttCigBtSeeMSBDYWe9t_a6Il0UXOknWI2os6CCt1I9dLJmTvuRwrdpcO5fU8cRdUV6BfD-ABk2X1qCIK4IVXewqMtVh3bp2ZjzYQUxMaICtzPAt-r9sk8cOmScenvCgfOu49lG540ua8ia-fYXo2vJf_I8K9z2g9-wk6qgaeYcJdr8X-iW-TIozAwtMBin40N51OqI-zRafq_1_esIJVjr_nxzGj1",
    readTime: "5 min lectura",
    author: "María del Carmen Mosquera",
    date: "15 de Octubre, 2024"
  },
  {
    id: 2,
    title: "Música y Tradición: El Currulao",
    excerpt: "Descubre cómo los ritmos ancestrales del Pacífico se entrelazan con la creación artesanal, siendo el currulao el corazón de nuestra identidad cultural.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARjqnGyGs8CvQ7D1JDSXhxnB5MeH2OfnX5F5ui3Im92a7iJxkR17wyt54-hX-JqeuJqqVkl7hPUqaTL0xxeGl1DVk9KjZgVpm3GhkCPf4nLPG-4cKFm3OSbZgpkKgkZIF9-ecJ-a7_xfMiF16m-fT6Pzs6FcL5rB4iRaRaQAssWyBd09WQxJbxSZciQzHbIJTJ4E29ZRAak6zXpQKgKdxjQDH8SsKLT9hLdfftb1M8dq1f14rTRoLobFn5fgtgYf7EJs1_S70j",
    readTime: "7 min lectura",
    author: "Jesús Antonio Palacios",
    date: "12 de Octubre, 2024"
  },
  {
    id: 3,
    title: "Sabiduría Ancestral en Cada Talla",
    excerpt: "Los maestros talladores del Chocó mantienen viva una tradición que conecta el mundo espiritual con el material a través de la madera sagrada.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ4XGsCBZ76gbzDLTBUKPL654varlCw0is3FwR5TP-2AgtxRDmuVaQBUgQYhGv5lkIHEZsWWoTzSz5B6CnSZG445gOdpFxA-mfBdpWwyXT2LK2_kjvbec21WiHOYY5MISY1EsF8KIoE8BYs4YizVUXxi_PcuMovWowjXjJOe-Aud0g0665YSEPgGeqresF6-ik1fkpMda7X3H2Fuy7Z-NCCwKrKppYK1w5ST3LJqrn1ab2J-3KsqfY1lFMG0Ew2BfvAIB8BVMn",
    readTime: "6 min lectura",
    author: "Evaristo Corpus Lozano",
    date: "8 de Octubre, 2024"
  }
];
