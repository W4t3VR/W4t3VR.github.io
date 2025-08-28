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

const maxLinks = 4; // Number of links to show per page

//build and display links from JSON
function buildLinks(links) {
  const container = document.getElementById("links");
  container.innerHTML = "";
  
  links.forEach((group, groupIndex) => {
    const div = document.createElement("div");
    div.classList.add("page");

    const ca = document.createElement("div");
    ca.classList.add("category");
    div.appendChild(ca);

    const prevBtn = document.createElement("button");
    prevBtn.classList.add("prev");
    prevBtn.textContent = "~";
    ca.appendChild(prevBtn);

    const header = document.createElement("span");
    header.classList.add("header");
    header.textContent = `/${group.title}`;
    ca.appendChild(header);

    const nextBtn = document.createElement("button");
    nextBtn.classList.add("next");
    nextBtn.textContent = "»";
    ca.appendChild(nextBtn);
  
    const ul = document.createElement("ul");
    ul.dataset.page = 0;
    div.appendChild(ul);

    container.appendChild(div);

    function renderPage(page) {
      ul.innerHTML = "";
      const start = page * maxLinks;
      const end = start + maxLinks;
      const items = links[groupIndex].links.slice(start, end);

      items.forEach(link => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = link.value;
        a.textContent = link.label;
        li.appendChild(a);
        ul.appendChild(li);
      });

      prevBtn.disabled = page === 0;
      nextBtn.disabled = end >= links[groupIndex].links.length;
    }

    // Button handlers to next or previous page
    prevBtn.addEventListener("click", () => {
      let page = parseInt(ul.dataset.page);
      if (page > 0) {
        page--;
        ul.dataset.page = page;
        ul.classList.add("no-anim");
        renderPage(page);
      }
    });

    nextBtn.addEventListener("click", () => {
      let page = parseInt(ul.dataset.page);
      if ((page + 1) * maxLinks < links[groupIndex].links.length) {
        page++;
        ul.dataset.page = page;
        ul.classList.add("no-anim");
        renderPage(page);
      }
    });

    renderPage(0);
  });
}

// init
let links;
if (localStorage.getItem("links")) {
  links = JSON.parse(localStorage.getItem("links"));
} 
else {
  links = defaultLinks;
  saveLinks(links);
}
buildLinks(links);  

// save JSON to localStorage
function saveLinks(links) {
  localStorage.setItem("links", JSON.stringify(links));
}

// load JSON from localStorage into textarea
function loadLinks() {
  textarea.value = JSON.stringify(JSON.parse(localStorage.getItem("links")), null, 2);
}

