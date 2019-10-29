'use strict';
let date = new Date(),
    newDate = document.querySelector('.date'), 
    b = +date.getHours(),
    a = b < 10 ? '0' + b : b;
newDate.textContent = a + ':';

b = +date.getMinutes();
a = b < 10 ? '0' + b : b;
newDate.textContent += a + ':';

b = +date.getSeconds();
a = b < 10 ? '0' + b : b;
newDate.textContent += a + ' ';
    
b = +date.getDate();
a = b < 10 ? '0' + b : b;
newDate.textContent += a + '.';

b = +date.getMonth() + 1;
a = b < 10 ? '0' + b : b;
newDate.textContent += a + '.';

b = +date.getFullYear();
a = b < 10 ? '0' + b : b;
newDate.textContent += a;