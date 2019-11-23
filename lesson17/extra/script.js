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

let obj = {
    print1() {
        console.log('Крот');
    },
    print2() {
        console.log('овце,');
    },
    print3() {
        console.log('жирафу,');
    },
    print4() {
        console.log('зайке');
    },
    print5() {
        console.log('голубые');
    },
    print6() {
        console.log('сшил');
    },
    print7() {
        console.log('фуфайки');
    }
},
    c = 0;
function set() {
    c++;
    obj['print' + c]();
    if (c <= 7) {
        setTimeout(set, 100);
    }
}
setTimeout(set, 100);