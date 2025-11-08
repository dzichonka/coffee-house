//import { fetcher } from "../../utils/fetcher";
import { useCartState } from "../../state/cartState";
import { refreshTotal } from "./refreshTotal";
import { disabledConfirm } from "./disabledConfirm";
import { addCartIcon } from "@/scripts/utils/addCartIcon";
import { auth, db } from "@/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const { clear } = useCartState();

export const handleConfim = async (order: Order) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not authenticated");
    return;
  }

  const errorDiv: HTMLHeadingElement | null = document.querySelector("#error");
  const cartList: HTMLUListElement | null =
    document.querySelector("#cart-list");
  if (
    !(errorDiv instanceof HTMLHeadingElement) ||
    !(cartList instanceof HTMLUListElement)
  ) {
    throw new Error("Elements not found");
  }
  try {
    errorDiv.classList.add("hidden");

    const userDocRef = doc(db, "users", user.uid);

    await updateDoc(userDocRef, {
      orders: arrayUnion({
        ...order,
        createdAt: new Date().toISOString(),
      }),
    });

    clear();
    if (cartList)
      cartList.innerHTML = `<h3 id="message" class="message">
              Thank you for your order! Our manager will contact you shortly.
            </h3>`;
    if (errorDiv) errorDiv.classList.add("hidden");
    addCartIcon();
    refreshTotal();
    disabledConfirm();
  } catch (error) {
    console.error("Error saving order:", error);
    errorDiv?.classList.remove("hidden");
  }
};
