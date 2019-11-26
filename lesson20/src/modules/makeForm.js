const makeForm = (num) => {
  const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
  let form = document.getElementById(`form${num}`),
      statusMessage = document.createElement('div'),
      inputs = form.querySelectorAll('input');
  const outputData = (response) => {
    if (response.status !== 200) {
      throw new Error ('status network not 200');
    }
    statusMessage.textContent = successMessage;
    inputs.forEach(item => item.value = '');
    },
    errorData = (error) => {
      statusMessage.textContent = errorMessage;
      console.error(error);
    };
  statusMessage.style.color = 'white';
  statusMessage.textContent = loadMessage;
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.appendChild(statusMessage);
    const formData = new FormData(form);
    let body = {};
    for (let val of formData.entries()) {
      body[val[0]] = val[1];
    }
    postData(body)
    .then(outputData)
    .catch(errorData);
  });
};
const postData = (body) => { 
  return fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  // return new Promise ((resolve, reject) => {
  //   const request = new XMLHttpRequest();
  //   request.addEventListener('readystatechange', () => {
      
  //     if (request.readyState !== 4) {
  //       return;
  //     }
  //     if (request.status === 200) {
  //       resolve();
  //     }
  //     else {
  //       reject(request.status);
  //     }
  //   });
  //   request.open('POST', './server.php');
  //   request.setRequestHeader('Content-type', 'application/json');
  //   request.send(JSON.stringify(body));
  // });
}
export default makeForm;