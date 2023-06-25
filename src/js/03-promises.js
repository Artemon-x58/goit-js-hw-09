import Notiflix from 'notiflix';

const refs = {
form: document.querySelector('.form'),
delay: document.querySelector('[name = "delay"]'),
step: document.querySelector('[name = "step"]'),
amount: document.querySelector('[name = "amount"]'),
btnEl: document.querySelector('button')
};


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
if (shouldResolve) {
    resolve({position, delay});
  } else {
    reject({position, delay});
  }
    }, delay);
  })
};

refs.form.addEventListener('submit', onClick);

function onClick (e) {
  e.preventDefault();

const amountP = Number(refs.amount.value);
const stepP = Number(refs.step.value);
let delayP = Number(refs.delay.value);

for(let i = 1; i <= amountP; i++) {
createPromise(i, delayP).then(({position, delay}) => {
  Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}).catch(({position, delay}) => {
  Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
});
delayP += stepP

}
};
