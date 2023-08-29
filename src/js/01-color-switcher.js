const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const onClick = () => {
  timerID = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
  }, 1000);
};

startBtn.addEventListener('click', onClick);

const stopTimer = () => {
  clearInterval(timerID);
  startBtn.style.pointerEvents = '';
  startBtn.disabled = false;
};

stopBtn.addEventListener('click', stopTimer);
