const slidesData = [
  {
    img: "images/favourites/coffee-slider-1.png",
    title: "S’mores Frappuccino",
    text: "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
    price: "$5.50",
  },
  {
    img: "images/favourites/coffee-slider-2.png",
    title: "Caramel Macchiato",
    text: "Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.",
    price: "$5.00",
  },
  {
    img: "images/favourites/coffee-slider-3.png",
    title: "Caramel Ice coffee",
    text: "A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.",
    price: "$4.50",
  },
];

const wrapper = document.querySelector<HTMLDivElement>(".slider-wrapper");
const dotsContainer = document.querySelector<HTMLDivElement>(".dots");

slidesData.forEach((slide: SliderDataType, index: number): void => {
  const div = document.createElement("div");
  div.classList.add("slide");
  div.innerHTML = `
    <img src="${slide.img}" alt="${slide.title}">
    <h3>${slide.title}</h3>
    <p>${slide.text}</p>
    <h3>${slide.price}</h3>
  `;
  if (index === 0) div.classList.add("active");
  wrapper?.appendChild(div);
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.appendChild(document.createElement("span"));
  if (index === 0) dot.classList.add("active");
  dotsContainer?.appendChild(dot);
});

const slides = Array.from(document.querySelectorAll<HTMLDivElement>(".slide"));
const dots = Array.from(document.querySelectorAll<HTMLDivElement>(".dot"));
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let currentIndex = 0;
let autoScrollDelay = 5000;
let autoScrollTimer: null | ReturnType<typeof setTimeout> = null;

let progressRAF: number | null = null;
let progressStartTime: number | null = null;
let progressElapsed = 0;

function updateProgress(dot: Element): void {
  if (!dot) return;
  if (progressRAF) cancelAnimationFrame(progressRAF);

  const bar = dot.querySelector("span");

  function step(timestamp: number): void {
    if (!progressStartTime) progressStartTime = timestamp;
    const delta = timestamp - progressStartTime + progressElapsed;
    const percent = Math.min((delta / autoScrollDelay) * 100, 100);
    if (bar) bar.style.width = percent + "%";

    if (percent < 100) {
      progressRAF = requestAnimationFrame(step);
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
  slides.forEach((s, i) => s.classList.toggle("active", i === index));
  dots.forEach((d, i) => d.classList.toggle("active", i === index));

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
