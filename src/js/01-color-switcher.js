const startButtonEl = document.querySelector('button[data-start]');
const stopButtonEl = document.querySelector('button[data-stop]');
stopButtonEl.setAttribute('disabled', '');

startButtonEl.addEventListener('click', onStartButtonClick);
stopButtonEl.addEventListener('click', onStopButtonClick);
let randomColor = null;

function onStartButtonClick() {
  randomColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButtonEl.setAttribute('disabled', '');
  stopButtonEl.removeAttribute('disabled');
}

function onStopButtonClick() {
  clearInterval(randomColor);
  startButtonEl.removeAttribute('disabled');
  stopButtonEl.setAttribute('disabled', '');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
