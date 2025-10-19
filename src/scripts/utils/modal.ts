const modal = document.querySelector<HTMLDivElement>("#modal");
const content = document.querySelector<HTMLDivElement>(".window");
const closeBtn = document.querySelector<HTMLButtonElement>("#close");
const price = document.querySelector<HTMLHeadingElement>("#modal-price");
const img = document.querySelector<HTMLImageElement>("#modal-img");
const title = document.querySelector<HTMLHeadingElement>("#modal-title");
const description = document.querySelector<HTMLElement>("#modal-description");

const tabsSize = Array.from(
  document.querySelectorAll<HTMLDivElement>(".tab-size")
);
const tabsAdditives = Array.from(
  document.querySelectorAll<HTMLElement>(".tab-add")
);

let sizeListenersAdded = false;
let addListenersAdded = false;
function closeModal() {
  modal?.classList.add("closed");
  document.body.style.overflow = "auto";
  tabsSize.forEach((tab) => tab.classList.remove("active"));
  tabsSize[0].classList.add("active");
  tabsAdditives.forEach((tab) => tab.classList.remove("active"));
}

closeBtn?.addEventListener("click", () => {
  closeModal();
});

window.addEventListener("click", (e: Event): void => {
  if (e.target === modal && e.target !== content) {
    closeModal();
  }
});

export function displayModal(item: ProductType): void {
  let basePrice = Number(item.price);
  let additivesPrice = 0;

  const updatePrice = (): void => {
    const total = basePrice + additivesPrice;
    if (price) price.textContent = `$${total.toFixed(2)}`;
  };

  if (!modal || !content || !price) return;
  modal.classList.remove("closed");
  document.body.style.overflow = "hidden";

  if (img) {
    img.src = `images/menu/${item.category}/${item.id}.png`;
    img.alt = item.name;
  }
  if (title) title.textContent = item.name;
  if (description) description.textContent = item.description;

  const sizeKeys: SizesType[] = ["s", "m", "l"];

  if (!sizeListenersAdded) {
    sizeKeys.forEach((key: SizesType, i: number): void => {
      //const sizeData: SizeType = item.sizes[key];
      //const span = tabsSize[i].querySelector<HTMLSpanElement>(".text");
      // tabsSize[i].setAttribute("data-size", sizeData["add-price"]);
      // if (span) span.textContent = sizeData.size;

      tabsSize[i].addEventListener("click", () => {
        tabsSize.forEach((tab) => {
          tab.classList.remove("active");
          basePrice = Number(item.price);
        });
        tabsSize[i].classList.add("active");
        basePrice += Number(tabsSize[i].getAttribute("data-size"));
        updatePrice();
      });
    });
    sizeListenersAdded = true;
  }

  if (!addListenersAdded) {
    // item.additives.forEach((additive, i) => {
    //   const span = tabsAdditives[i].querySelector(".text");
    //   tabsAdditives[i].setAttribute("data-add", additive["add-price"]);
    //   if (span) span.textContent = additive.name;

    //   tabsAdditives[i].addEventListener("click", () => {
    //     tabsAdditives[i].classList.toggle("active");
    //     if (tabsAdditives[i].classList.contains("active")) {
    //       additivesPrice += Number(tabsAdditives[i].getAttribute("data-add"));
    //     } else {
    //       additivesPrice -= Number(tabsAdditives[i].getAttribute("data-add"));
    //     }
    //     updatePrice();
    //   });
    // });
    addListenersAdded = true;
  }

  updatePrice();
}
