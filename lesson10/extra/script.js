let body = document.querySelector('body');
class DomElement {
    constructor (selector, height, width, bg, fontSize) {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.top = 0;
        this.left = 0;
    }
    create (text) {
        let elem;
        if (this.selector[0] === '.') {
            elem = document.createElement('div');
            elem.classList.add(this.selector.slice(1));
        }
        elem.textContent = text; 
        elem.style.height = this.height;
        elem.style.width = this.width;
        elem.style.backgroundColor = this.bg;
        elem.style.fontSize = this.fontSize;
        body.appendChild(elem);

    }
    addEvent () {
        let elem = document.querySelector(this.selector);
        window.addEventListener('keydown', event => {
            switch (event.key) {
                case 'ArrowUp':
                    this.top -= 10;
                    elem.style.top = this.top + 'px';
                    console.log(event);
                    break;
                case 'ArrowDown':
                    this.top += 10;
                    elem.style.top = this.top + 'px';
                    console.log(event);
                    break;
                case 'ArrowLeft':
                    this.left -= 10;
                    elem.style.left = this.left + 'px';
                    console.log(event);
                    break;
                case 'ArrowRight':
                    this.left += 10;
                    elem.style.left = this.left + 'px';
                    console.log(event);
                    break;
            }
        })
    }
}

let p = new DomElement('.posAbs', '100px', '100px', 'red', '24px' );
p.create('world');
let elem = document.querySelector('.posAbs')
document.addEventListener('DOMContentLoaded', item => {
    p.addEvent(); 
})
