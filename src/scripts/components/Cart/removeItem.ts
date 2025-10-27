import { useCartState } from "../../state/cartState";
import { renderCart } from "../../components/Cart/renderCart";

const { getCart, setCart } = useCartState();

export const removeItem = (e: Event) => {
  const target = e.target;
  if (!(target instanceof Element)) return;

  const btn = target.closest<HTMLButtonElement>("button[data-id]");
  if (!btn) return;

  const idStr = btn.getAttribute("data-id");
  if (!idStr) return;
  const idNum = Number(idStr);

  const cart = getCart();
  const idx = cart.findIndex((item) => item.productId === idNum);
  if (idx === -1) return;

  const newCart = [...cart];

  if (newCart[idx].quantity > 1) {
    newCart[idx] = { ...newCart[idx], quantity: newCart[idx].quantity - 1 };
  } else {
    newCart.splice(idx, 1);
  }

  console.log(newCart);

  setCart(newCart);
  renderCart(removeItem);
};
