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
                ctx.fillStyle = 'rgba(256,256,256, 0.6)';
                ctx.fill();
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
            particlesArray.forEach(particle => {
                particle.update();
                particle.draw();
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

function launchHyperspaceEffect() {
    createStars(600); // Nombre de "traînées d’étoiles"
    hyperspaceCanvas.classList.add('active');
    animateHyperspace();
}

function switchTab(tabId) {
    launchHyperspaceEffect(); // 💥 effet lumière

    setTimeout(() => {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
        playMusic(tabId);
    }, 300); // laisse le temps à l'effet de jouer
}


const musicByTab = {
    main: new Audio("musique1.mp3"),
    test1: new Audio("musique2.mp3"),
    test2: new Audio("musique3.mp3")
};

Object.values(musicByTab).forEach(audio => {
    audio.preload = "auto";
    audio.volume = 1;
});

function playMusic(tabId) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = musicByTab[tabId];
    currentAudio.play();
}


function replayMusic() {
    if (currentAudio) {
        currentAudio.currentTime = 0;
        currentAudio.play();
    }
}

function changeVolume(value) {
    if (currentAudio) {
        currentAudio.volume = parseFloat(value);
    }
}

function toggleVolumeSlider() {
    const slider = document.getElementById("volume-slider");
    slider.classList.toggle("hidden");
}
