export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  rating: string;
  img: string;
  site: string;
  detail: string;
  tags: string[];
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Excelente profissional, trabalho de qualidade e muito inteligente.",
    name: "Emmanuel Augusto",
    role: "Product Owner, Active Track Brasil",
    initials: "EA",
    rating: "5.0",
    img: "/partners/atk.png",
    site: "https://www.activetrack.com.br/",
    detail:
      "Desenvolvimento de 3 aplicativos para gestão de frota e patrulhamento (ActiveTrack Rastreio, Active Control e Active Patrulha), além de uma API de streaming de áudio e vídeo integrada ao sistema.",
    tags: ["Android", "iOS", "API", "Responsive Web"],
  },
  {
    quote:
      "Desenvolvedor de ponta, excelente, fez um trabalho incrível em um tempo absurdamente curto. Recomendo completamente.",
    name: "Mateus Moutinho",
    role: "Product Owner, OUI Tecnologia",
    initials: "MM",
    rating: "5.0",
    img: "",
    site: "https://www.oui.com.br/",
    detail:
      "Reestilização completa da interface de um sistema de gestão para advogados (HTML/CSS sobre back-end em Python/Flask).",
    tags: ["CSS", "HTML5", "Flask"],
  },
  {
    quote:
      "Ótimo profissional. Entregou o aplicativo no prazo e com a qualidade esperada.",
    name: "Alen Cruz",
    role: "Gerente de marketing, Blue Moto Rent",
    initials: "AC",
    rating: "5.0",
    img: "/partners/blue.png",
    site: "https://www.bluemotorent.com/",
    detail:
      "Entrega de solução digital para apoiar a operação da Blue Moto Rent, com foco em confiabilidade, prazo e clareza no processo de desenvolvimento.",
    tags: ["Sistema web", "Locação", "Operação"],
  },
  {
    quote:
      "Ótimo profissional. Entregou o aplicativo no prazo e com a qualidade esperada.",
    name: "Rafale Lima",
    role: "Empreendedor",
    initials: "RL",
    rating: "5.0",
    img: "/partners/rl.png",
    site: "https://www.rlergonomia.com.br/",
    detail: "Sistema LSM para aulas de fisioterapia.",
    tags: ["Sistema web", "fisioterapia", "Educação"],
  },
];
