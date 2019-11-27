document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    const   select = document.getElementById('film'),
                container = document.querySelector('.container');

    const checkAnswer = answer => {
        const check = select.value;
        clearContainer();
        for (let item of answer) {
            if (item.movies) {
                if (item.movies.indexOf(check) !== -1) {
                    makeCard(item);
                }
            } 
        }
    };

    const makeCard = data => {
        const   card = document.createElement('div'),
                    img = document.createElement('img'),
                    actors = document.createElement('p'),
                    name = document.createElement('p'),
                    status = document.createElement('p');
        
        card.classList.add('card');
        img.classList.add('card__img');
        actors.classList.add('card__actors');
        name.classList.add('card__name');
        status.classList.add('card__status');

        card.appendChild(img);
        card.appendChild(actors);
        card.appendChild(name);
        card.appendChild(status);

        img.src = data.photo;
        img.alt = data.actors;
        actors.textContent = data.actors;
        name.textContent = data.name;
        status.textContent = data.status;

        container.appendChild(card);
    };

    const clearContainer = () => {
        let elems = container.querySelectorAll('.card');

        elems.forEach(item => {
            container.removeChild(item);
        })
    };

    select.addEventListener('change', event => {
        const request = new XMLHttpRequest();

        request.open('GET', './JSON/dbHeroes.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
        
        request.addEventListener('readystatechange', event => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                checkAnswer(JSON.parse(request.responseText))
            } 
            else {
                console.error(request.status)
            }
        });
    })
});