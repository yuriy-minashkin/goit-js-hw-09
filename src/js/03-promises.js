import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayEl = formEl.elements.delay;
const stepEl = formEl.elements.step;
const amountEl = formEl.elements.amount;

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  let firstDelay = Number(delayEl.value);
  for (let i = 1; i <= amountEl.value; i += 1) {
    createPromise(
      i,
      (firstDelay += Number(stepEl.value)) - Number(stepEl.value)
    )
      .then(valueObj => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${valueObj.position} in ${valueObj.delay}ms`
        );
      })
      .catch(valueObj => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${valueObj.position} in ${valueObj.delay}ms`
        );
      });
  }
  formEl.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    const valueObj = { position, delay };
    setTimeout(() => {
      if (shouldResolve) {
        resolve(valueObj);
      } else {
        reject(valueObj);
      }
    }, delay);
  });
  return promise;
}
