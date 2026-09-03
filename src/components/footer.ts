import Logo from "../assets/logo/dark.svg";

const currentYear = new Date().getFullYear();

export function Footer() {
  const externalLink =
    "inline-flex min-h-11 max-w-full flex-wrap items-center gap-2 text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400";

  return /* html */ `
    <footer class="border-t border-zinc-800 bg-zinc-950 px-4 text-white sm:px-6">
      <div class="mx-auto w-full max-w-7xl py-16 sm:py-20">
        <div class="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.35fr_0.65fr_0.85fr_0.85fr] lg:gap-12">
          <div data-footer-group class="max-w-sm">
            <a href="#home" class="inline-flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400" aria-label="Move Up Tecnologia — voltar ao início">
              <img src="${Logo}" alt="Move Up Tecnologia" class="h-auto w-52" />
            </a>
            <p class="mt-6 text-base leading-7 text-zinc-400">
              Software sob medida para transformar ideias, processos e operações em produtos digitais.
            </p>
          </div>

          <nav data-footer-group aria-label="Mapa do site">
            <h2 class="text-sm font-semibold text-white">Mapa do site</h2>
            <ul class="mt-5 space-y-1">
              <li><a href="#home" class="${externalLink}">Início</a></li>
              <li><a href="#about" class="${externalLink}">Sobre nós</a></li>
              <li><a href="#process" class="${externalLink}">Processo</a></li>
              <li><a href="#services" class="${externalLink}">Serviços</a></li>
              <li><a href="#partners" class="${externalLink}">Clientes</a></li>
              <li><a href="#testimonials" class="${externalLink}">Depoimentos</a></li>
              <li><a href="#contact" class="${externalLink}">Contato</a></li>
            </ul>
          </nav>

          <div data-footer-group>
            <h2 class="text-sm font-semibold text-white">Canais diretos</h2>
            <ul class="mt-5 space-y-1">
              <li><a href="tel:+5541999320954" class="${externalLink}"><i data-lucide="phone" class="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i><span>(41) 99932-0954</span></a></li>
              <li><a href="https://wa.me/5541999320954" target="_blank" rel="noopener noreferrer" class="${externalLink}"><i data-lucide="message-circle" class="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i><span>WhatsApp</span><i data-lucide="arrow-up-right" class="h-4 w-4 text-zinc-500" aria-hidden="true"></i></a></li>
            </ul>
          </div>

          <div data-footer-group>
            <h2 class="text-sm font-semibold text-white">Redes e comunidade</h2>
            <ul class="mt-5 space-y-1">
              <li><a href="https://www.instagram.com/moveup.tech/" target="_blank" rel="noopener noreferrer" class="${externalLink}"><i data-lucide="camera" class="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i><span>Instagram <span class="text-zinc-400">@moveup.tech</span></span><i data-lucide="arrow-up-right" class="h-4 w-4 text-zinc-500" aria-hidden="true"></i></a></li>
              <li><a href="https://x.com/techmoveup" target="_blank" rel="noopener noreferrer" class="${externalLink}"><i data-lucide="at-sign" class="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i><span>X <span class="text-zinc-400">@techmoveup</span></span><i data-lucide="arrow-up-right" class="h-4 w-4 text-zinc-500" aria-hidden="true"></i></a></li>
              <li><a href="https://www.linkedin.com/company/moveuptech/?viewAsMember=true" target="_blank" rel="noopener noreferrer" class="${externalLink}"><i data-lucide="briefcase-business" class="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i><span>LinkedIn</span><i data-lucide="arrow-up-right" class="h-4 w-4 text-zinc-500" aria-hidden="true"></i></a></li>
              <li><a href="https://discord.gg/6XRk5Vryw" target="_blank" rel="noopener noreferrer" class="${externalLink}"><i data-lucide="messages-square" class="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true"></i><span>Discord</span><i data-lucide="arrow-up-right" class="h-4 w-4 text-zinc-500" aria-hidden="true"></i></a></li>
            </ul>
          </div>
        </div>

        <div class="mt-16 flex flex-col gap-3 border-t border-zinc-800 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© ${currentYear} Move Up Tecnologia. Todos os direitos reservados.</p>
          <p>Desenvolvimento de software sob medida.</p>
        </div>
      </div>
    </footer>
  `;
}
