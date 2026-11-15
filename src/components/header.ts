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
      <nav class="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 p-4 sm:p-6" aria-label="Navegação principal">
        <a href="#home" aria-label="Ir para o início">
          <img src="${Logo}" alt="Move Up Tecnologia" class="h-auto w-40 opacity-85 transition-opacity hover:opacity-100 sm:w-52">
        </a>
        <ul class="hidden items-center gap-4 text-sm text-black dark:text-white xl:flex">
          ${desktopLinks}
        </ul>
        <div class="theme-switch relative ml-auto mr-2 inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1 xl:ml-0 xl:mr-0" role="radiogroup" aria-label="Tema" data-active="system">
          <span class="theme-switch-indicator pointer-events-none absolute left-1 top-1 h-9 w-9 rounded-full bg-zinc-700" aria-hidden="true"></span>
            <button type="button" role="radio" data-theme-value="light" aria-checked="false" tabindex="-1" aria-label="Tema claro" title="Tema claro" class="relative z-10 grid h-9 w-9 place-items-center rounded-full text-zinc-400 outline-none transition-colors duration-300 hover:text-white aria-checked:text-white focus-visible:ring-2 focus-visible:ring-emerald-400">
              <i data-lucide="sun" class="h-4 w-4" aria-hidden="true"></i>
            </button>
            <button type="button" role="radio" data-theme-value="dark" aria-checked="false" tabindex="-1" aria-label="Tema escuro" title="Tema escuro" class="relative z-10 grid h-9 w-9 place-items-center rounded-full text-zinc-400 outline-none transition-colors duration-300 hover:text-white aria-checked:text-white focus-visible:ring-2 focus-visible:ring-emerald-400">
              <i data-lucide="moon" class="h-4 w-4" aria-hidden="true"></i>
            </button>
            <button type="button" role="radio" data-theme-value="system" aria-checked="false" tabindex="-1" aria-label="Tema do sistema" title="Tema do sistema" class="relative z-10 grid h-9 w-9 place-items-center rounded-full text-zinc-400 outline-none transition-colors duration-300 hover:text-white aria-checked:text-white focus-visible:ring-2 focus-visible:ring-emerald-400">
              <i data-lucide="monitor" class="h-4 w-4" aria-hidden="true"></i>
            </button>
        </div>
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
