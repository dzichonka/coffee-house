import { useCartState } from "../state/cartState";
import { useUserState } from "../state/userState";

const { isLoggedIn } = useUserState();
const { getTotalCount } = useCartState();

export function addCartIcon() {
  const wrapper = document.querySelector<HTMLDivElement>("#nav-right");
  if (!wrapper) return;

  const count = getTotalCount();
  const cartLink = wrapper.querySelector<HTMLAnchorElement>(".link-cart");
  const oldCount = Number(
    cartLink?.querySelector<HTMLSpanElement>("span")?.textContent || 0
  );

  if (isLoggedIn() || count > 0) {
    if (!cartLink) {
      const newLink = document.createElement("a");
      newLink.classList.add("link", "link-cart");
      newLink.href = "cart";
      newLink.innerHTML = `
        <img src="icons/shopping-bag.svg" alt="Shopping cart icon" />
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
}
