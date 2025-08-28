const nightSky = document.getElementById("night-sky");
    
// ----------------------------
// Shooting stars
// ----------------------------
const numShootingStars = 15; 
const maxTop = window.innerHeight * 0.1;

for (let i = 0; i < numShootingStars; i++) {
    const star = document.createElement("span");
    star.classList.add("shooting-star");

    // random top (within top 10% of screen)
    star.style.top = Math.floor(Math.random() * maxTop) + "px";

    // spread stars more evenly across screen width
    const cols = window.innerWidth / numShootingStars;
    const baseRight = cols * i;
    const offset = Math.random() * cols;
    star.style.right = Math.floor(baseRight + offset) + "px";
    star.style.left = "initial";

    // random animation timing
    const duration = (0.5 + Math.random() * 3).toFixed(2) + "s";
    const delay = 0 + "s";

    star.style.setProperty("--duration", duration);
    star.style.setProperty("--delay", delay);

    nightSky.appendChild(star);
}

// ----------------------------
// Still stars
// ----------------------------
const numStillStars = 80; 

// pick grid size (roughly square root of total)
const cols = Math.ceil(Math.sqrt(numStillStars));
const rows = Math.ceil(numStillStars / cols);

const cellWidth = window.innerWidth / cols;
const cellHeight = window.innerHeight / rows;

for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        if ((r * cols + c) >= numStillStars) break;

        const star = document.createElement("span");
        star.classList.add("still-star");

        // base position = top-left corner of grid cell
        const baseTop = r * cellHeight;
        const baseLeft = c * cellWidth;

        // add a little randomness inside each cell
        const offsetTop = Math.random() * cellHeight;
        const offsetLeft = Math.random() * cellWidth;

        star.style.top = Math.floor(baseTop + offsetTop) + "px";
        star.style.left = Math.floor(baseLeft + offsetLeft) + "px";

        // random twinkle speed
        const twinkleDuration = (1 + Math.random() * 3).toFixed(2) + "s";
        star.style.setProperty("--twinkle-duration", twinkleDuration);

        nightSky.appendChild(star);
    }
}