const wrapper = document.querySelector(".cards");
const tabs = document.querySelectorAll(".tab");
const refresh = document.querySelector("#refresh");

let currentCategory = "coffee";

const isMobile = () => window.innerWidth <= 768;

async function fetchCards() {
  const response = await fetch("assets/products.json");
  return await response.json();
}

const products = await fetchCards();

function displayCards(category, visibleCount = isMobile() ? 4 : 8) {
  wrapper.innerHTML = "";
  const cards = products.filter((product) => product.category === category);
  const visibleCards = cards.slice(0, visibleCount);

  visibleCards.forEach((card, index) => {
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
  });

  if (isMobile() && cards.length > visibleCards.length) {
    refresh.classList.remove("hidden");
  } else {
    refresh.classList.add("hidden");
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentCategory = tab.getAttribute("data-tab");
    displayCards(currentCategory);
  });
});

refresh.addEventListener("click", () => {
  displayCards(currentCategory, 8);
  refresh.classList.add("hidden");
});

let lastIsMobile = isMobile();
window.addEventListener("resize", () => {
  const nowIsMobile = isMobile();
  if (nowIsMobile !== lastIsMobile) {
    displayCards(currentCategory);
    lastIsMobile = nowIsMobile;
  }
});

displayCards(currentCategory);
