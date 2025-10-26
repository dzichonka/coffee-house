export function initSizeButtonsListeners(
  updatePriceFn: (price: string, discount?: string) => void,
): void {
  const sizesDiv: HTMLDivElement | null =
    document.querySelector("#modal-sizes");
  if (!(sizesDiv instanceof HTMLDivElement)) return;

  sizesDiv.addEventListener("click", (e) => {
    const target: EventTarget | null = e.target;
    if (!(target instanceof Element)) return;
    const button: HTMLButtonElement | null = target.closest("button.tab-size");
    if (!(button instanceof HTMLButtonElement)) return;

    sizesDiv
      .querySelectorAll(".tab-size")
      .forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const price = button.getAttribute("data-price") ?? "";
    const discount = button.getAttribute("data-discount") ?? "0";

    updatePriceFn(price, discount);
  });
}
