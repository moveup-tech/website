export const testimonials = [
  {
    quote: "Excelente profissional, trabalho de qualidade e muito inteligente.",
    name: "Emmanuel Augusto",
    role: "Product Owner, Active Track Brasil",
    initials: "EA",
    rating: "5.0",
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
    detail:
      "Entrega de solução digital para apoiar a operação da Blue Moto Rent, com foco em confiabilidade, prazo e clareza no processo de desenvolvimento.",
    tags: ["Sistema web", "Locação", "Operação"],
  },
];

export const testemunhos = testimonials;

const testimonialsContainer = document.querySelector("#testimonials-grid");

const createTags = (tags) =>
  tags
    .map(
      (tag) =>
        `<span class="rounded-full border border-line px-3 py-1 font-mono text-xs text-faint">${tag}</span>`,
    )
    .join("");

export const createTestimonialCard = (testimonial, index) => `
  <article
    class="reveal flex flex-col gap-6 rounded-lg border border-line bg-panel p-8 shadow-edge transition duration-300 hover:-translate-y-1 hover:border-greenDim/60"
    style="transition-delay: ${index * 80}ms"
  >
    <div class="flex items-center gap-3 font-mono text-sm text-amber">
      <i data-lucide="star" class="h-4 w-4 fill-amber"></i>
      <span>${testimonial.rating}</span>
    </div>
    <p class="font-serif text-xl italic leading-8 text-ink">"${testimonial.quote}"</p>
    <p class="border-t border-softline pt-5 text-sm leading-7 text-faint">${testimonial.detail}</p>
    <div class="flex flex-wrap gap-2">
      ${createTags(testimonial.tags)}
    </div>
    <div class="mt-auto flex items-center gap-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-moss font-mono text-sm text-muted">${testimonial.initials}</div>
      <div>
        <div class="font-semibold text-ink">${testimonial.name}</div>
        <div class="text-sm text-faint">${testimonial.role}</div>
      </div>
    </div>
  </article>
`;

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

export const insertTestimonialsOnHTML = () => {
  if (!testimonialsContainer) return;

  testimonialsContainer.innerHTML = testimonials
    .map((testimonial, index) => createTestimonialCard(testimonial, index))
    .join("");

  testimonialsContainer.querySelectorAll(".reveal").forEach((card) => {
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

insertTestimonialsOnHTML();
