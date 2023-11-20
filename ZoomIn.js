import { Button } from './Button.js';

export class ZoomInButton extends Button {
    constructor(simulation) {
        super('Zoom(+)', () => simulation.zoomIn());
    }
}
