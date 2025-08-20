var speed = 100; // typing speed in ms

document.addEventListener("DOMContentLoaded", function () {
    const el = document.getElementById("greeting");
    const text = el.textContent;
    el.textContent = "";
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    setTimeout(typeWriter, 200); // delay before typing starts
});