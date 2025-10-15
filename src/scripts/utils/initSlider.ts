import { fetcher } from "./fetcher";

export async function initSlider(): Promise<void> {
  const slideWrapper =
    document.querySelector<HTMLDivElement>(".slider-wrapper");
  const wrapper = document.querySelector<HTMLDivElement>(".wrapper");
  const sliderDiv = document.querySelector<HTMLDivElement>(".slider");
  const dotsContainer = document.querySelector<HTMLDivElement>(".dots");

  if (!slideWrapper || !dotsContainer) return;

  const { data: res, error } = await fetcher<{
    data: FavoriteProduct[];
    message?: string;
    error?: string;
  }>(
    "http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/products/favorites",
    "#loader"
  );

  if (error) {
    console.error(error);
    if (sliderDiv) sliderDiv.style.display = "none";
    if (wrapper)
      wrapper.textContent = "Something went wrong. Please, refresh the page";
    return;
  }

  const slides = res?.data ?? [];

  slides.forEach((slide, index) => {
    const div = document.createElement("div");
    div.classList.add("slide");
    if (index === 0) div.classList.add("active");

    div.innerHTML = `
      <img src="images/favourites/${slide.id}.png" alt="${slide.name}">
      <h3>${slide.name}</h3>
      <p>${slide.description}</p>
      <h3>${slide.price}</h3>
    `;

    slideWrapper.appendChild(div);

    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.appendChild(document.createElement("span"));
    dotsContainer.appendChild(dot);
  });
}

initSlider();
