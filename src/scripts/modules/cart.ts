import { useCartState } from "../state/cartState";

const { getCart, getTotalCount, getTotalPriceNew, getTotalPriceOld } =
  useCartState();

const cartList: HTMLUListElement | null = document.querySelector("#cart-list");

if (!(cartList instanceof HTMLUListElement))
  throw new Error("Cart list not found");

const cartItems = getCart();

cartList.innerHTML = "";

cartItems.forEach((item) => {
  for (let i = 0; i < item.quantity; i++) {
    const li = document.createElement("li");
    li.classList.add("cart-item");

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn-icon");
    removeBtn.innerHTML = `<img src="icons/trash.svg" alt="trash icon" />`;

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

    const priceOld = document.createElement("h3");
    priceOld.classList.add("price__old");
    priceOld.textContent = `$${item.priceOld.toFixed(2)}`;

    const priceNew = document.createElement("h3");
    priceNew.textContent = `$${(item.priceOld - item.priceNew).toFixed(2)}`;

    priceDiv.append(priceOld, priceNew);

    li.append(removeBtn, img, infoDiv, priceDiv);

    cartList.append(li);
  }
});
