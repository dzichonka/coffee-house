import { displayModal } from "./modal";
import { isCategoryType } from "@/types/typeGuards";

const wrapper = document.querySelector<HTMLDivElement>(".cards");
const tabs = Array.from(
  document.querySelectorAll<HTMLButtonElement>(".tab-category")
);
const refresh = document.querySelector<HTMLButtonElement>("#refresh");

let currentCategory: CategoryType = "coffee";

const isMobile = () => window.innerWidth <= 768;

async function fetchCards(): Promise<ProductsType> {
  const response = await fetch("assets/products.json");
  return await response.json();
}

const products = await fetchCards();

function displayCards(
  category: CategoryType,
  visibleCount: VisibleCountType = isMobile() ? 4 : 8
) {
  if (!wrapper) return;
  wrapper.innerHTML = "";
  const cards = products.filter((product) => product.category === category);
  const visibleCards = cards.slice(0, visibleCount);

  visibleCards.forEach((card: ProductType, index: number): void => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
      <div class="image-container">
        <img
          src="images/menu/${category}/${index}.png"
          alt="${card.name}"
        />
      </div>
      <div class="description-container">
        <div class="description">
          <h3>${card.name}</h3>
          <p>${card.description}</p>
        </div>
        <h3>$${card.price}</h3>
      </div>
    `;
    wrapper.appendChild(cardElement);

    cardElement.addEventListener("click", (): void => {
      displayModal(card, index);
    });
  });

  if (isMobile() && cards.length > visibleCards.length) {
    refresh?.classList.remove("hidden");
  } else {
    refresh?.classList.add("hidden");
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", (): void => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const tabValue = tab.dataset.tab;
    if (!tabValue || !isCategoryType(tabValue)) return;
    currentCategory = tabValue;
    displayCards(currentCategory);
  });
});

refresh?.addEventListener("click", () => {
  displayCards(currentCategory, 8);
  refresh.classList.add("hidden");
});

let lastIsMobile = isMobile();
window.addEventListener("resize", (): void => {
  const nowIsMobile = isMobile();
  if (nowIsMobile !== lastIsMobile) {
    displayCards(currentCategory);
    lastIsMobile = nowIsMobile;
  }
});

displayCards(currentCategory);
