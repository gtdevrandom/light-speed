const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

const particlesArray = [];
const numberOfParticles = 200;

class Particle {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
}

function initParticles() {
    particlesArray.length = 0;
    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = (Math.random() - 0.5) * 1.5;
        const speedY = (Math.random() - 0.5) * 1.5;
        particlesArray.push(new Particle(x, y, size, speedX, speedY));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


const hyperspaceCanvas = document.getElementById('hyperspaceCanvas');
const hCtx = hyperspaceCanvas.getContext('2d');
let stars = [];

function resizeHyperspaceCanvas() {
    hyperspaceCanvas.width = window.innerWidth;
    hyperspaceCanvas.height = window.innerHeight;
}
resizeHyperspaceCanvas();
window.addEventListener('resize', resizeHyperspaceCanvas);

function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 30 + 5;
        stars.push({
            x: hyperspaceCanvas.width / 2,
            y: hyperspaceCanvas.height / 2,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            length: Math.random() * 2 + 1,
            alpha: 1
        });
    }
}

function animateHyperspace() {
    hCtx.clearRect(0, 0, hyperspaceCanvas.width, hyperspaceCanvas.height);
    stars.forEach(star => {
        hCtx.strokeStyle = `rgba(255,255,255,${star.alpha})`;
        hCtx.beginPath();
        hCtx.moveTo(hyperspaceCanvas.width / 2, hyperspaceCanvas.height / 2);
        hCtx.lineTo(star.x, star.y);
        hCtx.stroke();

        star.x += star.dx;
        star.y += star.dy;
        star.alpha -= 0.02;
    });
    stars = stars.filter(s => s.alpha > 0);

    if (stars.length > 0) {
        requestAnimationFrame(animateHyperspace);
    } else {
        hyperspaceCanvas.classList.remove('active');
    }
}

function activateHyperspaceEffect() {
    createStars(600);
    hyperspaceCanvas.classList.add('active');
    animateHyperspace();
}


const audios = {
    main: new Audio('musiques/musique1.mp3'),
    p1: new Audio('musiques/musique2.mp3'),
    p2: new Audio('musiques/musique3.mp3'),
	p3: new Audio('musiques/musique4.mp3'),
	p4: new Audio('musiques/musique5.mp3'),
	p5: new Audio('musiques/musique6.mp3')
	p6: new Audio('musiques/musique7.mp3')
	p7: new Audio('musiques/musique8.mp3')
	p8: new Audio('musiques/musique9.mp3')
	p9: new Audio('musiques/musique10.mp3')
};
Object.values(audios).forEach(audio => {
    audio.loop = true;
    audio.volume = 1;
});

const tabIds = ['main', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6','p7','p8','p9'];
let currentTabIndex = 0;
let currentTab = tabIds[currentTabIndex];
let currentAudio = audios[currentTab];

const TRANSITION_TIME = 1000;

function switchTab(tabId) {
    if (tabId === currentTab) return;

    activateHyperspaceEffect();

    const currentTabElement = document.getElementById(currentTab);
    currentTabElement.classList.remove('active');

    setTimeout(() => {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        const newTab = document.getElementById(tabId);
        newTab.classList.add('active');

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        currentTab = tabId;
        currentTabIndex = tabIds.indexOf(tabId);
        currentAudio = audios[tabId];
        currentAudio.volume = volumeSlider.value;
        currentAudio.play();

        playPauseBtn.textContent = '⏸️ Pause';
        isPlaying = true;

    }, TRANSITION_TIME);
}

function nextTab() {
    if (currentTabIndex < tabIds.length - 1) {
        switchTab(tabIds[currentTabIndex + 1]);
    }
}

function prevTab() {
    if (currentTabIndex > 0) {
        switchTab(tabIds[currentTabIndex - 1]);
    }
}


const playPauseBtn = document.getElementById('playPause');
const replayBtn = document.getElementById('replay');
const volumeSlider = document.getElementById('volume');
let isPlaying = false;

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        currentAudio.pause();
        playPauseBtn.textContent = "▶️ Play";
    } else {
        currentAudio.play();
        playPauseBtn.textContent = "⏸️ Pause";
    }
    isPlaying = !isPlaying;
});

replayBtn.addEventListener('click', () => {
    currentAudio.currentTime = 0;
    currentAudio.play();
    playPauseBtn.textContent = "⏸️ Pause";
    isPlaying = true;
});

volumeSlider.addEventListener('input', (e) => {
    currentAudio.volume = parseFloat(e.target.value);
});

function openModal(title, imageSrc) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-image').src = imageSrc;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
