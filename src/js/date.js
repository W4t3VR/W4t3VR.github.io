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

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 6) return "The night is quiet... rest well";
  if (hour < 12) return "Rise and shine, a new day begins";
  if (hour < 18) return "The day is yours to conquer!";
  if (hour < 22) return "The evening settles... breathe and unwind";
  return "The stars watch over you tonight";
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

const greetingText = getGreeting();
typeWriter(greetingElement, greetingText, 100, 200);