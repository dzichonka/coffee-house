const burgerMenu = document.querySelector(".header-nav");
const burgerBtn = document.querySelector(".burger");

export const closeBurgerMenu = () => {
  burgerMenu.classList.remove("open");
  burgerBtn.classList.remove("open");
};

export const openBurgerMenu = () => {
  burgerMenu.classList.add("open");
  burgerBtn.classList.add("open");
};

export const toggleBurgerMenu = () => {
  burgerMenu.classList.toggle("open");
  burgerBtn.classList.toggle("open");
};

burgerBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleBurgerMenu();
});

burgerMenu.addEventListener("click", (e) => {
  if (e.target && e.target.tagName === "link") {
    closeBurgerMenu();
  }
});

window.onscroll = () => {
  closeBurgerMenu();
};
