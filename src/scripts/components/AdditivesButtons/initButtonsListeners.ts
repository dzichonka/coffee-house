export function initButtonsListeners(
  updatePriceFn: (price: string, discount?: string) => void,
): void {
  const sizesDiv: HTMLDivElement | null =
    document.querySelector("#modal-sizes");

  const additivesDiv: HTMLDivElement | null =
    document.querySelector("#modal-additives");

  if (
    !(sizesDiv instanceof HTMLDivElement) ||
    !(additivesDiv instanceof HTMLDivElement)
  )
    return;

  additivesDiv.addEventListener("click", (e) => {
    const target: EventTarget | null = e.target;
    if (!(target instanceof Element)) return;
    const button: HTMLButtonElement | null = target.closest("button.tab-add");
    if (!(button instanceof HTMLButtonElement)) return;
    button.classList.toggle("active");
  });

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
    const discount = button.getAttribute("data-discount") ?? "";

    updatePriceFn(price, discount);
  });
}
