const btn = document.getElementById("setting-btn");
const panel = document.getElementById("setting-panel");

btn.addEventListener("click", () => {
  panel.classList.toggle("open");
});

const defaultLinks = [
  {
    "title": "general",
    "links": [
      { "label": "Youtube", "value": "https://youtube.com/" },
      { "label": "Gmail", "value": "https://gmail.com/" },
      { "label": "Facebook", "value": "https://www.facebook.com/" },
      { "label": "ArchWiki", "value": "https://archlinux.org/" }
    ]
  },
  {
    "title": "coding",
    "links": [
      { "label": "GitHub", "value": "https://github.com/" },
      { "label": "GitLab", "value": "https://gitlab.com/dashboard/projects" },
      { "label": "W3Schools", "value": "https://www.w3schools.com/" },
      { "label": "ChatGPT", "value": "https://chatgpt.com/" }
    ]
  },
  {
    "title": "learning",
    "links": [
      { "label": "Office", "value": "https://www.office.com/?auth=2" },
      { "label": "HackTheBox", "value": "https://account.hackthebox.com/dashboard" },
      { "label": "Coursera", "value": "https://www.coursera.org/" },
      { "label": "CyberDefenders", "value": "https://cyberdefenders.org/" }
    ]
  },
  {
    "title": "reddit",
    "links": [
      { "label": "r/unixporn", "value": "https://reddit.com/r/unixporn/" },
      { "label": "r/archlinux", "value": "https://reddit.com/r/archlinux/" },
      { "label": "r/startpages", "value": "https://reddit.com/r/startpages/" },
      { "label": "r/FirefoxCSS", "value": "https://reddit.com/r/FirefoxCSS/" }
    ]
  }
];

// build links from JSON
function buildLinks(links) {
  const container = document.getElementById("links");
  container.innerHTML = "";

  links.forEach(group => {
    const div = document.createElement("div");
    div.classList.add("urls");

    const header = document.createElement("span");
    header.classList.add("header");
    header.textContent = `~/${group.title}`;
    div.appendChild(header);

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

// load JSON into textarea
function loadLinksEditor() {
  const container = document.getElementById("display");
  container.value = JSON.stringify(JSON.parse(localStorage.getItem("links")), null, 2);
}

// init
document.addEventListener("DOMContentLoaded", () => {
  let links;

  if (localStorage.getItem("links")) {
    links = JSON.parse(localStorage.getItem("links"));
  } else {
    links = defaultLinks;
    saveLinks(links);
  }

  buildLinks(links);
  loadLinksEditor();
});

// save button
document.getElementById("save").addEventListener("click", () => {
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
});

//discard button 
document.getElementById("discard").addEventListener("click", () => {
  if (localStorage.getItem("links")) {
    loadLinksEditor();
  } else {
    alert("No saved links to discard to.");
  }
});

//reset buttons
document.getElementById("reset").addEventListener("click", () => {
  localStorage.removeItem("links");
  saveLinks(defaultLinks);
  buildLinks(defaultLinks);
  loadLinksEditor();
  panel.classList.remove("open");
});