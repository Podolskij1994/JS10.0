'use strict';
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import slow from './modules/slow';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changePhoto from './modules/changePhoto';
import makeForm from './modules/makeForm';
import calc from './modules/calc';
import Validator from './modules/Validator';

  //Timer
  let date = new Date(),
      days = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear();
      date.setFullYear(year, month, days + 1);
      
      
      date.setHours(0,0,0);
  countTimer(date);

  //MENU
  toggleMenu();
  
  //PopUp
  let opacity = 0;
  if (screen.width >= 768) {
    
    togglePopUp();
  }

  

  //Код для плавной работы якорей
  
  slow();
  //Табы
  

  tabs();

  //Слайдер
  

  slider();

  //change Photo
  
  changePhoto();

  
  //Валидатор
  

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
    errors: 0,
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
    errors: 0,
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
    errors: 0,
  });
  valid3.init();

  //Send Form
  

  makeForm('1', valid1.errors);
  makeForm('2', valid2.errors);
  makeForm('3', valid3.errors);

  //калькулятор

  calc();
