import { Button } from "../components/button";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { testimonials as partnerShowcase } from "../data/testimonials";

import { createIcons, icons } from "lucide";

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

const renderTestimonial = (testimonial: Testimonial) => {
  const partnerName = testimonial.partner?.name || "Cliente Move Up";
  const partnerPage = safeExternalUrl(testimonial.partner?.page || "");
  const contactName = testimonial.contact?.name || testimonial.contactName || "";
  const contactRole = testimonial.contact?.role || testimonial.contactRole || "";
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
      "Entender o problema, os objetivos, os usuários e as necessidades do projeto.",
  },
  {
    letter: "O",
    title: "Organizar",
    description:
      "Definir escopo, prioridades, critérios de aceite e planejamento.",
  },
  {
    letter: "V",
    title: "Viabilizar",
    description:
      "Transformar o planejamento em produto, desenvolvendo e validando cada entrega.",
  },
  {
    letter: "E",
    title: "Entregar",
    description:
      "Publicar com segurança, validar a operação e preparar as próximas evoluções.",
  },
];

export function Home() {
  queueMicrotask(() => void loadTestimonials());

  return /* html*/ `
    ${Header()}
    <main class="w-full">
      <section id="home" class="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36">
        <div class="mb-6 flex w-fit items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
          <div class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></div>
          <small class="text-xs text-black dark:text-white">
            Desenvolvimento de software sob medida.
          </small>
        </div>
        <h1 class="mb-6 max-w-6xl text-center text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-black text-balance dark:text-white sm:mb-8 sm:text-5xl lg:text-6xl">
          Sua ideia vira sistema. Seu processo vira automação. Seu negócio entra em <em class="text-emerald-600 dark:text-emerald-400">movimento</em>.
        </h1>
        <p class="mt-4 max-w-3xl text-center text-base leading-7 text-zinc-700 dark:text-zinc-400 sm:text-lg sm:leading-8">
          Desenvolvemos aplicativos, sistemas, integrações e automações sob medida, organizando cada projeto do problema real à entrega em produção.
        </p>
        <div class="mt-10 flex w-full flex-col items-center p-4 sm:mt-16">
          ${Button({ title: "Solicitar orçamento gratuito", href: "#contact" })}
          <small class="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Conte o contexto primeiro. A conversa começa sem compromisso.
          </small>
        </div>
        <div class="mt-8 flex w-full max-w-3xl flex-col items-center justify-center gap-3 border-t border-zinc-200 pt-6 text-sm text-zinc-600 dark:border-zinc-900 dark:text-zinc-400 sm:mt-12 sm:flex-row sm:gap-8">
          <a href="#process" class="inline-flex min-h-11 items-center gap-2 font-semibold text-zinc-800 underline-offset-4 hover:text-emerald-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 dark:text-zinc-200 dark:hover:text-emerald-400">
            Conheça o método MOVE
            <i data-lucide="arrow-down" class="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true"></i>
          </a>
          <span class="hidden text-zinc-300 dark:text-zinc-700 sm:inline" aria-hidden="true">/</span>
          <a href="#partners" class="inline-flex min-h-11 items-center gap-2 font-semibold text-zinc-800 underline-offset-4 hover:text-emerald-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 dark:text-zinc-200 dark:hover:text-emerald-400">
            Veja quem já trabalhou conosco
            <i data-lucide="arrow-down" class="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true"></i>
          </a>
        </div>
      </section>
      <section id="partners" class="w-full bg-zinc-950 px-4 py-20 text-white sm:px-6 lg:py-24">
        <div class="mx-auto w-full max-w-7xl">
          <div class="border-b border-zinc-800 pb-10">
            <h2 class="max-w-2xl text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl">
              Alguns dos nossos clientes
            </h2>
          </div>

          <ul class="grid grid-cols-1 border-b border-zinc-800 sm:grid-cols-2 lg:grid-cols-4" aria-label="Clientes da Move Up Tecnologia">
            ${partnerShowcase
              .map(
                (testimonial, index) => `
                  <li class="border-zinc-800 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0">
                    <a
                      href="${testimonial.site}"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visitar o site de ${testimonial.name}"
                      class="group flex min-h-36 items-center justify-between gap-6 px-5 py-8 outline-none transition-colors duration-300 hover:bg-zinc-900 focus-visible:bg-zinc-900 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400 sm:min-h-44 lg:px-6"
                    >
                      <span class="flex min-w-0 flex-1 items-center justify-center">
                        ${
                          testimonial.img
                            ? `<img src="${testimonial.img}" alt="${testimonial.name}" width="${index === 2 ? "92" : index === 0 ? "226" : "293"}" height="43" class="max-h-11 w-auto max-w-full object-contain brightness-0 invert opacity-70 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" loading="lazy" />`
                            : `<span class="text-2xl font-bold tracking-[-0.03em] text-zinc-300 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">OUI Tecnologia</span>`
                        }
                      </span>
                      <i data-lucide="arrow-up-right" class="h-4 w-4 shrink-0 text-zinc-600 transition-colors duration-300 group-hover:text-emerald-400 group-focus-visible:text-emerald-400" aria-hidden="true"></i>
                    </a>
                  </li>
                `,
              )
              .join("")}
          </ul>
        </div>
      </section>
      <section id="about" class="w-full bg-white px-4 py-24 text-zinc-950 dark:bg-black dark:text-white sm:px-6 lg:py-32">
        <div class="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)] lg:gap-24">
          <div class="max-w-4xl">
            <h2 class="max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
              A Move Up transforma necessidades reais em <span class="text-emerald-600 dark:text-emerald-400">software sob medida.</span>
            </h2>
            <p class="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
              Partimos do contexto da operação, organizamos as prioridades e construímos a solução adequada para colocar o projeto em produção.
            </p>
          </div>

          <div class="self-end border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <p class="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              O que desenvolvemos
            </p>
            <ul class="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800" aria-label="Serviços da Move Up Tecnologia">
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
      <section id="process" class="w-full bg-zinc-100 px-4 py-24 text-zinc-950 dark:bg-zinc-900 dark:text-white sm:px-6 lg:py-32">
        <div class="mx-auto w-full max-w-7xl">
          <div class="grid gap-8 border-b border-zinc-300 pb-10 dark:border-zinc-700 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] lg:items-end">
            <div>
              <h2 class="max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
                Um caminho claro até a <span class="text-emerald-600 dark:text-emerald-400">entrega</span>
              </h2>
            </div>
            <p class="process-intro max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 lg:justify-self-end">
              O método MOVE organiza cada projeto em quatro etapas conectadas, da descoberta à produção.
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

          <ol class="production-sequence border-t border-zinc-800" aria-label="Serviços oferecidos pela Move Up Tecnologia">
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
                Experiências reais de clientes que trabalharam diretamente com a Move Up.
              </p>
            </div>
          </div>

          <div id="testimonial-list" class="border-t border-zinc-300 dark:border-zinc-700" aria-live="polite" aria-busy="true">
            <p class="py-10 leading-7 text-zinc-600 dark:text-zinc-400">Carregando depoimentos…</p>
          </div>
        </div>
      </section>
      <section id="contact" class="w-full bg-white px-4 py-24 text-zinc-950 dark:bg-black dark:text-white sm:px-6 lg:py-32">
        <div class="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <h2 class="max-w-xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
              Conte o que você quer colocar em <span class="text-emerald-600 dark:text-emerald-400">produção</span>
            </h2>
            <p class="mt-8 max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Compartilhe o contexto essencial. Sua mensagem será preparada para continuar a conversa diretamente com a equipe Move Up pelo WhatsApp.
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
              Nada é enviado por este site. Ao continuar, você revisa a mensagem no WhatsApp antes de enviá-la à equipe Move Up.
            </p>

            <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" class="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-emerald-600 px-6 py-3.5 font-semibold text-white outline-none transition-colors hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400 dark:focus-visible:ring-emerald-400 dark:focus-visible:ring-offset-black">
                Enviar pelo WhatsApp
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
