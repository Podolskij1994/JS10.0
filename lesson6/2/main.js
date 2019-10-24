
//                           ВТОРОЕ

let start,
    end,
    test;

start = +prompt ('Начальный год?');
end = +prompt ('Конечный год?');



function isLeapYear(start, end) {
    let arr = [];
    if (start > end) {
        test = start;
        start = end;
        end = test;
    }
    for (let i = start; i <= end; i++) {
        if (i % 400 === 0) {
            arr.push(i);
        } else if (i % 100 !== 0 && i % 4 === 0){
            arr.push(i);
        }
    }
    return arr;
}
console.log(isLeapYear(start, end));
