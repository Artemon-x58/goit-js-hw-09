import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';



const tegs = {
    inputEl: document.querySelector('#datetime-picker'),
    btnEl: document.querySelector('[data-start]'),
    wrapEl: document.querySelector('.timer'),
    fieldEl: document.querySelectorAll('.field'),
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]')
}

const {wrapEl, fieldEl, daysEl, hoursEl, minutesEl, secondsEl, inputEl, btnEl} = tegs;

inputEl.style.width = '225px';

wrapEl.style.display = 'flex';
wrapEl.style.gap = '10px';
wrapEl.style.marginTop = '30px';

fieldEl.forEach((e) => {
e.style.display = 'flex';
e.style.flexDirection = 'column';
e.style.textAlign = 'center';
e.style.fontSize = '20px';
});

btnEl.setAttribute('disabled', 'true') 

// const date = new Date();

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
   
  };

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: null,
    minuteIncrement: 1,
    onClose(selectedDates) {
      const currentTime = Date.now();
        if(selectedDates[0].getTime() < currentTime) {
            Notiflix.Notify.failure('Qui timide rogat docet negare');;
        }
        else {
          Notiflix.Notify.success('Let`s go!')
      btnEl.removeAttribute('disabled', 'true')
    };
    },
  };
  
flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
};

btnEl.addEventListener('click', intervalTime)

let intervalId = null;

function intervalTime () {
  intervalId = setInterval(update, 1000)
}

function update() {
  let inputDate = new Date(inputEl.value);
  const date = Date.now();
  const delta = inputDate.getTime() - date;
  const time = convertMs(delta);
  inputEl.disabled = true;
  if(delta < 0) {
    clearInterval(intervalId);
      inputEl.value = '';
      inputEl.removeAttribute("disabled")
      return
    }

   daysEl.textContent = addLeadingZero(time.days);
   hoursEl.textContent = addLeadingZero(time.hours);
   minutesEl.textContent = addLeadingZero(time.minutes);
   secondsEl.textContent = addLeadingZero(time.seconds);
};



