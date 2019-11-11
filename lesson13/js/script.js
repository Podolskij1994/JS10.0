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
      date.setFullYear(year, month, days + 1);
      
      
      date.setHours(0,0,0);
      console.log(date);

  countTimer(date);
    
  //Сообщение в консоли
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

  //MENU
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'), 
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItem = menu.querySelectorAll('ul>li');

    function handlerMenu () {
      menu.classList.toggle('active-menu');
    }

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItem.forEach(item => item.addEventListener('click', handlerMenu));
  };

  toggleMenu();
  //PopUp
  let opacity = 0;
  if (screen.width >= 768) {
    let togglePopUp = () => {
      const popUp = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close');
      popUp.style.opacity = 0;

      popUpBtn.forEach(elem => {
        elem.addEventListener('click', () => {
          popUp.style.display = 'block';
          popUpShow();
        });
      });

      popUpClose.addEventListener('click', () => popUpUnShow());
      function popUpShow () {
        if (opacity < 1) {
          opacity += 0.05;
          popUp.style.opacity = opacity;
          requestAnimationFrame(popUpShow);
        }
      }
      function popUpUnShow () {
        console.log(opacity);
        if (opacity > 0) {
          opacity -= 0.05;
          popUp.style.opacity = opacity;
          requestAnimationFrame(popUpUnShow);
        }
        else {
          popUp.style.display = '';
        }
      }
    };
    togglePopUp();
  }

  

  //Код для плавной работы якорей
  const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
      animationTime = 300,
      framesCount = 20;

  anchors.forEach(function(item) {
    
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
      
      let scroller = setInterval(function() {
        let scrollBy = coordY / framesCount;
        
        if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
          window.scrollBy(0, scrollBy);
        } else {
          window.scrollTo(0, coordY);
          clearInterval(scroller);
        }
      }, animationTime / framesCount);
    });
  });

  

});