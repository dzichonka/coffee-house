import { useCartState } from "../../state/cartState";
import { useUserState } from "../../state/userState";
import { addCartIcon } from "../../utils/addCartIcon";
import { refreshTotal } from "./refreshTotal";

const { isLoggedIn } = useUserState();

const { getCart } = useCartState();

export function renderCart(removeFn: (e: Event) => void) {
  const cartList: HTMLUListElement | null =
    document.querySelector("#cart-list");

  if (!(cartList instanceof HTMLUListElement)) {
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
      removeBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
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
      additives.textContent = item.additives.length
        ? item.additives.map((a) => `, ${a}`).join("")
        : "";

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

        // totalPriceOldDiv.textContent = `$${getTotalPriceOld().toFixed(2)}`;
        // totalPriceNewDiv.textContent = `$${(getTotalPriceOld() - getTotalPriceNew()).toFixed(2)}`;

        priceDiv.append(priceOld, priceNew);
      } else {
        const priceNew = document.createElement("h3");
        priceNew.classList.add("price__new");
        priceNew.textContent = `$${item.priceOld.toFixed(2)}`;

        //totalPriceNewDiv.textContent = `$${getTotalPriceOld().toFixed(2)}`;

        priceDiv.append(priceNew);
      }

      li.append(removeBtn, img, infoDiv, priceDiv);

      cartList?.append(li);
    }
  });
  refreshTotal();
  addCartIcon();
}
