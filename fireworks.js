const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 4 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy + 0.05; // gravità
    this.vx *= 0.99;
    this.vy *= 0.99;
    this.alpha -= 0.02;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = `hsl(${Math.random()*360}, 100%, 60%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, 2*Math.PI);
    ctx.fill();
    ctx.restore();
  }
}

let particles = [];

canvas.addEventListener('click', (e) => {
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.alpha > 0);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}

animate();
