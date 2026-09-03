import { icons, createIcons } from "lucide";

import { router } from "./routes";

router.resolve();

createIcons({ icons });

type ThemePreference = "light" | "dark" | "system";

function setupTheme() {
  const trigger = document.querySelector<HTMLButtonElement>(
    ".theme-menu-trigger",
  );
  const menu = document.querySelector<HTMLElement>("#theme-menu");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );

  if (!trigger || !menu) return;

  const getPreference = (): ThemePreference => {
    const stored = localStorage.getItem("moveup-theme");
    return stored === "light" || stored === "dark" ? stored : "system";
  };

  const applyTheme = (preference: ThemePreference) => {
    const dark =
      preference === "dark" ||
      (preference === "system" && systemTheme.matches);

    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.dataset.theme = preference;
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    themeColor?.setAttribute("content", dark ? "#09090b" : "#ffffff");

    document.querySelectorAll<HTMLElement>("[data-theme-icon]").forEach((icon) => {
      icon.hidden = icon.dataset.themeIcon !== preference;
    });
    menu.querySelectorAll<HTMLButtonElement>("[data-theme-value]").forEach((button) => {
      button.setAttribute(
        "aria-checked",
        String(button.dataset.themeValue === preference),
      );
      button.setAttribute("role", "menuitemradio");
    });
    trigger.setAttribute(
      "aria-label",
      `Alterar tema. Atual: ${preference === "light" ? "claro" : preference === "dark" ? "escuro" : "sistema"}`,
    );
  };

  const setMenuOpen = (open: boolean) => {
    trigger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    menu.toggleAttribute("inert", !open);
    menu.classList.toggle("is-open", open);
  };

  applyTheme(getPreference());

  trigger.addEventListener("click", () => {
    setMenuOpen(trigger.getAttribute("aria-expanded") !== "true");
  });
  menu.querySelectorAll<HTMLButtonElement>("[data-theme-value]").forEach((button) => {
    button.addEventListener("click", () => {
      const preference = button.dataset.themeValue as ThemePreference;
      localStorage.setItem("moveup-theme", preference);
      applyTheme(preference);
      setMenuOpen(false);
      trigger.focus();
    });
  });
  systemTheme.addEventListener("change", () => {
    if (getPreference() === "system") applyTheme("system");
  });
  document.addEventListener("click", (event) => {
    if (!trigger.parentElement?.contains(event.target as Node)) setMenuOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || trigger.getAttribute("aria-expanded") !== "true") return;
    setMenuOpen(false);
    trigger.focus();
  });
}

setupTheme();

function setupHeaderScroll() {
  const header = document.querySelector<HTMLElement>(".site-header");

  if (!header) return;

  let ticking = false;

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY >= 100);
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateHeader);
  };

  updateHeader();
  window.addEventListener("scroll", requestUpdate, { passive: true });
}

setupHeaderScroll();

function setupSectionNavigation() {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>("[data-section-link]"),
  );
  const sections = links
    .map((link) => document.getElementById(link.dataset.sectionLink || ""))
    .filter((section): section is HTMLElement => Boolean(section));

  if (!links.length || !sections.length || !("IntersectionObserver" in window))
    return;

  const setCurrent = (id: string) => {
    links.forEach((link) => {
      if (link.dataset.sectionLink === id) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const visible = new Map<string, number>();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.set(entry.target.id, entry.intersectionRatio);
        } else {
          visible.delete(entry.target.id);
        }
      });

      const current = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
      if (current) setCurrent(current[0]);
    },
    { rootMargin: "-20% 0px -55%", threshold: [0, 0.2, 0.5, 0.8] },
  );

  sections.forEach((section) => observer.observe(section));
  setCurrent(window.location.hash.slice(1) || "home");
}

setupSectionNavigation();

function setupMobileMenu() {
  const header = document.querySelector<HTMLElement>(".site-header");
  const trigger = document.querySelector<HTMLButtonElement>(
    ".mobile-menu-trigger",
  );
  const menu = document.querySelector<HTMLElement>("#mobile-navigation");

  if (!header || !trigger || !menu) return;

  const openIcon = trigger.querySelector<HTMLElement>(".menu-open-icon");
  const closeIcon = trigger.querySelector<HTMLElement>(".menu-close-icon");

  const setOpen = (open: boolean) => {
    trigger.setAttribute("aria-expanded", String(open));
    trigger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.setAttribute("aria-hidden", String(!open));
    menu.toggleAttribute("inert", !open);
    menu.classList.toggle("is-open", open);
    openIcon?.classList.toggle("hidden", open);
    closeIcon?.classList.toggle("hidden", !open);
  };

  trigger.addEventListener("click", () => {
    setOpen(trigger.getAttribute("aria-expanded") !== "true");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target as Node)) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key !== "Escape" ||
      trigger.getAttribute("aria-expanded") !== "true"
    )
      return;
    setOpen(false);
    trigger.focus();
  });

  window.matchMedia("(min-width: 1280px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}

setupMobileMenu();

function setupMotion() {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) return;

  const groups = [
    document.querySelectorAll<HTMLElement>("#partners h2, #partners li"),
    document.querySelectorAll<HTMLElement>(
      "#about h2, #about h2 + p, #about ul > li",
    ),
    document.querySelectorAll<HTMLElement>(
      "#process h2, #process .process-intro, #process [data-process-step]",
    ),
    document.querySelectorAll<HTMLElement>(
      "#services h2, #services h2 + p",
    ),
    document.querySelectorAll<HTMLElement>(
      "#contact h2, #contact h2 + p, #contact form",
    ),
    document.querySelectorAll<HTMLElement>(
      "#testimonials h2, #testimonials h2 + p, #testimonials figure",
    ),
    document.querySelectorAll<HTMLElement>("footer [data-footer-group]"),
  ];

  const targets = groups.flatMap((group) =>
    Array.from(group).map((element, index) => {
      element.classList.add("motion-reveal");
      element.style.setProperty(
        "--motion-delay",
        `${Math.min(index * 70, 280)}ms`,
      );
      return element;
    }),
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12%", threshold: 0.12 },
  );

  targets.forEach((target) => observer.observe(target));

  const serviceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-active");
        serviceObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -20%", threshold: 0.35 },
  );

  document
    .querySelectorAll<HTMLElement>("[data-service-step]")
    .forEach((step) => serviceObserver.observe(step));

  document.documentElement.classList.add("motion-ready");
}

setupMotion();

function setupTimelineProgress() {
  const timeline = document.querySelector<HTMLElement>(
    ".process-timeline-shell",
  );
  const markers = Array.from(
    document.querySelectorAll<HTMLElement>("[data-timeline-marker]"),
  );

  if (!timeline || markers.length === 0) return;

  const setProgress = (progress: number) => {
    timeline.style.setProperty("--timeline-progress", progress.toFixed(4));
    markers.forEach((marker, index) => {
      const markerProgress = index / (markers.length - 1);
      marker.dataset.complete = String(progress >= markerProgress);
    });
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setProgress(1);
    return;
  }

  let ticking = false;

  const updateProgress = () => {
    const bounds = timeline.getBoundingClientRect();
    const activationLine = window.innerHeight * 0.78;
    const completionLine = window.innerHeight * 0.38;
    const travel = bounds.height + activationLine - completionLine;
    const progress = Math.min(
      1,
      Math.max(0, (activationLine - bounds.top) / travel),
    );

    setProgress(progress);
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateProgress);
  };

  updateProgress();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
}

setupTimelineProgress();

function setupContactForm() {
  const form = document.querySelector<HTMLFormElement>("#contact-form");
  const status = document.querySelector<HTMLElement>("#contact-status");

  if (!form || !status) return;

  const fields = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      "input, select, textarea",
    ),
  );

  const syncValidity = (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    field.setAttribute("aria-invalid", String(!field.validity.valid));
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      syncValidity(field);
      if (form.checkValidity()) status.textContent = "";
    });
    field.addEventListener("change", () => syncValidity(field));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      fields.forEach(syncValidity);
      const firstInvalid = fields.find((field) => !field.validity.valid);
      status.textContent = "Há um campo incompleto ou inválido. Revise o campo destacado para continuar.";
      firstInvalid?.focus();
      firstInvalid?.reportValidity();
      return;
    }

    const data = new FormData(form);
    const message = [
      "Olá! Gostaria de conversar sobre um projeto.",
      "",
      `Nome: ${data.get("name")}`,
      `E-mail: ${data.get("email")}`,
      `WhatsApp/Telefone: ${data.get("phone")}`,
      `Tipo de projeto: ${data.get("projectType")}`,
      `Descrição: ${data.get("description") || "Não informada"}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/5541999320954?text=${encodeURIComponent(message)}`;
    const conversation = window.open(
      whatsappUrl,
      "_blank",
    );

    if (conversation) {
      conversation.opener = null;
      status.textContent = "Conversa aberta. Revise a mensagem no WhatsApp antes de enviar.";
      return;
    }

    status.replaceChildren(
      "O navegador bloqueou a nova janela. ",
      Object.assign(document.createElement("a"), {
        href: whatsappUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        textContent: "Abrir o WhatsApp manualmente",
        className:
          "font-semibold text-emerald-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 dark:text-emerald-400",
      }),
      ".",
    );
  });
}

setupContactForm();
