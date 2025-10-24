const burgerMenu = document.querySelector<HTMLElement>(".header-nav");
const burgerBtn = document.querySelector<HTMLDivElement>(".burger");

export const closeBurgerMenu = (): void => {
  if (!burgerMenu || !burgerBtn) return;
  burgerMenu.classList.remove("open");
  burgerBtn.classList.remove("open");
};

export const openBurgerMenu = (): void => {
  if (!burgerMenu || !burgerBtn) return;
  burgerMenu.classList.add("open");
  burgerBtn.classList.add("open");
};

export const toggleBurgerMenu = (): void => {
  if (!burgerMenu || !burgerBtn) return;
  burgerMenu.classList.toggle("open");
  burgerBtn.classList.toggle("open");
};

burgerBtn?.addEventListener("click", (e: Event): void => {
  e.preventDefault();
  e.stopPropagation();
  toggleBurgerMenu();
});

burgerMenu?.addEventListener("click", (e) => {
  const target = e.target;

  if (!(target instanceof Element)) return;

  const link = target.closest("a");

  if (!link) return;

  if (link.classList.contains("disabled")) {
    e.preventDefault();
    closeBurgerMenu();
    return;
  }

  closeBurgerMenu();
});

window.onscroll = () => {
  closeBurgerMenu();
};
