import mooviSad from "../assets/moovi_sad.png";

export function NotFound() {
  document.title = "Página não encontrada | Moveup Tecnologia";

  return /* html*/ `
    <a href="#conteudo" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-signal focus:px-4 focus:py-3 focus:font-semibold focus:text-coal">Pular para o conteúdo principal</a>

    <main id="conteudo" class="min-h-screen">
      <section class="relative flex min-h-screen items-center overflow-hidden py-16 sm:py-24">
        <div class="mx-auto grid w-full max-w-[1180px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_.82fr] lg:gap-16">
          <div>
            <div class="max-w-4xl">
              <p class="font-mono text-sm font-semibold uppercase tracking-[.18em] text-signal">Erro 404</p>
              <h1 class="font-serif text-[clamp(2.35rem,5.2vw,4.75rem)] font-semibold leading-[1.04] text-ink">
                Ops, esta página <em class="font-medium text-signal">não foi encontrada</em>.
              </h1>
              <p class="mt-7 max-w-2xl text-lg leading-8 text-muted">
                A Moovi procurou por aqui, mas esse caminho não existe ou saiu do ar. Volte para a página inicial e continue navegando pela Moveup Tecnologia.
              </p>
            </div>

            <div class="mt-10 flex flex-wrap items-center gap-5">
              <a href="/" class="group inline-flex items-center gap-3 rounded-md bg-signal px-6 py-4 font-semibold text-coal shadow-glow transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(124,242,156,.2)]">
                Voltar para o início
                <span aria-hidden="true" class="transition group-hover:translate-x-1">-&gt;</span>
              </a>
              <a href="mailto:contato@moveuptecnologia.com.br" class="inline-flex items-center rounded-md border border-line px-6 py-4 font-semibold text-ink shadow-edge transition duration-300 hover:-translate-y-0.5 hover:border-greenDim hover:bg-moss">
                Reportar problema
              </a>
            </div>
          </div>

          <div class="flex justify-center lg:justify-end">
            <img src="${mooviSad}" alt="Moovi triste porque a página não foi encontrada" class="w-full max-w-[360px] object-contain drop-shadow-[0_24px_80px_rgba(124,242,156,.12)]" />
          </div>
        </div>
      </section>
    </main>
  `;
}
