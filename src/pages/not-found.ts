import mooviSad from "../assets/moovi_sad.png";

export function NotFound() {
  document.title = "Página não encontrada | Moveup Tecnologia";

  return /* html*/ `
    <main id="conteudo" class="min-h-screen">
      <section class="relative flex min-h-screen items-center overflow-hidden py-16 sm:py-24">
        <div class="mx-auto grid w-full max-w-[1180px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_.82fr] lg:gap-16">
          <div class="max-w-4xl">
            <p class="font-mono text-sm font-semibold uppercase tracking-[.18em] text-signal text-emerald-700">Erro 404</p>
            <h1 class="text-5xl font-semibold leading-[1.04] text-ink">
              Ops, esta página <em class="font-medium text-signal">não foi encontrada</em>.
            </h1>
            <p class="mt-7 max-w-2xl text-lg leading-8 text-muted text-gray-500">
              A Moovi procurou por aqui, mas esse caminho não existe ou saiu do ar.
              <br /> <a href="/" class="text-emerald-700">Voltar para o início</a>
            </p>
          </div>
          <img src="${mooviSad}" alt="Moovi triste porque a página não foi encontrada" class="w-full bottom-0 max-w-[360px] absolute right-32" />
        </div>
      </section>
    </main>
  `;
}
