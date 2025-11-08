import "@/styles/style.scss";
import { loadComponent } from "./utils/loadComponent.ts";

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("header");
  await loadComponent("footer");
  await import("./modules/burger.ts");
  (await import("./utils/addCartIcon.ts")).addCartIcon();
  (await import("./utils/addSignOutIcon.ts")).addSignOutIcon();
  await import("./utils/toggleTheme.ts");
  await import("./modules/cart.ts");
});
