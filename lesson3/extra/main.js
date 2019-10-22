'use strict';
//                                              ПЕРВОЕ
let lang = 'en',
    i;

if (lang === 'ru') {
    console.log('пн, вт, ср, чт, пт, сб, вс');
    i = 0;
}

if (lang === 'en') {
    console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
    i = 1;
}

switch (lang) {
    case ('ru'):
        console.log('пн, вт, ср, чт, пт, сб, вс');
    break;
    case ('en'):
        console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
    break;
}

let days = [['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'], ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']];

console.log(days[i]);

//                          ВТОРОЕ
let name = 'Максим',
    answer;

answer = name === 'Артем' ? 'Директор': name === 'Максим' ? 'Преподаватель' : 'студент';
console.log('answer: ', answer);