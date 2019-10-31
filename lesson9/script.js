"use strict";
let start = document.querySelector('#start'),
    incomeAdd = document.querySelector('.income_add'),
    expensesAdd = document.querySelector('.expenses_add'),
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    btnPlus = document.querySelectorAll('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    accumulatedMonthValue = document.querySelector('.a'),
    expensesTitle = document.querySelectorAll('.expenses-title')[1],
    additionalExpenses = document.querySelectorAll('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    targetAmount = document.querySelector('.target-amount'),
    periodAmount = document.querySelector('.period-amount'),
    cancel = document.querySelector('#cancel');
  
let appData = {
  start: function () {
    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено');
      return;
    }
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();

    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();

    this.showResult();

    start.style.display = 'none';
    cancel.style.display = 'block';
    salaryAmount.setAttribute('disabled', '');
    incomeItems.forEach( item => {
      item.querySelector('.income-title').setAttribute('disabled', '');
      item.querySelector('.income-amount').setAttribute('disabled', '');
    });
    additionalIncomeItem.forEach(item => item.setAttribute('disabled', ''));
    expensesItems.forEach( item => {
      item.querySelector('.expenses-title').setAttribute('disabled', '');
      item.querySelector('.expenses-amount').setAttribute('disabled', '');
    });
    additionalExpensesItem.setAttribute('disabled', '');
    depositCheck.setAttribute('disabled', '');
    targetAmount.setAttribute('disabled', '');
  }, 
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.round(+this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    cloneExpensesItem.querySelector('.expenses-title').addEventListener('keydown', function (event) {
      checkInputText(event);
    });

    cloneExpensesItem.querySelector('.expenses-amount').addEventListener('keydown', function (event) {
      checkInputNumber(event);
    });

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    cloneIncomeItem.querySelector('.income-title').addEventListener('keydown', function (event) {
      checkInputText(event);
    });

    cloneIncomeItem.querySelector('.income-amount').addEventListener('keydown', function (event) {
      checkInputNumber(event);
    });

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(item => {
      let itemincome = item.querySelector('.income-title'),
          cashincome = item.querySelector('.income-amount');
          

      if(itemincome.value !== '' && cashincome.value !== '') {
        this.income[itemincome.value] = +cashincome.value;
        this.incomeMonth += +cashincome.value;
      }
    });
  },
  getExpenses: function () {
    expensesItems.forEach(item => {
      let itemExpenses = item.querySelector('.expenses-title'),
          cashExpenses = item.querySelector('.expenses-amount');

      if(itemExpenses.value !== '' && cashExpenses.value !== '') {
        this.expenses[itemExpenses.value] = +cashExpenses.value;
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach ( item => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  },
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  incomeMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  period: 3,
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in this.expenses){
      sum += this.expenses[key];
    }
    this.expensesMonth = sum;
  },
  getIncomeMonth: function () {
    let sum = 0;
    for (let key in this.income){
      sum += this.income[key];
    }
    this.incomeMonth = sum;
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  },
  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },
  getStatusIncome: function () {
    switch (true) {    
      case this.budgetDay > 800:
        console.log('Высокий уровень дохода');
        break;
      case this.budgetDay > 300:
        console.log('Средний уровень дохода');
        break;
      case this.budgetDay > 0:
        console.log('Низкий уровень дохода');
        break;
      default:
        console.log('Что-то пошло не так');
    }
  },
  getIntoDeposit: function () {
    if(this.deposit) {
      this.percentDeposit = prompt('Какой годовой процент?', '10');
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);

      while(isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null){
        this.percentDeposit = prompt('Какой годовой процент?', '10');
      }

      while(isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null){
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
    }
  },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
  reset: function () {
    console.log('restart');
    start.style.display = '';
    cancel.style.display = '';
    salaryAmount.removeAttribute('disabled', '');
    salaryAmount.value = ''
    incomeItems.forEach( item => {
      item.querySelector('.income-title').removeAttribute('disabled', '');
      item.querySelector('.income-title').value = ''
      item.querySelector('.income-amount').removeAttribute('disabled', '');
      item.querySelector('.income-amount').value=''
    });
    additionalIncomeItem.forEach(item => item.removeAttribute('disabled', ''));
    additionalIncomeItem.forEach(item => item.value = '');
    expensesItems.forEach( item => {
      item.querySelector('.expenses-title').removeAttribute('disabled', '');
      item.querySelector('.expenses-title').value = '';
      item.querySelector('.expenses-amount').removeAttribute('disabled', '');
      item.querySelector('.expenses-amount').value = '';
    });
    additionalExpensesItem.removeAttribute('disabled', '');
    depositCheck.removeAttribute('disabled', '');
    targetAmount.removeAttribute('disabled', '');
    additionalExpensesItem.value = '';
    depositCheck.value = '';
    targetAmount.value = '';
    budgetMonthValue.value = '';
    budgetDayValue.value = '';
    expensesMonthValue.value = '';
    additionalIncomeValue.value = '';
    additionalExpensesValue.value = '';
    incomePeriodValue.value = '';
    targetMonthValue.value = '';
  },
};
start.addEventListener('click', () => appData.start.call(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', () => {
  periodAmount.textContent = periodSelect.value;
  
  if (appData.budgetMonth) {
    incomePeriodValue.value = appData.calcPeriod();
  }
});

salaryAmount.addEventListener('keydown', function (event) {
  checkInputNumber(event);
});

incomeItems[0].querySelector('.income-title').addEventListener('keydown', function (event) {
  checkInputText(event);
});

incomeItems[0].querySelector('.income-amount').addEventListener('keydown', function (event) {
  checkInputNumber(event);
});

additionalIncomeItem.forEach(item => item.addEventListener('keydown', function (event) {
  checkInputText(event);
}));

expensesItems[0].querySelector('.expenses-title').addEventListener('keydown', function (event) {
  checkInputText(event);
});

expensesItems[0].querySelector('.expenses-amount').addEventListener('keydown', function (event) {
  checkInputNumber(event);
});

additionalExpensesItem.addEventListener('keydown', function (event) {
  checkInputText(event);
})

targetAmount.addEventListener('keydown', function (event) {
  checkInputNumber(event);
})

function checkInputText (event) {
  let a = false;
  symbols.forEach(item => {
    if (event.key === item) {
      a = true;
    }
  })
  if (!a && event.key !== 'Backspace') {
    event.preventDefault();
  }
}

function checkInputNumber (event) {
  let a = false;
  numbers.forEach(item => {
    if (event.key === item) {
      a = true;
    }
  })
  if (!a && event.key !== 'Backspace') {
    event.preventDefault();
  }
}

let symbols = [
  'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с',
  ', ', ', ', ', ',',', '.', '!', '?', 'ё', ' ', 'Backspace'
],
    numbers = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace' 
    ]

cancel.addEventListener('click', appData.reset);