import { Button } from './Button.js';

export class StartButton extends Button {
    constructor(simulation) {
        super('Start', () => simulation.start());
    }
}
