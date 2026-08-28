export function Button({ title, icon }: { title: string; icon?: string }) {
  return /* html */ `
    <button class="bg-emerald-700/25 text-emerald-500 p-4 rounded-md flex items-center gap-4 hover:bg-emerald-700/50 transition-colors duration-300">
      ${icon && icon}
      <p class="text-sm">${title}</p>
    </button>
  `;
}
