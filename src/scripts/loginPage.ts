import "@/styles/style.scss";
import { loadFooter } from "./partials/loadFooter.ts";
import { loadHeader } from "./partials/loadHeader.ts";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader();
  await loadFooter();
  await import("./utils/burger.ts");
  await import("./utils/login.ts");
});
