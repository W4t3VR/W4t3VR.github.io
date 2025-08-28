const searchbox	= document.getElementById("search_input"),
urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

//get shortcuts from localStorage
function getShortcuts() {
  return JSON.parse(localStorage.getItem("shortcuts")) || {};
}

//On `Enter` key press, do search
searchbox.addEventListener("keydown", function(e) {
	e.key === "Enter" ? search() : false;
});

function search() {
	var query = searchbox.value; 
	const shortcuts = getShortcuts();
	var shortcut = "";
	var firstWord = searchbox.value.split(' ')[0];

	if (firstWord[0] === '!') { //If first character is '!'
		//Select shortcut based on flag ex. "!yt" for "https://www.youtube.com/results?search_query="
		shortcut = shortcuts[firstWord];

		if (shortcut === undefined) { //If the bang isn't listed in `enginesList.js`
			alert("Shortcut not found!");
			return false;
		}

		//Delete flag
		query = query.split(' ');
		query.shift();

		//Replace spaces for plus signs to prevent comma,sepparated,searches
		// (ex. Google Translate (!gten))
		query = query.join('+');
		if (!query) {
			// If query is blank, just go to the shortcut base URL
			const parts = shortcut.split("/");
			window.location.href = parts.slice(0, 3).join("/") + "/";
    		return false;
  		}
	}
	else if (query.match(urlRegex)) { //If input is a URL
		//If it already has `http(s)://`, don't prefix anything
		//Otherwise, add `http://` prefix
		shortcut = (query.indexOf("http") === 0 ? "" : "http://");
	}
	else {
		//Use selected search engine
		shortcut = searchEngines[engineNames[engineIndex]];
	}

	var query_url = shortcut + query;
	//Prevent empty searches
	//If `query` string isn't blank, go to `query_url`
	query ? window.location.href = query_url : false;
}

