import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const { delay, step, amount } = form.elements;
let delayEl = Number(delay.value);
let stepEl = Number(step.value);
let amountEl = Number(amount.value);

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  for (let i = 0; i < Number(amount.value); i += 1) {
    const newDelay = Number(delay.value) + i * Number(step.value);
    createPromise(i + 1, newDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
