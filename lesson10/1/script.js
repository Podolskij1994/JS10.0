let body = document.querySelector('body');
class DomElement {
    constructor (selector, height, width, bg, fontSize) {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
    }
    create (text) {
        let elem;
        if (this.selector[0] === '.') {
            elem = document.createElement('div');
            elem.classList.add(this.selector.slice(1));
        }
        else if (this.selector[0] === '#') {
            elem = document.createElement('p');
        }
        elem.textContent = text; 
        elem.style.height = this.height;
        elem.style.width = this.width;
        elem.style.backgroundColor = this.color;
        elem.style.fontSize = this.fontSize;
        body.appendChild(elem);

    }
}
let p = new DomElement('#class', '100px', '100px', 'red', '24px' );
console.log(p);
p.create('world');
