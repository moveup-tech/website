import Navigo from "navigo";

import { Home } from "./pages/home";
import { NotFound } from "./pages/not-found";

export const app = document.querySelector<HTMLDivElement>("#app")!;
export const router = new Navigo("/");

router
  .on("/", () => (app.innerHTML = Home()))
  .notFound(() => (app.innerHTML = NotFound()));
