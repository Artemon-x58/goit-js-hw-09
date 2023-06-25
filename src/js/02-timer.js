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

const date = new Date();

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
    
   daysEl.textContent = addLeadingZero(days);
   hoursEl.textContent = addLeadingZero(hours);
   minutesEl.textContent = addLeadingZero(minutes);
   secondsEl.textContent = addLeadingZero(seconds);

    return { days, hours, minutes, seconds };
   
  }
  
  function makeInterval () {
    setInterval(() => {
        const date = new Date();
        const sum = futureDate.getTime() - date.getTime();
    convertMs(sum)
    }, 1000)
  }

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] < options.defaultDate) {
            Notiflix.Notify.failure('Qui timide rogat docet negare');;
return
        }
        Notiflix.Notify.success('Let`s go!')
        const futureDate = new Date(selectedDates[0]);
      btnEl.removeAttribute('disabled', 'true')

btnEl.addEventListener('click',  () => {
    setInterval(() => {
        const date = new Date();
        const sum = futureDate.getTime() - date.getTime();
    convertMs(sum)
    }, 1000)
    
})
    },
  };

flatpickr(inputEl, options);

  function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
  }
