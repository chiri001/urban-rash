import { Button } from './Button.js';

export class DownButton extends Button {
    constructor(simulation) {
        super('Down', () => simulation.move('Down'));
    }
}
