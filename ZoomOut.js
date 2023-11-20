import { Button } from './Button.js';

export class ZoomOutButton extends Button {
    constructor(simulation) {
        super('Zoom(-)', () => simulation.zoomOut());
    }
}
