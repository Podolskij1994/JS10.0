'use strict';
let money,
    income = 'freelance',
    addExpenses = prompt('Через запятую перечислите возможные расходы', 'Машина, Жена'),
    deposit = prompt('У вас есть вклады в банке?', 'Да').toLowerCase == 'да' ? true : false,
    period,
    budgetMouth,
    expenses = [[], []],
    accumulatedMonth;

let start = function () {
    do {
        money = prompt('Ваш доход месячный?', '50000');
    } 
    while( isNaN(money) || money === '' || money === null)
    +money;
}

start();

let getExpensesMonth = function() {
    let sum = 0;
    for (let i = 0; i < 2; i++){
        expenses[0][i] = prompt('Какие обязательные расходы у вас имеются?', 'Жена');
        expenses[1][i] = +prompt('Во сколько это обойдется?', '2500');
        while( isNaN(expenses[1][i]) || expenses[1][i] === '' || expenses[1][i] === null) {
            expenses[1][i] = +prompt('Во сколько это обойдется?', '25000');
        }
        sum += expenses[1][i];
        console.log('sum: ', sum);
    }
    return sum;
}

function getAccumulatedMonth (profit) {
    return profit - getExpensesMonth();
}

function getTargetMonth (accumulatedMonth) {
    let mission = +prompt('Введите вашу цель', '1000000');
    console.log('mission: ', mission);
    return Math.ceil(mission / accumulatedMonth);
}

function showTypeof (a) {
    console.log(typeof a);
}

function getStatusIncome (budgetDay) {
    switch (true) {    
        case budgetDay > 800:
            return 'Высокий уровень дохода';
            break;
        case budgetDay > 300:
            return 'Средний уровень дохода';
            break;
        case budgetDay > 0:
            return 'Низкий уровень дохода';
            break;
        default:
            return 'Что-то пошло не так';
    }
}
accumulatedMonth = getAccumulatedMonth(money);
console.log('accumulatedMonth: ', accumulatedMonth);
period = getTargetMonth(accumulatedMonth);
if (period > 0) {
    console.log(`Цель будет достигнута за ${period} месяцев`);
} else {
    console.log(`Цель не будет достигнута`);
}
