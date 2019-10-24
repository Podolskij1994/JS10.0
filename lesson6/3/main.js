
//                              ТРЕТЬЕ
let a,
    sum = 0;

do {
    a = prompt('Введите число', '');
    if (isNaN(+a)) {
        continue;
    }
    if (+a > 0) {
        sum += +a;
    }
    console.log('sum: ', sum);
}
while (a !== null);
