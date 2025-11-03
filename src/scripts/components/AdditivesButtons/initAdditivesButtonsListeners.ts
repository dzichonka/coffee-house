import { useModalState } from "@/scripts/state/modalState";

const { addAdditive } = useModalState();

export function initAdditivesButtonsListeners(
  updatePriceFn: () => void
): () => void {
  const additivesDiv: HTMLDivElement | null =
    document.querySelector("#modal-additives");

  if (!(additivesDiv instanceof HTMLDivElement))
    throw new Error("can not find additives div");

  const onClick = (e: Event) => {
    const target: EventTarget | null = e.target;
    if (!(target instanceof Element)) return;
    const button: HTMLButtonElement | null = target.closest("button.tab-add");
    if (!(button instanceof HTMLButtonElement)) return;
    button.classList.toggle("active");

    const price = button.getAttribute("data-add-price") ?? "0";
    const discount = button.getAttribute("data-add-discount") || price || "0";
    const sizeKey = button.getAttribute("data-add-key") ?? "";

    addAdditive({
      name: sizeKey,
      price,
      discountPrice: discount,
    });

    updatePriceFn();
  };

  additivesDiv.addEventListener("click", onClick);

  return () => additivesDiv.removeEventListener("click", onClick);
}
