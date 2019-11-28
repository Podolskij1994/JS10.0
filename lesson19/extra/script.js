const   buttons = document.querySelector('.buttons'),
            card = document.querySelector('.card');

const addFileToCard = file => {
    const reg = /\.mp4$/ig;
    let elem = document.querySelector('.file');
    console.log(file);
    if (elem) {
        card.removeChild(elem);
    }
    
    if (reg.test(file)) {
        elem = document.createElement('video');
        elem.autoplay = true;
    }
    else {
        elem = document.createElement('img');
    }

    card.appendChild(elem);
    elem.classList.add('file');
    elem.src = file;
};

buttons.addEventListener('click', event => {
    const target = event.target;
    
    if (target.classList.contains('cat') || target.classList.contains('dog')) {
        const src = target.dataset.src;
        fetch(src)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error ('Status network not 200');
                }
                return (response.json());
            })
            .then (data => {
                let ans = data.file || data.url;
                addFileToCard(ans);
            })
            .catch (error => console.error(error))
    }
})