let currentIndex = parseInt(localStorage.getItem("currentIndex"));
if (isNaN(currentIndex) || currentIndex < 0) {
  currentIndex = 0;
}
const images = ["cover1.webp", "cover2.webp", "cover3.webp", "cover4.webp", "cover5.webp",  "cover6.webp"];
const colorSets = [
  {
    "--text-color": "#f8a4cb",
    "--hover-color": "#d75f6d",
    "--accent-color": "#6e85a8",
    "--accent-color-2": "#5cb1cb",
    "--background-color": "#28233e",
  },
  {
    "--text-color": "#f0eae4",
    "--hover-color": "#d29a74",
    "--accent-color": "#2a6fa9",
    "--accent-color-2": "#99bcd3",
    "--background-color": "#16191f",
  },
  {
    "--text-color": "#8991a2",
    "--hover-color": "#edfd9b",
    "--accent-color": "#adb8cb",
    "--accent-color-2": "#c6001d",
    "--background-color": "#0c1929",
  },
  {
    "--text-color": "#fef5f4",
    "--hover-color": "#6786cd",
    "--accent-color": "#936d70",
    "--accent-color-2": "#6976b3",
    "--background-color": "#000100",
  },
  {
    "--text-color": "#fafefd",
    "--hover-color": "#a862d2",
    "--accent-color": "#c6a2e7",
    "--accent-color-2": "#a337b9",
    "--background-color": "#1b1b28",
  },
  {
    "--text-color": "#f3ebf2",
    "--hover-color": "#d19570",
    "--accent-color": "#717adf",
    "--accent-color-2": "#99BCD3",
    "--background-color": "#070922",
  },
];

function preloadImages() {
  for (let i = 0; i < images.length; i++) {
    const img = new Image();
    img.src = "../src/images/covers/" + images[i];
  }
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  localStorage.setItem("currentIndex", currentIndex); // Update currentIndex in localStorage
  const imageElement = document.getElementById("carouselImage");
  imageElement.style.opacity = 0;
  updateColors(currentIndex);

  setTimeout(() => {
    imageElement.src = "../src/images/covers/" + images[currentIndex];
    imageElement.style.opacity = 1;
  }, 200); // Match the transition duration in style.css
}

function updateColors() {
  const colorSet = colorSets[currentIndex];
  // Iterate through the colorSet and set the CSS variables
  for (const [property, value] of Object.entries(colorSet)) {
    document.documentElement.style.setProperty(property, value);
  }
}

// Set colors with current index first
updateColors(currentIndex);

// Set the initial image
document.getElementById("carouselImage").src =
  "../src/images/covers/" + images[currentIndex];

function syncImageHeight() {
  const text = document.getElementById("text");
  const img = document.getElementById("carouselImage");
  img.style.height = text.offsetHeight + "px";
  img.style.opacity = 1;
}

window.addEventListener("load", syncImageHeight);
window.addEventListener("resize", syncImageHeight);

// Image is opacity 0 and text is translated off screen by default
// Add the loaded class to the image and text to animate them in
window.onload = function () {
  document.getElementById("image").classList.add("loaded");
  document.getElementById("text").classList.add("loaded");
  document.getElementsByTagName("html")[0].classList.add("loaded");
  // Preload the remaining images
  preloadImages();
};

