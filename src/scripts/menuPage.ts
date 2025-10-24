import "@/styles/style.scss";
import { loadFooter } from "./components/loadFooter.ts";
import { loadHeader } from "./components/loadHeader.ts";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader();
  await loadFooter();
  await import("./modules/burger.ts");
  await import("./utils/headerLinks.ts");
  await import("./utils/disableMenuBtn.ts");
  await import("./modules/cards.ts");
  await import("./modules/modal.ts");
});
