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
  if (activeTab === "links") {
    const textarea = document.getElementById("display");
    const edited = textarea.value;

    try {
      const parsed = JSON.parse(edited);
      saveLinks(parsed);
      buildLinks(parsed);
    } catch (e) {
      alert("Invalid JSON. Please check your edits.");
    }
  }
  if (activeTab === "searchEngines") {
    saveEngineIndex(engineIndex);
    saveSearchEngines(searchEngines);
    saveShortcuts(shortcuts);
  }
});

//discard button 
document.getElementById("discard").addEventListener("click", () => {
  const activeTab = getActiveTab();
  if (activeTab === "links") {
    loadLinks();
  }
  if (activeTab === "searchEngines") {
    loadSearchEngines();
    loadShortcuts();
  } 
});

//reset buttons
document.getElementById("reset").addEventListener("click", () => {
  const activeTab = getActiveTab();
  if (activeTab === "links") {  
    if (confirm("Are you sure you want to reset links to default? This action cannot be undone.")) {
      localStorage.removeItem("links");
      saveLinks(defaultLinks);
      buildLinks(defaultLinks);
      panel.classList.remove("open");
    }
  }
  if (activeTab === "searchEngines") {
    if (confirm("Are you sure you want to reset search engines and shortcuts to default? This action cannot be undone.")) {
      localStorage.removeItem("searchEngines");
      localStorage.removeItem("engineIndex");
      localStorage.removeItem("shortcuts");
      saveSearchEngines(defaultSearchEngines);
      saveShortcuts(defaultShortcuts);
      saveEngineIndex(0);
      loadSearchEngines();
      loadShortcuts();
      panel.classList.remove("open");
    }
  }
});