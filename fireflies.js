const canvas = document.getElementById('fireflies-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireflies = [];
const numFireflies = 150; // Increased number of fireflies

const colors = ['#86EFAC', '#22C55E', '#FDE68A'];

class Firefly {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5; // Smaller size
        this.speedX = Math.random() * 0.4 - 0.2; // Slower speed
        this.speedY = Math.random() * 0.4 - 0.2; // Slower speed
        this.opacity = Math.random() * 0.5 + 0.2; // Start with lower opacity
        this.flicker = Math.random() * 0.01;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1;
        }

        this.opacity += this.flicker;
        if (this.opacity < 0.2 || this.opacity > 0.7) { // Flicker within a range
            this.flicker *= -1;
        }
    }

    draw() {
        // Draw the glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity * 0.2; // Make the glow more subtle
        ctx.fill();

        // Draw the core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < numFireflies; i++) {
        fireflies.push(new Firefly());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const firefly of fireflies) {
        firefly.update();
        firefly.draw();
    }

    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fireflies.length = 0; // Clear the array
    init(); // Re-initialize fireflies
});