import { Button } from './Button.js';

export class UpButton extends Button {
    constructor(simulation) {
        super('Up', () => simulation.move('Up'));
    }
}
