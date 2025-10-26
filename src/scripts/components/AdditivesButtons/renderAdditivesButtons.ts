export function renderAdditivesButtons(product: Product): void {
  const additivesContainer: HTMLDivElement | null =
    document.querySelector("#modal-additives");
  if (!(additivesContainer instanceof HTMLDivElement)) return;

  additivesContainer.innerHTML = "";

  const additives: Additive[] = product.additives;

  additives.map((item, index) => {
    const button = document.createElement("button");
    button.classList.add("tab", "tab-add");

    button.setAttribute("data-add-price", item.price ?? "0");
    button.setAttribute(
      "data-add-discount",
      item.discountPrice || item.price || "0"
    );
    button.setAttribute("data-add-key", item.name);

    const spanSign = document.createElement("span");
    spanSign.classList.add("sign");
    spanSign.textContent = String(index + 1);

    const spanText = document.createElement("span");
    spanText.classList.add("text");
    spanText.textContent = item.name;

    button.append(spanSign, spanText);
    additivesContainer.append(button);
    console.log(button);
  });
}
