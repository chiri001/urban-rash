

export class Button {
    constructor(text, onClick) {
        this.button = document.createElement('button');
        this.button.textContent = text;
        this.button.addEventListener('click', onClick);
    }

    appendTo(element) {
        element.appendChild(this.button);
    }
}
