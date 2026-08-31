export function Button({
  title,
  iconLeft,
  iconRight,
  href,
}: {
  title: string;
  iconLeft?: string;
  iconRight?: string;
  href?: string;
}) {
  const content = `
      ${iconLeft ? iconLeft : ""}
      <span class="text-sm">${title}</span>
      ${iconRight ? iconRight : ""}
  `;

  const classes =
    "w-fit bg-emerald-700/25 text-emerald-500 py-4 px-6 rounded-md flex items-center gap-4 hover:bg-emerald-700/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 transition-colors duration-300";

  return href
    ? /* html */ `<a href="${href}" class="${classes}">${content}</a>`
    : /* html */ `<button type="button" class="${classes}">${content}</button>`;
}
