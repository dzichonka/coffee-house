import "@/styles/style.scss";
import { loadComponent } from "./utils/loadComponent.ts";

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("header");
  await loadComponent("footer");
  await import("./modules/burger.ts");
  await import("./utils/addCartIcon.ts");
  await import("./modules/registration.ts");
});
