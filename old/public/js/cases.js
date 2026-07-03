const casesContainer = document.querySelector("#cases-grid");

export const cases = [
  {
    title: "ActiveTrack Rastreamento",
    description:
      "Aplicativo mobile para rastreamento e gestão de frota, com visualização de veículos em mapa, histórico de deslocamento e apoio à tomada de decisão operacional.",
    cover: {
      path: "public/img/covers/active-track.png",
      alt: "Interface do aplicativo ActiveTrack Rastreamento com mapa e acompanhamento de frota",
    },
    type: "Segurança operacional",
    iconType: '<i data-lucide="shield-check" class="h-4 w-4"></i>',
    stacks: [
      "React Native",
      "Expo",
      "Google APIs",
      "TypeScript",
      "Geolocalização",
    ],
    results: [
      "Centralização do acompanhamento da frota em uma experiência mobile.",
      "Mais rastreabilidade para deslocamentos, rotas e atividades em campo.",
      "Base técnica preparada para evoluir integrações e recursos de monitoramento.",
    ],
  },
  {
    title: "ActiveTrack Patrol",
    description:
      "Aplicativo mobile para equipes de patrulhamento registrarem rondas, ocorrências e eventos SOS, com monitoramento em tempo real das operações de segurança.",
    cover: {
      path: "public/img/covers/active-track.png",
      alt: "Interface do aplicativo ActiveTrack Patrol para patrulhamento e registro de ocorrências",
    },
    type: "Segurança operacional",
    iconType: '<i data-lucide="shield-check" class="h-4 w-4"></i>',
    stacks: ["React Native", "Expo", "Google APIs", "TypeScript"],
    results: [
      "Registro digital das rondas e ocorrências em campo.",
      "Redução do tempo de resposta em situações críticas.",
      "Mais visibilidade para gestores acompanharem equipes em tempo real.",
    ],
  },
  {
    title: "ActiveTrack Control",
    description:
      "Aplicativo mobile para registro de atividades patrimoniais, acompanhamento de equipes em campo e organização dos eventos operacionais em tempo real.",
    cover: {
      path: "public/img/covers/active-track.png",
      alt: "Interface do aplicativo ActiveTrack Control para acompanhamento de atividades patrimoniais",
    },
    type: "Segurança operacional",
    iconType: '<i data-lucide="shield-check" class="h-4 w-4"></i>',
    stacks: ["React Native", "Expo", "Google APIs", "TypeScript"],
    results: [
      "Padronização dos registros operacionais feitos pelas equipes.",
      "Acompanhamento mais claro das atividades patrimoniais.",
      "Menos dependência de controles manuais e comunicação dispersa.",
    ],
  },
  {
    title: "API de livestream",
    description:
      "API integrada ao ActiveTrack Patrol para transmissões ao vivo pelo celular, com autenticação, gerenciamento de sessões e distribuição do conteúdo em tempo real.",
    cover: {
      path: "public/img/covers/active-track.png",
      alt: "Interface do ActiveTrack com suporte a transmissões ao vivo em operação de segurança",
    },
    type: "Tempo real",
    iconType: '<i data-lucide="radio-tower" class="h-4 w-4"></i>',
    stacks: ["Fastify", "Swagger", "OpenAPI", "Node.js", "TypeScript"],
    results: [
      "Transmissões ao vivo conectadas ao fluxo operacional do aplicativo.",
      "Arquitetura preparada para múltiplas sessões simultâneas.",
      "Melhor contexto visual para tomada de decisão em ocorrências.",
    ],
  },
  {
    title: "Blue Moto Rent - Sistema de locação e assinatura de motocicletas",
    description:
      "Plataforma para gestão de locação e assinatura de motocicletas, com contratos, validação de documentos, planos, clientes e operação administrativa em um só lugar.",
    cover: {
      path: "public/img/covers/blue-moto-rent.png",
      alt: "Interface da plataforma Blue Moto Rent para locação e assinatura de motocicletas",
    },
    type: "Locação",
    iconType: '<i data-lucide="bike" class="h-4 w-4"></i>',
    stacks: [
      "Fastify",
      "Swagger",
      "OpenAPI",
      "Node.js",
      "TypeScript",
      "Prisma ORM",
      "PostgreSQL",
    ],
    results: [
      "Automação de etapas do processo de locação.",
      "Mais controle sobre contratos, documentos e planos ativos.",
      "Redução de tarefas operacionais repetitivas no atendimento e gestão.",
    ],
  },
  {
    title: "Ergopro - Plataforma de ergonomia online",
    description:
      "Plataforma LMS para programas de ergonomia online, com aplicação de práticas, conteúdos e acompanhamento voltados a equipes do varejo.",
    cover: {
      path: "public/img/covers/rl-fisioterapia.png",
      alt: "Imagem de capa padrão para a plataforma Ergopro de ergonomia online",
    },
    type: "Ergonomia",
    iconType: '<i data-lucide="graduation-cap" class="h-4 w-4"></i>',
    stacks: [
      "Fastify",
      "Swagger",
      "OpenAPI",
      "Node.js",
      "TypeScript",
      "Prisma ORM",
      "PostgreSQL",
      "React",
      "TanStack Router",
      "Vite",
    ],
    results: [
      "Digitalização da experiência de treinamento e orientação ergonômica.",
      "Conteúdo organizado em uma jornada online mais fácil de acompanhar.",
      "Base escalável para atender equipes distribuídas em diferentes unidades.",
    ],
  },
  {
    title: "Engage - Área do cliente",
    description:
      "Área interna para clientes acompanharem processos seletivos em andamento, consultarem status e terem mais clareza sobre cada etapa da operação.",
    cover: {
      path: "public/img/covers/engage.png",
      alt: "Imagem de capa padrão para a área do cliente Engage",
    },
    type: "Área do cliente",
    iconType: '<i data-lucide="users-round" class="h-4 w-4"></i>',
    stacks: ["PHP", "MySQL", "HTML", "CSS", "jQuery"],
    results: [
      "Maior transparência para clientes durante os processos seletivos.",
      "Redução de solicitações manuais por atualização de status.",
      "Centralização das informações em uma área simples de consultar.",
    ],
  },
];

const formatCaseNumber = (index) => String(index + 1).padStart(2, "0");

const createStackTags = (stacks) =>
  stacks
    .map(
      (stack) =>
        `<span class="rounded-full border border-line px-3 py-1 font-mono text-xs text-faint">${stack}</span>`,
    )
    .join("");

const createResultsList = (results) =>
  results
    .map(
      (result) => `
        <li class="flex gap-3 text-sm leading-6 text-muted">
          <i data-lucide="check-circle-2" class="mt-0.5 h-4 w-4 shrink-0 text-signal"></i>
          <span>${result}</span>
        </li>
      `,
    )
    .join("");

export const createCaseCard = (project, index) => `
  <article
    class="reveal group overflow-hidden rounded-lg border border-line bg-panel shadow-edge transition duration-300 hover:-translate-y-1 hover:border-greenDim/60"
    style="transition-delay: ${index * 60}ms"
  >
    <div class="relative overflow-hidden border-b border-line">
      <img
        src="${project.cover.path}"
        alt="${project.cover.alt}"
        class="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div
        class="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-greenDim/50 bg-coal/80 px-3 py-1.5 font-mono text-xs text-signal backdrop-blur"
      >
        ${project.iconType}
        ${project.type}
      </div>
    </div>
    <div class="flex h-full flex-col space-y-5 p-6">
      <div>
        <div class="mb-3 font-mono text-xs text-greenDim">
          CASE ${formatCaseNumber(index)}
        </div>
        <h3 class="text-xl font-semibold leading-snug text-ink">
          ${project.title}
        </h3>
      </div>
      <p class="text-sm leading-7 text-muted">
        ${project.description}
      </p>
      <div class="rounded-md border border-softline bg-coal/60 p-4">
        <div class="mb-3 flex items-center gap-2 font-mono text-xs text-faint">
          <i data-lucide="layers-3" class="h-4 w-4 text-signal"></i>
          Stack
        </div>
        <div class="flex flex-wrap gap-2">
          ${createStackTags(project.stacks)}
        </div>
      </div>
      <div class="rounded-md border border-softline bg-coal/60 p-4">
        <div class="mb-3 flex items-center gap-2 font-mono text-xs text-faint">
          <i data-lucide="trending-up" class="h-4 w-4 text-signal"></i>
          Resultados
        </div>
        <ul class="space-y-3">
          ${createResultsList(project.results)}
        </ul>
      </div>
    </div>
  </article>
`;

export const insertCasesOnHTML = () => {
  if (!casesContainer) return;

  casesContainer.innerHTML = cases
    .map((project, index) => createCaseCard(project, index))
    .join("");

  casesContainer.querySelectorAll(".reveal").forEach((card) => {
    observer.observe(card);
  });

  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        "stroke-width": 1.75,
      },
    });
  }

  document.querySelectorAll("[data-lucide]").forEach((icon) => {
    icon.setAttribute("aria-hidden", "true");
    icon.setAttribute("focusable", "false");
  });
};

const observer =
  window.__revealObserver ??
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

insertCasesOnHTML();
