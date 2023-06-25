const color = function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };

const bodyStyle = () => document.body.style.backgroundColor = color();

  const btns = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]')
  };

let intervalId = null;

  btns.start.addEventListener('click', () => {
    bodyStyle()
    btns.start.setAttribute("disabled", "true");
    btns.stop.removeAttribute("disabled", "true");
    intervalId = setInterval(() => {
bodyStyle()
 }, 1000)
  });

  btns.stop.addEventListener('click', () => {
    clearInterval(intervalId);
    btns.stop.setAttribute("disabled", "true");
    btns.start.removeAttribute("disabled", "true");
  });
