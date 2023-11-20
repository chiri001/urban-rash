export class SimulationListener {
    constructor(simulation) {
        this.simulation = simulation;
        this.canvas = simulation.canvas;
        this.canvas.addEventListener('click', (event) =>
            this.handleMouseClick(event)
        );
    }

    handleMouseClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.simulation.check_vehicle_click(x, y);
    }
}
