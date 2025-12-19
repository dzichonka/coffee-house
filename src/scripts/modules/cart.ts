import { removeItem } from "@/scripts/components/Cart/removeItem";
import { renderCart } from "@/scripts/components/Cart/renderCart";
import { handleConfim } from "@/scripts/components/Cart/hendleConfirm";
import { disabledConfirm } from "@/scripts/components/Cart/disabledConfirm";
import { loadUserData } from "@/scripts/api/user";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useCartState } from "@/scripts/state/cartState";

const { getTotalPriceOld, getTotalPriceNew, getCart } = useCartState();

const buttonsDiv: HTMLDivElement | null = document.querySelector(".buttons");
const userInfoDiv: HTMLDivElement | null =
  document.querySelector("#cart-total");

if (
  !(buttonsDiv instanceof HTMLDivElement) ||
  !(userInfoDiv instanceof HTMLDivElement)
)
  throw new Error("Cart list not found");

const price = getTotalPriceOld() - getTotalPriceNew();

const cart: CartItem[] = getCart();

const items: Item[] = cart.map(
  ({ productId, name, size, additives, quantity }) => ({
    productId,
    name,
    size,
    additives,
    quantity,
  })
);

const order: Order = {
  items,
  totalPrice: price,
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userData = await loadUserData();

    if (!userData) {
      console.error("No user data found in Firestore");
      return;
    }

    const userName = document.createElement("div");
    userName.classList.add("cart-row");
    userName.innerHTML = `<h3>Name:</h3>
                      <h3>${userData.login}</h3>`;

    const address = document.createElement("div");
    address.classList.add("cart-row");
    address.innerHTML = `<h3>Address:</h3>
                      <h3>${userData.city}, ${userData.street}, ${userData.houseNumber}</h3>`;

    const payment = document.createElement("div");
    payment.classList.add("cart-row");
    payment.innerHTML = `<h3>Pay by:</h3>
                      <h3>${userData.paymentMethod.charAt(0).toUpperCase() + userData.paymentMethod.slice(1)}</h3>`;

    userInfoDiv.append(userName, address, payment);

    const confirmBtn = document.createElement("button");
    confirmBtn.classList.add("btn");
    confirmBtn.id = "confirm";
    confirmBtn.type = "button";
    confirmBtn.innerHTML = "Confirm";
    buttonsDiv.appendChild(confirmBtn);
    disabledConfirm();

    confirmBtn.addEventListener("click", () => {
      handleConfim(order);
    });
  } else {
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
});

renderCart(removeItem);
