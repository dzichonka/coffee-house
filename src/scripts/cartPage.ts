import "@/styles/style.scss";
import { loadFooter } from "./components/loadFooter.ts";
import { loadHeader } from "./components/loadHeader.ts";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader();
  await loadFooter();
  await import("./modules/burger.ts");
  await import("./modules/cart.ts");
});
