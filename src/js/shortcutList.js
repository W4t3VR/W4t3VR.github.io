const defaultShortcuts = {
  "!yt": "https://www.youtube.com/results?search_query=",
  "!nya": "https://nyaa.si/?f=0&c=0_0&q=",
  "!nf": "https://www.netflix.com/search?q=",
  "!sc": "https://soundcloud.com/search?q=",
  "!gtes": "https://translate.google.com/#view=home&op=translate&sl=auto&tl=es&text=",
  "!gten": "https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text=",
  "!fi": "https://www.flaticon.com/search?word=",
  "!ml": "https://listado.mercadolibre.com.ar/",
  "!r": "https://reddit.com/r/",
}

// ---- INIT ----
let shortcuts;
if (localStorage.getItem("shortcuts")) {
  shortcuts = JSON.parse(localStorage.getItem("shortcuts"));
} else {
  shortcuts = defaultShortcuts;
  saveShortcuts(shortcuts);
}

//build and display shortcuts from JSON
function buildShortcuts(shortcuts) {
  const container = document.getElementById("shortcuts");
  container.innerHTML = "";

  Object.keys(shortcuts).forEach(key => {
    const div = document.createElement("div");
    div.classList.add("shortcut");

    const delBtn = document.createElement("button");
    delBtn.textContent = "✖";

    const keyInput = document.createElement("input");
    keyInput.type = "text";
    keyInput.value = key;
    keyInput.name = "shortcut-name";
    keyInput.classList.add("shortcut-name");

    const linkInput = document.createElement("input");
    linkInput.type = "text";
    linkInput.value = shortcuts[key];
    linkInput.name = "shortcut-link";
    linkInput.classList.add("shortcut-link");  

    // Button and input handlers
    delBtn.addEventListener("click", () => {
      delete shortcuts[key];
      buildShortcuts(shortcuts);
    });

    // Save edits when changing shortcut name
    keyInput.addEventListener("change", () => {
      const newKey = keyInput.value.trim();
      if (newKey && newKey !== key) {
        // Prevent overwrite if newKey already exists
        if (shortcuts[newKey]) {
          alert("Shortcut already exists!");
          keyInput.value = key; // revert
          return;
        }
        shortcuts[newKey] = linkInput.value;
        delete shortcuts[key];
      }
    });

    // Save edits when changing link
    linkInput.addEventListener("change", () => {
      shortcuts[key] = linkInput.value;
    });

    div.appendChild(delBtn);
    div.appendChild(keyInput);
    div.appendChild(linkInput);

    container.appendChild(div);
  });
}

function saveShortcuts(shortcuts) {
  localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
}

function loadShortcuts() {
  buildShortcuts(shortcuts);
}

