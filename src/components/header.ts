import { Button } from "./button";

import Logo from "../assets/logo/light.svg";
import { router } from "../routes";

export function Header() {
  const { route } = router.getCurrentLocation();

  return /* html */ `
  <header class="w-full max-h-24 bg-black/75 border-b border-zinc-900 flex items-center">
    <nav class="w-full max-w-7xl mx-auto p-6 rounded-xl flex items-center justify-between relative">
      <div class="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded p-2 mt-8">
        <img src="${Logo}" alt="Move Up Tecnologia" class="w-24 h-24">
      </div>
      <ul class="flex items-center gap-4 text-black dark:text-white full">
        <li><a href="#home" data-location="#home" class="text-white data-[location=${route.name}]:text-emerald-500">Home</a></li>
        <li><a href="#about" data-location="#about" class="text-white data-[location=${route.name}]:text-emerald-500">About</a></li>
      </ul>
      ${Button({ title: "Entre em contato", icon: `<i data-lucide="phone" class="icon-sm"></i>` })}
    </nav>
  </header>
  `;
}
