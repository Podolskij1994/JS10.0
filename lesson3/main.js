'use strict';
let money = +prompt('Ваш доход месячный?', ''),
    income = 'freelance',
    addExpenses = prompt('Через запятую перечислите возможные расходы', ''),
    deposit = prompt('У вас есть вклады в банке?', '').toLowerCase == 'да' ? true : false,
    mission = 3000000,
    period,
    budgetMouth;

console.log(addExpenses.split(', '));

console.log(typeof money, typeof income, typeof deposit);

prompt('Какие обязательные расходы у вас имеются?', '');
budgetMouth = money - prompt('Во сколько это обойдется?', '');
prompt('Какие обязательные расходы у вас имеются?', '');
budgetMouth -= +prompt('Во сколько это обойдется?', '');


let budgetDay = Math.floor(budgetMouth / 30);
console.log('budgetDay: ', budgetDay);

period = Math.ceil(mission / budgetMouth)
console.log('period: ', period);

console.log(`Заработать за ${period} месяцев ${mission} рублей!`);

console.log('budgetDay: ', budgetDay);
switch (true) {    
    case budgetDay > 800:
        alert('Высокий уровень дохода');
        break;
    case budgetDay > 300:
        alert('Средний уровень дохода');
        break;
    case budgetDay > 0:
        alert('Низкий уровень дохода');
        break;
    default:
        alert('Что-то пошло не так');
}

// console.log(income.length);
// addExpenses.toLowerCase();



// console.log(budgetDay, (money % 30));