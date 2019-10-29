'use strict';
let date = document.querySelector('.date'),
    newDate = document.querySelector('.new-date'), 
    text = date.textContent,
    a, b, c, d;

  text = text.trim();
  a = text.indexOf(':')
  b = +text.slice(0, a);
  b = b < 10 ? '0' + b : b;
  d = b + ':';
  c = a;
  a++;

  a = text.indexOf(':', a);
  b = +text.slice(c + 1, a);
  b = b < 10 ? '0' + b : b;
  d += b + ':';
  c = a + 1;
  a += 3;

  b = +text.slice(c, a);
  b = b < 10 ? '0' + b : b;
  d += b + ' ';
  a += 2;
  c = a;

  a = text.indexOf('.', a);
  b = +text.slice(a - 2, a);
  b = b < 10 ? '0' + b : b;
  d += b + '.';
  c = a;
  a++;
  
  a = text.indexOf('.', a);
  b = +text.slice(c + 1, a);
  b = b < 10 ? '0' + b : b;
  d += b + '.';

  b = +text.slice(a+1)
  d += b;

  newDate.textContent = d;
  
