const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const gameArea = document.getElementById('gameArea');

let score = 0;
let timeLeft = 20;
let gameInterval;
let boxTimeout;
let isGameRunning = false;

function createBox() {
    const existingBox = document.querySelector('.box');
    if (existingBox) {
        existingBox.remove();
    }

    const box = document.createElement('div');
    box.classList.add('box');

    const gameAreaWidth = gameArea.offsetWidth;
    const gameAreaHeight = gameArea.offsetHeight;
    const boxSize = 50;
    const randomX = Math.floor(Math.random() * (gameAreaWidth - boxSize));
    const ramdomY = Math.floor(Math.random() * (gameAreaHeight - boxSize));

    box.style.left = `${randomX}px`;
    box.style.top = `${ramdomY}px`;

    box.addEventListener('click', () => {
        if (isGameRunning) {
            score++;
            scoreDisplay.textContent = score;
            box.remove();
            clearTimeout(boxTimeout);
            createBox();
        }
    });

    gameArea.appendChild(box);
    boxTimeout = setTimeout(() => {
        if (isGameRunning) {
            box.remove();
            createBox();
        }
    }, 1500);
}

function startTimer() {
    timeLeft = 20;
    timerDisplay.textContent = timeLeft;
    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function startGame() {
    if (isGameRunning) return;
    isGameRunning = true;
    score = 0;
    scoreDisplay.textContent = score;
    startButton.disabled = true;
    startTimer();
    createBox();
}

function endGame() {
    isGameRunning = false;
    clearInterval(gameInterval);
    clearTimeout(boxTimeout);
    const existingBox = document.querySelector('.box');
    if (existingBox) {
        existingBox.remove();
    }
    startButton.disabled = false;
    alert(`Game Selesai Cok! Score Anda: ${score}`);
}

startButton.addEventListener('click', startGame);
startButton.addEventListener('click', () => {
    if (!isGameRunning) {

    }
});