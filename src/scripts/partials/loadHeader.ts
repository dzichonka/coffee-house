export async function loadHeader(): Promise<void> {
  const header = document.querySelector("#header");
  if (!header) return;

  const response = await fetch("/partials/header.html");
  const html = await response.text();
  header.innerHTML = html;
}
