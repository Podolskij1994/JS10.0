'use strict';
let arr = ['24534', '45345', '35634', '5634', '54634', '245', '5657', '65674', '56'];

for (let i = 0; i < arr.length; i++) {
    let test = Math.floor(arr[i] / 10 ** (String(arr[i]).length - 1));
    console.log(test);
    if (test === 2 || test === 4) {
        console.log(arr[i]);
    }
}

function checkForSimpleNumber (n) {
    let t = 0;
    for (let i = 2; i <= n; i++) {
        if (n % i === 0) {
            t++;
        }
    }
    if (t === 1) {
        console.log(`Простое число: ${n}. Его делители: 1 и ${n}`);
    }
}
for (let i = 2; i <= 100; i++){
    checkForSimpleNumber(i);
}
