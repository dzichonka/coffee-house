const slidesData = [
  {
    img: "/images/favourites/coffee-slider-1.png",
    title: "S’mores Frappuccino",
    text: "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
    price: "$5.50",
  },
  {
    img: "/images/favourites/coffee-slider-2.png",
    title: "Caramel Macchiato",
    text: "Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.",
    price: "$5.00",
  },
  {
    img: "/images/favourites/coffee-slider-3.png",
    title: "Caramel Ice coffee",
    text: "A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.",
    price: "$4.50",
  },
];

const wrapper = document.querySelector(".slider-wrapper");
const dotsContainer = document.querySelector(".dots");

slidesData.forEach((slide, index) => {
  const div = document.createElement("div");
  div.classList.add("slide");
  div.innerHTML = `
    <img src="${slide.img}" alt="${slide.title}">
    <h3>${slide.title}</h3>
    <p>${slide.text}</p>
    <h3>${slide.price}</h3>
  `;
  if (index === 0) div.classList.add("active");
  wrapper.appendChild(div);
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.appendChild(document.createElement("span"));
  if (index === 0) dot.classList.add("active");
  dot.dataset.index = index;
  dotsContainer.appendChild(dot);
});

let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const showSlide = (index) => {
  slides.forEach((s, i) => {
    s.classList[index === i ? "add" : "remove"]("active");
  });

  dots.forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
};

prev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});

next.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});

const scrollDeffault = () => {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 5000);
};

scrollDeffault();
