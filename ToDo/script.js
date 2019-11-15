const ol = document.querySelector('.ol'),
      btn = document.querySelector('.btn'),
      input = document.querySelector('.input');

ol.addEventListener('click', event => {
  let target = event.target;
  if (target.matches('.li')) {
    target.classList.toggle('line-through');
  }
});

btn.addEventListener('click', () => {
  if (input.value.trim() === '') {
    alert('Введите текст');
    input.value = '';
  }
  else {
    let li = document.createElement('li');
    li.classList.add('li');
    li.textContent = input.value;
    ol.appendChild(li);
    input.value = '';
  }
});