import "@/styles/style.scss";
import { loadFooter } from "./partials/loadFooter.ts";

document.addEventListener("DOMContentLoaded", async () => {
  await loadFooter();
  await import("./utils/burger.ts");
  await import("./utils/slider.ts");
});
