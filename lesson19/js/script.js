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
    const menu = document.querySelector('menu'),
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
  let errors = [1,0,0];

  const makeForm = (num) => {
    const errorMessage = 'Что-то пошло не так...',
          loadMessage = 'Загрузка...',
          successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    let form = document.getElementById(`form${num}`),
        statusMessage = document.createElement('div'),
        inputs = form.querySelectorAll('input');
    const outputData = (response) => {
      if (response.status !== 200) {
        throw new Error ('status network not 200');
      }
      console.log();
      statusMessage.textContent = successMessage;
      inputs.forEach(item => item.value = '');
      },
      errorData = (error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      };
    statusMessage.style.color = 'white';
    statusMessage.textContent = loadMessage;
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (errors[num - 1] === 0) {
        form.appendChild(statusMessage);
        const formData = new FormData(form);
        let body = {};
        for (let val of formData.entries()) {
          body[val[0]] = val[1];
        }
        postData(body)
        .then(outputData)
        .catch(errorData);
      }
    });
  };
  const postData = (body) => { 
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    // return new Promise ((resolve, reject) => {
    //   const request = new XMLHttpRequest();
    //   request.addEventListener('readystatechange', () => {
        
    //     if (request.readyState !== 4) {
    //       return;
    //     }
    //     if (request.status === 200) {
    //       resolve();
    //     }
    //     else {
    //       reject(request.status);
    //     }
    //   });
    //   request.open('POST', './server.php');
    //   request.setRequestHeader('Content-type', 'application/json');
    //   request.send(JSON.stringify(body));
    // });
  }

  

  makeForm('1')
  makeForm('2')
  makeForm('3')


  //Валидатор
  class Validator {
    constructor ({selector, pattern = {}, method, num}) {
      this.form = document.querySelector(selector);
      this.pattern = pattern;
      this.method = method;
      this.num = num;
      this.elementsForm = [...this.form.elements].filter( item => {
        return item.tagName.toLowerCase() !== 'button' && 
        item.type !== 'button';
      });
      this.error = new Set();
    }

    init () {
      this.applyStyle();
      this.setPattern();
      this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
      this.form.addEventListener('submit', e => {
        if (this.error.size) {
          e.preventDefault();
        }
      });
      this.elementsForm.forEach(elem => elem.addEventListener('input', function () {
        if (this.dataset.russian){
          this.value = this.value.replace(/[^а-яё\s]*/gi, '');
        }
      }));
    }

    isValid (elem) {
      const validatorMethod = {
        notEmpty (elem) {
          if (elem.value.trim() === '') {
            return false;
          }
          return true;
        },
        pattern (elem, pattern) {
          return pattern.test(elem.value);
        }
      };
      if (this.method) {
        const method = this.method[elem.id];

        if (method) {
          return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
        }
      }
      else {
        console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
      }
      return true;
    }

    checkIt (event) {
      const target = event.target;

      if (this.isValid(target)) {
        this.showSuccess(target);
        this.error.delete(target);
        errors[this.num - 1] = this.error.size;
      }
      else {
        this.showError(target);
        this.error.add(target);
        errors[this.num - 1] = this.error.size;
      }
    }
    

    showError (elem) {
      elem.classList.remove('success');
      elem.classList.add('error');
      if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
        return;
      }
      const errorDiv = document.createElement('div');
      errorDiv.textContent = 'Ошибка в этом поле';
      errorDiv.classList.add('validator-error');
      elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess (elem) {
      elem.classList.remove ('error');
      elem.classList.add('success');
      if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
        elem.nextElementSibling.remove();
      }
    }

    applyStyle () {
      const style = document.createElement('style');
      style.textContent = `
      input.success {
        border: 2px solid green !Important
      }
      input.error {
        border: 2px solid red !Important
      }
      .validator-error {
        font-size: 12px;
        font-family: sans-serif;
        color: red;
        margin: -20px
      } `
      document.head.appendChild(style);
    }

    setPattern () {
      if (!this.pattern.phone) {
        this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
      }
      if (!this.pattern.email) {
        this.pattern.email = /^\w+@\w+\.\w{2,}$/;
      }
    }
  }

  const valid1 = new Validator({
    selector: '#form1',
    pattern: {},
    method: {
      'form1-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'form1-email': [
        ['pattern', 'email']
      ],
      'form1-name': [
        ['notEmpty'],
      ]
    },
    num: 1,
  });
  valid1.init();
  const valid2 = new Validator({
    selector: '#form2',
    pattern: {},
    method: {
      'form2-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'form2-email': [
        ['pattern', 'email']
      ],
      'form2-name': [
        ['notEmpty'],
      ]
    },
    num: 2,
  });
  valid2.init();
  const valid3 = new Validator({
    selector: '#form3',
    pattern: {},
    method: {
      'form3-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'form3-email': [
        ['pattern', 'email']
      ],
      'form3-name': [
        ['notEmpty'],
      ]
    },
    num: 3,
  });
  valid3.init();
  
});