import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const timeFieldArrayEl = document.querySelectorAll('.value');

const startButtonEl = document.querySelector('button[data-start]');
startButtonEl.setAttribute('disabled', '');

function onTimerStart(selectedDates) {
  startButtonEl.addEventListener('click', onStartButtonClick);
  let timerId = null;
  let isActive = false;

  function onStartButtonClick() {
    if (isActive) {
      return;
    }
    isActive = true;
    timerId = setInterval(() => {
      let dateSelected = selectedDates[0].getTime();
      let dateNow = new Date().getTime();
      const deltaTime = dateSelected - dateNow;
      const countdownObj = addLeadingZero(convertMs(deltaTime));
      console.log(countdownObj);
      daysEl.textContent = `${countdownObj.days}`;
      hoursEl.textContent = `${countdownObj.hours}`;
      minutesEl.textContent = `${countdownObj.minutes}`;
      secondsEl.textContent = `${countdownObj.seconds}`;

      if (deltaTime < 0) {
        clearInterval(timerId);
        for (let element of timeFieldArrayEl) {
          element.textContent = '00';
        }
      }
    }, 1000);
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      startButtonEl.setAttribute('disabled', '');
      return Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 1000,
      });
    }
    startButtonEl.removeAttribute('disabled');
    onTimerStart(selectedDates);
    return;
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  let counterObj = {};
  for (key in value) {
    counterObj[key] = value[key].toString().padStart(2, '0');
  }
  return counterObj;
}

// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
