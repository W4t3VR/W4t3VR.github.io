var speed = 100; // typing speed in ms

document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll(".header");
    elements.forEach(el => {
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
        setTimeout(typeWriter, 600); // delay before typing starts
    });
});
