const btn = document.getElementById("setting-btn");
const panel = document.getElementById("setting-panel");
const textarea = document.getElementById("display");

btn.addEventListener("click", () => {
  panel.classList.toggle("open");
  loadSetting(getActiveTab());
});

function loadSetting(tab) {
  // toggle active class on contents
  document.querySelectorAll(".tab-content").forEach(content =>
    content.classList.remove("active")
  );

  const activeTab = document.getElementById("tab-" + tab);
  activeTab.classList.add("active");

  // load data for each tab
  switch (tab) {
    case "links":
      loadLinks(textarea);
      break;
    case "themes":
      syncImageHeight();
      loadThemes();
      break;
    case "searchEngines":
      loadSearchEngines();
      loadShortcuts();
      break;
  }
}

// tab switching
document.querySelectorAll("#tabs .tab").forEach(tabBtn => {
  tabBtn.addEventListener("click", () => {
    document.querySelectorAll("#tabs .tab").forEach(btn =>
      btn.classList.remove("active")
    );
    tabBtn.classList.add("active");
    loadSetting(getActiveTab());
  });
});

// get active tab
function getActiveTab() {
  return document.querySelector("#tabs .tab.active").dataset.tab;
}

// save button
document.getElementById("save").addEventListener("click", () => {
  const activeTab = getActiveTab();

  switch (activeTab) {
    case "links":
      const textarea = document.getElementById("display");
      const edited = textarea.value;

      try {
        const parsed = JSON.parse(edited);
        saveLinks(parsed);
        buildLinks(parsed);
      } catch (e) {
        alert("Invalid JSON. Please check your edits.");
      }
      break;
    case "themes":
      saveThemes(themes);
      location.reload();
      break;
    case "searchEngines":
      saveEngineIndex(engineIndex);
      saveSearchEngines(searchEngines);
      saveShortcuts(shortcuts);
      break;
  }
});

//discard button 
document.getElementById("discard").addEventListener("click", () => {
  const activeTab = getActiveTab();

  switch (activeTab) {
    case "links":
      loadLinks();
      break;
    case "themes":
      loadThemes();
      break;
    case "searchEngines":
      loadSearchEngines();
    loadShortcuts();
      break;
  }
});

//reset buttons
document.getElementById("reset").addEventListener("click", () => {
  const activeTab = getActiveTab();

  switch (activeTab) {
    case "links":
      localStorage.removeItem("links");
      saveLinks(defaultLinks);
      buildLinks(defaultLinks);
      panel.classList.remove("open");
      break;
    case "themes":
      localStorage.removeItem("themes");
      saveThemes(defaultThemes);
      loadThemes();
      panel.classList.remove("open");
      location.reload();
      break;
    case "searchEngines":
      localStorage.removeItem("searchEngines");
      localStorage.removeItem("engineIndex");
      localStorage.removeItem("shortcuts");
      saveSearchEngines(defaultSearchEngines);
      saveShortcuts(defaultShortcuts);
      saveEngineIndex(0);
      loadSearchEngines();
      loadShortcuts();
      panel.classList.remove("open");
      break;
  }
});

// EXPORT
document.getElementById("export").addEventListener("click", () => {
  const activeTab = getActiveTab();
  let data = null;
  let filename = "";

  switch (activeTab) {
    case "links":
      data = JSON.parse(localStorage.getItem("links")) || defaultLinks;
      filename = "links.json";
      break;

    case "themes":
      data = JSON.parse(localStorage.getItem("themes")) || defaultThemes;
      filename = "themes.json";
      break;

    case "searchEngines":
      data = {
        searchEngines: JSON.parse(localStorage.getItem("searchEngines")) || defaultSearchEngines,
        shortcuts: JSON.parse(localStorage.getItem("shortcuts")) || defaultShortcuts,
      };
      filename = "searchEngines.json";
      break;
  }

  if (data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
});

// IMPORT
document.getElementById("import").addEventListener("click", () => {
  const activeTab = getActiveTab();
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";

  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        switch (activeTab) {
          case "links":
            saveLinks(data);
            buildLinks(data);
            break;

          case "themes":
            saveThemes(data);
            loadThemes();
            break;

          case "searchEngines":
            if (data.searchEngines) saveSearchEngines(data.searchEngines);
            if (data.shortcuts) saveShortcuts(data.shortcuts);
            loadSearchEngines();
            loadShortcuts();
            break;
        }
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  });

  input.click();
});
