const btn = document.getElementById("setting-btn");
const panel = document.getElementById("setting-panel");
const textarea = document.getElementById("display");

btn.addEventListener("click", () => {
  panel.classList.toggle("open");
  loadLinks(textarea);
});

function loadSetting(tab) {
  
  if (tab === "links") {
    textarea.style.display = "block"; // show
    loadLinks(textarea);
  } else {
    textarea.style.display = "none"; 
    textarea.value = ""; 
    // future: loadThemes and search engines;
  }
}

// tab switching
document.querySelectorAll("#setting-tabs .tab").forEach(tabBtn => {
  tabBtn.addEventListener("click", () => {
    // update active class
    document.querySelectorAll("#setting-tabs .tab").forEach(btn => btn.classList.remove("active"));
    tabBtn.classList.add("active");

    // load correct editor state
    const tab = tabBtn.dataset.tab;
    loadSetting(tab);
  });
});

// get active tab
function getActiveTab() {
  return document.querySelector("#setting-tabs .tab.active").dataset.tab;
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
      panel.classList.remove("open");
    } catch (e) {
      alert("Invalid JSON. Please check your edits.");
    }
  }
  // future: else if (activeTab === "themes") { ... }
});

//discard button 
document.getElementById("discard").addEventListener("click", () => {
  const activeTab = getActiveTab();
  if (activeTab === "links") {
    loadLinks();
  }
  // future: else if (activeTab === "themes") { loadThemes(); }
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
  // future: else if (activeTab === "themes") { ... }
});