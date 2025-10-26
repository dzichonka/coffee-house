import { fetcher } from "../utils/fetcher";
import { useUserState } from "../state/userState";
import { renderSizeButtons } from "../components/SizeButtons/renderSizeButtons";
import { renderAdditivesButtons } from "../components/AdditivesButtons/renderAdditivesButtons";
import { initSizeButtonsListeners } from "../components/SizeButtons/initSizeButtonsListeners";

const { isLoggedIn } = useUserState();

const modal: HTMLDivElement | null = document.querySelector("#modal");
const content: HTMLDivElement | null = document.querySelector(".window");
const closeBtn: HTMLButtonElement | null =
  document.querySelector("#close-modal");
const imgDiv: HTMLImageElement | null = document.querySelector("#modal-img");
const titleDiv: HTMLHeadingElement | null =
  document.querySelector("#modal-title");
const descriptionDiv: HTMLParagraphElement | null =
  document.querySelector("#modal-description");
const addBtn: HTMLButtonElement | null = document.querySelector("#add-to-cart");

function closeModal() {
  modal?.classList.add("hidden");
  document.body.style.overflow = "auto";
}

closeBtn?.addEventListener("click", () => {
  closeModal();
});

addBtn?.addEventListener("click", () => {
  closeModal();
});

window.addEventListener("click", (e: Event): void => {
  if (e.target === modal && e.target !== content) {
    closeModal();
  }
});

window.addEventListener("keydown", (e: KeyboardEvent): void => {
  if (e.key === "Escape") {
    closeModal();
  }
});

function updatePrice(price: string, discount?: string) {
  const priceDiv: HTMLHeadingElement | null =
    document.querySelector("#modal-price");
  const discountDiv: HTMLHeadingElement | null =
    document.querySelector("#modal-discount");

  if (
    !(priceDiv instanceof HTMLHeadingElement) ||
    !(discountDiv instanceof HTMLHeadingElement)
  )
    return;

  if (!discount || !isLoggedIn()) {
    priceDiv.classList.add("hidden");
    discountDiv.textContent = `$${Number(price).toFixed(2)}`;
  } else {
    priceDiv.classList.remove("hidden");
    priceDiv.textContent = `$${Number(price).toFixed(2)}`;
    discountDiv.textContent = `$${Number(discount).toFixed(2)}`;
  }
}

export async function displayModal(id: number): Promise<void> {
  const { data: res, error } = await fetcher<{
    data: Product;
    message?: string;
    error?: string;
  }>(
    `https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products/${id}`,
    "#loader",
  );

  if (error || !res?.data) {
    return;
  }

  const item = res.data;

  if (
    !(modal instanceof HTMLDivElement) ||
    !(content instanceof HTMLDivElement) ||
    !(closeBtn instanceof HTMLButtonElement) ||
    !(imgDiv instanceof HTMLImageElement) ||
    !(titleDiv instanceof HTMLHeadingElement) ||
    !(descriptionDiv instanceof HTMLParagraphElement) ||
    !(addBtn instanceof HTMLButtonElement)
  ) {
    throw new Error("Modal elements not found");
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  imgDiv.src = `images/menu/${item.id}.png`;
  imgDiv.alt = item.name;

  titleDiv.textContent = item.name;
  descriptionDiv.textContent = item.description;

  renderSizeButtons(item);
  renderAdditivesButtons(item);
  initSizeButtonsListeners(updatePrice);

  updatePrice(
    item.sizes[Object.keys(item.sizes)[0]].price,
    item.sizes[Object.keys(item.sizes)[0]].discountPrice,
  );

  // if (!sizeListenersAdded) {
  // sizeKeys.forEach((key: SizesType, i: number): void => {
  //   //const sizeData: SizeType = item.sizes[key];
  //   //const span = tabsSize[i].querySelector<HTMLSpanElement>(".text");
  //   // tabsSize[i].setAttribute("data-size", sizeData["add-price"]);
  //   // if (span) span.textContent = sizeData.size;

  //   tabsSize[i].addEventListener("click", () => {
  //     tabsSize.forEach((tab) => {
  //       tab.classList.remove("active");
  //       basePrice = Number(item.price);
  //     });
  //     tabsSize[i].classList.add("active");
  //     basePrice += Number(tabsSize[i].getAttribute("data-size"));
  //     updatePrice();
  //   });
  // });
  // sizeListenersAdded = true;
}

// if (!addListenersAdded) {
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
//   addListenersAdded = true;
// }

// updatePrice();
// }
