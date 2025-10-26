export function renderSizeButtons(product: Product): void {
  const sizesContainer: HTMLDivElement | null =
    document.querySelector("#modal-sizes");
  if (!(sizesContainer instanceof HTMLDivElement)) return;

  sizesContainer.innerHTML = "";

  const sizeKeys = Object.keys(product.sizes);

  sizeKeys.forEach((key, index) => {
    const sizeData = product.sizes[key];

    const button = document.createElement("button");
    button.classList.add("tab", "tab-size");
    if (index === 0) button.classList.add("active");

    button.setAttribute("data-price", sizeData.price ?? "0");
    button.setAttribute(
      "data-discount",
      sizeData.discountPrice || sizeData.price || "0",
    );
    button.setAttribute("data-size-key", sizeData.size);

    const spanSign = document.createElement("span");
    spanSign.classList.add("sign");
    spanSign.textContent = key.toUpperCase();

    const spanText = document.createElement("span");
    spanText.classList.add("text");
    spanText.textContent = sizeData.size;

    button.append(spanSign, spanText);
    sizesContainer.append(button);
  });
}
