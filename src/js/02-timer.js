import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysText = document.querySelector('[data-days]');
const hoursText = document.querySelector('[data-hours]');
const minutesText = document.querySelector('[data-minutes]');
const secondsText = document.querySelector('[data-seconds]');
let intervalId = null;

let currentTime;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date()) {
      return window.alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      currentTime = selectedDates[0].getTime();
    }
  },
};

flatpickr(inputEl, options);

startBtn.disabled = true;

const onClick = () => {
  intervalId = setInterval(() => {
    const setDate = Date.now();
    const newTime = currentTime - setDate;
    if (newTime <= 0) {
      return clearInterval(intervalId);
    }
    creatMarkUp(convertMs(newTime));
  }, 1000);
};

startBtn.addEventListener('click', onClick);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  creatMarkUp({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

function creatMarkUp({ days, hours, minutes, seconds }) {
  daysText.textContent = `${days}`;
  hoursText.textContent = `${hours}`;
  minutesText.textContent = `${minutes}`;
  secondsText.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
