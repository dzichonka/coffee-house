const modal = document.querySelector("#modal");
const content = document.querySelector(".window");
const closeBtn = document.querySelector("#close");
const price = document.querySelector("#modal-price");
const img = document.querySelector("#modal-img");
const title = document.querySelector("#modal-title");
const description = document.querySelector("#modal-description");

const tabsSize = document.querySelectorAll(".tab-size");
const tabsAdditives = document.querySelectorAll(".tab-add");

let sizeListenersAdded = false;
let addListenersAdded = false;
function closeModal() {
  modal.classList.add("closed");
  document.body.style.overflow = "";
  tabsSize.forEach((tab) => tab.classList.remove("active"));
  tabsSize[0].classList.add("active");
  tabsAdditives.forEach((tab) => tab.classList.remove("active"));
}

closeBtn.addEventListener("click", () => {
  closeModal();
});

window.addEventListener("click", (e) => {
  if (e.target === modal && e.target !== content) {
    closeModal();
  }
});

export function displayModal(item, index) {
  let basePrice = Number(item.price);
  let additivesPrice = 0;

  const updatePrice = () => {
    const total = basePrice + additivesPrice;
    price.textContent = `$${total.toFixed(2)}`;
  };

  modal.classList.remove("closed");
  document.body.style.overflow = "hidden";

  img.src = `images/menu/${item.category}/${index}.png`;
  img.alt = item.name;

  title.textContent = item.name;
  description.textContent = item.description;

  const sizeKeys = Object.keys(item.sizes);

  if (!sizeListenersAdded) {
    sizeKeys.forEach((key, i) => {
      const sizeData = item.sizes[key];
      const span = tabsSize[i].querySelector(".text");
      tabsSize[i].setAttribute("data-size", sizeData["add-price"]);
      if (span) span.textContent = sizeData.size;

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
    item.additives.forEach((additive, i) => {
      const span = tabsAdditives[i].querySelector(".text");
      tabsAdditives[i].setAttribute("data-add", additive["add-price"]);
      if (span) span.textContent = additive.name;

      tabsAdditives[i].addEventListener("click", () => {
        tabsAdditives[i].classList.toggle("active");
        if (tabsAdditives[i].classList.contains("active")) {
          additivesPrice += Number(tabsAdditives[i].getAttribute("data-add"));
        } else {
          additivesPrice -= Number(tabsAdditives[i].getAttribute("data-add"));
        }
        updatePrice();
      });
    });
    addListenersAdded = true;
  }

  updatePrice();
}
