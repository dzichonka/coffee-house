import { useUserState } from "@/scripts/state/userState";

const { isLoggedIn } = useUserState();

export function renderSizeButtons(product: Product): void {
  const sizesContainer: HTMLDivElement | null =
    document.querySelector("#modal-sizes");
  if (!(sizesContainer instanceof HTMLDivElement)) return;

  sizesContainer.innerHTML = "";

  const sizeKeys = Object.keys(product.sizes);

  sizeKeys.forEach((key, index) => {
    const sizeData = product.sizes[key];

    const button = document.createElement("button");
    button.classList.add("tab", "tab-size", "tooltip");
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

    const tooltip = document.createElement("span");
    tooltip.classList.add("tooltip-text");

    if (isLoggedIn()) {
      if (sizeData.discountPrice) {
        tooltip.innerHTML = `
        <span class="old-price">$${sizeData.price}</span>
        <span class="new-price">$${sizeData.discountPrice ?? sizeData.price}</span>
      `;
      } else {
        tooltip.innerHTML = `
        <span class="new-price">$${sizeData.price}</span>
      `;
      }
    } else {
      tooltip.textContent = `$${sizeData.price}`;
    }

    button.append(spanSign, spanText, tooltip);
    sizesContainer.append(button);
  });
}
