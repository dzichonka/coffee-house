import { useCartState } from "@/scripts/state/cartState";
import { useUserState } from "@/scripts/state/userState";

const { isLoggedIn } = useUserState();

const { getTotalPriceNew, getTotalPriceOld } = useCartState();

const totalPriceOldDiv: HTMLHeadingElement | null =
  document.querySelector("#total-price-old");
const totalPriceNewDiv: HTMLHeadingElement | null =
  document.querySelector("#total-price-new");

export function refreshTotal(): void {
  if (
    !(totalPriceOldDiv instanceof HTMLHeadingElement) ||
    !(totalPriceNewDiv instanceof HTMLHeadingElement)
  ) {
    throw new Error("Cart elements not found");
  }
  if (isLoggedIn()) {
    if (getTotalPriceOld() === getTotalPriceNew()) {
      totalPriceOldDiv.classList.add("hidden");
    } else {
      totalPriceOldDiv.classList.remove("hidden");
    }
    totalPriceOldDiv.textContent = `$${getTotalPriceOld().toFixed(2)}`;
    totalPriceNewDiv.textContent = `$${(getTotalPriceOld() - getTotalPriceNew()).toFixed(2)}`;
  } else {
    totalPriceNewDiv.textContent = `$${getTotalPriceOld().toFixed(2)}`;
  }
}
