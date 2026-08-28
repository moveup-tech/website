import { Header } from "../components/header";

export function Home() {
  return /* html*/ `
    ${Header()}
    <main class="w-full max-w-7xl mx-auto p-6">
      <section id="home" class="grid grid-cols-2 md:grid-cols-2 gap-8 h-screen">
        <div class="h-full">
          <div class="w-fit flex gap-2 items-center p-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg">
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <small class="text-xs text-black dark:text-white">
              Disponível para novos projetos!
            </small>
          </div>
          <h1 class="text-4xl font-bold text-black dark:text-white">
            Soluções <em class="text-emerald-500">especializadas</em> em <br>
            tecnologia para o seu negócio.
          </h1>
          <p class="text-black dark:text-white mt-4">
            Aqui na Moveup, oferecemos um serviço
            especializado em tecnolgia para levar
            o seu negócio para o próximo nível.
            Tire seus projetos do papel e transforme-os
            em realidade.
          </p>
        </div>
      </section>
    </main>
  `;
}
