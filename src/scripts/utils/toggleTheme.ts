const themeButton: HTMLButtonElement | null = document.querySelector("#theme");
const STORAGE_KEY = "theme";

if (localStorage.getItem(STORAGE_KEY) === "dark") {
  document.body.classList.add("dark");
}

function toggleTheme() {
  if (!themeButton) return;

  document.body.classList.toggle("dark");
  localStorage.setItem(
    STORAGE_KEY,
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

themeButton?.addEventListener("click", toggleTheme);
