import { useModalState } from "../../state/modalState";

const { setSize } = useModalState();

export function initSizeButtonsListeners(
  updatePriceFn: () => void,
): () => void {
  const sizesDiv: HTMLDivElement | null =
    document.querySelector("#modal-sizes");
  if (!(sizesDiv instanceof HTMLDivElement))
    throw new Error("can not find sizes div");

  const onClick = (e: Event) => {
    const target: EventTarget | null = e.target;
    if (!(target instanceof Element)) return;
    const button: HTMLButtonElement | null = target.closest("button.tab-size");
    if (!(button instanceof HTMLButtonElement)) return;

    sizesDiv
      .querySelectorAll(".tab-size")
      .forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const price = button.getAttribute("data-price") ?? "";
    const discount = button.getAttribute("data-discount") || price || "0";
    const sizeKey = button.getAttribute("data-size-key") ?? "";

    setSize({
      size: sizeKey,
      price,
      discountPrice: discount,
    });

    console.log(price, discount, sizeKey);

    updatePriceFn();
  };

  sizesDiv.addEventListener("click", onClick);

  return () => {
    sizesDiv.removeEventListener("click", onClick);
  };
}
