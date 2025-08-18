const dateElement = document.getElementById("date");
const greetElement = document.getElementById("greet-time");

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

const hour = date.getHours();
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

  greetElement.textContent = greeting;
}

setInterval(showTime, 1000);
showTime();
