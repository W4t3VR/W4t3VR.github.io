const btn = document.getElementById("setting-btn");
const panel = document.getElementById("setting-panel");

btn.addEventListener("click", () => {
  panel.classList.toggle("open");
});

// extract links from the hardcoded HTML
function extractLinks() {
  const links = [];

  document.querySelectorAll("#links .urls").forEach(section => {
    const header = section.querySelector(".header").textContent.replace("~/", "").trim();
    const group = { title: header, links: [] };

    section.querySelectorAll("ul li a").forEach(a => {
      group.links.push({ label: a.textContent.trim(), value: a.href });
    });

    links.push(group);
  });

  return links;
}

// build links from JSON
function buildLinks(links) {
  const container = document.getElementById("links");
  container.innerHTML = ""; // clear old

  links.forEach(group => {
    const div = document.createElement("div");
    div.classList.add("urls");

    // header
    const header = document.createElement("span");
    header.classList.add("header");
    header.textContent = `~/${group.title}`;
    div.appendChild(header);

    //links list
    const ul = document.createElement("ul");
    group.links.forEach(link => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link.value;
      a.textContent = link.label;
      li.appendChild(a);
      ul.appendChild(li);
    });

    div.appendChild(ul);
    container.appendChild(div);
  });
}

// save JSON to localStorage
function saveLinks(links) {
  localStorage.setItem("links", JSON.stringify(links));
}

// load JSON into textarea (formatted)
function loadLinksEditor() {
  const container = document.getElementById("display");
  container.value = JSON.stringify(JSON.parse(localStorage.getItem("links")), null, 2);
}

// init
document.addEventListener("DOMContentLoaded", () => {
  let links;

  if (localStorage.getItem("links")) {
    // load from localStorage
    links = JSON.parse(localStorage.getItem("links"));
  } else {
    // first run → extract from HTML and save
    links = extractLinks();
    saveLinks(links);
  }

  // build HTML & load textarea editor
  buildLinks(links);
  loadLinksEditor();
});

// save button
document.getElementById("save").addEventListener("click", () => {
  const textarea = document.getElementById("display");
  const edited = textarea.value;

  try {
    const parsed = JSON.parse(edited); // validate JSON
    saveLinks(parsed);
    buildLinks(parsed);
    alert("✅ Links updated and applied to HTML!");
  } catch (e) {
    alert("❌ Invalid JSON. Please check your edits.");
  }
});