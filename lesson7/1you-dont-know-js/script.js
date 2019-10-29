let book = document.querySelectorAll('.book'),
    books = document.querySelector('.books');

books.insertBefore(book[1], book[0]);
books.insertBefore(book[4], book[2]);
books.insertBefore(book[5], book[2]);
books.insertBefore(book[3], book[5]);

book = document.querySelectorAll('.book');

book[2].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

let li = book[1].querySelectorAll('li');
let ul = book[1].querySelector('ul');
ul.insertBefore(li[6], li[4]);
ul.insertBefore(li[8], li[4]);
ul.insertBefore(li[2], li[10]);

li = book[4].querySelectorAll('li');
ul = book[4].querySelector('ul');
ul.insertBefore(li[9], li[2]);
ul.insertBefore(li[3], li[2]);
ul.insertBefore(li[4], li[2]);
ul.insertBefore(li[6], li[5]);
ul.insertBefore(li[7], li[5]);

li = book[5].querySelectorAll('li');
ul = book[5].querySelector('ul');
let newLi = document.createElement('li');
newLi.textContent = 'Глава 8: За пределами ES6';
ul.insertBefore(newLi, li[9]);

let body = document.querySelector('body');
body.removeChild(document.querySelector('.adv'));

body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';