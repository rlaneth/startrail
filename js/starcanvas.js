const canvas = document.getElementById('starcanvas');
const ctx = canvas.getContext('2d');

let width, height, stars, centerX, centerY;

function init() {
    resize();
    createStars();
    animate();
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    if (width > 599) {
        centerY = height - 250;
        centerX = width - 250;
    } else {
        centerY = height;
        centerX = width / 2;
    }
}

function createStars() {
    stars = [];
    for (let i = 0; i < 100; i++) {
        let radius = Math.random() * Math.min(width, height);
        let angle = Math.random() * Math.PI * 2;
        stars.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            size: Math.random() * 1.2,
            speed: (Math.random() * 0.0002) + 0.0002,
            angle: angle
        });
    }
}

function drawStars() {
    ctx.fillStyle = 'rgba(0, 4, 20, 0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateStars() {
    stars.forEach(star => {
        star.angle += star.speed;
        let radius = Math.sqrt((star.x - centerX) ** 2 + (star.y - centerY) ** 2);
        star.x = centerX + Math.cos(star.angle) * radius;
        star.y = centerY + Math.sin(star.angle) * radius;
    });
}

function animate() {
    drawStars();
    updateStars();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resize();
    createStars();
});

window.addEventListener('load', init);