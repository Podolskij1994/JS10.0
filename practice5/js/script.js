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

  //калькулятор
  const calc = () => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcDay = document.querySelector('.calc-day'),
          calcCount = document.querySelector('.calc-count'),
          totalValue = document.querySelector('#total');

    const calc = (price = 100) => {
      let total = 0,
          countValue = 1,
          dayValue = 1;
      const typeValue = +calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        
      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value < 5 && calcDay.value) {
        dayValue *= 2;
      }
      else if (calcDay.value < 10 && calcDay.value) {
        dayValue *= 1.5;
      }
      if(typeValue && squareValue) {
        total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
      }

      setTotal(total, 0);
    }

    const setTotal = (total, count) => {
      totalValue.textContent = count;
      
      if (count < total) {
        count++;
        requestAnimationFrame(() => setTotal (total, count));
      }
    };

    calcBlock.addEventListener('change', function (event) {
      const target = event.target;

      if (target === calcType || target === calcSquare ||
        target === calcDay || target === calcCount) {
          calc();
        }
    })
  }


  calc();

  //Валидатор
  class Validator {
    constructor ({selector, pattern = {}, method}) {
      this.form = document.querySelector(selector);
      this.pattern = pattern;
      this.method = method;
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
        if (this.error.size || !this.elementsForm.some(elem => this.checkIt({target:elem}))) {
          e.preventDefault();
        }
      });
      this.elementsForm.forEach(elem => elem.addEventListener('input', function () {
        console.log(this.type);
        if (this.type === 'text'){
          this.value = this.value.replace(/\w*/gi, '');
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
      }
      else {
        this.showError(target);
        this.error.add(target);
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
        ['notEmpty'],
        ['pattern', 'email']
      ],
      'form1-name': [
        ['notEmpty'],
      ]
    },
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
        ['notEmpty'],
        ['pattern', 'email']
      ],
      'form2-name': [
        ['notEmpty'],
      ]
    },
  });
  valid2.init();
});