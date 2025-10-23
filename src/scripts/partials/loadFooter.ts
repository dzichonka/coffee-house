export async function loadFooter(): Promise<void> {
  const footer = document.querySelector("#footer");
  if (!footer) return;

  const response = await fetch("/partials/footer.html");
  const html = await response.text();
  footer.innerHTML = html;
}
