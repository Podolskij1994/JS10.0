'use strict';
let start = function () {
    let money;
    do {
        money = prompt('Ваш доход месячный?', '50000');
    } 
    while( isNaN(money) || money === '' || money === null);
    return +money;
}

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 500000,
    period: 3,
    asking: function () {
        let addExpenses = prompt('Через запятую перечислите возможные расходы', 'Машина, Жена');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('У вас есть вклады в банке?');

        let key = prompt('Какие обязательные расходы у вас имеются?', 'Жена');
        appData.expenses[key] = +prompt('Во сколько это обойдется?', '2500');
        while( isNaN(appData.expenses[key]) || appData.expenses[key] === '' || 
            appData.expenses[key] === null) {
            appData.expenses[key] = +prompt('Во сколько это обойдется?', '2500');
        }
        
        key = prompt('Какие обязательные расходы у вас имеются?', 'Машина');
        appData.expenses[key] = +prompt('Во сколько это обойдется?', '7500');
        while( isNaN(appData.expenses[key]) || appData.expenses[key] === '' || 
            appData.expenses[key] === null) {
            appData.expenses[key] = +prompt('Во сколько это обойдется?', '7500');
        }
        
    },
    budget: start(),
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function () {
        let sum = 0;
        for (let key in appData.expenses){
            sum += appData.expenses[key];
        }
        appData.expensesMonth = sum;
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function () {
        appData.mission = +prompt('Введите вашу цель', '1000000');
        appData.period = Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function () {
        switch (true) {    
            case appData.budgetDay > 800:
                console.log('Высокий уровень дохода');
                break;
            case appData.budgetDay > 300:
                console.log('Средний уровень дохода');
                break;
            case appData.budgetDay > 0:
                console.log('Низкий уровень дохода');
                break;
            default:
                console.log('Что-то пошло не так');
        }
    },

}


appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();


console.log('Расходы за месяц', appData.expensesMonth);
console.log('Цель будет достигнута за ' + appData.period + ' месяцев');
appData.getStatusIncome();

console.log('Наша программа включает в себя следующие данные: ');
for (let key in appData) {
    console.log('Свойство: ' + key + '. Значение: ' + appData[key]);
}
