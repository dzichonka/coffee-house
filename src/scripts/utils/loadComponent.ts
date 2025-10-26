export async function loadComponent(elem: string): Promise<void> {
  const container = document.querySelector(`#${elem}`);
  if (!container) return;

  const response = await fetch(`partials/${elem}.html`);
  const html = await response.text();
  container.innerHTML = html;
}
