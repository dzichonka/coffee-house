import "@/styles/style.scss";
import { loadComponent } from "./utils/loadComponent.ts";

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("header");
  await loadComponent("footer");
  await loadComponent("modal");
  await import("./modules/burger.ts");
  await import("./utils/headerLinks.ts");
  await import("./utils/disableMenuBtn.ts");
  (await import("./utils/addCartIcon.ts")).addCartIcon();
  (await import("./utils/addSignOutIcon.ts")).addSignOutIcon();
  await import("./utils/toggleTheme.ts");
  await import("./modules/cards.ts");
  await import("./modules/modal.ts");
});
