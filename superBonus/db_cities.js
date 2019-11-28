let mainarr;
let lang = document.cookie.split("=")[document.cookie.split("=").indexOf("lang") + 1];

while (lang !== 'RU' && lang !== 'EN' && lang !== 'DE') {
    lang = prompt('Введите вашу локаль RU/EN/DE');
}
document.cookie = "lang=" + lang  + "; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT";

const   input = document.getElementById('select-cities'),
            defualt = document.querySelector('.dropdown-lists__list--default'),
            select = document.querySelector('.dropdown-lists__list--select'),
            autocomplete = document.querySelector('.dropdown-lists__list--autocomplete'),
            a = document.querySelector('.button');

const doWork = data => {
    mainarr = data;
    let help;
    if (lang === 'EN') {
        help = data[0];
        data[0] = data[2]
        data[2] = help
    }
    if (lang === 'DE') {
        help = data[0];
        data[0] = data[1]
        data[1] = help
    }

    let col = document.createElement('div');
    col.classList.add('dropdown-lists__col')

    defualt.appendChild(col)

    for (let item of data) {
        let block = document.createElement('div');
        block.classList.add('dropdown-lists__countryBlock');
        col.appendChild(block);
        
        let line = document.createElement('div');
        line.classList.add('dropdown-lists__total-line');
        line.dataset.country = item.country;
        block.appendChild(line);

        let country = document.createElement('div');
        country.classList.add('dropdown-lists__country');
        country.textContent = item.country;
        country.dataset.country = item.country;
        line.appendChild(country);

        let count = document.createElement('div');
        count.classList.add('dropdown-lists__count');
        count.textContent = item.count;
        count.dataset.country = item.country;
        line.appendChild(count);

        for (let data of item.cities) {
            let line = document.createElement('div');
            line.classList.add('dropdown-lists__line');
            line.dataset.src = data.link;
            line.dataset.city = data.name;
            block.appendChild(line);

            let city = document.createElement('div');
            city.classList.add('dropdown-lists__city');
            city.textContent = data.name;
            city.dataset.src = data.link;
            city.dataset.city = data.name;
            line.appendChild(city);

            let count = document.createElement('div');
            count.classList.add('dropdown-lists__count');
            count.textContent = data.count;
            count.dataset.src = data.link;
            count.dataset.city = data.name;
            line.appendChild(count);
        }

    }
}

const getData = (lang) => {
    fetch('./db_cities.json')
            .then(response => {
                if (response.status !== 200) {
                    throw new Error ('status network not 200');
                }
                return (response.json());
            })
            .then(data => {
                doWork (data[lang]);
            })
            .catch ( error => console.error(error));
}

getData(lang)

input.addEventListener('focus', event => {
    if (input.value === '') {
        defualt.style.display = 'block';
        select.style.display = 'none';
        autocomplete.style.display = 'none';
    }
    
});

const dropdown = document.querySelector('.dropdown');

dropdown.addEventListener('click', event => {
    let target = event.target;
    let col = select.querySelector('.dropdown-lists__col');
    select.removeChild(col);

    if (target.closest('.dropdown-lists__total-line')) {

        let countryName = target.dataset.country;
        input.value = target.dataset.country;

        col = document.createElement('div');
        col.classList.add('dropdown-lists__col');
        select.appendChild(col);

        let block = document.createElement('div');
        block.classList.add('dropdown-lists__countryBlock');
        col.appendChild(block);

        for (let item of mainarr) {
            if (item.country === countryName) {                
                let line = document.createElement('div');
                line.classList.add('dropdown-lists__total-line');
                line.dataset.country = item.country;
                block.appendChild(line);

                let country = document.createElement('div');
                country.classList.add('dropdown-lists__country');
                country.textContent = item.country;
                country.dataset.country = item.country;
                line.appendChild(country);

                let count = document.createElement('div');
                count.classList.add('dropdown-lists__count');
                count.textContent = item.count;
                count.dataset.country = item.country;
                line.appendChild(count);
                for (let data of item.cities) {
                    let line = document.createElement('div');
                    line.classList.add('dropdown-lists__line');
                    line.dataset.src = data.link;
                    line.dataset.city = data.name;
                    block.appendChild(line);

                    let city = document.createElement('div');
                    city.classList.add('dropdown-lists__city');
                    city.textContent = data.name;
                    city.dataset.src = data.link;
                    city.dataset.city = data.name;
                    line.appendChild(city);

                    let count = document.createElement('div');
                    count.classList.add('dropdown-lists__count');
                    count.textContent = data.count;
                    count.dataset.src = data.link;
                    count.dataset.city = data.name;
                    line.appendChild(count);

                    input.dataset.link = '#'
                }
            }
        }
        

    }
    if (target.closest('.dropdown-lists__line')) {
        let     cityName = target.dataset.city,
                i, t;
        input.value = cityName;
        for (let j = 0; j < mainarr.length; j++) {
            for (let k = 0; k < mainarr[j].cities.length; k++) {
                if (mainarr[j].cities[k].name === cityName) {
                    i = k;
                    t = j;
                }
            }
        }
        col = document.createElement('div');
        col.classList.add('dropdown-lists__col');
        select.appendChild(col);

        let block = document.createElement('div');
        block.classList.add('dropdown-lists__countryBlock');
        col.appendChild(block);

        console.log(mainarr[t].cities[i]);
        let line = document.createElement('div');
        line.classList.add('dropdown-lists__line');
        line.dataset.src = mainarr[t].cities[i].link;
        line.dataset.city = mainarr[t].cities[i].name;
        block.appendChild(line);

        let city = document.createElement('div');
        city.classList.add('dropdown-lists__city');
        city.textContent = mainarr[t].cities[i].name;
        city.dataset.src = mainarr[t].cities[i].link;
        city.dataset.city = mainarr[t].cities[i].name;
        line.appendChild(city);

        let count = document.createElement('div');
        count.classList.add('dropdown-lists__count');
        count.textContent = mainarr[t].cities[i].count;
        count.dataset.src = mainarr[t].cities[i].link;
        count.dataset.city = mainarr[t].cities[i].name;
        line.appendChild(count);
        input.dataset.link = count.dataset.src;
    }

    select.style.display = 'block';
    defualt.style.display = 'none';
    autocomplete.style.display = 'none';

    
})

input.addEventListener('input', event => {
    let col = autocomplete.querySelector('.dropdown-lists__col');
    autocomplete.removeChild(col);

    col = document.createElement('div');
    col.classList.add('dropdown-lists__col')

    autocomplete.appendChild(col)
    for (let item of mainarr) {
        let reg = new RegExp(`^${input.value}`, 'i')
        let block;
        if (reg.test(item.country) || !input.value) {
            block = document.createElement('div');
            block.classList.add('dropdown-lists__countryBlock');
            col.appendChild(block);
            
            let line = document.createElement('div');
            line.classList.add('dropdown-lists__total-line');
            line.dataset.country = item.country;
            block.appendChild(line);

            let country = document.createElement('div');
            country.classList.add('dropdown-lists__country');
            country.textContent = item.country;
            country.dataset.country = item.country;
            line.appendChild(country);

            let count = document.createElement('div');
            count.classList.add('dropdown-lists__count');
            count.textContent = item.count;
            count.dataset.country = item.country;
            line.appendChild(count);
        }
        for (let data of item.cities) {
            if (reg.test(data.name || !input.value)) {
                if (!block) {
                    block = document.createElement('div');
                    block.classList.add('dropdown-lists__countryBlock');
                    col.appendChild(block);
                }
                
                let line = document.createElement('div');
                line.classList.add('dropdown-lists__line');
                line.dataset.src = data.link;
                line.dataset.city = data.name;
                block.appendChild(line);

                let city = document.createElement('div');
                city.classList.add('dropdown-lists__city');
                city.textContent = data.name;
                city.dataset.src = data.link;
                city.dataset.city = data.name;
                line.appendChild(city);

                let count = document.createElement('div');
                count.classList.add('dropdown-lists__count');
                count.textContent = data.count;
                count.dataset.src = data.link;
                count.dataset.city = data.name;
                line.appendChild(count);
            }
        }
        

    }

    autocomplete.style.display = 'block';
    select.style.display = 'none';
    defualt.style.display = 'none';

    let search1 = autocomplete.querySelectorAll('.dropdown-lists__city'),
        search2 = autocomplete.querySelectorAll('.dropdown-lists__country');

    if (search1.length  === 1 && search2.length === 0)  {
        input.dataset.link = search1[0].dataset.src;
    } 
    else {
        input.dataset.link = '#';
    }
})

a.addEventListener('click', event => {
    a.href = input.dataset.link;
})
