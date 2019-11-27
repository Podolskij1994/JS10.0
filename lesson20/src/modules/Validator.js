class Validator {
  constructor ({selector, pattern = {}, method, num, errors}) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.num = num;
    this.errors = errors;
    this.elementsForm = [...this.form.elements].filter( item => {
      return item.tagName.toLowerCase() !== 'button' && 
      item.type !== 'button';
    });
    this.error = new Set();
  }

  init () {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
    this.form.addEventListener('submit', e => {
      if (this.error.size) {
        e.preventDefault();
      }
    });
    this.elementsForm.forEach(elem => elem.addEventListener('input', function () {
      if (this.dataset.russian){
        this.value = this.value.replace(/[^а-яё\s]*/gi, '');
      }
    }));
  }

  isValid (elem) {
    const validatorMethod = {
      notEmpty (elem) {
        if (elem.value.trim() === '') {
          return false;
        }
        return true;
      },
      pattern (elem, pattern) {
        return pattern.test(elem.value);
      }
    };
    if (this.method) {
      const method = this.method[elem.id];

      if (method) {
        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    }
    else {
      console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
    }
    return true;
  }

  checkIt (event) {
    const target = event.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
      this.errors = this.error.size;
    }
    else {
      this.showError(target);
      this.error.add(target);
      this.errors = this.error.size;
    }
  }
  

  showError (elem) {
    elem.classList.remove('success');
    elem.classList.add('error');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      return;
    }
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  showSuccess (elem) {
    elem.classList.remove ('error');
    elem.classList.add('success');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    }
  }

  applyStyle () {
    const style = document.createElement('style');
    style.textContent = `
    input.success {
      border: 2px solid green !Important
    }
    input.error {
      border: 2px solid red !Important
    }
    .validator-error {
      font-size: 12px;
      font-family: sans-serif;
      color: red;
      margin: -20px
    } `
    document.head.appendChild(style);
  }

  setPattern () {
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
  }
}

export default Validator;