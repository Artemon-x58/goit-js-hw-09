import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};


refs.form.addEventListener('click', onClick);


function onClick (e) {
  e.preventDefault();

  const amountP = parseInt(refs.amount.value);
  const delayStep = Number(refs.step.value);
  let firstDelay = Number(refs.firstDelay.value);

for(let i = 1; i <= amountP; i ++){
  createPromise(i, firstDelay).then(({position, delay}) => {
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`); 
  }).catch(({position, delay}) => {
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  })
  firstDelay += delayStep;
}
}




function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
    if (shouldResolve) {
      resolve({position, delay})
    } else {
      reject({position, delay})
    }
    }, delay)
    
  })
  
  
}
