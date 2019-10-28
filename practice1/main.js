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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 500000,
    period: 3,
    asking: function () {
      if (confirm('Есть ли у вас дополнительный источник заработка?')){
        let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую'),
            cashIncome = prompt('Сколько в месяц вы на этом зарабатываете', 10000);
        while(typeof itemIncome !== 'string') {
          itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую')
        }
        while(isNaN(cashIncome) || cashIncome === '' || cashIncome === null){
          cashIncome = prompt('Сколько в месяц вы на этом зарабатываете', 10000);
        }
        appData.income[itemIncome] = cashIncome;
      }

      let addExpenses = prompt('Через запятую перечислите возможные расходы', 'Машина,Жена');
      while (typeof addExpenses !== 'string') {
        addExpenses = prompt('Через запятую перечислите возможные расходы', 'Машина, Жена');
      }
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
    getIntoDeposit: function () {
      if(appData.deposit) {
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);

        while(isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null){
          appData.percentDeposit = prompt('Какой годовой процент?', '10');
        }

        while(isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null){
          appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        }
      }
    },
    calcSavedMoney: function () {
      return appData.budgetMonth * appData.period;
    }
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

appData.addExpenses = appData.addExpenses.map(item => item = item.slice(0,1).toUpperCase() + item.slice(1));
console.log(appData.addExpenses);