import { removeItem } from "../components/Cart/removeItem";
import { useUserState } from "../state/userState";
import { fetcher } from "../utils/fetcher";
import { renderCart } from "../components/Cart/renderCart";
import { handleConfim } from "../components/Cart/hendleConfirm";

const { isLoggedIn, getToken } = useUserState();

const buttonsDiv: HTMLDivElement | null = document.querySelector(".buttons");
const userInfoDiv: HTMLDivElement | null =
  document.querySelector("#cart-total");

if (
  !(buttonsDiv instanceof HTMLDivElement) ||
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

  confirmBtn.addEventListener("click", handleConfim);
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

renderCart(removeItem);
