//                          ПЕРВОЕ
let a,
    b;

do {
    a = prompt('Введите 1 число');
}
while (isNaN(a) || a === '' || a === null)

do {
    b = prompt('Введите 2 число');
}
while (isNaN(b) || b === '' || b === null)

let answer = (+a > +b) ? 
'Первое число больше второго' : 
'Второе число больше первого';
    console.log(answer);