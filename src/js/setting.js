const btn = document.getElementById("toggle-btn");
  const panel = document.getElementById("links-panel");
  btn.addEventListener("click", () => {
    panel.classList.toggle("open");
  });

//extract links from the HTML structure
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

function saveLinks(links) {
  localStorage.setItem("links", JSON.stringify(links));
}

function loadLinks() {
  const container = document.getElementById("links-json");
  container.textContent = JSON.stringify(JSON.parse(localStorage.getItem("links")), null, 2); // format JSON view
}

document.addEventListener("DOMContentLoaded", () => {
  const links = extractLinks();
  saveLinks(links);
});

document.getElementById("save").addEventListener("click", () => {
  saveLinks(links);
  console.log("Saved links to localStorage");
});

document.getElementById("load").addEventListener("click", () => {
  loadLinks();
});