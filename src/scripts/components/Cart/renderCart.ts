import { useCartState } from "../../state/cartState";
import { useUserState } from "../../state/userState";
import { addCartIcon } from "../../utils/addCartIcon";

const { isLoggedIn } = useUserState();

const { getCart, getTotalPriceNew, getTotalPriceOld } = useCartState();

export function renderCart(removeFn: (e: Event) => void) {
  const cartList: HTMLUListElement | null =
    document.querySelector("#cart-list");
  const totalPriceOldDiv: HTMLHeadingElement | null =
    document.querySelector("#total-price-old");
  const totalPriceNewDiv: HTMLHeadingElement | null =
    document.querySelector("#total-price-new");

  if (
    !(cartList instanceof HTMLUListElement) ||
    !(totalPriceOldDiv instanceof HTMLHeadingElement) ||
    !(totalPriceNewDiv instanceof HTMLHeadingElement)
  ) {
    throw new Error("Cart elements not found");
  }

  const cartItems = getCart();

  cartList.innerHTML = "";
  cartItems.forEach((item) => {
    for (let i = 0; i < item.quantity; i++) {
      const li = document.createElement("li");
      li.classList.add("cart-item");

      const removeBtn = document.createElement("button");
      removeBtn.setAttribute("data-id", item.productId.toString());
      removeBtn.classList.add("btn-icon");
      removeBtn.type = "button";
      removeBtn.innerHTML = `<img src="icons/trash.svg" alt="trash icon" />`;
      removeBtn.addEventListener("click", removeFn);

      const img = document.createElement("img");
      img.classList.add("cart-item_img");
      img.src = `/images/menu/${item.productId}.png`;
      img.alt = item.name;

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("cart-item_info");

      const title = document.createElement("h3");
      title.classList.add("cart-item_name");
      title.textContent = item.name;

      const description = document.createElement("p");

      const size = document.createElement("span");
      size.classList.add("cart-item_size");
      size.textContent = item.size;

      const additives = document.createElement("span");
      additives.classList.add("cart-item_additives");
      additives.textContent = item.additives.join(", ");

      description.append(size, additives);
      infoDiv.append(title, description);

      const priceDiv = document.createElement("div");
      priceDiv.classList.add("price-container");

      if (isLoggedIn()) {
        const priceOld = document.createElement("h3");
        priceOld.classList.add("price__old");
        priceOld.textContent = `$${item.priceOld.toFixed(2)}`;

        const priceNew = document.createElement("h3");
        priceNew.textContent = `$${(item.priceOld - item.priceNew).toFixed(2)}`;

        totalPriceOldDiv.textContent = `$${getTotalPriceOld().toFixed(2)}`;
        totalPriceNewDiv.textContent = `$${(getTotalPriceOld() - getTotalPriceNew()).toFixed(2)}`;

        priceDiv.append(priceOld, priceNew);
      } else {
        const priceNew = document.createElement("h3");
        priceNew.classList.add("price__new");
        priceNew.textContent = `$${item.priceOld.toFixed(2)}`;

        totalPriceNewDiv.textContent = `$${getTotalPriceOld().toFixed(2)}`;

        priceDiv.append(priceNew);
      }

      li.append(removeBtn, img, infoDiv, priceDiv);

      cartList?.append(li);
    }
  });

  addCartIcon();
}
