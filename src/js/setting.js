const btn = document.getElementById("toggle-btn");
const panel = document.getElementById("links-panel");

// Toggle panel open/close
btn.addEventListener("click", () => {
  panel.classList.toggle("open");
});

// Extract links from DOM into your JSON format
function extractLinks() {
  const links = [];
  document.querySelectorAll("#links .urls").forEach(section => {
    const header = section.querySelector(".header");
    const category = header ? header.textContent.replace("~/", "").trim() : "Misc";

    const group = { title: category, links: [] };

    section.querySelectorAll("ul li a").forEach(a => {
      group.links.push({ label: a.textContent.trim(), value: a.href });
    });

    links.push(group);
  });
  return links;
}

// Save JSON to localStorage
function saveLinks(links) {
  localStorage.setItem("links", JSON.stringify(links, null, 2));
}

// Load and display JSON as pretty text
function loadLinks() {
  const container = document.getElementById("links-json");
  const saved = localStorage.getItem("links");
  if (!saved) {
    container.textContent = "No links saved.";
    return;
  }
  container.textContent = saved; // show pretty JSON
}

// On page load, extract and save once
document.addEventListener("DOMContentLoaded", () => {
  const links = extractLinks();
  saveLinks(links);
  console.log("Extracted & saved links:", links);
});

// Save button
document.getElementById("save").addEventListener("click", () => {
  const links = extractLinks();
  saveLinks(links);
  console.log("Saved links to localStorage");
});

// Load button
document.getElementById("load").addEventListener("click", () => {
  loadLinks();
  console.log("Loaded links from localStorage");
});