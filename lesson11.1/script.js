"use strict";
const start = document.querySelector('#start'),
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
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      additionalExpensesValue = document.querySelector('.additional_expenses-value'),
      targetAmount = document.querySelector('.target-amount'),
      periodAmount = document.querySelector('.period-amount'),
      cancel = document.querySelector('#cancel'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent');
let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

const symbols = [
  'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в',
  'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', ', ', ', ', ', ',',', 
  '.', '!', '?', 'ё', ' ', 'Backspace', 'м', 'а', 'и', 'т','ь',  'б', 'ю'
],
    numbers = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace' 
    ];

function checkInputText () {
  let a = false;
  symbols.forEach(item => {
    if (event.key === item) {
      a = true;
    }
  });
  if (!a && event.key !== 'Backspace') {
    console.log(event.key);
    event.preventDefault();
  }
}

function checkInputNumber (event) {
  let a = false;
  numbers.forEach(item => {
    if (event.key === item) {
      a = true;
    }
  });
  if (!a && event.key !== 'Backspace') {
    event.preventDefault();
  }
}
  
const AppData = function() {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.incomeMonth = 0;
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.period = 3;
};

AppData.prototype.start = function () {
  if (salaryAmount.value === '') {
    return;
  }
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();

  this.getExpensesMonth();
  this.getInfoDeposit();
  this.getBudget();
  this.getAdd(additionalExpensesItem.value.split(','), 'addExpenses');
  this.getAdd(additionalIncomeItem, 'addIncome');

  this.showResult();

  start.style.display = 'none';
  cancel.style.display = 'block';
  salaryAmount.setAttribute('disabled', '');
  incomeItems = document.querySelectorAll('.income-items');
  expensesItems = document.querySelectorAll('.expenses-items');
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
  depositBank.setAttribute('disabled', '');
  depositPercent.setAttribute('disabled', '');
  depositAmount.setAttribute('disabled', '');
  
};

AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.round(+this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcPeriod();
};

AppData.prototype.addBlock = function (block, text, plus) {
  const cloneItem = block[0].cloneNode(true);
  cloneItem.querySelector(`.${text}-title`).value = '';
  cloneItem.querySelector(`.${text}-amount`).value = '';
  block[0].parentNode.insertBefore(cloneItem, plus);
  block = document.querySelectorAll(`.${text}-items`);

  cloneItem.querySelector(`.${text}-title`).addEventListener('keydown', checkInputText);

  cloneItem.querySelector(`.${text}-amount`).addEventListener('keydown', checkInputNumber);

  if (block.length === 3) {
    plus.style.display = 'none';
  }
};

AppData.prototype.getIncome = function () {
  incomeItems.forEach(item => {
    const itemincome = item.querySelector('.income-title'),
        cashincome = item.querySelector('.income-amount');
        

    if(itemincome.value !== '' && cashincome.value !== '') {
      this.income[itemincome.value] = +cashincome.value;
      this.incomeMonth += +cashincome.value;
    }
  });
};


AppData.prototype.getExpenses = function () {
  expensesItems.forEach(item => {
    const itemExpenses = item.querySelector('.expenses-title'),
        cashExpenses = item.querySelector('.expenses-amount');

    if(itemExpenses.value !== '' && cashExpenses.value !== '') {
      this.expenses[itemExpenses.value] = +cashExpenses.value;
    }
  });
};

AppData.prototype.getAdd = function (block, arr) {
  block.forEach(item => {
    let itemValue = item.value || item;
    if (itemValue.value !== '') {
      itemValue = itemValue.trim();
      if (itemValue !== '') {
        this[arr].push(itemValue);
      }
    }
  });
};

AppData.prototype.getExpensesMonth = function () {
  let sum = 0;
  for (let key in this.expenses){
    sum += this.expenses[key];
  }
  this.expensesMonth = sum;
};

AppData.prototype.getIncomeMonth = function () {
  let sum = 0;
  for (let key in this.income){
    sum += this.income[key];
  }
  this.incomeMonth = sum;
};

AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit);
  this.budgetDay = this.budgetMonth / 30;
};

AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function () {
  console.log('restart');
  start.style.display = '';
  cancel.style.display = '';
  salaryAmount.removeAttribute('disabled', '');
  salaryAmount.value = '';
  incomeItems.forEach( item => {
    item.querySelector('.income-title').removeAttribute('disabled', '');
    item.querySelector('.income-title').value = '';
    item.querySelector('.income-amount').removeAttribute('disabled', '');
    item.querySelector('.income-amount').value='';
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
  depositBank.removeAttribute('disabled', '');
  depositPercent.removeAttribute('disabled', '');
  depositAmount.removeAttribute('disabled', '');
  depositCheck.checked = false;
  depositPercent.style.display = 'none';
  depositBank.style.display = 'none';
  depositAmount.style.display = 'none';
  depositAmount.value = '';
  depositPercent.value = '';
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
};

AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    this.percentDeposit = depositPercent.value;
    this.moneyDeposit = depositAmount.value;
  }
}

AppData.prototype.addEvent = function () {
  start.addEventListener('click', () => this.start.call(this));
  expensesPlus.addEventListener('click', () => {this.addBlock(expensesItems,'expenses',expensesPlus)});
  incomePlus.addEventListener('click', () => {this.addBlock(incomeItems, 'income', incomePlus)});
  periodSelect.addEventListener('input', () => {
    periodAmount.textContent = periodSelect.value;
    
    if (this.budgetMonth) {
      incomePeriodValue.value = this.calcPeriod();
    }
  });

  salaryAmount.addEventListener('keydown', function (event) {
    checkInputNumber(event);
  });

  incomeItems[0].querySelector('.income-title').addEventListener('keydown', function () {
    checkInputText();
  });

  incomeItems[0].querySelector('.income-amount').addEventListener('keydown', function (event) {
    checkInputNumber(event);
  });

  additionalIncomeItem.forEach(item => item.addEventListener('keydown', function () {
    checkInputText();
  }));

  expensesItems[0].querySelector('.expenses-title').addEventListener('keydown', function (event) {
    checkInputText(event);
  });

  expensesItems[0].querySelector('.expenses-amount').addEventListener('keydown', function (event) {
    checkInputNumber(event);
  });

  additionalExpensesItem.addEventListener('keydown', function () {
    checkInputText();
  });

  targetAmount.addEventListener('keydown', function (event) {
    checkInputNumber(event);
  });

  cancel.addEventListener('click', this.reset);

  depositCheck.addEventListener('change', function () {
    if (this.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      appData.deposit = 'true';
      depositBank.addEventListener('change', function () {
        let selectIndex = this.options[this.selectedIndex].value;
        if (selectIndex === 'other') {
          depositPercent.style.display = 'inline-block';
          depositPercent.value = '';
          console.log(depositPercent.value);
        }
        else {
          depositPercent.style.display = 'none';
          depositPercent.value = selectIndex;
          console.log(depositPercent.value);
        }
      });
    }
    else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositAmount.value = '';
      appData.deposit = 'false';
    }
  });
};

const appData = new AppData ();

appData.addEvent();


