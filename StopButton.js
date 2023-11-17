import { Button } from './Button.js';

export class StopButton extends Button {
    constructor(simulation) {
        super('Stop', () => simulation.stop());
    }
}
