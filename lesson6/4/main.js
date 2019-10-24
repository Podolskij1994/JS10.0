
//                              ЧЕТВЕРТОЕ
let b,
    c;

    playGame();

function playGame () {
    b = Math.trunc(Math.random()* 100 + 1);
        console.log(b);
        do {
            c = prompt('Угадай число!!!');
            if (c === null) {
                alert('Жаль, что ты уходишь');
                break;
            };
            if (isNaN(c) || c === '') {
                alert('Введите число');
            }
            if (+c > b) {
                alert('Меньше');
            } 
            else if (+c < b  && c !== '') {
                alert ('Больше');
            }
            if (+c === b) {
                alert('Поздравляю, вы угадали!');
            }
        } 
        while (+c !==b);
}

if (confirm('Хочешь сыграть ещё?')) {
    playGame();
}


