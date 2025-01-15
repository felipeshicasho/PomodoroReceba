let timer;
let isRunning = false;
let currentMode = 'pomodoro';
const modes = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60
};

const timerDisplay = document.getElementById('timer-display');
const timerDisplayTitle = document.getElementById('timer-display-title');

const startButton = document.getElementById('start-btn');

function updateDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  timerDisplayTitle.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

}

function startTimer(duration) {
  let timeRemaining = duration;
  updateDisplay(timeRemaining);

  timer = setInterval(() => {
    timeRemaining--;
    updateDisplay(timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(timer);
      isRunning = false;
      tocarSom(); 
      startButton.textContent = 'Iniciar Pomodoro';
    }
  }, 1000);
}

function handleStartButton() {
  if (isRunning) {
    clearInterval(timer);
    startButton.textContent = 'Iniciar Pomodoro';
  } else {
    startTimer(modes[currentMode]);
    startButton.textContent = 'Parar';
  }
  isRunning = !isRunning;
}

function tocarSom() {
    var som = new Audio('assets/descansar-ne-ninguem-e-de-ferro.mp3'); // Caminho do arquivo de áudio
    som.play(); // Toca o som
}

startButton.addEventListener('click', handleStartButton);

document.getElementById('pomodoro-btn').addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  startButton.textContent = 'Iniciar Pomodoro';
  currentMode = 'pomodoro';
  updateDisplay(modes[currentMode]);
});

document.getElementById('short-break-btn').addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  startButton.textContent = 'Iniciar Pomodoro';
  currentMode = 'shortBreak';
  updateDisplay(modes[currentMode]);
});

document.getElementById('long-break-btn').addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  startButton.textContent = 'Iniciar Pomodoro';
  currentMode = 'longBreak';
  updateDisplay(modes[currentMode]);
});

// Inicializa o display com o tempo do modo Pomodoro
updateDisplay(modes[currentMode]);