const menuButton = document.querySelector("#menu-link");

if (!(menuButton instanceof HTMLAnchorElement) || !menuButton) {
  throw new Error("Menu button not found");
}

if (menuButton) {
  menuButton.classList.add("disabled");
}
