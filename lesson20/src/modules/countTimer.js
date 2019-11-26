function countTimer(deadline) {
  let timerHours = document.querySelector('#timer-hours'),
  timerMinutes = document.querySelector('#timer-minutes'),
  timerSeconds = document.querySelector('#timer-seconds');

  function getTimeRemaining () {
    let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
    return {seconds, minutes, hours, timeRemaining};
  }

  function updateClock () {
    let timer = getTimeRemaining();
    if (timer.hours < 10) {
      timer.hours = '0' + timer.hours;
    }
    if (timer.minutes < 10) {
      timer.minutes = '0' + timer.minutes;
    }
    if (timer.seconds < 10) {
      timer.seconds = '0' + timer.seconds;
    }
    if (timer.seconds >= 0) {
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
    }
    else {
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
    }


    if (timer.timeRemaining <= 0) {
      clearInterval(idClock);
    }
  }

  let idClock = setInterval(updateClock, 1000);

}

export default countTimer;