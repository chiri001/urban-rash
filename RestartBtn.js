import { Button } from './Button.js';

export class RestartButton extends Button {
    constructor(simulation) {
        super('Restart', () => simulation.restart_game());
    }
}
