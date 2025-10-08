const wrapper = document.querySelector(".cards");
const tabs = document.querySelectorAll(".tab");

async function fetchCards() {
  const response = await fetch("/assets/products.json");
  const products = await response.json();
  return products;
}

const products = await fetchCards();

const displayCards = (category) => {
  wrapper.innerHTML = "";
  const cards = products.filter((product) => product.category === category);
  cards.forEach((card, index) => {
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
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    displayCards(tab.getAttribute("data-tab"));
  });
});

displayCards("coffee");
