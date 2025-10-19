import { fetcher } from "./fetcher";

const slideWrapper: HTMLDivElement | null =
  document.querySelector(".slider-wrapper");
const wrapper: HTMLDivElement | null = document.querySelector(".wrapper");
const sliderDiv: HTMLDivElement | null = document.querySelector(".slider");
const dotsContainer: HTMLDivElement | null = document.querySelector(".dots");

const prev: HTMLButtonElement | null = document.querySelector(".prev");
const next: HTMLButtonElement | null = document.querySelector(".next");

const errorDiv: HTMLDivElement | null = document.querySelector("#error");
const refreshButton: HTMLButtonElement | null =
  document.querySelector("#refresh");

export async function initSlider(): Promise<void> {
  if (!slideWrapper || !dotsContainer) return;

  slideWrapper!.innerHTML = "";
  dotsContainer!.innerHTML = "";

  const { data: res, error } = await fetcher<{
    data: FavoriteProduct[];
    message?: string;
    error?: string;
  }>(
    "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products/favorites",
    "#loader"
  );

  if (error) {
    if (sliderDiv) sliderDiv.style.display = "none";
    if (dotsContainer) dotsContainer.style.display = "none";
    if (errorDiv) errorDiv.style.display = "flex";

    return;
  }

  const slides = res?.data ?? [];

  slides.forEach((slide, index) => {
    const div: HTMLDivElement = document.createElement("div");
    div.classList.add("slide");
    if (index === 0) div.classList.add("active");

    div.innerHTML = `
      <img src="images/favourites/${slide.id}.png" alt="${slide.name}">
      <h3>${slide.name}</h3>
      <p>${slide.description}</p>
      <h3>$${slide.price}</h3>
    `;

    slideWrapper.appendChild(div);

    const dot: HTMLDivElement = document.createElement("div");
    dot.classList.add("dot");
    dot.appendChild(document.createElement("span"));
    dotsContainer.appendChild(dot);
  });

  const slidesArray: HTMLDivElement[] = Array.from(
    document.querySelectorAll(".slide")
  );
  const dots: HTMLDivElement[] = Array.from(
    dotsContainer.querySelectorAll(".dot")
  );

  let currentIndex = 0;
  let autoScrollDelay = 5000;
  let autoScrollTimer: null | ReturnType<typeof setTimeout> = null;

  let progressRAF: number | null = null;
  let progressStartTime: number | null = null;
  let progressElapsed = 0;

  function updateProgress(dot: Element): void {
    const bar: HTMLSpanElement | null = dot.querySelector("span");
    if (!dot) return;
    if (progressRAF) cancelAnimationFrame(progressRAF);

    function step(timestamp: number): void {
      if (!bar) {
        return;
      }
      if (!progressStartTime) progressStartTime = timestamp;
      const delta = timestamp - progressStartTime + progressElapsed;
      const percent = Math.min((delta / autoScrollDelay) * 100, 100);
      if (bar) bar.style.width = percent + "%";

      if (percent < 100) {
        progressRAF = requestAnimationFrame(step);
      } else {
        progressStartTime = null;
        progressElapsed = 0;
        progressStartTime = null;
      }
    }
    progressRAF = requestAnimationFrame(step);
  }

  function stopProgress(): void {
    if (progressRAF) cancelAnimationFrame(progressRAF);
    if (progressStartTime) {
      progressElapsed += performance.now() - progressStartTime;
    }
    progressStartTime = null;
  }

  function resetProgress(): void {
    if (progressRAF) cancelAnimationFrame(progressRAF);
    dots.forEach((d) => {
      const span = d.querySelector("span");
      if (span) span.style.width = "0%";
    });
    progressElapsed = 0;
    progressStartTime = null;
  }

  function showSlide(index: number): void {
    slidesArray.forEach((s, i) => s.classList.toggle("active", i === index));

    resetProgress();
    updateProgress(dots[index]);
  }

  function startAutoScroll() {
    stopAutoScroll();
    autoScrollTimer = setTimeout(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
      startAutoScroll();
    }, autoScrollDelay - progressElapsed);
  }

  function stopAutoScroll(): void {
    if (autoScrollTimer) clearTimeout(autoScrollTimer);
  }

  prev?.addEventListener("click", (): void => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
    startAutoScroll();
  });

  next?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    startAutoScroll();
  });

  wrapper?.addEventListener("mouseenter", () => {
    stopAutoScroll();
    stopProgress();
  });
  wrapper?.addEventListener("mouseleave", () => {
    startAutoScroll();
    updateProgress(dots[currentIndex]);
  });

  let startX = 0;

  wrapper?.addEventListener("touchstart", (e: Event): void => {
    stopAutoScroll();
    stopProgress();

    if (!(e instanceof TouchEvent)) return;
    const touch = e.touches[0];
    startX = touch.clientX;
  });

  wrapper?.addEventListener("touchend", (e: Event) => {
    if (!(e instanceof TouchEvent)) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (diff > 50)
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    else if (diff < -50) currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    resetProgress();
    startAutoScroll();
  });

  showSlide(currentIndex);
  startAutoScroll();
}

initSlider();

refreshButton?.addEventListener("click", () => {
  initSlider();
  if (sliderDiv) sliderDiv.style.display = "flex";
  if (dotsContainer) dotsContainer.style.display = "flex";
  if (errorDiv) errorDiv.style.display = "none";
});
