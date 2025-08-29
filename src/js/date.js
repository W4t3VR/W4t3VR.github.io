const dateElement = document.getElementById("date");
const greetingElement = document.getElementById("greeting");

function showTime() {
  const date = new Date();

  const options = {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };

  const formattedDate = date.toLocaleString("en-GB", options);
  const [dayOfWeek, dateStr, time] = formattedDate.split(", ");

  dateElement.innerHTML = `${dayOfWeek}, ${time} | ${dateStr}`;
}

function showGreeting() {
  const hour = new Date().getHours();
  let greeting = "";

  if (hour < 12) {
    greeting = "morning";
  } else if (hour < 18) {
    greeting = "afternoon";
  } else if (hour < 22) {
    greeting = "evening";
  } else {
    greeting = "night";
  }
  return `Good ${greeting}, WatEVR`;
}

// --- Typing Effect ---
function typeWriter(el, text, speed = 50, delay = 200) {
  el.textContent = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      syncImageHeight();
      setTimeout(type, speed);
    }
  }
  setTimeout(type, delay);
}

showTime();
setInterval(showTime, 1000);

const greetingText = showGreeting();
typeWriter(greetingElement, greetingText, 100, 200);