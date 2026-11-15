export function Button({
  title,
  iconLeft,
  iconRight,
  href,
  variant = "soft",
}: {
  title: string;
  iconLeft?: string;
  iconRight?: string;
  href?: string;
  variant?: "soft" | "solid";
}) {
  const content = `
      ${iconLeft ? iconLeft : ""}
      <span class="text-sm">${title}</span>
      ${iconRight ? iconRight : ""}
  `;

  const classes =
    "w-fit py-4 px-6 rounded-md flex items-center gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 transition-colors duration-300 " +
    (variant === "solid"
      ? "bg-emerald-700 text-white hover:bg-emerald-600"
      : "bg-emerald-700/25 text-emerald-500 hover:bg-emerald-700/50");

  return href
    ? /* html */ `<a href="${href}" class="${classes}">${content}</a>`
    : /* html */ `<button type="button" class="${classes}">${content}</button>`;
}
