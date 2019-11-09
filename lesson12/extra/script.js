let start = document.querySelector('.start'),
    reset = document.querySelector('.reset'),
    div = document.querySelector('.div'),
    count = 0;

    function animate () {
        if (start.classList.contains('work')) {
            id = requestAnimationFrame(animate);
        count++;
        if(count < 500) {
            div.style.top = count + 'px';
        }
        else {
            cancelAnimationFrame(id);
        }
        }
        else {
            cancelAnimationFrame(id);
        }
        
    }
    start.addEventListener('click', function() {
        this.classList.toggle('work');
        let id = requestAnimationFrame(animate);
    })

    reset.addEventListener('click', function () {
        start.classList.remove('work');
        div.style.top = '0';
    })