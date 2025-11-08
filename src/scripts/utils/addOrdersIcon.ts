import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export function addOrdersIcon() {
  const wrapper = document.querySelector<HTMLDivElement>("#nav-right");
  if (!wrapper) return;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const ordersLink = document.createElement("a");
      ordersLink.classList.add("btn-icon");
      ordersLink.id = "orders-link";
      ordersLink.href = "orders";
      ordersLink.innerHTML = `
<i class="fa-solid fa-truck"></i>
      `;
      wrapper.append(ordersLink);
    } else {
      const singOutBtn =
        document.querySelector<HTMLButtonElement>("#orders-link");
      singOutBtn?.remove();
    }
  });
}
