let timer;
let isRunning = false;
let currentMode = 'pomodoro';
let timeRemaining = 0; // Armazena o tempo restante ao pausar

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
  timeRemaining = duration; // Define o tempo inicial
  updateDisplay(timeRemaining);

  timer = setInterval(() => {
    timeRemaining--; // Decrementa o tempo restante
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
    clearInterval(timer); // Pausa o temporizador sem resetar `timeRemaining`
    startButton.textContent = 'Iniciar';
  } else {
    startTimer(timeRemaining > 0 ? timeRemaining : modes[currentMode]); // Usa o tempo restante
    startButton.textContent = 'Parar';
  }
  isRunning = !isRunning;
}

function tocarSom() {
  var som = new Audio('assets/descansar-ne-ninguem-e-de-ferro.mp3');
  som.play();
}

startButton.addEventListener('click', handleStartButton);

document.getElementById('pomodoro-btn').addEventListener('click', () => {
  resetTimer('pomodoro');
});

document.getElementById('short-break-btn').addEventListener('click', () => {
  resetTimer('shortBreak');
});

document.getElementById('long-break-btn').addEventListener('click', () => {
  resetTimer('longBreak');
});

function resetTimer(mode) {
  clearInterval(timer);
  isRunning = false;
  startButton.textContent = 'Iniciar Pomodoro';
  currentMode = mode;
  timeRemaining = modes[mode]; // Define o tempo do novo modo
  updateDisplay(timeRemaining);
}

// Inicializa o display com o tempo do modo Pomodoro
resetTimer(currentMode);
