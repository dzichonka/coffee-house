import { removeItem } from "../components/Cart/removeItem";
//import { useUserState } from "../state/userState";
//import { fetcher } from "../utils/fetcher";
import { renderCart } from "../components/Cart/renderCart";
import { handleConfim } from "../components/Cart/hendleConfirm";
import { disabledConfirm } from "../components/Cart/disabledConfirm";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "@/firebase";
import { loadUserData } from "../api/user";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

//const { isLoggedIn, getToken } = useUserState();

const buttonsDiv: HTMLDivElement | null = document.querySelector(".buttons");
const userInfoDiv: HTMLDivElement | null =
  document.querySelector("#cart-total");

if (
  !(buttonsDiv instanceof HTMLDivElement) ||
  !(userInfoDiv instanceof HTMLDivElement)
)
  throw new Error("Cart list not found");

//if (isLoggedIn()) {
//   const { data: res, error } = await fetcher<{
//     data: User;
//     message?: string;
//     error?: string;
//   }>(
//     "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/auth/profile",
//     "#loader",
//     {
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${getToken()}`,
//       },
//     },
//   );

//   if (error) {
//     if (buttonsDiv) {
//       buttonsDiv.innerHTML = "error";
//     }
//   }
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userData = await loadUserData();

    if (!userData) {
      console.error("No user data found in Firestore");
      return;
    }

    const address = document.createElement("div");
    address.classList.add("cart-row");
    address.innerHTML = `<h3>Address:</h3>
                      <h3>${userData.city}, ${userData.street}, ${userData.houseNumber}</h3>`;

    const payment = document.createElement("div");
    payment.classList.add("cart-row");
    payment.innerHTML = `<h3>Pay by:</h3>
                      <h3>${userData.paymentMethod.charAt(0).toUpperCase() + userData.paymentMethod.slice(1)}</h3>`;

    userInfoDiv.append(address, payment);

    const confirmBtn = document.createElement("button");
    confirmBtn.classList.add("btn");
    confirmBtn.id = "confirm";
    confirmBtn.type = "button";
    confirmBtn.innerHTML = "Confirm";
    buttonsDiv.appendChild(confirmBtn);
    disabledConfirm();

    confirmBtn.addEventListener("click", handleConfim);
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
