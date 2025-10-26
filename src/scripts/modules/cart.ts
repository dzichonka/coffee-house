import { useCartState } from "../state/cartState";
import { useUserState } from "../state/userState";
import { fetcher } from "../utils/fetcher";

const { isLoggedIn, getToken } = useUserState();

const { getCart, getTotalCount, getTotalPriceNew, getTotalPriceOld } =
  useCartState();

const cartList: HTMLUListElement | null = document.querySelector("#cart-list");
const buttonsDiv: HTMLDivElement | null = document.querySelector(".buttons");
const userInfoDiv: HTMLDivElement | null =
  document.querySelector("#cart-total");
const totalPriceOldDiv: HTMLHeadingElement | null =
  document.querySelector("#total-price-old");
const totalPriceNewDiv: HTMLHeadingElement | null =
  document.querySelector("#total-price-new");

if (
  !(cartList instanceof HTMLUListElement) ||
  !(buttonsDiv instanceof HTMLDivElement) ||
  !(totalPriceOldDiv instanceof HTMLHeadingElement) ||
  !(totalPriceNewDiv instanceof HTMLHeadingElement) ||
  !(userInfoDiv instanceof HTMLDivElement)
)
  throw new Error("Cart list not found");

if (isLoggedIn()) {
  const { data: res, error } = await fetcher<{
    data: User;
    message?: string;
    error?: string;
  }>(
    "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/auth/profile",
    "#loader",
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (error) {
    if (buttonsDiv) {
      buttonsDiv.innerHTML = "error";
    }
  }

  const user = res?.data;

  if (!user) {
    throw new Error("User not found");
  }

  const address = document.createElement("div");
  address.classList.add("cart-row");
  address.innerHTML = `<h3>Address:</h3>
                      <h3>${user.city}, ${user.street}, ${user.houseNumber}</h3>`;

  const payment = document.createElement("div");
  payment.classList.add("cart-row");
  payment.innerHTML = `<h3>Pay by:</h3>
                      <h3>${user.paymentMethod.charAt(0).toUpperCase() + user.paymentMethod.slice(1)}</h3>`;

  userInfoDiv.append(address, payment);

  const confirmBtn = document.createElement("button");
  confirmBtn.classList.add("btn");
  confirmBtn.innerHTML = "Confirm";
  buttonsDiv.appendChild(confirmBtn);

  //   const oder: Order = {
  // items: [],
  // totalPrice: ()
  //   };

  // confirmBtn.addEventListener("click", async () => {
  //   const { data: res, error } = await fetcher<
  //     {
  //       data: OrderResponse;
  //       message?: string;
  //       error?: string;
  //     },
  //     User
  //   >(
  //     "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/orders/confirm",
  //     "#loader",
  //     {
  //       method: "POST",
  //       body: oder,
  //     }
  //   );
  // });
}

if (!isLoggedIn()) {
  const loginBtn = document.createElement("a");
  loginBtn.classList.add("btn");
  loginBtn.innerHTML = "Login";
  loginBtn.href = "login";

  const registerBtn = document.createElement("a");
  registerBtn.classList.add("btn");
  registerBtn.innerHTML = "Registration";
  registerBtn.href = "registration";

  buttonsDiv.append(loginBtn, registerBtn);
}

// const { data: res, error } = await fetcher<{
//   data: User;
//   message?: string;
//   error?: string;
// }>(
//   "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/auth/profile",
//   "#loader"
// );

// if (error) {
//   if (buttonsDiv) {
//     buttonsDiv.innerHTML = error;
//   }
// }

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

totalPriceOldDiv.textContent = `$${getTotalPriceOld().toFixed(2)}`;
totalPriceNewDiv.textContent = `$${(getTotalPriceOld() - getTotalPriceNew()).toFixed(2)}`;
