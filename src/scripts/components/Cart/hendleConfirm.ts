import { fetcher } from "../../utils/fetcher";
import { useCartState } from "../../state/cartState";

const { getCart, getTotalPriceNew, getTotalPriceOld, clear } = useCartState();

const price = getTotalPriceOld() - getTotalPriceNew();

const cart: CartItem[] = getCart();

const items: Item[] = cart.map(({ productId, size, additives, quantity }) => ({
  productId,
  size,
  additives,
  quantity,
}));

const oder: Order = {
  items,
  totalPrice: price,
};

const errorDiv: HTMLHeadingElement | null = document.querySelector("#error");
const cartList: HTMLUListElement | null = document.querySelector("#cart-list");
if (
  !(errorDiv instanceof HTMLHeadingElement) ||
  !(cartList instanceof HTMLUListElement)
) {
  throw new Error("Elements not found");
}

export const handleConfim = async () => {
  errorDiv.classList.add("hidden");
  const { data: res, error } = await fetcher<
    {
      data: OrderResponse;
      message?: string;
      error?: string;
    },
    Order
  >(
    "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/orders/confirm",
    "#loader",
    {
      method: "POST",
      body: oder,
    }
  );

  if (error) {
    if (errorDiv) errorDiv.classList.remove("hidden");
    return;
  }

  if (res) {
    clear();
    if (cartList)
      cartList.innerHTML = `            <h3 id="message" class="message">
              Thank you for your order! Our manager will contact you shortly.
            </h3>`;
    if (errorDiv) errorDiv.classList.add("hidden");
  }
};
