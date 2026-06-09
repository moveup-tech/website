// ─── Dados ───────────────────────────────────────────────────────────────────

const projetos = [
  {
    imagem: "/assets/covers/active-track.png",
    alt: "Tela do aplicativo de patrulhamento e monitoramento",
    titulo: "Active Track - Aplicativo para gestão de patrulhas e vigilância",
    descricao:
      "Desenvolvemos um aplicativo mobile para registro de rondas, envio de ocorrências, eventos SOS e monitoramento em tempo real de equipes de segurança.",
    stack: "React Native, Expo, Node.js, PostgreSQL, WebSocket",
    resultado:
      "Maior rastreabilidade das operações e redução do tempo de resposta a incidentes.",
  },
  {
    imagem: "/assets/covers/active-track.png",
    alt: "Plataforma de streaming ao vivo",
    titulo: "Infraestrutura de streaming para transmissões ao vivo através do celular",
    descricao:
      "Projetamos uma arquitetura escalável para transmissões em tempo real com autenticação de usuários, gerenciamento de sessões e distribuição de conteúdo.",
    stack: "Nginx RTMP, Node.js, PostgreSQL, Docker",
    resultado:
      "Suporte a transmissões simultâneas com alta disponibilidade e baixa latência.",
  },
  {
    imagem: "/assets/covers/blue-moto-rent.png",
    alt: "Plataforma de aluguel de motocicletas",
    titulo: "Blue Moto Rent -Sistema de locação e assinatura de motocicletas",
    descricao:
      "Criamos uma plataforma completa para gerenciamento de contratos, validação de documentos e administração de planos de aluguel de motos.",
    stack: "React, Node.js, Prisma ORM, PostgreSQL",
    resultado:
      "Automação do processo de locação e redução significativa de tarefas operacionais.",
  }
];

const testemunhos = [
  {
    texto: "Excelente Profissional, trabalho de qualidade e muito inteligente.",
    nome: "Emmanuel Algusto",
    cargo: "Gerente de projetos, ActiveTrack Brasil",
  },
  {
    texto:
      "O Daniel é um Desenvolvedor de Ponta, excelente, fez um trabalho incrível em um tempo absurdamente curto, recomendo completamente.",
    nome: "Mateus Moutinho",
    cargo: "OUI Tecnologia",
  },
  {
    texto:
      "Ótimo profissional. Entregou o aplicativo no prazo e com a qualidade esperada.",
    nome: "Alen Cruz",
    cargo: "Gerente de marketing, Blue Moto Rent",
  },
];

// ─── Render ──────────────────────────────────────────────────────────────────

/**
 * Cria e retorna o elemento <article> de um projeto.
 * @param {{ imagem: string, alt: string, titulo: string, descricao: string, stack: string, resultado: string }} projeto
 * @param {number} index
 */
function criarCardProjeto(projeto, index) {
  const delay = index * 50;
  const article = document.createElement("article");
  article.className =
    "reveal overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900";
  article.style.setProperty("--reveal-delay", `${delay}ms`);

  article.innerHTML = `
    <img
      src="${projeto.imagem}"
      alt="${projeto.alt}"
      class="h-44 w-full object-cover"
      loading="lazy"
    />
    <div class="space-y-3 p-5">
      <h3 class="font-inter text-xl font-semibold text-slate-900 dark:text-white">
        ${projeto.titulo}
      </h3>
      <p class="text-slate-700 dark:text-slate-300">${projeto.descricao}</p>
      <p class="text-sm text-emerald-700 dark:text-emerald-300">
        Stack: ${projeto.stack}
      </p>
      <p class="text-sm text-slate-600 dark:text-slate-400">
        Resultado: ${projeto.resultado}
      </p>
    </div>
  `;

  return article;
}

/**
 * Cria e retorna o elemento <article> de um testemunho.
 * @param {{ texto: string, nome: string, cargo: string }} testemunho
 * @param {number} index
 */
function criarCardTestemunho(testemunho, index) {
  const delay = index * 50;
  const article = document.createElement("article");
  article.className =
    "reveal rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900";
  article.style.setProperty("--reveal-delay", `${delay}ms`);

  article.innerHTML = `
    <i class="ph ph-quotes text-3xl text-emerald-600 dark:text-emerald-300"></i>
    <p class="mt-4 text-slate-700 dark:text-slate-300">${testemunho.texto}</p>
    <div class="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
      <p class="font-inter font-semibold text-slate-900 dark:text-white">
        ${testemunho.nome}
      </p>
      <p class="text-sm text-slate-600 dark:text-slate-400">${testemunho.cargo}</p>
    </div>
  `;

  return article;
}

/**
 * Renderiza os itens num container e registra cada card no observer de reveal.
 * @param {HTMLElement} container
 * @param {any[]} itens
 * @param {(item: any, i: number) => HTMLElement} criarCard
 * @param {IntersectionObserver | null} observer
 */
function renderizarSecao(container, itens, criarCard, observer) {
  const fragment = document.createDocumentFragment();
  itens.forEach((item, i) => {
    const card = criarCard(item, i);
    fragment.appendChild(card);
    observer?.observe(card);
  });
  container.appendChild(fragment);
}

// ─── Init ────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  // Reutiliza o IntersectionObserver declarado no script inline (exposto via
  // window.__revealObserver). Se ainda não existir, cria um local.
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
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

  const projetosGrid = document.getElementById("projetos-grid");
  const testemunhosGrid = document.getElementById("testemunhos-grid");

  if (projetosGrid) {
    renderizarSecao(projetosGrid, projetos, criarCardProjeto, observer);
  }

  if (testemunhosGrid) {
    renderizarSecao(
      testemunhosGrid,
      testemunhos,
      criarCardTestemunho,
      observer,
    );
  }
});
