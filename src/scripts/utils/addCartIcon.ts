import { onAuthStateChanged } from "firebase/auth";
import { useCartState } from "../state/cartState";
import { auth } from "@/firebase";

const { getTotalCount } = useCartState();

export function addCartIcon() {
  const wrapper = document.querySelector<HTMLDivElement>("#nav-right");
  if (!wrapper) return;

  onAuthStateChanged(auth, (user) => {
    const count = getTotalCount();
    const cartLink = wrapper.querySelector<HTMLAnchorElement>(".link-cart");
    const oldCount = Number(
      cartLink?.querySelector<HTMLSpanElement>("span")?.textContent || 0
    );
    if (user || count > 0) {
      if (!cartLink) {
        const newLink = document.createElement("a");
        newLink.classList.add("btn-icon", "link-cart");
        newLink.href = "cart";
        newLink.innerHTML = `
        <i class="fa-solid fa-bag-shopping"></i>
        <span>${count > 0 ? count : ""}</span>
      `;
        wrapper.prepend(newLink);
      } else if (oldCount !== count) {
        const span = cartLink.querySelector("span");
        if (span) span.textContent = count > 0 ? String(count) : "";
      }
    } else if (cartLink) {
      cartLink.remove();
    }
  });
}
