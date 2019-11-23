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

  countTimer(date);

  //MENU
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'), 
          menu = document.querySelector('menu'),
          body = document.querySelector('body');

    body.addEventListener('click', event => {
      if (!event.target.closest('menu') && !event.target.closest('.menu') || 
      event.target.closest('.close-btn') || event.target.nodeName === 'A'){
        menu.classList.remove('active-menu');
      }
      else if (event.target.closest('.menu')){
        handlerMenu();
      }
    });
    function handlerMenu () {
      menu.classList.toggle('active-menu');
    }
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

      function popUpShow () {
        if (opacity < 1) {
          opacity += 0.05;
          popUp.style.opacity = opacity;
          requestAnimationFrame(popUpShow);
        }
      }
      function popUpUnshow () {
        if (opacity > 0) {
          opacity -= 0.05;
          popUp.style.opacity = opacity;
          requestAnimationFrame(popUpUnshow);
        }
        else {
          popUp.style.display = '';
        }
      }
      popUp.addEventListener('click', event => {
        if (event.target === popUp || event.target === popUpClose) {
          popUpUnshow();
        } 
      });
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
        
        if(scrollBy > window.pageYOffset - coordY && window.innerHeight + 
          window.pageYOffset < document.body.offsetHeight) {
          window.scrollBy(0, scrollBy);
        } else {
          window.scrollTo(0, coordY);
          clearInterval(scroller);
        }
      }, animationTime / framesCount);
    });
  });

  //Табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = index => {
      tabContent.forEach((item, i) => {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        }
        else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      });
    };

    tabHeader.addEventListener('click', event => {
      let target = event.target;

      target = target.closest('.service-header-tab');

      if(target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

  //Слайдер
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
          dot = document.querySelectorAll('.dot'),
          slider = document.querySelector('.portfolio-content');
    let currentSlide = 0,
        interval;




    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 2000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')){
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      }
      else if (target.matches('#arrow-left')) {
        currentSlide--;
      }
      else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
        startSlide();
      }
    });

    startSlide(2000);
  };

  slider();

  //change Photo
  const changePhoto = () => {
    const commandPhoto = document.querySelectorAll('.command__photo'),
          command = document.getElementById('command');

    command.addEventListener('mouseover', event => {
      let target = event.target;
      if (target.matches('.command__photo')) {
        let src = target.src;
        target.src = target.dataset.img;
        target.dataset.img = src;
      }
    });
    command.addEventListener('mouseout', event => {
      let target = event.target;
      if (target.matches('.command__photo')) {
        let src = target.src;
        target.src = target.dataset.img;
        target.dataset.img = src;
      }
    });
  }
  changePhoto();

  //Send Form

  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
          loadMessage = 'Загрузка...',
          successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    let form = document.getElementById('form1'),
        statusMessage1 = document.createElement('div'),
        inputs1 = form.querySelectorAll('input');
    statusMessage1.textContent = loadMessage;
    form.addEventListener('submit', event => {
      event.preventDefault();
      form.appendChild(statusMessage1);
      const formData = new FormData(form);
      let body = {};
      for (let val of formData.entries()) {
        body[val[0]] = val[1];
      }
      postData(body, () => {
        statusMessage1.textContent = successMessage;
        inputs1.forEach(item => item.value = '');
      }, (error) => {
        statusMessage1.textContent = errorMessage;
        console.error(error);
      });
    });
    const form1 = document.getElementById('form2');
    let statusMessage2 = document.createElement('div'),
        inputs2 = form1.querySelectorAll('input');
    form1.addEventListener('submit', event => {
      event.preventDefault();
      statusMessage2.textContent = loadMessage;
      form1.appendChild(statusMessage2);
      const formData = new FormData(form1);
      let body = {};
      for (let val of formData.entries()) {
        body[val[0]] = val[1];
      }
      postData(body, () => {
        statusMessage2.textContent = successMessage;
        inputs2.forEach(item => item.value = '');
      }, (error) => {
        statusMessage2.textContent = errorMessage;
        console.error(error);
      });
    });
    //Вторая форма
    const form2 = document.getElementById('form3');
    let statusMessage3 = document.createElement('div'),
        inputs3 = form2.querySelectorAll('input');
    statusMessage3.style.color = 'white'
    form2.addEventListener('submit', event => {
    event.preventDefault();
    statusMessage3.textContent = loadMessage;
    form2.appendChild(statusMessage3);
    const formData = new FormData(form2);
    let body = {};
    for (let val of formData.entries()) {
      body[val[0]] = val[1];
    }
    postData(body, () => {
      statusMessage3.textContent = successMessage;
      inputs3.forEach(item => item.value = '');
    }, (error) => {
      statusMessage3.textContent = errorMessage;
      console.error(error);
    });
    });
    //Третья форма
  };

  const postData = (body, outputData, errorData) => {    
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
      
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        outputData();
      }
      else {
        errorData(request.status);
      }
    });
    request.open('POST', './server.php');
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(body));
  }

  sendForm();
  //Валидация
  const checkInput = () => {
    const numberInput = document.querySelectorAll('.form-phone'),
          textInput = document.querySelectorAll('.form-name, .mess');
          console.log(textInput);
    numberInput.forEach(item => {
      item.addEventListener('keypress', event => {
        let reg = /^\+?\d*$/ig
        if (!reg.test(item.value)) {
          event.preventDefault();
        }
      });
    });
    textInput.forEach(item => {
      item.addEventListener('keypress', event => {
        let reg = /^[а-я]*$/ig;
        if (!reg.test(item.value)) {
          event.preventDefault();
          item.value = item.value.slice(0, item.value.length);
        }
      })
    })
  }

  checkInput();
});