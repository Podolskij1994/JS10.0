//калькулятор
const calc = () => {
  const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.querySelector('#total');

  const calc = (price = 100) => {
    let total = 0,
        countValue = 1,
        dayValue = 1;
    const typeValue = +calcType.options[calcType.selectedIndex].value,
          squareValue = +calcSquare.value;

      
    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value < 5 && calcDay.value) {
      dayValue *= 2;
    }
    else if (calcDay.value < 10 && calcDay.value) {
      dayValue *= 1.5;
    }
    if(typeValue && squareValue) {
      total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
    }

    setTotal(total, 0);
  }

  const setTotal = (total, count) => {
    totalValue.textContent = count;
    if (count < total) {
      count += 25;
      requestAnimationFrame(() => setTotal (total, count));
    }
  };

  calcBlock.addEventListener('change', function (event) {
    const target = event.target;

    if (target === calcType || target === calcSquare ||
      target === calcDay || target === calcCount) {
        calc();
      }
  })
}


export default calc;