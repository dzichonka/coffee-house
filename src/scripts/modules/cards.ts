import { displayModal } from "./modal";
import { isCategoryType } from "@/types/typeGuards";
import { fetcher } from "../utils/fetcher";
import { useUserState } from "../state/userState";

const { isLoggedIn } = useUserState();

const wrapper: HTMLDivElement | null = document.querySelector("#cards");
const tabs: HTMLDivElement[] = Array.from(
  document.querySelectorAll(".tab-category"),
);
const refresh: HTMLButtonElement | null = document.querySelector("#refresh");

if (
  !(wrapper instanceof HTMLDivElement) ||
  !(refresh instanceof HTMLButtonElement) ||
  tabs.length === 0
) {
  throw new Error("No cards elements found");
}

let products: FavoriteProduct[] = [];

let currentCategory: CategoryType = "coffee";

const isMobile = () => window.innerWidth <= 768;

let visibleCount: number = isMobile() ? 4 : 8;

async function fetchProducts() {
  const { data: res, error } = await fetcher<{
    data: FavoriteProduct[];
    message?: string;
    error?: string;
  }>(
    "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products",
    "#loader",
  );

  if (error || !res) {
    if (wrapper) {
      wrapper.innerHTML = `<div class="error"></div> <h3>Something went wrong</h3>`;
    }
    refresh?.classList.add("hidden");
    return;
  }

  products = res?.data ?? [];

  displayCards(currentCategory);
}

function displayCards(category: CategoryType) {
  if (!wrapper) return;
  wrapper.innerHTML = "";
  const cards = products.filter((product) => product.category === category);
  const visibleCards = cards.slice(0, visibleCount);

  visibleCards.forEach((card: ProductType): void => {
    const cardElement: HTMLDivElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
      <div class="image-container">
        <img
          src="images/menu/${card.id}.png"
          alt="${card.name}"
        />
      </div>
      <div class="description-container">
        <div class="description">
          <h3>${card.name}</h3>
          <p>${card.description}</p>
        </div>
         <div class="price-container">
${
  isLoggedIn() && card.discountPrice
    ? `
          <h3 class="price">$${card.discountPrice}</h3>
          <h3 class="price__old">$${card.price}</h3>
`
    : `
          <h3 class="price">$${card.price}</h3>
`
}
        </div>
      </div>
      </div>
    `;
    wrapper.append(cardElement);

    cardElement.addEventListener("click", (): void => {
      displayModal(card.id);
    });
  });

  function checkRefreshVisibility() {
    if (!refresh) return;
    if (cards.length > visibleCards.length) {
      refresh.classList.remove("hidden");
    } else {
      refresh.classList.add("hidden");
    }
  }
  checkRefreshVisibility();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", (): void => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    visibleCount = isMobile() ? 4 : 8;

    const tabValue = tab.dataset.tab;
    if (!tabValue || !isCategoryType(tabValue)) return;
    currentCategory = tabValue;
    displayCards(currentCategory);
  });
});

refresh?.addEventListener("click", () => {
  visibleCount += 4;
  displayCards(currentCategory);
});

let lastIsMobile = isMobile();
window.addEventListener("resize", (): void => {
  const nowIsMobile = isMobile();
  if (nowIsMobile !== lastIsMobile) {
    displayCards(currentCategory);
    lastIsMobile = nowIsMobile;
  }
});

fetchProducts();
