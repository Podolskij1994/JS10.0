document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    

    const getData = (request) => {
      return new Promise ((resolve, reject) => {
      
        
      request.open('GET', './cars.json');
      request.setRequestHeader('Content-type', 'application/json');
      request.send();

      request.addEventListener('readystatechange', () => {
          if (request.readyState === 4 ) {
            if (request.status === 200) {
              resolve(request.responseText);
            }
            else {
              reject(request.status);
            }
              

          } 
      });
    });
    };

    select.addEventListener('change', () => {      
      const request = new XMLHttpRequest();
      getData (request)
      .then ((ans) => {
        const data = JSON.parse(ans);
              console.log('Заходим');
              data.cars.forEach(item => {
                  if (item.brand === select.value) {
                      const {brand, model, price} = item;
                      output.innerHTML = `Тачка ${brand} ${model} <br>
                      Цена: ${price}$`;
                  }
              });
      })
      .catch ((error) => {
        output.innerHTML = 'Произошла ошибка';
        console.error(error);
      });
    });

});