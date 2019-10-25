'use strict';
let week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

let days = document.querySelector('.days');
let dateToday = new Date;
dateToday = dateToday.getDay();

switch (dateToday) {
    case 1:
        dateToday = 'понедельник';
        break;
    case 2:
        dateToday = 'вторник';
        break;
    case 3:
        dateToday = 'среда';
        break;
    case 4:
        dateToday = 'четверг';
        break;
    case 5:
        dateToday = 'пятница';
        break;
    case 6:
        dateToday = 'суббота';
        break;
    case 7:
        dateToday = 'воскресенье';
        break;
}

for (let key of week) {
    if (dateToday === key) {
        days.innerHTML += '<b>' +  key + '</b><br>';
    }
    else if (key === 'суббота' || key === 'воскресенье') {
        days.innerHTML += '<i>' +  key + '</i><br>';
    } 
    else {
        days.innerHTML += key + '</br>';
    }
    
}