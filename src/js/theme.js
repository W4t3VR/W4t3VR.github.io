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
const tabTheme = document.querySelector("#tab-themes");
const reImg = document.querySelector("#review-image");
const reText = document.querySelector("#review-text");

// --- Slider references ---
const hueSlider = document.getElementById("hue");
const satSlider = document.getElementById("saturation");
const lightSlider = document.getElementById("lightness");

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

// --- Convert HEX -> HSL ---
function hexToHSL(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map(x => x + x).join("");
  }

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// --- Convert HSL to HEX ---
function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
  return `#${[f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

//--- Image Editor ---
themeImageLink.addEventListener("input", () => {
  reImg.src = themeImageLink.value;
});

//--- Color Editor ---
// button switching
function loadColor(btn) {
  let hex;
  switch (btn) {
    case "background-color":
      hex = themes[themeIndex]["--background-color"]; 
      break;
    case "text-color":
      hex = themes[themeIndex]["--text-color"]; 
      break;
    case "accent-color":
      hex = themes[themeIndex]["--accent-color"]; 
      break;
    case "accent-color-2":
      hex = themes[themeIndex]["--accent-color-2"]; 
      break;
    case "hover-color":
      hex = themes[themeIndex]["--hover-color"]; 
      break;
  }
  // update hex field
  hexColor.value = hex;

  // sync sliders to this hex
  const { h, s, l } = hexToHSL(hex);
  hueSlider.value = h;
  satSlider.value = s;
  lightSlider.value = l;
}

// get active button
function getActiveBtn() {
  return document.querySelector("#theme-colors .color-btn.active").id;
}

//set active class for clicked button
document.querySelectorAll("#theme-colors .color-btn").forEach(colorBtn => {
  colorBtn.addEventListener("click", () => {
    document.querySelectorAll("#theme-colors .color-btn").forEach(btn =>
      btn.classList.remove("active")
    );
    colorBtn.classList.add("active");
    loadColor(getActiveBtn()); // sets hex input + sliders
  });
});

// change color base on hex value in the input
hexColor.addEventListener("input", () => {
  const activeVar = "--" + getActiveBtn();
  const hex = hexColor.value;

  tabTheme.style.setProperty(activeVar, hex);
  themes[themeIndex][activeVar] = hex;

  // keep sliders in sync when typing a hex
  const { h, s, l } = hexToHSL(hex);
  hueSlider.value = h;
  satSlider.value = s;
  lightSlider.value = l;
});

// Add listeners for HSL sliders
[hueSlider, satSlider, lightSlider].forEach(slider => {
  slider.addEventListener("input", updateFromHSL);
});

// Update hex + preview from sliders
function updateFromHSL() {
  const h = parseInt(hueSlider.value || "0", 10);
  const s = parseInt(satSlider.value || "0", 10);
  const l = parseInt(lightSlider.value || "0", 10);

  const hex = hslToHex(h, s, l);
  hexColor.value = hex;

  const activeVar = "--" + getActiveBtn();
  tabTheme.style.setProperty(activeVar, hex);
  themes[themeIndex][activeVar] = hex;

  const t = themes[themeIndex];
  if (t && activeVar in t) t[activeVar] = hex;
}

//--- Theme Controller ----
function updateTheme() {
  themeName.value = themes[themeIndex].name;
  themeImageLink.value = themes[themeIndex].cover;
  reImg.src = themeImageLink.value;

  // update CSS variables
  for (const [property, value] of Object.entries(themes[themeIndex])) {
    if (property.startsWith("--")) {
      tabTheme.style.setProperty(property, value);
    }
  }

  loadColor(getActiveBtn());
}

// switch theme button
prevButn.addEventListener("click", () => {
  themeIndex = (themeIndex - 1 + themes.length) % themes.length;
  updateTheme();
});

nextButn.addEventListener("click", () => {
  themeIndex = (themeIndex + 1) % themes.length;
  updateTheme();
});

//--- Add and remove theme
document.getElementById("add-theme").addEventListener("click", () => {
  const newTheme = {
    name: "New Theme",
    cover: "../src/images/covers/new_cover.png",
    "--text-color": "#ffffff",
    "--hover-color": "#aaaaaa",
    "--accent-color": "#888888",
    "--accent-color-2": "#666666",
    "--background-color": "#000000"
  };

  themes.push(newTheme);          
  themeIndex = themes.length - 1; 
  updateTheme();                  
});

document.getElementById("remove-theme").addEventListener("click", () => {
  if (themes.length <= 1) {
    return;
  }
  themes.splice(themeIndex, 1); 

  // adjust themeIndex so it doesn’t go out of bounds
  if (themeIndex >= themes.length) {
    themeIndex = themes.length - 1;
  }
  updateTheme(); 
  
});

function saveThemes(themes) {
  themes[themeIndex].name = themeName.value;
  themes[themeIndex].cover =  themeImageLink.value;
  localStorage.setItem("themes", JSON.stringify(themes));
}

function loadThemes() {
  themes = JSON.parse(localStorage.getItem("themes"));
  updateTheme();
}
