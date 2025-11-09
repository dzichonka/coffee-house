const themeButton: HTMLButtonElement | null = document.querySelector("#theme");
const STORAGE_KEY = "theme";

if (localStorage.getItem(STORAGE_KEY) === "light") {
  document.body.classList.add("light");
}

function toggleTheme() {
  if (!themeButton) return;

  document.body.classList.toggle("light");
  localStorage.setItem(
    STORAGE_KEY,
    document.body.classList.contains("light") ? "light" : "dark"
  );
}

themeButton?.addEventListener("click", toggleTheme);
