import { fetcher } from "../utils/fetcher";
import { renderSizeButtons } from "../components/SizeButtons/renderSizeButtons";
import { renderAdditivesButtons } from "../components/AdditivesButtons/renderAdditivesButtons";
import { initSizeButtonsListeners } from "../components/SizeButtons/initSizeButtonsListeners";
import { initAdditivesButtonsListeners } from "../components/AdditivesButtons/initAdditivesButtonsListeners";
import { useUserState } from "../state/userState";
import { useModalState } from "../state/modalState";
import { useCartState } from "../state/cartState";
import { addCartIcon } from "../utils/addCartIcon";

const { isLoggedIn } = useUserState();

const { getItem, setSize, setItem } = useModalState();

const { addItem } = useCartState();

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
const errorDiv: HTMLDivElement | null = document.querySelector("#error");

let cleanupAddListeners: (() => void) | null = null;
let cleanupSizeListeners: (() => void) | null = null;

function closeModal() {
  modal?.classList.add("hidden");
  document.body.style.overflow = "auto";

  if (cleanupAddListeners) cleanupAddListeners();
  if (cleanupSizeListeners) cleanupSizeListeners();
}

closeBtn?.addEventListener("click", () => {
  closeModal();
});

addBtn?.addEventListener("click", () => {
  const itemToAdd = {
    productId: getItem().productId,
    name: getItem().name,
    size: getItem().sizeKey,
    additives: getItem().addKeys,
    quantity: 1,
    priceOld: getItem().totalPrice,
    priceNew: getItem().totalPrice - getItem().totalDiscount,
  };
  addItem(itemToAdd);
  addCartIcon();
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

function updatePrice() {
  const price = getItem().totalPrice;
  const discount = getItem().totalDiscount;

  const priceDiv: HTMLHeadingElement | null =
    document.querySelector("#modal-price");
  const discountDiv: HTMLHeadingElement | null =
    document.querySelector("#modal-discount");

  if (
    !(priceDiv instanceof HTMLHeadingElement) ||
    !(discountDiv instanceof HTMLHeadingElement)
  )
    return;

  if (isLoggedIn()) {
    if (discount === price) {
      priceDiv.classList.add("hidden");
      discountDiv.textContent = `$${Number(price).toFixed(2)}`;
    } else {
      priceDiv.classList.remove("hidden");
      priceDiv.textContent = `$${Number(price).toFixed(2)}`;
      discountDiv.textContent = `$${Number(discount).toFixed(2)}`;
    }
  } else {
    priceDiv.classList.add("hidden");
    discountDiv.textContent = `$${Number(price).toFixed(2)}`;
  }
}

export async function displayModal(id: number): Promise<void> {
  if (errorDiv) errorDiv.style.display = "none";
  const { data: res, error } = await fetcher<{
    data: Product;
    message?: string;
    error?: string;
  }>(
    `https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products/${id}`,
    "#loader"
  );

  if (error) {
    if (errorDiv) errorDiv.style.display = "block";
    return;
  }
  if (!res?.data) {
    throw new Error("Product not found");
  }
  setItem({
    productId: id,
    name: res.data.name,
  });

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
  cleanupSizeListeners = initSizeButtonsListeners(updatePrice);
  cleanupAddListeners = initAdditivesButtonsListeners(updatePrice);

  setSize({
    size: item.sizes[Object.keys(item.sizes)[0]].size,
    price: item.sizes[Object.keys(item.sizes)[0]].price,
    discountPrice:
      item.sizes[Object.keys(item.sizes)[0]].discountPrice ||
      item.sizes[Object.keys(item.sizes)[0]].price ||
      "0",
  });

  updatePrice();
}
