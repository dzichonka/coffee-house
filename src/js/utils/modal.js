const modal = document.querySelector("#modal");
const closeBtn = document.querySelector("#close");
const price = document.querySelector("#modal-price");
const img = document.querySelector("#modal-img");

const tabsSize = document.querySelectorAll(".tab-size");
const tabsAdditives = document.querySelectorAll(".tab-add");

closeBtn.addEventListener("click", () => {
  modal.classList.add("closed");
  document.body.style.overflow = "";
});

export function displayModal(item, index) {
  let basePrice = Number(item.price);
  let additivesPrice = 0;
  modal.classList.remove("closed");
  document.body.style.overflow = "hidden";

  img.src = `images/menu/${item.category}/${index}.png`;
  img.alt = item.name;

  const sizeKeys = Object.keys(item.sizes);
  sizeKeys.forEach((key, i) => {
    const sizeData = item.sizes[key];
    const span = tabsSize[i].querySelector("span");
    tabsSize[i].setAttribute("data-size", sizeData["add-price"]);
    if (span) span.textContent = sizeData.size;
    tabsSize[i].addEventListener("click", () => {
      tabsSize.forEach((tab) => {
        tab.classList.remove("active");
        basePrice = Number(item.price);
      });
      tabsSize[i].classList.add("active");
      basePrice += Number(tabsSize[i].getAttribute("data-size"));
      price.textContent = `$${(basePrice + additivesPrice).toFixed(2)}`;
    });
  });

  item.additives.forEach((additive, i) => {
    const span = tabsAdditives[i].querySelector("span");
    tabsAdditives[i].setAttribute("data-add", additive["add-price"]);
    if (span) span.textContent = additive.name;
    tabsAdditives[i].addEventListener("click", () => {
      tabsAdditives[i].classList.toggle("active");
      if (tabsAdditives[i].classList.contains("active")) {
        additivesPrice += Number(tabsAdditives[i].getAttribute("data-add"));
      } else {
        additivesPrice -= Number(tabsAdditives[i].getAttribute("data-add"));
      }
      price.textContent = `$${(basePrice + additivesPrice).toFixed(2)}`;
    });
  });

  price.textContent = `$${(basePrice + additivesPrice).toFixed(2)}`;
}
