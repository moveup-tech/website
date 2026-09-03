import { Button } from "./button";

import Logo from "../assets/logo/dark.svg";
export function Header() {
  const sections = [
    { href: "#home", label: "Início" },
    { href: "#process", label: "Método" },
    { href: "#services", label: "Serviços" },
    { href: "#testimonials", label: "Depoimentos" },
    { href: "#contact", label: "Contato" },
  ];

  const desktopLinks = sections
    .map(
      ({ href, label }) =>
        `<li><a href="${href}" data-section-link="${href.slice(1)}" class="text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400 aria-[current=location]:text-emerald-400">${label}</a></li>`,
    )
    .join("");

  const mobileLinks = sections
    .map(
      ({ href, label }) =>
        `<li><a href="${href}" data-section-link="${href.slice(1)}" class="mobile-menu-link flex min-h-12 items-center border-b border-zinc-700/60 py-3 text-zinc-300 transition-colors last:border-b-0 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-400 aria-[current=location]:text-emerald-400">${label}</a></li>`,
    )
    .join("");

  return /* html */ `
    <header class="site-header fixed left-0 top-0 z-50 w-full">
      <nav class="relative mx-auto flex w-full max-w-7xl items-center justify-between p-4 sm:p-6" aria-label="Navegação principal">
        <a href="#home" aria-label="Ir para o início">
          <img src="${Logo}" alt="Move Up Tecnologia" class="h-auto w-40 opacity-85 transition-opacity hover:opacity-100 sm:w-52">
        </a>
        <ul class="hidden items-center gap-4 text-sm text-black dark:text-white xl:flex">
          ${desktopLinks}
        </ul>
        <div class="theme-picker relative ml-auto xl:ml-0">
          <button type="button" class="theme-menu-trigger inline-flex h-11 w-11 items-center justify-center rounded-md text-zinc-300 outline-none transition-colors hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400" aria-expanded="false" aria-controls="theme-menu" aria-label="Alterar tema">
            <i data-theme-icon="light" data-lucide="sun" class="h-5 w-5" aria-hidden="true" hidden></i>
            <i data-theme-icon="dark" data-lucide="moon" class="h-5 w-5" aria-hidden="true" hidden></i>
            <i data-theme-icon="system" data-lucide="monitor" class="h-5 w-5" aria-hidden="true"></i>
          </button>
          <div id="theme-menu" class="theme-menu absolute right-0 top-[calc(100%+0.5rem)] w-40 rounded-md border border-zinc-700 bg-zinc-950 p-1.5 text-sm text-white" aria-hidden="true" inert>
            <button type="button" data-theme-value="light" class="flex min-h-10 w-full items-center gap-3 rounded px-3 text-left transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-emerald-400"><i data-lucide="sun" class="h-4 w-4" aria-hidden="true"></i>Claro</button>
            <button type="button" data-theme-value="dark" class="flex min-h-10 w-full items-center gap-3 rounded px-3 text-left transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-emerald-400"><i data-lucide="moon" class="h-4 w-4" aria-hidden="true"></i>Escuro</button>
            <button type="button" data-theme-value="system" class="flex min-h-10 w-full items-center gap-3 rounded px-3 text-left transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-emerald-400"><i data-lucide="monitor" class="h-4 w-4" aria-hidden="true"></i>Sistema</button>
          </div>
        </div>
        <div class="hidden xl:block">
          ${Button({ title: "Fale conosco", href: "#contact", iconRight: `<i data-lucide="phone" class="icon-sm"></i>` })}
        </div>
        <a href="#contact" class="mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-emerald-400/85 outline-none transition-colors hover:bg-white/5 hover:text-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-400 xl:hidden" aria-label="Fale conosco">
          <i data-lucide="phone" class="h-5 w-5" aria-hidden="true"></i>
        </a>
        <button type="button" class="mobile-menu-trigger inline-flex h-12 w-12 items-center justify-center rounded-md text-zinc-300 outline-none transition-colors hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400 xl:hidden" aria-expanded="false" aria-controls="mobile-navigation" aria-label="Abrir menu">
          <i data-lucide="menu" class="menu-open-icon h-6 w-6" aria-hidden="true"></i>
          <i data-lucide="x" class="menu-close-icon hidden h-6 w-6" aria-hidden="true"></i>
        </button>
      </nav>
      <div id="mobile-navigation" class="mobile-menu border-t border-zinc-700/50 xl:hidden" aria-hidden="true" inert>
        <ul class="mx-auto flex max-w-7xl flex-col px-4 py-3" aria-label="Navegação mobile">
          ${mobileLinks}
        </ul>
      </div>
    </header>
  `;
}
