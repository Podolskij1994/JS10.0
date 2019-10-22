let money = 123543,
    income = 'freelance',
    addExpenses = '3000, 5000, 1150',
    deposit = true,
    mission = 5000000,
    period = 12;

console.log(typeof money, typeof income, typeof deposit);

console.log(income.length);

console.log(`Заработать за ${period} месяцев ${mission} рублей!`);

addExpenses.toLowerCase();

console.log(addExpenses.split(', '));

let budgetDay = money / 30;
console.log(budgetDay, (money % 30));