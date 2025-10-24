import "@/styles/style.scss";
import { loadFooter } from "./components/loadFooter.ts";

document.addEventListener("DOMContentLoaded", async () => {
  await loadFooter();
  await import("./modules/burger.ts");
  await import("./modules/slider.ts");
});
