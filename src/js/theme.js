let currentIndex = parseInt(localStorage.getItem("currentIndex"));
if (isNaN(currentIndex) || currentIndex < 0) {
  currentIndex = 0;
}

const defaultThemes = [
  {
    "name": "theme 1",
    "cover": "../src/images/covers/cover1.webp",
    "--text-color": "#f8a4cb",
    "--hover-color": "#d75f6d",
    "--accent-color": "#6e85a8",
    "--accent-color-2": "#5cb1cb",
    "--background-color": "#28233e"
  },
  {
    "name": "theme 2",
    "cover": "../src/images/covers/cover2.webp",
    "--text-color": "#f0eae4",
    "--hover-color": "#d29a74",
    "--accent-color": "#2a6fa9",
    "--accent-color-2": "#99bcd3",
    "--background-color": "#16191f"
  },
  {
    "name": "theme 3",
    "cover": "../src/images/covers/cover3.webp",
    "--text-color": "#8991a2",
    "--hover-color": "#edfd9b",
    "--accent-color": "#adb8cb",
    "--accent-color-2": "#c6001d",
    "--background-color": "#0c1929"
  },
  {
    "name": "theme 4",
    "cover": "../src/images/covers/cover4.webp",
    "--text-color": "#fef5f4",
    "--hover-color": "#6786cd",
    "--accent-color": "#936d70",
    "--accent-color-2": "#6976b3",
    "--background-color": "#000100"
  },
  {
    "name": "theme 5",
    "cover": "../src/images/covers/cover5.webp",
    "--text-color": "#fafefd",
    "--hover-color": "#a862d2",
    "--accent-color": "#c6a2e7",
    "--accent-color-2": "#a337b9",
    "--background-color": "#1b1b28"
  },
  {
    "name": "theme 6",
    "cover": "../src/images/covers/cover6.webp",
    "--text-color": "#f3ebf2",
    "--hover-color": "#d19570",
    "--accent-color": "#717adf",
    "--accent-color-2": "#99BCD3",
    "--background-color": "#070922"
  }
];

//--- INIT ---

const themeName = document.querySelector("#theme-name");
const themeImageLink = document.querySelector("#theme-image-link");
const prevButn = document.querySelector("#theme-controler .prev");
const nextButn = document.querySelector("#theme-controler .next");
const hexColor = document.querySelector("#hex-color");
const themeRe = document.querySelector("#theme-review");
const reImg = document.querySelector("#review-image");
const reText = document.querySelector("#review-text");

let themes;
let themeIndex = currentIndex;

// load themes from storage
if (localStorage.getItem("themes")) {
  themes = JSON.parse(localStorage.getItem("themes"));
} else {
  themes = defaultThemes;
  saveThemes(themes);
}

//--- MAIN ---
function preloadImages() {
  for (let i = 0; i < themes.length; i++) {
    const img = new Image();
    img.src = themes[i].cover;
  }
}

function nextImage() {
  currentIndex = (currentIndex + 1) % themes.length;
  localStorage.setItem("currentIndex", currentIndex); // Update currentIndex in localStorage
  const imageElement = document.getElementById("carouselImage");
  imageElement.style.opacity = 0;
  themeIndex = currentIndex;
  updateColors(currentIndex);

  setTimeout(() => {
    imageElement.src = themes[currentIndex].cover;
    imageElement.style.opacity = 1;
  }, 200); // Match the transition duration in style.css
}

function updateColors() {
  const theme = themes[currentIndex];
  // Iterate through the colorSet and set the CSS variables
  for (const [property, value] of Object.entries(theme)) {
    if (property.startsWith("--")) { // Only set CSS vars
      document.documentElement.style.setProperty(property, value);
    }
  }
}

// Set colors with current index first
updateColors(currentIndex);

// Set the initial image
document.getElementById("carouselImage").src = themes[currentIndex].cover;

function syncImageHeight() {
  const text = document.getElementById("text");
  const img = document.getElementById("carouselImage");
  img.style.height = text.offsetHeight + "px";
  img.style.opacity = 1;
  reImg.style.height = reText.offsetHeight + "px";
}

window.addEventListener("load", syncImageHeight);
window.addEventListener("resize", syncImageHeight);

// Image is opacity 0 and text is translated off screen by default
// Add the loaded class to the image and text to animate them in
window.onload = function () {
  document.getElementById("image").classList.add("loaded");
  document.getElementById("text").classList.add("loaded");
  document.getElementsByTagName("html")[0].classList.add("loaded");
  syncImageHeight();
  // Preload the remaining images
  preloadImages();
};

//--- SETTING ---

//--- Theme Controler ----
function updateTheme() {
  const theme = themes[themeIndex];

  themeName.value = theme.name;
  themeImageLink.value = theme.cover;
  reImg.src = theme.cover;

  // update CSS variables
  for (const [property, value] of Object.entries(theme)) {
    if (property.startsWith("--")) {
      themeRe.style.setProperty(property, value);
    }
  }

  loadColor(getActiveBtn());
}

prevButn.addEventListener("click", () => {
  themeIndex = (themeIndex - 1 + themes.length) % themes.length;
  updateTheme();
});

nextButn.addEventListener("click", () => {
  themeIndex = (themeIndex + 1) % themes.length;
  updateTheme();
});

//--- Color Editor
// button switching
function loadColor(btn) {
  switch (btn) {
    case "background-color":
      hexColor.value = themes[themeIndex]["--background-color"];
      break;
    case "text-color":
      hexColor.value = themes[themeIndex]["--text-color"];
      break;
    case "accent-color":
      hexColor.value = themes[themeIndex]["--accent-color"];
      break;
    case "accent-color-2":
      hexColor.value = themes[themeIndex]["--accent-color-2"];
      break;
    case "hover-color":
      hexColor.value = themes[themeIndex]["--hover-color"];
      break;
  }
}

document.querySelectorAll("#theme-colors .color-btn").forEach(colorBtn => {
  colorBtn.addEventListener("click", () => {
    document.querySelectorAll("#theme-colors .color-btn").forEach(btn =>
      btn.classList.remove("active")
    );
    colorBtn.classList.add("active");
    loadColor(getActiveBtn());
  });
});

// get active button
function getActiveBtn() {
  return document.querySelector("#theme-colors .color-btn.active").id;
}

function saveThemes(themes) {
  localStorage.setItem("themes", JSON.stringify(themes));
}

function loadThemes() {
  themes = JSON.parse(localStorage.getItem("themes"));
  updateTheme();
}