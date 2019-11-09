window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  //Timer
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
          if (timer.seconds > 0) {
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
  let date = new Date(),
      days = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear();
      if (date.getHours() >= 17) {
        date.setFullYear(year, month, days + 2);
      }
      else {
        date.setFullYear(year, month, days + 1);
      }
      
      date.setHours(-5,0,0);
      console.log(date);

  countTimer(date);
    
  function checkTime () {
    let date = new Date(),
        hours = date.getHours(),
        day = date.getDay(),
        time = date.toLocaleTimeString('en'),
        newDate = new Date();
        newDate.setFullYear(2019, 11, 31);
    if (hours >= 6 && hours <= 11) {
      console.log('Доброе утро');
    }
    else if (hours > 11 && hours <= 17) {
      console.log('Добрый день');
    }
    else if(hours > 17 && hours <= 23) {
      console.log('Добрый вечер');
    }
    else {
      console.log('Доброй ночи');
    }
    switch (day) {
      case 1:
        console.log('Сегодня: понедельник');
        break;
      case 2:
        console.log('Сегодня: вторник');
        break;
      case 3:
        console.log('Сегодня: среда');
        break;
      case 4:
        console.log('Сегодня: четверг');
        break;
      case 5:
        console.log('Сегодня: пятница');
        break;
      case 6:
        console.log('Сегодня: суббота');
        break;
      case 0:
        console.log('Сегодня: воскресенье');
        break;
    }
    console.log('Текущее время: ' + time);
    console.log('До нового года осталось: ' + Math.floor((newDate - date) / 1000 / 3600 / 24) + ' дня');
  }

  checkTime();
})