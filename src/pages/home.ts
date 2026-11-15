import { Button } from "../components/button";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

import { createIcons, icons } from "lucide";

import {
  getPartnerMediaUrl,
  getPartners,
  type Partner,
} from "../http/requests/strapi/partners";
import {
  getTestimonials,
  type Testimonial,
} from "../http/requests/strapi/testimonials";

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const safeExternalUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.href
      : "#";
  } catch {
    return "#";
  }
};

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

const renderPartner = (partner: Partner) => {
  const page = safeExternalUrl(partner.page || "");
  const logo = partner.logo?.[0];
  const logoUrl = getPartnerMediaUrl(logo?.url || "");
  const name = partner.name || "Cliente Moveup";

  return /* html */ `
    <li class="min-w-0 border-zinc-800 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0">
      <a
        href="${escapeHtml(page)}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visitar o site de ${escapeHtml(name)}"
        class="group flex min-h-36 items-center justify-between gap-6 px-5 py-8 outline-none transition-colors duration-300 hover:bg-zinc-900 focus-visible:bg-zinc-900 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400 sm:min-h-44 lg:px-6"
      >
        <span class="flex min-w-0 flex-1 items-center justify-center">
          ${
            logoUrl
              ? `<img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(logo?.alternativeText || name)}" width="${logo?.width || 293}" height="${logo?.height || 43}" class="max-h-11 w-auto max-w-full object-contain brightness-0 invert opacity-70 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" loading="lazy" />`
              : `<span class="break-words text-center text-2xl font-bold tracking-[-0.03em] text-zinc-300 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">${escapeHtml(name)}</span>`
          }
        </span>
        <i data-lucide="arrow-up-right" class="h-4 w-4 shrink-0 text-zinc-600 transition-colors duration-300 group-hover:text-emerald-400 group-focus-visible:text-emerald-400" aria-hidden="true"></i>
      </a>
    </li>
  `;
};

async function loadPartners() {
  const container = document.querySelector<HTMLElement>("#partner-list");
  if (!container) return;

  container.setAttribute("aria-busy", "true");

  try {
    const response = await getPartners();

    container.innerHTML = response.data.length
      ? response.data.map(renderPartner).join("")
      : `<li class="px-5 py-10 text-zinc-400 sm:col-span-2 lg:col-span-4">Nossos clientes serão apresentados em breve.</li>`;
    createIcons({ icons });
  } catch {
    container.innerHTML = `
      <li class="px-5 py-10 text-zinc-400 sm:col-span-2 lg:col-span-4">
        <p>Não foi possível carregar os clientes agora.</p>
        <button type="button" data-retry-partners class="mt-4 min-h-11 rounded-md border border-zinc-700 px-4 font-semibold text-white transition-colors hover:border-emerald-400 hover:text-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400">Tentar novamente</button>
      </li>
    `;
    container
      .querySelector<HTMLButtonElement>("[data-retry-partners]")
      ?.addEventListener("click", () => void loadPartners());
  } finally {
    container.removeAttribute("aria-busy");
  }
}

const renderTestimonial = (testimonial: Testimonial) => {
  const partnerName = testimonial.partner?.name || "Cliente Moveup";
  const partnerPage = safeExternalUrl(testimonial.partner?.page || "");
  const contactName =
    testimonial.contact?.name || testimonial.contactName || "";
  const contactRole =
    testimonial.contact?.role || testimonial.contactRole || "";
  const displayName = contactName || partnerName;
  const rating = Math.min(5, Math.max(0, Number(testimonial.rating) || 0));
  const tags = testimonial.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return /* html */ `
    <figure class="border-b border-zinc-300 py-10 dark:border-zinc-700 sm:py-12">
      <blockquote>
        <p class="max-w-3xl text-2xl font-semibold leading-snug tracking-[-0.025em] text-balance sm:text-3xl">“${escapeHtml(testimonial.quote)}”</p>
      </blockquote>
      <figcaption class="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex min-w-0 items-center gap-4">
          <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-white text-sm font-bold text-emerald-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-emerald-400" aria-hidden="true">${escapeHtml(getInitials(displayName))}</span>
          <div class="min-w-0">
            ${
              contactName
                ? `<p class="font-semibold">${escapeHtml(contactName)}</p>
                   <div class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                     ${contactRole ? `<span>${escapeHtml(contactRole)}</span><span aria-hidden="true">·</span>` : ""}
                     <a href="${escapeHtml(partnerPage)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 underline-offset-4 hover:text-emerald-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 dark:hover:text-emerald-400">${escapeHtml(partnerName)}<i data-lucide="arrow-up-right" class="h-3.5 w-3.5" aria-hidden="true"></i></a>
                   </div>`
                : `<a href="${escapeHtml(partnerPage)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 font-semibold underline-offset-4 hover:text-emerald-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 dark:hover:text-emerald-400">${escapeHtml(partnerName)}<i data-lucide="arrow-up-right" class="h-4 w-4" aria-hidden="true"></i></a>`
            }
          </div>
        </div>
        <div class="flex shrink-0 items-center gap-2" aria-label="Avaliação ${rating.toFixed(1)} de 5">
          <i data-lucide="star" class="h-5 w-5 fill-emerald-500 text-emerald-500" aria-hidden="true"></i>
          <span class="font-mono text-sm font-semibold tabular-nums">${rating.toFixed(1)}</span>
        </div>
      </figcaption>
      ${testimonial.details ? `<p class="mt-8 max-w-3xl border-t border-zinc-300 pt-6 leading-7 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">${escapeHtml(testimonial.details)}</p>` : ""}
      ${
        tags.length
          ? `<ul class="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-zinc-700 dark:text-zinc-300" aria-label="Tecnologias e contexto do projeto">${tags
              .map(
                (tag) =>
                  `<li class="before:mr-2 before:text-emerald-600 before:content-['/'] dark:before:text-emerald-400">${escapeHtml(tag)}</li>`,
              )
              .join("")}</ul>`
          : ""
      }
    </figure>
  `;
};

async function loadTestimonials() {
  const container = document.querySelector<HTMLElement>("#testimonial-list");
  if (!container) return;

  container.setAttribute("aria-busy", "true");

  try {
    const response = await getTestimonials();

    container.innerHTML = response.data.length
      ? response.data.map(renderTestimonial).join("")
      : `<div class="py-10">
          <p class="leading-7 text-zinc-600 dark:text-zinc-400">Os depoimentos serão publicados em breve.</p>
          <a href="#partners" class="mt-4 inline-flex min-h-11 items-center font-semibold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 dark:text-emerald-400">Conheça nossos clientes</a>
        </div>`;
    createIcons({ icons });
  } catch {
    container.innerHTML = `
      <div class="py-10">
        <p class="leading-7 text-zinc-600 dark:text-zinc-400">Não foi possível carregar os depoimentos agora.</p>
        <button type="button" data-retry-testimonials class="mt-4 min-h-11 rounded-md border border-zinc-300 px-4 font-semibold transition-colors hover:border-emerald-600 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 dark:border-zinc-700 dark:hover:border-emerald-400 dark:hover:text-emerald-400">Tentar novamente</button>
      </div>
    `;
    container
      .querySelector<HTMLButtonElement>("[data-retry-testimonials]")
      ?.addEventListener("click", () => void loadTestimonials());
  } finally {
    container.removeAttribute("aria-busy");
  }
}

const processSteps = [
  {
    letter: "M",
    title: "Mapear",
    description:
      "Conversamos com você e entendemos o processo como ele é hoje, com todas as gambiarras.",
  },
  {
    letter: "O",
    title: "Organizar",
    description:
      "Mostramos onde está o desperdício de tempo e o que dá pra automatizar.",
  },
  {
    letter: "V",
    title: "Viabilizar",
    description:
      "Você recebe uma proposta clara: o que será feito, quanto custa e quanto tempo leva.",
  },
  {
    letter: "E",
    title: "Entregar",
    description:
      "A gente desenvolve, testa com você e coloca pra rodar.",
  },
];

export function Home() {
  queueMicrotask(() => void loadPartners());
  queueMicrotask(() => void loadTestimonials());

  return /* html*/ `
    ${Header()}
    <main class="w-full">
      <section id="home" class="relative isolate w-full overflow-hidden bg-zinc-950">
        <video
          class="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
          src="https://videos.pexels.com/video-files/4629264/4629264-hd_1280_720_25fps.mp4"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          disablepictureinpicture
          aria-hidden="true"
          tabindex="-1"
        ></video>
        <div class="absolute inset-0 -z-10 bg-black/70" aria-hidden="true"></div>
        <div class="hero-content mx-auto flex min-h-svh w-full max-w-7xl flex-col items-center justify-center px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36">
          <div class="mb-6 flex w-fit items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-4 py-2 backdrop-blur-sm">
            <div class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></div>
            <small class="text-xs text-white">
              Desenvolvimento de software sob medida.
            </small>
          </div>
          <h1 class="mb-6 max-w-6xl text-center text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-white text-balance sm:mb-8 sm:text-5xl lg:text-6xl">
            Todos os dados da empresa num <em class="text-emerald-400">lugar só</em>
          </h1>
          <p class="mt-4 max-w-3xl text-center text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
            Criamos automações e sistemas sob medida para pequenas e médias empresas. Você explica como trabalha hoje. A gente transforma isso em um processo que roda sozinho.
          </p>
          <div class="mt-10 flex w-full flex-col items-center p-4 sm:mt-16">
            ${Button({ title: "Agendar diagnóstico gratuito", href: "#contact", variant: "solid" })}
            <small class="mt-4 text-center text-sm text-zinc-300">
              Gratuito • Sem compromisso
            </small>
          </div>
          <div class="mt-8 flex w-full max-w-3xl flex-col items-center justify-center gap-3 border-t border-white/15 pt-6 text-sm text-zinc-300 sm:mt-12 sm:flex-row sm:gap-8">
            <a href="#process" class="inline-flex min-h-11 items-center gap-2 font-semibold text-zinc-100 underline-offset-4 hover:text-emerald-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500">
              Conheça o método MOVE
              <i data-lucide="arrow-down" class="h-4 w-4 text-emerald-400" aria-hidden="true"></i>
            </a>
            <span class="hidden text-zinc-500 sm:inline" aria-hidden="true">/</span>
            <a href="#partners" class="inline-flex min-h-11 items-center gap-2 font-semibold text-zinc-100 underline-offset-4 hover:text-emerald-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500">
              Veja quem já trabalhou conosco
              <i data-lucide="arrow-down" class="h-4 w-4 text-emerald-400" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </section>
      <section id="partners" class="w-full bg-zinc-950 px-4 py-20 text-white sm:px-6 lg:py-24">
        <div class="mx-auto w-full max-w-7xl">
          <div class="border-b border-zinc-800 pb-10">
            <h2 class="max-w-2xl text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl">
              Alguns dos nossos clientes
            </h2>
          </div>

          <ul id="partner-list" class="grid grid-cols-1 border-b border-zinc-800 sm:grid-cols-2 lg:grid-cols-4" aria-label="Clientes da Moveup Tecnologia" aria-live="polite" aria-busy="true">
            <li class="px-5 py-10 text-zinc-400 sm:col-span-2 lg:col-span-4">Carregando clientes…</li>
          </ul>
        </div>
      </section>
      <section id="about" class="w-full bg-white px-4 py-24 text-zinc-950 dark:bg-black dark:text-white sm:px-6 lg:py-32">
        <div class="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)] lg:gap-24">
          <div class="max-w-4xl">
            <h2 class="max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
              Não é falta de esforço. É que o negócio cresceu e as ferramentas <span class="text-emerald-600 dark:text-emerald-400">ficaram pra trás.</span>
            </h2>
            <p class="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
              Uma planilha pra estoque. Outra pro financeiro. Um sistema que não conversa com o outro. E você copiando dado de um lado pro outro.
            </p>
            <p class="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
              A Moveup organiza essa bagunça. Mapeamos como sua empresa funciona e criamos a solução certa: uma automação, um sistema ou um app. Tudo explicado em português claro, sem tecnês.
            </p>
          </div>

          <div class="self-end border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <p class="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              O que desenvolvemos
            </p>
            <ul class="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800" aria-label="Serviços da Moveup Tecnologia">
              <li class="flex items-center gap-4 py-4 first:pt-0">
                <i data-lucide="panels-top-left" class="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true"></i>
                <span class="font-medium">Aplicações web e desktop</span>
              </li>
              <li class="flex items-center gap-4 py-4">
                <i data-lucide="smartphone" class="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true"></i>
                <span class="font-medium">Aplicativos mobile</span>
              </li>
              <li class="flex items-center gap-4 py-4 last:pb-0">
                <i data-lucide="workflow" class="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true"></i>
                <span class="font-medium">Integrações e automações</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section id="pain" class="w-full bg-zinc-950 px-4 py-24 text-white sm:px-6 lg:py-32">
        <div class="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <div class="lg:sticky lg:top-32">
              <h2 class="max-w-xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
                Você conhece alguma <span class="text-emerald-400">dessas situações?</span>
              </h2>
              <p class="mt-8 max-w-md text-lg leading-8 text-zinc-400">
                Se você é dono de empresa, provavelmente conhece pelo menos uma.
              </p>
            </div>
          </div>

          <ul class="border-t border-zinc-800" aria-label="Situações comuns em empresas que cresceram">
            <li class="flex items-start gap-4 border-b border-zinc-800 py-6 lg:py-8">
              <i data-lucide="circle-alert" class="mt-1.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i>
              <span class="text-lg leading-8 text-zinc-300">Você perde horas por semana digitando a mesma informação em lugares diferentes</span>
            </li>
            <li class="flex items-start gap-4 border-b border-zinc-800 py-6 lg:py-8">
              <i data-lucide="circle-alert" class="mt-1.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i>
              <span class="text-lg leading-8 text-zinc-300">Precisa de um número e não sabe em qual planilha ele está</span>
            </li>
            <li class="flex items-start gap-4 border-b border-zinc-800 py-6 lg:py-8">
              <i data-lucide="circle-alert" class="mt-1.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i>
              <span class="text-lg leading-8 text-zinc-300">Paga vários sistemas e nenhum mostra a empresa inteira</span>
            </li>
            <li class="flex items-start gap-4 border-b border-zinc-800 py-6 lg:py-8">
              <i data-lucide="circle-alert" class="mt-1.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i>
              <span class="text-lg leading-8 text-zinc-300">Um erro de fórmula já te custou dinheiro ou um cliente</span>
            </li>
            <li class="flex items-start gap-4 border-b border-zinc-800 py-6 lg:py-8">
              <i data-lucide="circle-alert" class="mt-1.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i>
              <span class="text-lg leading-8 text-zinc-300">Só uma pessoa sabe onde está cada coisa, e se ela falta, tudo para</span>
            </li>
            <li class="flex items-start gap-4 border-b border-zinc-800 py-6 lg:py-8">
              <i data-lucide="circle-alert" class="mt-1.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i>
              <span class="text-lg leading-8 text-zinc-300">Você queria pensar no crescimento, mas passa o dia apagando incêndio</span>
            </li>
          </ul>
        </div>
      </section>
      <section id="process" class="w-full bg-zinc-100 px-4 py-24 text-zinc-950 dark:bg-zinc-900 dark:text-white sm:px-6 lg:py-32">
        <div class="mx-auto w-full max-w-7xl">
          <div class="grid gap-8 border-b border-zinc-300 pb-10 dark:border-zinc-700 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] lg:items-end">
            <div>
              <h2 class="max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
                Conheça o <span class="text-emerald-600 dark:text-emerald-400">Método MOVE</span>
              </h2>
            </div>
            <p class="process-intro max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 lg:justify-self-end">
              A gente não começa escrevendo código. Primeiro a gente entende sua operação.
            </p>
          </div>

          <div class="process-timeline-shell relative mt-14">
            <span class="process-timeline-progress absolute bg-current text-emerald-500" aria-hidden="true"></span>
            <ol class="process-timeline relative grid lg:grid-cols-4" aria-label="Etapas do Método MOVE">
            ${processSteps
              .map(
                (step, index) => `
                  <li data-process-step class="process-timeline-step relative grid grid-cols-[3rem_minmax(0,1fr)] gap-6 pb-12 last:pb-0 lg:block lg:pb-0 lg:pr-8 lg:last:pr-0">
                    <div data-timeline-marker data-complete="false" class="process-timeline-marker relative z-10 grid h-12 w-12 place-items-center border border-zinc-300 bg-zinc-100 font-mono text-lg font-semibold text-emerald-700 transition-colors duration-300 data-[complete=true]:border-emerald-500 data-[complete=true]:bg-emerald-500 data-[complete=true]:text-emerald-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-emerald-400 dark:data-[complete=true]:border-emerald-500 dark:data-[complete=true]:bg-emerald-500 dark:data-[complete=true]:text-emerald-950" aria-hidden="true">
                      ${step.letter}
                    </div>
                    <div class="pt-0.5 lg:pt-8">
                      <p class="font-mono text-xs tabular-nums text-zinc-500" aria-hidden="true">ETAPA 0${index + 1}</p>
                      <h3 class="mt-3 text-2xl font-semibold tracking-[-0.025em]">${step.title}</h3>
                      <p class="mt-4 max-w-sm leading-7 text-zinc-600 dark:text-zinc-400">${step.description}</p>
                    </div>
                  </li>
                `,
              )
              .join("")}
            </ol>
          </div>

          <p class="mt-14 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Você sabe o que está acontecendo em cada etapa, sem surpresa no meio do caminho.
          </p>
        </div>
      </section>
      <section id="benefits" class="w-full bg-white px-4 py-24 text-zinc-950 dark:bg-black dark:text-white sm:px-6 lg:py-32">
        <div class="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <div class="lg:sticky lg:top-32">
              <h2 class="max-w-xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
                O que muda na <span class="text-emerald-600 dark:text-emerald-400">sua empresa</span>
              </h2>
            </div>
          </div>

          <ul class="border-t border-zinc-200 dark:border-zinc-800" aria-label="Benefícios">
            <li class="grid gap-3 border-b border-zinc-200 py-8 dark:border-zinc-800 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Horas de volta na sua semana</h3>
              <p class="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">A tarefa repetida passa a ser feita pelo sistema.</p>
            </li>
            <li class="grid gap-3 border-b border-zinc-200 py-8 dark:border-zinc-800 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Uma fonte única da verdade</h3>
              <p class="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">Chega de procurar em qual planilha está o número certo.</p>
            </li>
            <li class="grid gap-3 border-b border-zinc-200 py-8 dark:border-zinc-800 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Menos erro humano</h3>
              <p class="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">O que é automático não esquece nem digita errado.</p>
            </li>
            <li class="grid gap-3 border-b border-zinc-200 py-8 dark:border-zinc-800 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Decisões com dado na mão</h3>
              <p class="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">Você enxerga o negócio sem montar relatório na raça.</p>
            </li>
            <li class="grid gap-3 border-b border-zinc-200 py-8 dark:border-zinc-800 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">A empresa não depende de uma pessoa</h3>
              <p class="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">O processo fica no sistema, não na cabeça de alguém.</p>
            </li>
            <li class="grid gap-3 border-b border-zinc-200 py-8 dark:border-zinc-800 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Feito pro seu jeito de trabalhar</h3>
              <p class="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">Sem precisar se adaptar a um software genérico.</p>
            </li>
            <li class="grid gap-3 border-b border-zinc-200 py-8 dark:border-zinc-800 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Funciona no computador e no celular</h3>
              <p class="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">Web, Android e iOS.</p>
            </li>
          </ul>
        </div>
      </section>
      <section id="services" class="w-full bg-zinc-950 px-4 py-24 text-white sm:px-6 lg:py-32">
        <div class="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <div class="lg:sticky lg:top-32">
              <h2 class="max-w-xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
                Do zero ao sistema em <span class="text-emerald-400">produção</span>
              </h2>
              <p class="mt-8 max-w-md text-lg leading-8 text-zinc-400">
                Da primeira decisão técnica à entrega, construímos a solução certa para cada etapa da sua operação.
              </p>
            </div>
          </div>

          <ol class="production-sequence border-t border-zinc-800" aria-label="Serviços oferecidos pela Moveup Tecnologia">
            <li data-service-step class="group relative grid gap-4 border-b border-zinc-800 py-8 md:grid-cols-[3rem_minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <span class="font-mono text-sm tabular-nums text-emerald-400" aria-hidden="true">01</span>
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Desenvolvimento Web</h3>
              <p class="max-w-2xl leading-7 text-zinc-400">Sistemas, plataformas e portais web sob medida, responsivos e escaláveis — do MVP ao produto maduro.</p>
            </li>
            <li data-service-step class="group relative grid gap-4 border-b border-zinc-800 py-8 md:grid-cols-[3rem_minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <span class="font-mono text-sm tabular-nums text-emerald-400" aria-hidden="true">02</span>
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Aplicativos Mobile</h3>
              <p class="max-w-2xl leading-7 text-zinc-400">Apps nativos e híbridos para Android e iOS, com foco em performance e experiência do usuário.</p>
            </li>
            <li data-service-step class="group relative grid gap-4 border-b border-zinc-800 py-8 md:grid-cols-[3rem_minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <span class="font-mono text-sm tabular-nums text-emerald-400" aria-hidden="true">03</span>
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Software Desktop</h3>
              <p class="max-w-2xl leading-7 text-zinc-400">Aplicações desktop robustas para operações internas, gestão e controle de processos.</p>
            </li>
            <li data-service-step class="group relative grid gap-4 border-b border-zinc-800 py-8 md:grid-cols-[3rem_minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <span class="font-mono text-sm tabular-nums text-emerald-400" aria-hidden="true">04</span>
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Integrações &amp; APIs</h3>
              <p class="max-w-2xl leading-7 text-zinc-400">Conectamos sistemas que precisam conversar — APIs, webhooks e integrações entre plataformas.</p>
            </li>
            <li data-service-step class="group relative grid gap-4 border-b border-zinc-800 py-8 md:grid-cols-[3rem_minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <span class="font-mono text-sm tabular-nums text-emerald-400" aria-hidden="true">05</span>
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Automações</h3>
              <p class="max-w-2xl leading-7 text-zinc-400">Eliminamos tarefas manuais e repetitivas com automações que economizam tempo e reduzem erro humano.</p>
            </li>
            <li data-service-step class="group relative grid gap-4 border-b border-zinc-800 py-8 md:grid-cols-[3rem_minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <span class="font-mono text-sm tabular-nums text-emerald-400" aria-hidden="true">06</span>
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Consultoria Técnica</h3>
              <p class="max-w-2xl leading-7 text-zinc-400">Diagnóstico, arquitetura e decisões tecnológicas com quem já resolveu problema parecido ao seu.</p>
            </li>
          </ol>
        </div>
      </section>
      <section id="testimonials" class="w-full bg-zinc-100 px-4 py-24 text-zinc-950 dark:bg-zinc-900 dark:text-white sm:px-6 lg:py-32">
        <div class="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <div class="lg:sticky lg:top-32">
              <h2 class="max-w-xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
                O resultado contado por quem <span class="text-emerald-600 dark:text-emerald-400">viveu o projeto</span>
              </h2>
              <p class="mt-8 max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Experiências reais de clientes que trabalharam diretamente com a Moveup.
              </p>
              <p class="mt-6 max-w-md text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                4 projetos entregues • Nota 5.0 em todas as avaliações no Workana
              </p>
            </div>
          </div>

          <div id="testimonial-list" class="border-t border-zinc-300 dark:border-zinc-700" aria-live="polite" aria-busy="true">
            <p class="py-10 leading-7 text-zinc-600 dark:text-zinc-400">Carregando depoimentos…</p>
          </div>
        </div>
      </section>
      <section id="offer" class="w-full bg-zinc-950 px-4 py-24 text-white sm:px-6 lg:py-32">
        <div class="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <div class="lg:sticky lg:top-32">
              <h2 class="max-w-xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
                O que você leva do <span class="text-emerald-400">diagnóstico gratuito</span>
              </h2>
              <p class="mt-8 max-w-md text-lg leading-8 text-zinc-400">
                <strong class="font-semibold text-white">Investimento: R$ 0.</strong> Você sai da conversa sabendo o próximo passo, contrate a gente ou não.
              </p>
              <p class="mt-6 max-w-md text-lg leading-8 text-zinc-400">
                Se depois do diagnóstico você não quiser seguir, tudo bem. O mapa do seu processo é seu.
              </p>
              <div class="mt-10">
                ${Button({ title: "Agendar diagnóstico gratuito", href: "#contact", variant: "solid" })}
              </div>
            </div>
          </div>

          <ul class="border-t border-zinc-800" aria-label="O que você leva do diagnóstico gratuito">
            <li class="flex items-start gap-4 border-b border-zinc-800 py-6 lg:py-8">
              <i data-lucide="check" class="mt-1.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i>
              <span class="text-lg leading-8 text-zinc-300">Mapa do seu processo atual: onde o tempo está indo embora</span>
            </li>
            <li class="flex items-start gap-4 border-b border-zinc-800 py-6 lg:py-8">
              <i data-lucide="check" class="mt-1.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i>
              <span class="text-lg leading-8 text-zinc-300">Lista do que dá pra automatizar, por ordem de impacto</span>
            </li>
            <li class="flex items-start gap-4 border-b border-zinc-800 py-6 lg:py-8">
              <i data-lucide="check" class="mt-1.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i>
              <span class="text-lg leading-8 text-zinc-300">Recomendação honesta: às vezes a solução é simples (e às vezes nem precisa da gente)</span>
            </li>
            <li class="flex items-start gap-4 border-b border-zinc-800 py-6 lg:py-8">
              <i data-lucide="check" class="mt-1.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i>
              <span class="text-lg leading-8 text-zinc-300">Estimativa de prazo e investimento, sem compromisso</span>
            </li>
          </ul>
        </div>
      </section>
      <section id="objections" class="w-full bg-white px-4 py-24 text-zinc-950 dark:bg-black dark:text-white sm:px-6 lg:py-32">
        <div class="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <div class="lg:sticky lg:top-32">
              <h2 class="max-w-xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
                Talvez você esteja <span class="text-emerald-600 dark:text-emerald-400">pensando</span>
              </h2>
            </div>
          </div>

          <ul class="border-t border-zinc-200 dark:border-zinc-800" aria-label="Dúvidas e objeções comuns">
            <li class="grid gap-3 border-b border-zinc-200 py-8 dark:border-zinc-800 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">“Mas software sob medida é caro…”</h3>
              <p class="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">Entendo. Antes de olhar o preço, vale fazer uma conta: quantas horas por semana sua equipe gasta em tarefa manual? Multiplica pelo custo da hora e por 12 meses. Na maioria das vezes, continuar como está sai mais caro. O diagnóstico existe justamente pra fazer essa conta com você.</p>
            </li>
            <li class="grid gap-3 border-b border-zinc-200 py-8 dark:border-zinc-800 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">“Mas minha empresa é pequena demais pra isso…”</h3>
              <p class="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">É exatamente pra empresa pequena que a gente trabalha. Não precisa ser um sistemão: às vezes uma automação resolve 80% da dor.</p>
            </li>
            <li class="grid gap-3 border-b border-zinc-200 py-8 dark:border-zinc-800 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">“Mas eu não entendo nada de tecnologia…”</h3>
              <p class="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">E nem precisa. Você entende do seu negócio e a gente cuida da parte técnica. Tudo explicado sem tecnês.</p>
            </li>
            <li class="grid gap-3 border-b border-zinc-200 py-8 dark:border-zinc-800 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">“Mas já tentei um sistema e não deu certo…”</h3>
              <p class="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">Sistemas prontos obrigam você a mudar o jeito de trabalhar. A gente faz o contrário: o sistema se adapta ao seu processo, porque começa mapeando ele.</p>
            </li>
          </ul>
        </div>
      </section>
      <section id="faq" class="w-full bg-zinc-100 px-4 py-24 text-zinc-950 dark:bg-zinc-900 dark:text-white sm:px-6 lg:py-32">
        <div class="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <div class="lg:sticky lg:top-32">
              <h2 class="max-w-xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
                Perguntas <span class="text-emerald-600 dark:text-emerald-400">frequentes</span>
              </h2>
            </div>
          </div>

          <ul class="border-t border-zinc-300 dark:border-zinc-700" aria-label="Perguntas frequentes">
            <li class="grid gap-3 border-b border-zinc-300 py-8 dark:border-zinc-700 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Quanto custa um projeto?</h3>
              <p class="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">Depende do tamanho do problema. Uma automação simples custa bem menos que um app completo. No diagnóstico você recebe uma estimativa clara antes de decidir qualquer coisa.</p>
            </li>
            <li class="grid gap-3 border-b border-zinc-300 py-8 dark:border-zinc-700 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Quanto do meu tempo vou precisar dedicar?</h3>
              <p class="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">Uma conversa no diagnóstico e alguns check-ins curtos durante o projeto. O trabalho pesado é com a gente.</p>
            </li>
            <li class="grid gap-3 border-b border-zinc-300 py-8 dark:border-zinc-700 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Serve pra empresa pequena?</h3>
              <p class="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">Serve. A Moveup trabalha justamente com pequenas e médias empresas.</p>
            </li>
            <li class="grid gap-3 border-b border-zinc-300 py-8 dark:border-zinc-700 md:grid-cols-[minmax(10rem,0.65fr)_minmax(0,1.35fr)] md:gap-6 lg:py-10">
              <h3 class="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Preciso entender de tecnologia?</h3>
              <p class="max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">Não. Você fala do seu negócio e a gente traduz em solução.</p>
            </li>
          </ul>
        </div>
      </section>
      <section id="contact" class="w-full bg-white px-4 py-24 text-zinc-950 dark:bg-black dark:text-white sm:px-6 lg:py-32">
        <div class="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <h2 class="max-w-xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
              Esse é o primeiro passo, e ele é <span class="text-emerald-600 dark:text-emerald-400">gratuito</span>
            </h2>
            <p class="mt-8 max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Imagine abrir o computador na segunda-feira e encontrar tudo atualizado. Sem planilha pra conferir. Sem dado pra copiar. Só a informação certa, na hora certa.
            </p>
            <p class="mt-6 max-w-md text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Gratuito • Sem compromisso • Conversa sem tecnês
            </p>
            <p class="mt-8 max-w-md leading-7 text-zinc-600 dark:text-zinc-400">
              <strong class="font-semibold text-zinc-950 dark:text-white">PS:</strong> Cada semana com processo manual são mais algumas horas que não voltam. O diagnóstico é gratuito e você sai dele com um mapa do que dá pra melhorar, contratando a gente ou não.
            </p>

            <div class="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800">
              <p class="text-sm text-zinc-500 dark:text-zinc-400">Prefere outro canal?</p>
              <a href="mailto:contato@moveuptecnologia.com.br" class="mt-2 inline-flex items-center gap-2 font-medium underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 dark:decoration-zinc-700 dark:hover:text-emerald-400">
                <span class="min-w-0 break-all">contato@moveuptecnologia.com.br</span>
                <i data-lucide="arrow-up-right" class="h-4 w-4" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <form id="contact-form" class="border-t border-zinc-200 pt-8 dark:border-zinc-800" novalidate>
            <div class="grid gap-x-6 gap-y-8 sm:grid-cols-2">
              <label class="block">
                <span class="mb-3 block text-sm font-semibold">Nome</span>
                <input type="text" name="name" autocomplete="name" required placeholder="Seu nome" class="w-full rounded-md border border-zinc-300 bg-transparent px-4 py-3.5 text-zinc-950 outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-600/15 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-600 dark:hover:border-zinc-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/15" />
              </label>

              <label class="block">
                <span class="mb-3 block text-sm font-semibold">E-mail</span>
                <input type="email" name="email" autocomplete="email" required placeholder="voce@empresa.com.br" class="w-full rounded-md border border-zinc-300 bg-transparent px-4 py-3.5 text-zinc-950 outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-600/15 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-600 dark:hover:border-zinc-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/15" />
              </label>

              <label class="block">
                <span class="mb-3 block text-sm font-semibold sm:min-h-10">WhatsApp/Telefone</span>
                <input type="tel" name="phone" autocomplete="tel" inputmode="tel" minlength="10" required placeholder="(00) 00000-0000" aria-describedby="phone-hint" class="w-full rounded-md border border-zinc-300 bg-transparent px-4 py-3.5 text-zinc-950 outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-600/15 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-600 dark:hover:border-zinc-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/15" />
                <span id="phone-hint" class="mt-2 block text-sm text-zinc-500 dark:text-zinc-400">Inclua DDD ou código do país.</span>
              </label>

              <label class="block">
                <span class="mb-3 block text-sm font-semibold sm:min-h-10">Que tipo de projeto você tem em mente?</span>
                <select name="projectType" required class="w-full rounded-md border border-zinc-300 bg-white px-4 py-3.5 text-zinc-950 outline-none transition hover:border-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-600/15 dark:border-zinc-700 dark:bg-black dark:text-white dark:hover:border-zinc-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/15">
                  <option value="">Selecione uma opção</option>
                  <option>Sistema ou portal web</option>
                  <option>Aplicativo mobile</option>
                  <option>Software para operação interna</option>
                  <option>Integração entre sistemas</option>
                  <option>Automação de processo</option>
                  <option>Diagnóstico e consultoria</option>
                  <option>Não sei ainda</option>
                </select>
              </label>

              <label class="block sm:col-span-2">
                <span class="mb-3 block text-sm font-semibold">Conte brevemente sobre seu projeto <span class="font-normal text-zinc-500 dark:text-zinc-400">(opcional)</span></span>
                <textarea name="description" rows="5" placeholder="Contexto, objetivo ou desafio principal" class="w-full resize-y rounded-md border border-zinc-300 bg-transparent px-4 py-3.5 text-zinc-950 outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-600 dark:hover:border-zinc-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/15"></textarea>
              </label>
            </div>

            <p class="mt-6 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Nada é enviado por este site. Ao continuar, você revisa a mensagem no WhatsApp antes de enviá-la à equipe Moveup.
            </p>

            <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" class="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-emerald-600 px-6 py-3.5 font-semibold text-white outline-none transition-colors hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400 dark:focus-visible:ring-emerald-400 dark:focus-visible:ring-offset-black">
                Agendar meu diagnóstico
                <i data-lucide="send" class="h-5 w-5" aria-hidden="true"></i>
              </button>
              <p id="contact-status" class="max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-400" role="status" aria-live="polite"></p>
            </div>
          </form>
        </div>
      </section>
    </main>
    ${Footer()}
  `;
}
