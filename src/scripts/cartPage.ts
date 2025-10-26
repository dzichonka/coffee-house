import "@/styles/style.scss";
import { loadComponent } from "./utils/loadComponent.ts";
import { addCartIcon } from "./utils/addCartIcon.ts";

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("header");
  await loadComponent("footer");
  await import("./modules/burger.ts");
  await addCartIcon();
  await import("./modules/cart.ts");
});
