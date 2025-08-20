const numStars = 20;
const night = document.querySelector('.night');

for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('shooting_star');

    star.style.top = Math.random() * 100 + "vh";
    star.style.left = Math.random() * 100 + "vw";
    const delay = Math.random() * 1000 + "ms";
    star.style.animationDelay = delay;
    night.appendChild(star);
}