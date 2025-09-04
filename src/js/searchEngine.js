const defaultSearchEngines = {
  "Duck Duck Go": "https://duckduckgo.com/?q=",
  "Google": "https://www.google.com/search?q=",
  "Bing": "https://www.bing.com/search?q=",
  "Ecosia": "https://www.ecosia.org/search?q=",
  "Brave": "https://search.brave.com/search?q=",
};

// ---- INIT ----
const span = document.querySelector("#engine-controler span");
const prevBtn = document.querySelector("#engine-controler .prev");
const nextBtn = document.querySelector("#engine-controler .next");

let searchEngines;
let engineIndex = 0;

// load engines from storage
if (localStorage.getItem("searchEngines")) {
  searchEngines = JSON.parse(localStorage.getItem("searchEngines"));
} else {
  searchEngines = defaultSearchEngines;
  saveSearchEngines(searchEngines);
}

//--- ENGINE CONTROLER ----
if (localStorage.getItem("engineIndex")) {
  engineIndex = parseInt(localStorage.getItem("engineIndex"), 10);
  if (isNaN(engineIndex)) engineIndex = 0;
}

// get engine keys (array of names)
let engineNames = Object.keys(searchEngines);

function updateEngine() {
  const name = engineNames[engineIndex];
  span.textContent = name;
}

prevBtn.addEventListener("click", () => {
  engineIndex = (engineIndex - 1 + engineNames.length) % engineNames.length;
  saveEngineIndex(engineIndex);
  updateEngine();
  setMode(mode);
});

nextBtn.addEventListener("click", () => {
  engineIndex = (engineIndex + 1) % engineNames.length;
  saveEngineIndex(engineIndex);
  updateEngine();
  setMode(mode);
});

// ---- ENGINE EDITOR ----
let mode = "engine"; // default mode
const engineNameInput = document.getElementById("engineName");
const engineLinkInput = document.getElementById("engineLink");
const addBtn = document.getElementById("add");
const changeModeBtn = document.getElementById("changeMode");

function setMode(newMode) {
  mode = newMode;

  if (mode === "engine") {
    engineNameInput.value = engineNames[engineIndex];
    engineLinkInput.value = searchEngines[engineNames[engineIndex]];
  } else {
    engineNameInput.value = "";
    engineLinkInput.value = "";
    engineNameInput.placeholder = "Shortcut Name";
    engineLinkInput.placeholder = "Shortcut Link";
  }
}

addBtn.addEventListener("click", () => {
  const name = engineNameInput.value.trim();
  const link = engineLinkInput.value.trim();

  if (mode === "engine") {
    searchEngines[name] = link;
    engineNames = Object.keys(searchEngines);
    engineIndex = engineNames.indexOf(name);
    console.log(engineIndex, searchEngines, engineNames, name);
    updateEngine();
  }
  else {
    shortcuts[name] = link;
    buildShortcuts(shortcuts);
  }
  engineNameInput.value = "";
  engineLinkInput.value = "";
  setMode(mode);
});

span.addEventListener("click", () => {
  // prevent deleting the last engine
  if (engineNames.length <= 1) {
    return;
  }
  delete searchEngines[engineNames[engineIndex]];
  engineNames = Object.keys(searchEngines);
  // adjust index (stay at same position if possible)
  if (engineIndex >= engineNames.length) {
    engineIndex = engineNames.length - 1;
  }
  updateEngine();
  setMode(mode);
});

// toggle button
changeModeBtn.addEventListener("click", () => {
  setMode(mode === "engine" ? "shortcut" : "engine");
});

// save to localStorage
function saveSearchEngines(engines) {
  localStorage.setItem("searchEngines", JSON.stringify(engines));
}

function saveEngineIndex(index) {
  localStorage.setItem("engineIndex", index);
}

function loadSearchEngines() {
  updateEngine();
  setMode(mode);
}

