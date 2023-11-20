/*
 *               Rennie Kipchirchir
 *                   Button.js
 *                  11/19/23
 *
 *  The file contains the implementation of creating a button
 *
 */

export class Button {
    //constructor
    //params: the label text for the button, the function that is called after
    //         clicking the button
    constructor(text, onClick) {
        this.button = document.createElement('button');
        this.button.textContent = text;

        //add eventlistener
        this.button.addEventListener('click', onClick);
    }

    //function appends a button to the given element. i.e div box
    //param: element to append to
    appendTo(element) {
        element.appendChild(this.button);
    }
}
