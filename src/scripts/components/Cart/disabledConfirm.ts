import { useCartState } from "@/scripts/state/cartState";

const { getTotalCount } = useCartState();

export function disabledConfirm() {
  const confirmBtn = document.querySelector<HTMLButtonElement>("#confirm");
  if (!confirmBtn) return;

  if (getTotalCount() > 0) {
    confirmBtn.disabled = false;
    confirmBtn.classList.remove("disabled");
    return;
  } else {
    confirmBtn.disabled = true;
    confirmBtn.classList.add("disabled");
    return;
  }
}
