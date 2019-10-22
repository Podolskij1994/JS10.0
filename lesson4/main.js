'use strict';
let money = +prompt('Ваш доход месячный?', ''),
    income = 'freelance',
    addExpenses = prompt('Через запятую перечислите возможные расходы', 'Машина, Жена'),
    deposit = prompt('У вас есть вклады в банке?', 'Да').toLowerCase == 'да' ? true : false,
    period,
    budgetMouth,
    expenses = [[], []],
    accumulatedMonth;

expenses[0][1] = prompt('Какие обязательные расходы у вас имеются?', 'Жена');
expenses[1][0] = +prompt('Во сколько это обойдется?', '25000');
expenses[0][0] = prompt('Какие обязательные расходы у вас имеются?', 'Машина');
expenses[1][1] = +prompt('Во сколько это обойдется?', '5000');

function getExpensesMonth(firstExpense, secondExpense) {
    return firstExpense + secondExpense;
}

function getAccumulatedMonth (profit) {
    return profit - getExpensesMonth(expenses[1][0], expenses[1][1]);
}

function getTargetMonth (accumulatedMonth) {
    let mission = +prompt('Введите вашу цель', '1000000');
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
period = getTargetMonth(accumulatedMonth);
console.log(`Цель будет достигнута за ${period} месяцев`);