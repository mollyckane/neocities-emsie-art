
const canvas = document.getElementById('screensaver');
const ctx = canvas.getContext('2d');

// make it fill the whole window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// resize it if the window size changes
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


//thoughts
const thoughts = [
    "i left something in a dream and i can't find it",
    "consider the flowers, they don't try to look right they, just open their petals and turn to the light",
    "it's okay to relax",
    "as long as you try your best",
    "be kind to yourself",
    "do you think animals know what we are thinking?",
    "do you believe in the moon?"
];

const particleImgs = ['heart', 'tear', 'star', 'cloud', 'spiral'].map(name => {
    const img = new Image();
    img.src = `/images/thoughts/${name}.png`;
    return img;
});

const particles = [];
for (let i = 0; i < thoughts.length; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: 20 + Math.random() * 24,
        thought: thoughts[i],
        pulse: Math.random() * Math.PI * 2,
        img: particleImgs[i % particleImgs.length] // each particle gets an image
    });
}

// click detection
canvas.addEventListener('click', function (e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dist = Math.hypot(mx - p.x, my - p.y);
        if (dist < p.radius) {
            revealThought(p.thought);
            break;
        }
    }
});

canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const hit = particles.some(p => Math.hypot(mx - p.x, my - p.y) < p.radius);
    canvas.style.cursor = hit ? 'pointer' : 'default';
});

function revealThought(text) {
    const paper = document.getElementById('thoughtPaper');
    const textEl = document.getElementById('thoughtText');
    textEl.textContent = text;
    paper.classList.add('open');
}

document.getElementById('thoughtPaper').addEventListener('click', function () {
    document.getElementById('thoughtPaper').classList.remove('open');
});

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x - p.radius < 0 || p.x + p.radius > canvas.width)  p.vx *= -1;
        if (p.y - p.radius < 0 || p.y + p.radius > canvas.height) p.vy *= -1;

        p.pulse += 0.02;
        const size = p.radius + Math.sin(p.pulse) * 4;

        // draw image instead of circle
        const scale = (size * 2) / Math.max(p.img.naturalWidth, p.img.naturalHeight);
        const w = p.img.naturalWidth * scale;
        const h = p.img.naturalHeight * scale;

        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.drawImage(p.img, p.x - w / 2, p.y - h / 2, w, h);
        ctx.restore();
    }

    requestAnimationFrame(drawParticles);
}

drawParticles();


















// const particles = [];
// for(let i=0;i<thoughts.length;i++){
//     particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5)* 0.8,
//         vy: (Math.random() - 0.5)* 0.8,
//         radius: 18 + Math.random() * 12,
//         thought: thoughts[i],
//         pulse: Math.random() * Math.PI * 2
//     });
// }

// //click detection
// canvas.addEventListener('click', function(e){
//     const rect=canvas.getBoundingClientRect();
//     const mx=e.clientX - rect.left;
//     const my=e.clientY - rect.top;

//     for(let i=0;i<particles.length;i++){
//         const p=particles[i];
//         const dist=Math.hypot(mx-p.x, my-p.y);
//         if(dist<p.radius){
//             revealThought(p.thought);
//             break;
//         }
//     }
// });

// function revealThought(text){
//     const paper=document.getElementById('thoughtPaper');
//     const textEl=document.getElementById('thoughtText');

//     textEl.textContent=text;
//     paper.classList.add('open');
// }

// document.getElementById('thoughtPaper').addEventListener('click', function() {
//   document.getElementById('thoughtPaper').classList.remove('open');
// });

// function drawParticles() {
//   // clear the canvas each frame
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   for (let i = 0; i < particles.length; i++) {
//     const p = particles[i];

//     // move
//     p.x += p.vx;
//     p.y += p.vy;

//     // bounce off edges
//     if (p.x - p.radius < 0 || p.x + p.radius > canvas.width)  p.vx *= -1;
//     if (p.y - p.radius < 0 || p.y + p.radius > canvas.height) p.vy *= -1;

//     // pulse effect
//     p.pulse += 0.02;
//     const size = p.radius + Math.sin(p.pulse) * 4;

//     // draw the circle
//     ctx.beginPath();
//     ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
//     ctx.fillStyle = 'rgba(179, 161, 143, 0.29)';
//     ctx.fill();
//     ctx.strokeStyle = 'rgba(214, 139, 64, 0.75)';
//     ctx.lineWidth = 1.5;
//     ctx.stroke();
//     ctx.closePath();
//   }

//   requestAnimationFrame(drawParticles); // keep looping
// }

// drawParticles(); // start it