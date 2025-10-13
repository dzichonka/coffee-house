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
  const target = e.target.closest("a");
  if (!target) return;

  if (target.classList.contains("disabled")) {
    e.preventDefault();
    closeBurgerMenu();
    return;
  }

  closeBurgerMenu();
});

window.onscroll = () => {
  closeBurgerMenu();
};
