import { useCartState } from "../state/cartState";
import { useUserState } from "../state/userState";

const { isLoggedIn } = useUserState();

if (isLoggedIn()) {
  const { getTotalCount } = useCartState();

  const wrapper = document.querySelector("#nav-right");

  const cartLink = document.createElement("a");
  cartLink.classList.add("link");
  cartLink.href = "cart";
  cartLink.innerHTML = `
    <img src="icons/shopping-bag.svg" alt="Shopping cart icon" />
    <span>${getTotalCount() > 0 ? getTotalCount() : ""}</span>
  `;

  wrapper?.prepend(cartLink);
}
